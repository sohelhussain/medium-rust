"use client"


import { Search, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ArticleCard from './_components/articlecard';
import Link from 'next/link';
import StaffPickCard from './_components/staffpickcard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function MediumBlog() {
  const router = useRouter();


  // Mock data for articles
// const articles = [
//   {
//     id: '1',
//     title: 'Love Is Not a Feeling',
//     subtitle: "It's a way of being in the world",
//     author: 'Pierz Newton-John',
//     publication: 'Thought Thinkers',
//     date: 'Apr 26',
//     likes: '1.1K',
//     comments: '33',
//     image: 'https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     verified: true
//   },
//   {
//     id: '2',
//     title: 'My Favourite Software Architecture Patterns',
//     subtitle: 'Exploring my most loved Software Architecture patterns and their practical applications.',
//     author: 'Matt Bentley',
//     publication: 'Level Up Coding',
//     date: 'Nov 12, 2024',
//     likes: '5.8K',
//     comments: '116',
//     image: 'https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//   },
//   {
//     id: '3',
//     title: 'I Didn\'t Know These Common Habits Were Signs of Mental Health Issues',
//     subtitle: 'These everyday habits felt harmless, until I learned they were quiet signs my mind was asking for help.',
//     author: 'Shaant',
//     publication: 'Long After the Thrill',
//     date: 'Apr 20',
//     likes: '3.2K',
//     comments: '78',
//     image: 'https://images.unsplash.com/photo-1623908277264-f123c5d7d441?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//   }
// ];

// Staff picks data
const staffPicks = [
  {
    id: '4',
    title: 'Can You Spot Fake News? Many Can\'t When Scored on a Validated Test',
    author: 'Andrea Romeo RN, BN',
    publication: 'Wise & Well',
    date: 'Apr 18',
    image: 'https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // image: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=2417&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '5',
    title: 'I worked for Pope Francis. Here is what he was really like.',
    author: 'Daniel B. Gallagher',
    date: 'Apr 22',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfDB8MHx8fDA%3D'
  },
  {
    id: '6',
    title: 'My Notes App Is a Beautiful Mess of Creativity and Chaos',
    author: 'Vaibhavi Naik',
    date: 'Apr 17',
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8MHwwfHx8MA%3D%3D'
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

const [articles, setArticles] = useState<{ id: string; [key: string]: any }[]>([]);

useEffect(() => {
  async function fetchArticles() {
    try {
      const response = await axios.get('http://localhost:4000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }
  fetchArticles();
}, []);

const handleNavigation = () => {
  if (router && typeof router.push === 'function') {
    const firstArticle = articles[0];
    if (firstArticle && firstArticle.id) {
      router.push(`/readhome/${firstArticle.id}`);
    } else {
      console.error('No articles available or missing id');
    }
  } else {
    console.error('router.push is not a function');
  }
};

const handleNavigationHome = () => {
  router.push('/');
}


  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 p-4 border-r border-gray-200">
        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b border-gray-200 mb-6">
          <div onClick={handleNavigationHome} className="text-2xl font-bold cursor-pointer">Medium</div>
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
            <div className="w-8 h-8 rounded-full relative overflow-hidden bg-gray-300 shadow-md">
                <Image sizes='(max-width: 768px) 100vw, 1200px' src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="User avatar" fill className="h-full w-full object-cover" />
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
              onClick={() => router.push(`/readhome/${article.id}`)}
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




