import { useState } from 'react';
import styles from '../../styles/Admin.module.css';

export default function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setError(null);
    setResult(null); // Clear previous result

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      // Log the received data
      console.log('Received data:', data);

      setResult(data);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Generate AI Image</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt..."
          className={styles.textarea}
          rows={4}
        />

        <button 
          type="submit" 
          disabled={generating || !prompt}
          className={styles.button}
        >
          {generating ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {error && (
        <div className={styles.error}>
          Error: {error}
        </div>
      )}

      {result && result.imagePath && (
        <div className={styles.result}>
          <h3>Generated Image:</h3>
          <div className={styles.imageWrapper}>
            {/* Log the image path being used */}
            {console.log('Displaying image:', result.imagePath)}
            <img 
              src={result.imagePath}
              alt="Generated image"
              className={styles.generatedImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}