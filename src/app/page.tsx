import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Grievance Redressal Portal</h1>
        <p>
          Submit your grievances easily through our multi-step wizard.
          You can save your progress and return later.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/submit" className={styles.card}>
            <h2>Start New Grievance &rarr;</h2>
            <p>Begin the submission process.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
