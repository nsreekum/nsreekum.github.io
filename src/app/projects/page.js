import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import styles from './page.module.css'; // Import CSS module
import { FaGithub } from 'react-icons/fa'; // GitHub icon
import { FaFilePdf } from 'react-icons/fa'; // PDF icon (adjust as needed)

async function getProjects() {
    const projects = ['armada', 'spall', 'spaarc', 'actsense', 'pathweaver'];
    return Promise.all(projects.map(async (project) => {
        const slug = project;
        const filePath = path.join(process.cwd(), `src/app/projects/${slug}/project.md`);
        try {
            const fileContents = await fs.readFile(filePath, 'utf-8');
            const { content, data } = matter(fileContents);
            return {
                slug,
                content,
                ...data,
            };
        } catch (error) {
            console.error(`Error reading ${slug}:`, error);
        }
    }));
}

export default async function ProjectPage() {
    const projects = await getProjects();
    return (
        <div>
            <h2 className={styles.projectsHeading}>Projects</h2>
            <div className={styles.projectGrid}>
                {projects.map((project) => (
                    <div key={project.slug} className={styles.projectCard}>
                        <h3>
                            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                        </h3>
                        {project.collaborators && (
                            <p><strong>Collaborators:</strong> {project.collaborators}</p>
                        )}
                        {(project.github || project.conferencePaper) && (
                            <p className={styles.iconLinks}> {/* Container for icons */}
                                {project.github && (
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                                        <FaGithub className={styles.icon} />
                                    </Link>
                                )}
                                {project.conferencePaper && (
                                    <Link href={project.conferencePaper} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                                        <FaFilePdf className={styles.icon} />
                                    </Link>
                                )}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}