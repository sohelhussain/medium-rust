"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";  // Import `useParams` and `useRouter` from 'next/navigation'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReadArticle({ onBack }: any) {
  const [article, setArticle] = useState<any>(null);
  const { articleId } = useParams(); // Destructure the articleId from `useParams` to fetch the article
  const router = useRouter(); // Get the `router` object for navigating

  useEffect(() => {
    // Ensure articleId exists before making the API call
    if (articleId) {
      async function fetchArticle() {
        try {
          const response = await axios(`http://localhost:4000/articles/${articleId}`);
          setArticle(response.data);
        } catch (error) {
          toast.error('Error fetching article');
        }
      }
      fetchArticle();
    }
  }, [articleId]);  // Include articleId in the dependency array

  // If the article isn't loaded, show loading
  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {/* Use `router.back()` to navigate back */}
      <button 
        onClick={() => router.back()} 
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <span className="mr-2">←</span> Back to feed
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{article?.title || ''}</h1>
        {article?.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{article?.subtitle || ''}</p>
        )}

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-yellow-300 mr-3"></div>
          <div>
            <div className="font-medium">{article?.author || ''}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <span>{article.date}</span>
              {article.likes && (
                <span className="ml-3">• {article.likes || ''} likes</span>
              )}
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <p>This is where the article content would appear. In a real application, this would be the full content of the article retrieved from a database or API.</p>
          <p>The article with ID {article.id} was selected.</p>

          <h2>Example heading in the article</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  );
}
