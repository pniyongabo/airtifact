import Link from 'next/link'
import { getTextData, getSortedTextData } from '../../lib/content'
import styles from '../../styles/Text.module.css'

export default function TextDetail({ textData }) {
  return (
    <div className={styles.container}>
      <Link href="/text" className={styles.backLink}>
        ← Back to Gallery
      </Link>
      
      <article className={styles.textDetail}>
        <div className={styles.cardHeader}>
          <span className={styles.toolBadge}>{textData.tool}</span>
          <span className={styles.categoryBadge}>{textData.category}</span>
        </div>
        
        <h1 className={styles.textTitle}>{textData.title}</h1>
        <p className={styles.textDescription}>{textData.description}</p>
        
        <div className={styles.textContent}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{textData.content}</pre>
        </div>
        
        <div className={styles.cardFooter}>
          <time className={styles.date}>
            {new Date(textData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </article>
    </div>
  )
}

export async function getStaticPaths() {
  const textItems = getSortedTextData()
  const paths = textItems.map((text) => ({
    params: { id: text.id }
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const textData = getTextData(params.id)
  return {
    props: { textData }
  }
}
