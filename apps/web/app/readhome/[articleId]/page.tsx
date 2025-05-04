"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ReadArticle({ onBack }: any) {
  const [article, setArticle] = useState<any>(null);
  const { articleId } = useParams();
  const router = useRouter();

  // Synchronous function to extract the first image URL from markdown
  function extractFirstImageUrl(markdown: string): string | null {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = regex.exec(markdown);
    return match && match[1] !== undefined ? match[1] : null;
  }

  function removeMarkdownImages(markdown: string): string {
    // Regular expression to match Markdown image syntax: ![alt text](image_url)
    return markdown.replace(/!\[.*?\]\(.*?\)/g, '');
  }

  useEffect(() => {
    if (articleId) {
      async function fetchArticle() {
        try {
          const response = await axios(`http://localhost:4000/articles/${articleId}`);
          setArticle(response.data);
        } catch (error) {
          toast.error("Error fetching article");
        }
      }
      fetchArticle();
    }
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const contentImage = extractFirstImageUrl(article.content || "");
  const contentWithoutImages = removeMarkdownImages(article.content || "");

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <span className="mr-2">←</span> Back to feed
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{article?.title || ""}</h1>
        {article?.subtitle && (
          <p className="text-xl relative text-gray-600 mb-6">{article?.subtitle || ""}</p>
        )}

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-300 mr-3 shadow-md">
            <Image
              sizes="(max-width: 768px) 100vw, 1200px"
              src={contentImage || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
              alt="Medium Logo"
              width={800}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
          <div>
            <div className="font-medium">{article?.author || ""}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <span>{article.date}</span>
              {article.likes && (
                <span className="ml-3">• {article.likes || ""} likes</span>
              )}
            </div>
          </div>
        </div>

        {/* Render the article content */}
        <div className="prose max-w-none">
          <p>{contentWithoutImages}</p>
        </div>

        {/* Render the extracted image if available */}
        {contentImage && (
          <div className="mt-6">
            <Image
              src={contentImage}
              alt={article.title || ""}
              width={800}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
