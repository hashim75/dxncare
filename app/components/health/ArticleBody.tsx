"use client";

import { motion } from 'framer-motion';

export default function ArticleBody({ content }: { content: string }) {
  if (!content) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="prose prose-lg md:prose-xl prose-slate max-w-none 
        
        /* Typography Basics */
        prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-6
        prose-strong:text-teal-900 prose-strong:font-bold
        
        /* Headings - Serif & Authority */
        prose-headings:font-serif prose-headings:font-medium prose-headings:text-slate-900 
        prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
        prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:text-teal-900
        prose-h4:text-xl prose-h4:font-bold prose-h4:text-slate-800 prose-h4:mt-8

        /* Links */
        prose-a:text-teal-600 prose-a:font-bold prose-a:no-underline 
        prose-a:border-b-2 prose-a:border-teal-200 hover:prose-a:border-teal-600 prose-a:transition-colors

        /* Lists */
        prose-ul:my-6 prose-li:my-2 prose-li:text-slate-600
        prose-li:marker:text-teal-500

        /* Images (handled by markdown) */
        prose-img:rounded-3xl prose-img:shadow-xl prose-img:shadow-slate-200/50 prose-img:my-12 prose-img:w-full

        /* Blockquotes */
        prose-blockquote:border-l-4 prose-blockquote:border-teal-500 
        prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 
        prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-700 prose-blockquote:font-serif prose-blockquote:italic"
      
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}