"use client"

import React from 'react';
import Head from 'next/head';
import { useState } from 'react';
import { Bell } from 'lucide-react';
import axios from 'axios';

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function MediumEditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('Tell your story...');
  const editor = useCreateBlockNote();
  const router = useRouter();

  const handlePublish = async () => {
    try {
      const blocks = await editor.blocksToMarkdownLossy(); // using the correct method
      const response = await axios.post('http://localhost:4000/articles', {
        title,
        content: blocks,
      });
      console.log('Published:', response.data);
      toast.success('Article published successfully!');
      router.push('/readhome');
    } catch (error) {
      console.error('Error publishing article:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white">
      <Head>
        <title>Medium - Write your story</title>
        <meta name="description" content="Medium editor interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">Medium</h1>
            <span className="text-gray-400 text-sm">Draft document</span>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button onClick={handlePublish} className="bg-green-200 text-gray-800 rounded-full px-4 py-1 text-sm font-medium hover:bg-green-300">
              Publish
            </button>
            <button className="text-gray-400 hover:text-gray-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-200">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="User avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      {/* Editor Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-5xl font-serif text-gray-300 w-full outline-none border-none"
            placeholder="Title"
          />
        </div>

        <BlockNoteView editor={editor} />

      </div>
    </div>
  );
}