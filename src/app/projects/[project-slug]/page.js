import fs from 'fs/promises';
import path from 'path';
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { notFound } from "next/navigation";

const md = MarkdownIt();

export async function generateStaticParams() {
  const projects = ['armada', 'spall', 'spaarc', 'actsense', 'pathweaver']; // Replace with your actual project slugs
  return projects.map((project) => ({ 'project-slug': project }));
}

async function getProject(slug) {
  const filePath = path.join(process.cwd(), `src/app/projects/${slug}/project.md`);
  const fileContents = await fs.readFile(filePath, 'utf-8');
      const {content, data} = matter(fileContents);
      return ({
          content,
          ...data,
      });
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { 'project-slug': slug } = resolvedParams;
  const project = await getProject(slug);
  
  if(!project) notFound();
  
  const htmlContent = md.render(project.content);

  return ( 
      <article>
          <h1>{project.title}</h1>
          <p className="post-meta">{project.date.toLocaleDateString()}</p>
          <div className="post-content" dangerouslySetInnerHTML={{__html: htmlContent}}/>
      </article>
  );
}