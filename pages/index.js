import Image from 'next/image'
import Link from 'next/link'
import { getSortedImagesData, getSortedTextData } from '../lib/content'
import styles from '../styles/Home.module.css'

export default function Home({ recentImages, recentText }) {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured AI Artworks</h2>
        <div className={styles.imageGrid}>
          {recentImages.map((image) => (
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
        <Link href="/images" className={styles.viewMore}>
          View All Artworks →
        </Link>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Latest AI Text Content</h2>
        <div className={styles.textGrid}>
          {recentText.map((text) => (
            <div key={text.id} className={styles.textCard}>
              <h3 className={styles.imageTitle}>{text.title}</h3>
              <p className={styles.imageDescription}>{text.description}</p>
              <span className={styles.toolBadge}>{text.tool}</span>
            </div>
          ))}
        </div>
        <Link href="/text" className={styles.viewMore}>
          View All Text Content →
        </Link>
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const allImages = getSortedImagesData()
  const allText = getSortedTextData()

  return {
    props: {
      recentImages: allImages.slice(0, 4),
      recentText: allText.slice(0, 3),
    },
  }
}