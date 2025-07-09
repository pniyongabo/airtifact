import Image from 'next/image'
import Link from 'next/link'
import { getImageData, getSortedImagesData } from '../../lib/content'
import styles from '../../styles/Images.module.css'

export default function ImageDetail({ imageData }) {
  return (
    <div className={styles.container}>
      <Link href="/images" className={styles.backLink}>
        ← Back to Gallery
      </Link>
      
      <article className={styles.imageDetail}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageData.image}
            alt={imageData.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>
        
        <div className={styles.imageContent}>
          <h1 className={styles.imageTitle}>{imageData.title}</h1>
          <p className={styles.imageDescription}>{imageData.description}</p>
          
          <div className={styles.metadata}>
            <span className={styles.toolBadge}>{imageData.tool}</span>
            <time className={styles.date}>
              {new Date(imageData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          {imageData.content && (
            <div className={styles.content}>
              <pre>{imageData.content}</pre>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export async function getStaticPaths() {
  const images = getSortedImagesData()
  const paths = images.map((image) => ({
    params: { id: image.id }
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const imageData = getImageData(params.id)
  return {
    props: { imageData }
  }
}
