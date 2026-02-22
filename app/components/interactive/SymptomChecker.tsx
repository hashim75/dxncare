"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, ChevronRight, ArrowLeft, Search, 
  X, Check, RefreshCcw, UserCheck, AlertCircle 
} from "lucide-react";
import Link from "next/link";
import rawDiseaseData from "../../data/diseases.json"; 

// --- TYPES ---
interface DetailedSymptoms { [key: string]: string[]; }
interface Disease { name: string; category: string; detailed_symptoms: DetailedSymptoms; }
interface DiseaseDatabase { diseases: Disease[]; }

const diseaseData = rawDiseaseData as unknown as DiseaseDatabase;

// 10 Major diseases and symptoms for quick selection
const MAJOR_PRESETS = [
  { name: "Common cold", cat: "Infectious - viral" },
  { name: "Typhoid fever", cat: "Infectious - bacterial" },
  { name: "Malaria", cat: "Infectious - parasitic" },
  { name: "Dengue fever", cat: "Infectious - viral" },
  { name: "Diabetes", cat: "Chronic - endocrine/metabolic" },
  { name: "Hypertension", cat: "Chronic - cardiovascular" },
  { name: "Asthma", cat: "Chronic - respiratory" },
  { name: "Migraine", cat: "Neurologic - primary headache" },
  { name: "Acidity", cat: "Gastrointestinal" },
  { name: "Joint Pain", cat: "Chronic - musculoskeletal" }
];

const DOCTOR_MAP: any = {
  "Infectious": { name: "Dr. Muhammad Qasim", slug: "dr-muhammad-qasim" },
  "Chronic": { name: "Dr. Muhammad Iqbal", slug: "dr-muhammad-iqbal" },
  "Neurological": { name: "Dr. Ali Amjad", slug: "dr-ali-amjad" },
  "Gastrointestinal": { name: "Dr. Muhammad Qasim", slug: "dr-muhammad-qasim" },
  "Dermatologic": { name: "Dr. Maham Fatima", slug: "dr-maham-fatima" },
  "default": { name: "Dr. Muhammad Qasim", slug: "dr-muhammad-qasim" }
};

