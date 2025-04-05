import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image'; // For optimized image loading
import styles from './page.module.css';
import ReactMarkdown from 'react-markdown'; // Import the ReactMarkdown component

async function getBioData() {
  const filePath = path.join(process.cwd(), 'src/app/home/home.md');
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const { content, data } = matter(fileContents);
    return {
      bio: content,
      image: data.image || null,
      title: data.title || 'Bio',
    };
  } catch (error) {
    console.error('Error reading bio data:', error);
    return { bio: null, image: null, title: 'Bio' };
  }
}

export default async function BioPage() {
  const bioData = await getBioData();

  if (!bioData.bio) {
    return <div>Error loading bio.</div>;
  }

  return (
    <div>
      <h1>{bioData.title}</h1>
      <div className={styles.bioContainer}>
        {bioData.image && (
          <div className={styles.imageContainer}>
            <Image
              src={bioData.image}
              alt="Research Image"
              width={500} // Adjust as needed
              height={300} // Adjust as needed
              style={{ objectFit: 'cover' }} // Optional: for better image fitting
            />
          </div>
        )}
        <div className={styles.bioText}>
          <ReactMarkdown>{bioData.bio}</ReactMarkdown> {/* Use ReactMarkdown to render the bio */}
        </div>
      </div>
    </div>
  );
}