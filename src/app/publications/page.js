import styles from './page.module.css';
import { promises as fs } from 'node:fs';
import path from 'path';

async function getPublications() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'pubs', 'publications.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const publications = JSON.parse(fileContents);
    return publications;
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
}

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div>
      <h2>Publications</h2>
      <ul className={styles.publicationsList}>
        {publications.map((publication, index) => (
          <li key={index} className={styles.publicationItem}>
            <h3 className={styles.publicationName}>{publication.name}</h3>
            <p className={styles.publicationDetails}>
              <strong>Year:</strong> {publication.year}
            </p>
            <p className={styles.publicationDetails}>
              <strong>Authors:</strong> {publication.authors.join(', ')}
            </p>
            <p className={styles.publicationDetails}>
              <strong>Venue:</strong> {publication.venue}
            </p>
          </li>
        ))}
      </ul>
      {publications.length === 0 && <p>No publications found.</p>}
    </div>
  );
}