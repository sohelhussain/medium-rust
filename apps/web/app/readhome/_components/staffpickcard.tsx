"use client"

import Image from "next/image";


export default function StaffPickCard({ article }:any) {
    console.log(`article: ${article}`);
    return (
      <div className="cursor-pointer">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 relative overflow-hidden rounded-full bg-gray-300 mr-2 shadow-md">
            <Image 
              sizes="(max-width: 768px) 100vw, 1200px"
              fill
              src={article.image || ''} 
              alt={article.title || ''}
              className="w-full h-full object-cover"
            />
          </div>
          {article.publication && (
            <span className="text-sm text-gray-700">In {article.publication || ''} by {article.author || ''}</span>
          )}
          {!article.publication && (
            <span className="text-sm text-gray-700">{article.author || ''}</span>
          )}
        </div>
        <h3 className="font-bold">{article.title || ''}</h3>
        <div className="text-sm text-gray-500 mt-1">{article.date || ''}</div>
      </div>
    );
  }