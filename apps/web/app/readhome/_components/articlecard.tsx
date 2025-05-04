'use client'

import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";

// Function to extract the first image URL from Markdown content
function extractFirstImageUrl(markdown: string): string | null {
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = regex.exec(markdown);
  return match && match[1] !== undefined ? match[1] : null;
}

// Article card component
export default function ArticleCard({ article, onClick }: any) {
  const topicsWithSentences = {
    "Artificial Intelligence": [
      "AI is transforming the future of work.",
      "Machine learning models are only as good as the data they are trained on.",
      "Ethical concerns about AI are growing every day."
    ],
    "Health & Wellness": [
      "Daily meditation can improve your mental clarity.",
      "Hydration is essential for maintaining energy levels.",
      "Sleep is just as important as exercise and nutrition."
    ],
    "Technology": [
      "Quantum computing could revolutionize cybersecurity.",
      "5G is set to reshape mobile internet experiences.",
      "Blockchain is more than just cryptocurrency."
    ],
    "Productivity": [
      "The Pomodoro Technique helps fight procrastination.",
      "Task batching can make you more efficient.",
      "Starting your day with a plan boosts focus."
    ],
    "Finance": [
      "Diversifying your investments reduces risk.",
      "Understanding compound interest is key to wealth-building.",
      "Cryptocurrency volatility remains a challenge for investors."
    ]
  };

  function getRandomTopicAndSentence() {
    const topics = Object.keys(topicsWithSentences);
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const sentences = randomTopic && randomTopic in topicsWithSentences ? topicsWithSentences[randomTopic as keyof typeof topicsWithSentences] : [];
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  
    return { topic: randomTopic, sentence: randomSentence };
  }

  const subtitle = getRandomTopicAndSentence();

  // Extract image from content if not provided
  const contentImage = extractFirstImageUrl(article.content || '');
  const imageUrl = article.image || contentImage || 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww';

  return (
    <div className="flex flex-col md:flex-row gap-4 cursor-pointer" onClick={onClick}>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full relative overflow-hidden bg-gray-300 mr-2 shadow-md">
            <Image 
              sizes="(max-width: 768px) 100vw, 1200px"
              fill
              src={imageUrl} 
              alt={article.title || ''}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-gray-700">In {article.publication || 'medium'} by {article.author || 'sohel'}</span>
          {article.verified && <span className="ml-1 text-blue-500">✓</span>}
        </div>
        <h2 className="text-xl font-bold mb-1">{article.title || ''}</h2>
        <p className="text-gray-700 font-serif mb-3">{article.subtitle || subtitle.sentence}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>{article.date || ''}</span>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-1" /> 
            <span>{article.likes || ''}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" /> 
            <span>{article.comments || ''}</span>
          </div>
          <div className="flex-grow"></div>
          <button><Bookmark className="w-5 h-5" /></button>
          <button><MoreHorizontal className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="w-full relative rounded-md overflow-hidden md:w-40 h-24 flex-shrink-0">
        <Image
          sizes="(max-width: 768px) 100vw, 1200px"
          fill 
          src={imageUrl} 
          alt={article.title || ''}
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
}
