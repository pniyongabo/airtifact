import { getSortedTextData } from '../../lib/content'
import styles from '../../styles/Text.module.css'

export default function TextPage({ allText }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI Text Generation</h1>
        <p className={styles.description}>
          A collection of interesting AI-generated text content, hallucinations, and creative writing
        </p>
      </header>

      <div className={styles.textGrid}>
        {allText.map((post) => (
          <article key={post.id} className={styles.textCard}>
            <div className={styles.cardHeader}>
              <span className={styles.toolBadge}>{post.tool}</span>
              <span className={styles.categoryBadge}>{post.category}</span>
            </div>
            <h2 className={styles.textTitle}>{post.title}</h2>
            <p className={styles.textDescription}>{post.description}</p>
            <div className={styles.textContent}>
              {post.content}
            </div>
            <div className={styles.cardFooter}>
              <time className={styles.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const allText = getSortedTextData()
  return {
    props: {
      allText,
    },
  }
}
