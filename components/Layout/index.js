// components/Layout/index.js
import Head from 'next/head'
import Link from 'next/link'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>AIRTIFACT</title>
        <meta name="description" content="Curated AI-generated content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            AIRTIFACT
          </Link>
          <div className={styles.links}>
            <Link href="/images">Images</Link>
            <Link href="/text">Text</Link>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} AIRTIFACT - Open Source AI Content Curation</p>
      </footer>
    </div>
  )
}