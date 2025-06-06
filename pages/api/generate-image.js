import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Helper function to create a safe filename from prompt
export function createSafeFilename(prompt) {
  return prompt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = String(process.env.STABILITY_API_KEY || '');

  if (!apiKey || !apiKey.startsWith('sk-')) {
    return res.status(500).json({ 
      success: false, 
      error: 'Invalid API key configuration'
    });
  }

  try {
    const { prompt } = req.body;

    const response = await axios({
      method: 'post',
      url: 'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      data: {
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 512,
        width: 512,
        steps: 30,
        samples: 1,
      },
    });

    const image = response.data.artifacts[0];

    // Create and save the file
    const safePrompt = createSafeFilename(prompt);
    const timestamp = Date.now();
    const filename = `${safePrompt}-${timestamp}.png`;
    const filepath = path.join(process.cwd(), 'public/images', filename);

    // Log the exact filename being used
    console.log('Creating file:', filename);

    // Save the image
    fs.writeFileSync(filepath, Buffer.from(image.base64, 'base64'));

    // Return the exact path that will be used
    const imagePath = `/images/${filename}`;
    console.log('Returning image path:', imagePath);

    res.status(200).json({ 
      success: true, 
      imagePath: imagePath
    });

  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
}
