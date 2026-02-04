"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Clock, Calendar, 
  ArrowLeft, Check, Loader2, ShieldCheck, Zap, User, Mail, Phone, FileText, ArrowRightCircle 
} from "lucide-react";

// --- CONFIGURATION ---
const CONFIG = {
  publicKey: "ykMzk7yOAMHR1Ip8o",
  serviceId: "service_bhpyljt",
  templateId: "template_vkr09eu",
  duration: "30 min",
  eventName: "Discovery Call"
};

const PAYMENT_CONFIG = {
  amount: "PKR 700",
  methodName: "JazzCash / EasyPaisa",
  accountTitle: "Muhammad Hashim",
  accountNumber: "03048862472",
  instruction: "Transfer the fee to confirm your slot."
};

interface BookingWidgetProps {
  doctorId: string;
  doctorName: string;
}

export default function BookingWidget({ doctorId, doctorName }: BookingWidgetProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    history: "",
    trxId: ""
  });

  const storageKey = `bookings_${doctorId}`; 

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setBookedSlots(JSON.parse(saved));
  }, [storageKey]);

  // --- HELPERS ---
  const changeMonth = (dir: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    return { daysInMonth, startOffset, year, month };
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 10; i <= 20; i++) { 
      let hour = i > 12 ? i - 12 : i;
      let ampm = i >= 12 ? 'pm' : 'am';
      slots.push(`${hour}:00${ampm}`);
      slots.push(`${hour}:30${ampm}`);
    }
    return slots;
  };

  // --- ANIMATION ---
  const nextStep = () => { setDirection(1); setStep(s => s + 1); };
  const prevStep = () => { setDirection(-1); setStep(s => s - 1); };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  // --- ACTIONS ---
  const handleDateClick = (day: number) => {
    const { year, month } = getDaysInMonth();
    setSelectedDate(new Date(year, month, day));
    nextStep();
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    nextStep();
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedDate || !selectedTime) return;

    try {
      await emailjs.send(CONFIG.serviceId, CONFIG.templateId, {
        from_name: formData.name,
        from_email: formData.email,
        booking_date: selectedDate.toDateString(),
        booking_time: selectedTime,
        doctor_name: doctorName,
        message: `History: ${formData.history} \n WhatsApp: ${formData.whatsapp} \n TrxID: ${formData.trxId}`
      }, CONFIG.publicKey);

      const slotKey = `${selectedDate.toDateString()}_${selectedTime}`;
      const newBooked = [...bookedSlots, slotKey];
      setBookedSlots(newBooked);
      localStorage.setItem(storageKey, JSON.stringify(newBooked));
      nextStep(); 
    } catch (err) {
      console.error(err);
      alert("Failed. Please check internet.");
    } finally {
      setLoading(false);
    }
  };

  // --- SIDEBAR SUMMARY COMPONENT ---
  const Sidebar = () => (
    <div className="bg-teal-950 text-white p-8 lg:w-[350px] shrink-0 flex flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 p-10 opacity-5"><ShieldCheck size={200} /></div>
        
        <div>
            <div className="flex items-center gap-2 mb-8 opacity-80">
                <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center font-bold">{step < 5 ? step : "✓"}</div>
                <span className="text-sm font-medium tracking-widest uppercase">Step {step < 5 ? step : 4} of 4</span>
            </div>

            <h2 className="text-3xl font-bold font-jakarta mb-2 leading-tight">
                {step === 1 ? "Pick a Date" : 
                 step === 2 ? "Select Time" : 
                 step === 3 ? "Your Details" : 
                 step === 4 ? "Payment" : "Confirmed"}
            </h2>
            <p className="text-teal-200/70 text-sm mb-12">
                Booking with <span className="text-white font-bold">{doctorName}</span>
            </p>

            {/* Live Summary */}
            <div className="space-y-6">
                <div className={`transition-opacity duration-500 ${selectedDate ? 'opacity-100' : 'opacity-30'}`}>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-teal-400 mb-1 block">Date</label>
                    <div className="flex items-center gap-3 text-lg font-medium">
                        <Calendar size={18} />
                        {selectedDate ? selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : "Not selected"}
                    </div>
                </div>
                
                <div className={`transition-opacity duration-500 ${selectedTime ? 'opacity-100' : 'opacity-30'}`}>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-teal-400 mb-1 block">Time</label>
                    <div className="flex items-center gap-3 text-lg font-medium">
                        <Clock size={18} />
                        {selectedTime || "Not selected"}
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full my-6"></div>
                
                <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-teal-400 mb-1 block">Price</label>
                    <div className="text-2xl font-bold text-white">{PAYMENT_CONFIG.amount}</div>
                </div>
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-teal-200/50 flex gap-2">
            <ShieldCheck size={14} /> Secure Booking via EmailJS
        </div>
    </div>
  );

  return (
    // MAIN CONTAINER: 1200px Width on Large Screens
    <div className="w-full lg:w-[1200px] mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[650px] border border-slate-100">
      
      {/* LEFT SIDEBAR (Summary) */}
      <Sidebar />

      {/* RIGHT CONTENT (Interactive) */}
      <div className="flex-1 relative bg-white flex flex-col">
        <div className="flex-1 p-8 lg:p-12 relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
            
            {/* STEP 1: CALENDAR */}
            {step === 1 && (
                <motion.div 
                key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 p-8 lg:p-12 flex flex-col h-full overflow-y-auto custom-scrollbar"
                >
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => changeMonth(-1)} className="p-3 hover:bg-slate-50 text-slate-600 rounded-full transition border border-slate-100"><ChevronLeft size={24}/></button>
                    <span className="font-bold text-slate-800 text-xl font-jakarta">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => changeMonth(1)} className="p-3 hover:bg-slate-50 text-slate-600 rounded-full transition border border-slate-100"><ChevronRight size={24}/></button>
                </div>

                <div className="grid grid-cols-7 mb-4 text-center">
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d} className="text-xs font-bold text-slate-400 py-2 uppercase tracking-wider">{d}</span>)}
                </div>

                <div className="grid grid-cols-7 gap-3 lg:gap-4 flex-1 content-start">
                    {Array.from({ length: getDaysInMonth().startOffset }).map((_, i) => <div key={`e-${i}`} />)}
                    {Array.from({ length: getDaysInMonth().daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isPast = date < new Date(new Date().setHours(0,0,0,0));
                    return (
                        <button key={day} disabled={isPast} onClick={() => handleDateClick(day)}
                        className={`
                            w-full aspect-square rounded-2xl flex items-center justify-center text-lg font-bold transition-all relative group
                            ${isPast ? 'text-slate-300 bg-slate-50' : 'bg-white border-2 border-slate-100 text-slate-700 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700'}
                        `}
                        >
                        {day}
                        </button>
                    );
                    })}
                </div>
                </motion.div>
            )}

            {/* STEP 2: TIME */}
            {step === 2 && (
                <motion.div 
                key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                className="absolute inset-0 p-8 lg:p-12 flex flex-col h-full overflow-y-auto custom-scrollbar"
                >
                <div className="flex items-center gap-3 mb-8">
                    <button onClick={prevStep} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowLeft size={20}/></button>
                    <h3 className="text-2xl font-bold text-slate-800 font-jakarta">Select a Time Slot</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {generateTimeSlots().map(time => {
                        const isBooked = bookedSlots.includes(`${selectedDate?.toDateString()}_${time}`);
                        if (isBooked) return null;
                        return (
                            <button key={time} onClick={() => handleTimeSelect(time)}
                                className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all group text-left"
                            >
                                <span className="font-bold text-slate-700 group-hover:text-teal-900 text-lg block">{time}</span>
                                <span className="text-xs text-slate-400 group-hover:text-teal-600">Available</span>
                            </button>
                        );
                    })}
                </div>
                </motion.div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 3 && (
                <motion.div 
                key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                className="absolute inset-0 p-8 lg:p-12 h-full overflow-y-auto custom-scrollbar"
                >
                <div className="flex items-center gap-3 mb-8">
                    <button onClick={prevStep} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowLeft size={20}/></button>
                    <h3 className="text-2xl font-bold text-slate-800 font-jakarta">Your Information</h3>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="grid md:grid-cols-2 gap-6">
                    <Input icon={<User size={18}/>} label="Full Name" value={formData.name} onChange={(v:any) => setFormData({...formData, name: v})} />
                    <Input icon={<Mail size={18}/>} label="Email Address" type="email" value={formData.email} onChange={(v:any) => setFormData({...formData, email: v})} />
                    <Input icon={<Phone size={18}/>} label="WhatsApp Number" placeholder="+92 300..." value={formData.whatsapp} onChange={(v:any) => setFormData({...formData, whatsapp: v})} />
                    
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 flex items-center gap-2"><FileText size={14}/> Brief History</label>
                        <textarea required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition" rows={4}
                            value={formData.history} onChange={e => setFormData({...formData, history: e.target.value})} />
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button className="w-full py-5 bg-teal-950 text-white font-bold rounded-2xl hover:bg-teal-900 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-teal-900/10">
                        Continue to Payment <ArrowRightCircle size={20} />
                        </button>
                    </div>
                </form>
                </motion.div>
            )}

            {/* STEP 4: PAYMENT */}
            {step === 4 && (
                <motion.div 
                key="step4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                className="absolute inset-0 p-8 lg:p-12 flex flex-col h-full overflow-y-auto custom-scrollbar"
                >
                <div className="flex items-center gap-3 mb-8">
                    <button onClick={prevStep} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowLeft size={20}/></button>
                    <h3 className="text-2xl font-bold text-slate-800 font-jakarta">Complete Payment</h3>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-slate-900"><Zap size={100} /></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Amount</p>
                            <div className="text-4xl font-bold text-slate-900">{PAYMENT_CONFIG.amount}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <p className="text-xs text-slate-400 mb-1">Send to ({PAYMENT_CONFIG.methodName})</p>
                            <div className="text-xl font-mono font-bold text-slate-800 tracking-wider select-all">{PAYMENT_CONFIG.accountNumber}</div>
                            <p className="text-xs text-slate-500 mt-1">{PAYMENT_CONFIG.accountTitle}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submitBooking} className="mt-auto space-y-6 max-w-lg mx-auto w-full">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Enter Transaction ID (Trx ID)</label>
                        <input required placeholder="e.g. 837482..." className="w-full p-5 bg-white rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition font-mono text-lg tracking-widest text-center"
                        value={formData.trxId} onChange={e => setFormData({...formData, trxId: e.target.value})} />
                    </div>

                    <button disabled={loading} className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 text-lg">
                        {loading ? <Loader2 className="animate-spin" /> : "Verify & Confirm Booking"}
                    </button>
                </form>
                </motion.div>
            )}

            {/* STEP 5: SUCCESS */}
            {step === 5 && (
                <motion.div 
                key="step5" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center bg-white"
                >
                <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-sm">
                    <Check size={64} className="text-green-500" strokeWidth={4} />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4 font-jakarta">Booking Request Sent!</h2>
                <p className="text-slate-500 mb-10 text-lg leading-relaxed max-w-md">
                    We have received your payment details. <br/>
                    Our team will verify the transaction and confirm your appointment via WhatsApp shortly.
                </p>
                <button onClick={() => { setStep(1); setSelectedTime(null); setSelectedDate(null); }} className="px-10 py-4 bg-slate-100 text-slate-700 rounded-full font-bold hover:bg-slate-200 transition">
                    Book Another Slot
                </button>
                </motion.div>
            )}

            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, value, onChange, type = "text", placeholder = "", icon }: any) => (
  <div>
    <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 flex items-center gap-2">
        {icon} {label}
    </label>
    <input required type={type} placeholder={placeholder} 
      className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition"
      value={value} onChange={e => onChange(e.target.value)} />
  </div>
);