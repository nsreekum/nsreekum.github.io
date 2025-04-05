import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { notFound } from "next/navigation";

const md = MarkdownIt();

export async function generateStaticParams() {
    const posts = ['armada', 'spall', 'spaarc', 'actsense']; // Replace with your actual project slugs
    return posts.map((post) => ({ 'post-slug': post }));
  }

async function getPost(slug) {
    const filePath = path.join(process.cwd(), `src/app/posts/${slug}/post.md`);
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const {content, data} = matter(fileContents);
    return ({
        content,
        ...data,
    });
}

export default async function PostPage({params}){
    const {'post-slug': slug} = params;
    const post = await getPost(slug);

    if(!post) notFound();
    
    const htmlContent = md.render(post.content);

    return ( 
        <article>
            <h1>{post.title}</h1>
            <p className="post-meta">{post.date}</p>
            <div className="post-content" dangerouslySetInnerHTML={{__html: htmlContent}}/>
        </article>
    );
};
