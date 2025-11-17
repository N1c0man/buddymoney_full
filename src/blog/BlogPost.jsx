import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { postsIndex } from "./postsIndex";

export default function BlogPost() {
  const { slug } = useParams();
  const post = postsIndex.find((p) => p.slug === slug);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!post) {
      setError("Post not found.");
      return;
    }
    fetch(post.path)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load post");
        return res.text();
      })
      .then(setContent)
      .catch(() => setError("Sorry, we couldn’t load this article."));
  }, [post]);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p className="text-red-600">{error}</p>
        <Link to="/blog" className="text-blue-700 underline">← Back to blog</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link to="/blog" className="text-blue-700 underline">← Back to blog</Link>
      <h1 className="text-3xl font-extrabold mt-4">{post.title}</h1>
      <div className="text-gray-500 text-sm mt-2">{new Date(post.date).toDateString()}</div>

      {error ? (
        <p className="text-red-600 mt-6">{error}</p>
      ) : (
        <article className="prose max-w-none mt-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      )}
    </main>
  );
}
