import React from 'react';

export default function HealthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-900">
      {/* You could add a specific 'Health Hub' sub-navigation here if needed */}
      <div className="w-full h-2 bg-gradient-to-r from-teal-500 via-green-400 to-teal-500"></div>
      
      {children}
      
      {/* Trust Footer for Health Section */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            <strong>Editorial Policy:</strong> Our health content is evidence-based, medically reviewed, and updated regularly. We reference academic research and clinical studies to ensure accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}