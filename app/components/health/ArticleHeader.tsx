import { BadgeCheck, Calendar, User, Stethoscope } from 'lucide-react';

interface ArticleHeaderProps {
  category: string;
  title: string;
  description: string;
  author: string;
  medicalReviewer: string;
  date: string;
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

export default function ArticleHeader({ category, title, description, author, medicalReviewer, date }: ArticleHeaderProps) {
  return (
    <header className="container mx-auto px-4 max-w-6xl mb-12">
      {/* Breadcrumb / Category Tag */}
      <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6">
        <span className="bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
          {category.replace(/-/g, ' ')}
        </span>
        <span className="text-slate-300">•</span>
        <span>Research Report</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] font-jakarta">
        {title}
      </h1>

      <p className="text-xl text-slate-500 max-w-3xl mb-10 leading-relaxed font-medium">
        {description}
      </p>

      {/* Trust Signal Bar */}
      <div className="flex flex-wrap items-center gap-y-4 gap-x-8 border-y border-slate-100 py-5">
        
        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
            <User size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Written By</p>
            <p className="text-sm font-bold text-slate-900">{author}</p>
          </div>
        </div>

        {/* Medical Reviewer */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <Stethoscope size={18} />
          </div>
          <div>
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-wide flex items-center gap-1">
              Medically Reviewed <BadgeCheck size={12} />
            </p>
            <p className="text-sm font-bold text-slate-900 capitalize">
              {medicalReviewer.replace(/-/g, ' ')}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-slate-400 text-sm ml-auto font-medium">
          <Calendar size={16} />
          <span>Updated {formatDate(date)}</span>
        </div>
      </div>
    </header>
  );
}