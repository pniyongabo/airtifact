import Image from 'next/image'
import { getSortedImagesData } from '../../lib/content'
import styles from '../../styles/Images.module.css'

export default function ImagesPage({ allImages }) {
  // Filter out any images with missing image paths
  const validImages = allImages.filter(img => img && img.image);
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI Generated Artworks</h1>
        <p className={styles.description}>
          A curated collection of AI-generated images from various tools and models
        </p>
      </header>

      <div className={styles.imageGrid}>
        {validImages.map((image) => (
          <div key={image.id} className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={image.image}
                alt={image.title || 'Untitled'}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={styles.imageContent}>
              <h3 className={styles.imageTitle}>{image.title || 'Untitled'}</h3>
              <p className={styles.imageDescription}>{image.description || ''}</p>
              <span className={styles.toolBadge}>{image.tool || 'Unknown Tool'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const allImages = getSortedImagesData();
    
    // Debug: Log if there are any problematic images
    const problematicImages = allImages.filter(img => !img || !img.image);
    if (problematicImages.length > 0) {
      console.log('Found problematic images:', problematicImages);
    }
    
    return {
      props: {
        allImages,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        allImages: [],
      },
    };
  }
}
