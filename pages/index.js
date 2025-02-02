// pages/index.js
import Image from 'next/image'
import Link from 'next/link'
import { getSortedImagesData, getSortedTextData } from '../lib/content'
import styles from '../styles/Home.module.css'

export default function Home({ recentImages, recentText }) {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent AI Artworks</h2>
        <div className={styles.imageGrid}>
          {recentImages.map((image) => (
            <div key={image.id} className={styles.imageCard}>
              <Image
                src={image.image}
                alt={image.title}
                width={300}
                height={300}
                className={styles.image}
              />
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          ))}
          <Link href="/images" className={styles.viewMore}>
            View More Images →
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent AI Text Content</h2>
        <div className={styles.textGrid}>
          {recentText.map((text) => (
            <div key={text.id} className={styles.textCard}>
              <h3>{text.title}</h3>
              <p>{text.description}</p>
              <span className={styles.tool}>Generated with: {text.tool}</span>
            </div>
          ))}
          <Link href="/text" className={styles.viewMore}>
            View More Text Content →
          </Link>
        </div>
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const allImages = getSortedImagesData()
  const allText = getSortedTextData()

  return {
    props: {
      recentImages: allImages.slice(0, 3), // Show only 3 recent images
      recentText: allText.slice(0, 3), // Show only 3 recent text posts
    },
  }
}