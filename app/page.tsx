"use client";

import { Cross, Users, Zap, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFCFB]">
      {/* Left side - Dynamic Brand Section */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#634832] overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-stone-900/20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-10 shadow-2xl">
            <Cross size={32} className="text-stone-100" />
          </div>
          
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Ministry <br /> 
            <span className="text-stone-300">Management</span>
          </h1>
          
          <p className="text-xl text-stone-200/90 max-w-md leading-relaxed mb-12">
            A professional ecosystem to track evangelism, manage discipleship, and monitor the spiritual growth of your community.
          </p>

          {/* Stats Grid with Glassmorphism */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-transform hover:scale-105">
              <p className="text-3xl font-bold">1.2k</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mt-1">Souls Won</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-transform hover:scale-105">
              <p className="text-3xl font-bold">94%</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mt-1">Retention</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-transform hover:scale-105">
              <p className="text-3xl font-bold">48</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mt-1">Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - CTA & Features */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="max-w-md w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">Now Active for Ministry Teams</span>
          </div>

          <h2 className="text-4xl font-extrabold text-stone-900 mb-6 tracking-tight">
            Built for the Great Commission.
          </h2>

          <p className="text-stone-500 mb-10 leading-relaxed">
            Standardize your follow-up process and ensure no soul is left behind. Experience data-driven ministry management.
          </p>

          {/* Feature List - Professional Style */}
          <div className="space-y-4 mb-10">
            {[
              { 
                title: "Evangelism Tracking", 
                desc: "Real-time logging of field activities and souls reached.", 
                icon: <Zap size={18} className="text-amber-600" />,
                bg: "bg-amber-50"
              },
              { 
                title: "Prayer Chain Logic", 
                desc: "Organize prayer groups with automated scheduling.", 
                icon: <Calendar size={18} className="text-blue-600" />,
                bg: "bg-blue-50"
              },
              { 
                title: "Disciple Retention", 
                desc: "Advanced follow-up metrics and status reporting.", 
                icon: <Users size={18} className="text-emerald-600" />,
                bg: "bg-emerald-50"
              }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl border border-stone-100 bg-white hover:border-stone-200 transition-all shadow-sm group">
                <div className={`h-10 w-10 shrink-0 rounded-xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 text-sm">{feature.title}</h4>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="flex-1 inline-flex items-center justify-center bg-[#634832] hover:bg-[#4d3827] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-stone-200 active:scale-95 group"
            >
              Get Started <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="flex-1 inline-flex items-center justify-center bg-white border border-stone-200 text-stone-700 font-bold py-4 px-8 rounded-2xl hover:bg-stone-50 transition-all active:scale-95"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}