export default function SymptomChecker() {
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState<Disease[]>([]);
  const [duration, setDuration] = useState("");

  // --- MULTI-SELECT DATABASE SEARCH ---
  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return [];

    return diseaseData.diseases.filter((d) => {
      const nameMatch = d.name.toLowerCase().includes(q);
      const symptomMatch = Object.values(d.detailed_symptoms).flat().some(s => s.toLowerCase().includes(q));
      const alreadySelected = selectedDiseases.some(sel => sel.name === d.name);
      return (nameMatch || symptomMatch) && !alreadySelected;
    }).slice(0, 5);
  }, [query, selectedDiseases]);

  // FIXED: Safe Add logic to prevent the "includes" error
  const addDisease = (selection: any) => {
    const fullDisease = diseaseData.diseases.find(d => 
      d.name.toLowerCase().includes(selection.name.toLowerCase())
    );
    
    const diseaseToAdd = fullDisease || selection;

    if (!selectedDiseases.some(sel => sel.name === diseaseToAdd.name)) {
        setSelectedDiseases([...selectedDiseases, diseaseToAdd]);
    }
    setQuery("");
  };

  const removeDisease = (name: string) => {
    setSelectedDiseases(selectedDiseases.filter(d => d.name !== name));
  };

  // FIXED: Safe Recommendation logic with optional chaining
  const getFinalRecommendation = () => {
    if (selectedDiseases.length === 0) return DOCTOR_MAP.default;
    
    const primaryCat = selectedDiseases[0]?.category || "";
    const key = Object.keys(DOCTOR_MAP).find(k => primaryCat?.includes(k)) || "default";
    
    return DOCTOR_MAP[key];
  };

  const rec = getFinalRecommendation();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-visible relative z-10">
      <div className="flex flex-col md:flex-row min-h-[550px]">
        
        {/* Sidebar */}
        <div className="bg-teal-950 p-8 text-white md:w-1/3 flex flex-col justify-between rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-tr-none">
          <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 border border-teal-500/30">
              <Stethoscope className="text-teal-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold font-jakarta mb-4">Health Triage</h2>
            <p className="text-teal-100/60 text-sm leading-relaxed">
              Search or select your symptoms for a comprehensive specialist match.
            </p>
          </div>
          <div className="mt-8 flex gap-2 justify-center md:justify-start">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-teal-400' : 'w-2 bg-teal-800'}`} />
            ))}
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="p-8 md:p-12 md:w-2/3 flex flex-col relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="step1" className="flex flex-col h-full">
                <h3 className="text-2xl font-bold text-teal-950 mb-6 font-jakarta">Step 1: Search & Select</h3>
                
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-4 text-slate-400" size={20} />
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    placeholder="Search symptoms or diseases..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-100 rounded-2xl mt-2 shadow-2xl z-50 overflow-hidden">
                      {searchResults.map((item) => (
                        <button 
                          key={item.name}
                          onClick={() => addDisease(item)}
                          className="w-full p-4 text-left hover:bg-teal-50 flex items-center justify-between border-b border-slate-50 last:border-0"
                        >
                          <div>
                            <p className="font-bold text-teal-950 text-sm">{item.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.category}</p>
                          </div>
                          <Check size={14} className="text-teal-500" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 10 MAJOR PRESET TAGS */}
                <div className="mb-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Major Symptoms & Conditions</p>
                    <div className="flex flex-wrap gap-2">
                        {MAJOR_PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => addDisease(preset)}
                                className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                                    selectedDiseases.some(d => d.name.toLowerCase().includes(preset.name.toLowerCase()))
                                    ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                                }`}
                            >
                                {preset.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SELECTED ITEMS DISPLAY */}
                {selectedDiseases.length > 0 && (
                    <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Your Selection</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedDiseases.map((d) => (
                                <span key={d.name} className="bg-white text-teal-700 px-3 py-2 rounded-xl text-xs font-bold border border-teal-100 flex items-center gap-2 shadow-sm animate-in zoom-in-90">
                                    {d.name} <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeDisease(d.name)} />
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <button 
                  disabled={selectedDiseases.length === 0}
                  onClick={() => setStep(2)}
                  className="mt-auto w-full py-4 bg-teal-950 text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-30 transition-all hover:bg-teal-800"
                >
                  Confirm Selections <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="step2">
                <button onClick={() => setStep(1)} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-teal-600 text-xs font-bold transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <h3 className="text-2xl font-bold text-teal-950 mb-6 font-jakarta">Step 2: Duration</h3>
                <div className="grid gap-4">
                  {["A few days", "1 - 4 weeks", "Chronic (3+ Months)"].map((d) => (
                    <button 
                      key={d}
                      onClick={() => { setDuration(d); setStep(3); }}
                      className="w-full p-6 text-left rounded-2xl border border-slate-100 bg-slate-50 hover:border-teal-50 hover:bg-white transition-all font-bold text-teal-950 flex justify-between items-center group"
                    >
                      {d} <ChevronRight className="opacity-0 group-hover:opacity-100 text-teal-500 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} key="step3" className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <UserCheck size={32} />
                </div>
                <h4 className="text-2xl font-bold text-teal-950 mb-1">{rec?.name}</h4>
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-6">Recommended Specialist</p>
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 mb-8 text-xs text-yellow-900 leading-relaxed text-left">
                  <AlertCircle className="inline mr-2" size={14} />
                  Based on your selection of <strong>{selectedDiseases.map(d => d.name).join(', ')}</strong> over a period of <strong>{duration}</strong>, we recommend a priority consultation.
                </div>
                <Link href={`/doctors/${rec?.slug}`} className="w-full py-4 bg-teal-950 text-white rounded-xl font-bold shadow-lg text-center hover:bg-teal-800 transition-colors">
                  Lock Appointment
                </Link>
                <button onClick={() => { setStep(1); setSelectedDiseases([]); }} className="mt-4 text-slate-400 text-xs font-bold underline">Restart</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}