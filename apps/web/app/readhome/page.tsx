"use client"



import { useState } from 'react';
import { Search, Heart, MessageCircle, Bookmark, MoreHorizontal, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Mock data for articles
const articles = [
  {
    id: '1',
    title: 'Love Is Not a Feeling',
    subtitle: "It's a way of being in the world",
    author: 'Pierz Newton-John',
    publication: 'Thought Thinkers',
    date: 'Apr 26',
    likes: '1.1K',
    comments: '33',
    image: '/api/placeholder/150/100',
    verified: true
  },
  {
    id: '2',
    title: 'My Favourite Software Architecture Patterns',
    subtitle: 'Exploring my most loved Software Architecture patterns and their practical applications.',
    author: 'Matt Bentley',
    publication: 'Level Up Coding',
    date: 'Nov 12, 2024',
    likes: '5.8K',
    comments: '116',
    image: '/api/placeholder/150/100'
  },
  {
    id: '3',
    title: 'I Didn\'t Know These Common Habits Were Signs of Mental Health Issues',
    subtitle: 'These everyday habits felt harmless, until I learned they were quiet signs my mind was asking for help.',
    author: 'Shaant',
    publication: 'Long After the Thrill',
    date: 'Apr 20',
    likes: '3.2K',
    comments: '78',
    image: '/api/placeholder/150/100'
  }
];

// Staff picks data
const staffPicks = [
  {
    id: '4',
    title: 'Can You Spot Fake News? Many Can\'t When Scored on a Validated Test',
    author: 'Andrea Romeo RN, BN',
    publication: 'Wise & Well',
    date: 'Apr 18'
  },
  {
    id: '5',
    title: 'I worked for Pope Francis. Here is what he was really like.',
    author: 'Daniel B. Gallagher',
    date: 'Apr 22'
  },
  {
    id: '6',
    title: 'My Notes App Is a Beautiful Mess of Creativity and Chaos',
    author: 'Vaibhavi Naik',
    date: 'Apr 17'
  }
];

// Topic tags
const topics = [
  'Data Science',
  'Self Improvement',
  'Writing',
  'Relationships',
  'Cryptocurrency',
  'Politics',
  'Productivity'
];

export default function MediumBlog() {
  const [selectedArticle, setSelectedArticle] = useState<null | any>(null);
  
  // Function to handle article click
  const handleArticleClick = (articleId:any) => {
    // In a real application, this would navigate to the article page
    // For this demo, we'll just display which article was clicked
    const article = [...articles, ...staffPicks].find(a => a.id === articleId);
    setSelectedArticle(article);    
  };
  
  // Function to go back to main feed
  const handleBackToFeed = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-white">
      {selectedArticle ? (
        <ArticleView article={selectedArticle} onBack={handleBackToFeed} />
      ) : (
        <MainFeed 
          articles={articles} 
          staffPicks={staffPicks} 
          topics={topics} 
          onArticleClick={handleArticleClick} 
        />
      )}
    </div>
  );
}

// Main feed component
function MainFeed({ articles, staffPicks, topics, onArticleClick }:any) {

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 p-4 border-r border-gray-200">
        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b border-gray-200 mb-6">
          <div className="text-2xl font-bold">Medium</div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>
            <Link href="/create-article" className="px-4 py-2 border border-gray-800 rounded-full hover:bg-gray-100 hidden md:block">
              Write
            </Link>
            <div className="w-8 h-8 rounded-full bg-gray-300">
                {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="User avatar" fill className="h-full w-full object-cover" /> */}
            </div>
          </div>
        </header>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-6 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button className="py-2 border-b-2 border-gray-800 font-medium">For you</button>
          <button className="py-2 text-gray-500">Following</button>
          <button className="py-2 text-gray-500 flex items-center">
            Featured <span className="ml-1 text-xs bg-green-600 text-white px-1 rounded">New</span>
          </button>
          <button className="py-2 text-gray-500">Typescript</button>
          <button className="py-2 text-gray-500">Docker</button>
          <button className="py-2 text-gray-500">Ethereum</button>
          <button className="py-2 text-gray-500">DevOps</button>
          <ChevronRight className="w-6 h-6 text-gray-500" />
        </div>
        
        {/* Articles Feed */}
        <div className="space-y-10">
          {articles.map((article: any) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => onArticleClick(article.id)} 
            />
          ))}
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="w-full md:w-1/4 p-4">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Staff Picks</h2>
          <div className="space-y-6">
            {staffPicks.map((article: any) => (
              <StaffPickCard 
                key={article.id} 
                article={article} 
                onClick={() => onArticleClick(article.id)} 
              />
            ))}
          </div>
          <button className="text-green-600 text-sm mt-4 hover:underline">
            See the full list
          </button>
        </div>
        
        <div>
          <h2 className="text-lg font-bold mb-4">Recommended topics</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic: any) => (
              <button 
                key={topic} 
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Article card component
function ArticleCard({ article, onClick }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 cursor-pointer" onClick={onClick}>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm text-gray-700">In {article.publication} by {article.author}</span>
          {article.verified && <span className="ml-1 text-blue-500">✓</span>}
        </div>
        <h2 className="text-xl font-bold mb-1">{article.title}</h2>
        <p className="text-gray-700 mb-3">{article.subtitle}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>{article.date}</span>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-1" /> 
            <span>{article.likes}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" /> 
            <span>{article.comments}</span>
          </div>
          <div className="flex-grow"></div>
          <button><Bookmark className="w-5 h-5" /></button>
          <button><MoreHorizontal className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="w-full md:w-40 h-24 flex-shrink-0">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
}

// Staff pick card component
function StaffPickCard({ article, onClick }:any) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
        {article.publication && (
          <span className="text-sm text-gray-700">In {article.publication} by {article.author}</span>
        )}
        {!article.publication && (
          <span className="text-sm text-gray-700">{article.author}</span>
        )}
      </div>
      <h3 className="font-bold">{article.title}</h3>
      <div className="text-sm text-gray-500 mt-1">{article.date}</div>
    </div>
  );
}

// Article view component
function ArticleView({ article, onBack }:any) {
  return (
    <div className="p-4">
      <button 
        onClick={onBack} 
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <span className="mr-2">←</span> Back to feed
      </button>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        {article.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
        )}
        
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
          <div>
            <div className="font-medium">{article.author}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <span>{article.date}</span>
              {article.likes && (
                <span className="ml-3">• {article.likes} likes</span>
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