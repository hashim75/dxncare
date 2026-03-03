"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, CalendarCheck, BadgeCheck, ChevronDown, X } from "lucide-react";

// --- CUSTOM PRIORITY SORTING ---
// Assigns a rank to pin specific doctors to the top
const getPriority = (doc: any) => {
  const name = doc.name?.toLowerCase() || "";
  if (name.includes("muhammad iqbal")) return 1;
  if (name.includes("qasim iqbal")) return 2;
  if (name.includes("rabia iqbal")) return 3;
  if (name.includes("zikria") || name.includes("zikriya")) return 4;
  return 99; // Default rank for all other doctors
};

export default function DoctorDirectory({ doctors }: { doctors: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Automatically extract all unique SERVICES from the doctors' data
  const allServices = useMemo(() => {
    const servicesSet = new Set<string>();
    
    doctors.forEach((doc) => {
      if (Array.isArray(doc.services)) {
        doc.services.forEach((service: string) => {
          if (service.trim()) servicesSet.add(service.trim());
        });
      }
    });

    return Array.from(servicesSet).sort();
  }, [doctors]);

  // Toggle a service selection
  const toggleService = (service: string) => {
    setSelectedServices((prev) => 
      prev.includes(service) 
        ? prev.filter((s) => s !== service) 
        : [...prev, service]
    );
  };

  // Clear a specific service from pills
  const removeService = (service: string) => {
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };

  // 2. Filter & Sort logic
  const filteredDoctors = useMemo(() => {
    // A. Filter the doctors first
    const filtered = doctors.filter((doc) => {
      const searchLower = searchQuery.toLowerCase();
      
      // Match Search input (checks name, category, specialization, and services)
      const matchesSearch = 
        doc.name?.toLowerCase().includes(searchLower) || 
        doc.specialization?.toLowerCase().includes(searchLower) ||
        doc.category?.toLowerCase().includes(searchLower) ||
        (Array.isArray(doc.services) && doc.services.some((s: string) => s.toLowerCase().includes(searchLower)));

      // Match Multiple Services (Doctor must have AT LEAST ONE of the selected services)
      let matchesServices = true;
      if (selectedServices.length > 0) {
        if (Array.isArray(doc.services)) {
          matchesServices = selectedServices.some((selected) => doc.services.includes(selected));
        } else {
          matchesServices = false;
        }
      }

      return matchesSearch && matchesServices;
    });

    // B. Sort the filtered doctors based on our custom priority
    return filtered.sort((a, b) => getPriority(a) - getPriority(b));
    
  }, [doctors, searchQuery, selectedServices]);

  return (
    <div className="w-full">
      
      {/* --- SEARCH & MULTI-FILTER BAR --- */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col gap-4">
        
        <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Search size={20} />
            </div>
            <input
                type="text"
                placeholder="Search by name, specialty, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
            />
            </div>

            {/* Custom Multi-Select Dropdown for Services */}
            <div className="relative md:w-80 shrink-0" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium flex items-center justify-between"
                >
                    <div className="flex items-center gap-2 text-slate-600">
                        <Filter size={20} />
                        <span className="truncate">
                            {selectedServices.length > 0 
                                ? `${selectedServices.length} Service(s) Selected` 
                                : "Filter by Services"}
                        </span>
                    </div>
                    <ChevronDown size={20} className={`text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 top-full mt-2 left-0 w-full md:w-[400px] right-auto md:right-0 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 max-h-[350px] overflow-y-auto"
                        >
                            {allServices.length > 0 ? (
                                allServices.map((service) => (
                                    <label key={service} className="flex items-start gap-3 p-3 hover:bg-slate-50 cursor-pointer rounded-xl transition-colors group">
                                        <div className="relative flex items-center mt-0.5 shrink-0">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedServices.includes(service)}
                                                onChange={() => toggleService(service)}
                                                className="peer w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-teal-500 checked:border-teal-500 transition-colors cursor-pointer"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-sm text-slate-700 leading-tight group-hover:text-teal-900">{service}</span>
                                    </label>
                                ))
                            ) : (
                                <p className="p-4 text-sm text-slate-500 text-center">No services found.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Selected Services Active Pills */}
        {selectedServices.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                {selectedServices.map((service) => (
                    <span key={service} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-100 text-teal-800 rounded-lg text-xs font-medium shadow-sm">
                        <span className="max-w-[200px] truncate" title={service}>{service}</span>
                        <button 
                            onClick={() => removeService(service)} 
                            className="p-0.5 hover:bg-teal-200 rounded-full transition-colors text-teal-600"
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
                <button 
                    onClick={() => setSelectedServices([])}
                    className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors px-2 underline underline-offset-2"
                >
                    Clear All
                </button>
            </div>
        )}

      </div>

      {/* --- DOCTORS GRID --- */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={doc.id}
                className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-teal-200 hover:shadow-teal-900/5 transition-all flex flex-col items-center text-center relative"
              >
                {/* Status Indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </div>

                {/* Profile Image */}
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm mb-4 relative shrink-0">
                  <Image
                    src={doc.profile_image || doc.image || "/images/placeholder-doctor.jpg"}
                    alt={doc.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name & Specialization */}
                <h3 className="text-xl font-bold text-slate-900 font-jakarta flex items-center justify-center gap-1">
                  {doc.name}
                  {doc.plan_tier === "paid" || doc.plan_tier === "premium" ? (
                    <BadgeCheck size={18} className="text-blue-500 shrink-0" />
                  ) : null}
                </h3>
                
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mt-1 mb-4 truncate w-full px-2">
                  {doc.category || doc.specialization?.split(',')[0]}
                </p>

                {/* 2-Line Short Description */}
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-8 flex-1">
                  {doc.short_description}
                </p>

                {/* Book Button */}
                <Link
                  href={`/doctors/${doc.slug || doc.id}`}
                  className="w-full bg-teal-950 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-800 transition-colors shadow-lg shadow-teal-950/20 active:scale-95"
                >
                  <CalendarCheck size={18} /> Book Appointment
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
              <Filter size={40} className="mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-bold text-slate-700">No doctors found</p>
              <p className="text-sm">Try adjusting your search or services filter.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}