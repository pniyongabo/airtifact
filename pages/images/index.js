import Image from 'next/image'
import { getSortedImagesData } from '../../lib/content'
import styles from '../../styles/Images.module.css'

export default function ImagesPage({ allImages }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI Generated Artworks</h1>
        <p className={styles.description}>
          A curated collection of AI-generated images from various tools and models
        </p>
      </header>

      <div className={styles.imageGrid}>
        {allImages.map((image) => (
          <div key={image.id} className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={image.image}
                alt={image.title}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={styles.imageContent}>
              <h3 className={styles.imageTitle}>{image.title}</h3>
              <p className={styles.imageDescription}>{image.description}</p>
              <span className={styles.toolBadge}>{image.tool}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const allImages = getSortedImagesData()
  return {
    props: {
      allImages,
    },
  }
}