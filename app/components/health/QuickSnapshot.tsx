import { Sparkles } from 'lucide-react';

export default function QuickSnapshot({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="bg-[#0F172A] rounded-3xl p-8 md:p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/20 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
            <span className="bg-teal-500 text-white p-2 rounded-xl">
                <Sparkles size={20} className="fill-white" />
            </span>
            <h3 className="text-xl font-bold tracking-wide uppercase">Research Snapshot</h3>
        </div>
        
        <div 
            className="prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-strong:font-bold prose-li:marker:text-teal-400"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </div>
  );
}