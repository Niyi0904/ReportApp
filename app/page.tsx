"use client";

import { Cross } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding / Stats */}
      <div className="hidden lg:flex lg:w-1/2 gradient-warm relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary-bg" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center mb-8">
            <Cross size={32} />
          </div>
          <h1 className="text-5xl font-display font-bold mb-4">
            Disciple Management
          </h1>
          <p className="text-xl opacity-90 max-w-md">
            Track evangelism, manage prayer groups, and follow up with souls on their spiritual journey.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold">156</p>
              <p className="text-sm opacity-80">Souls Reached</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold">87%</p>
              <p className="text-sm opacity-80">Attendance</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold">342</p>
              <p className="text-sm opacity-80">Follow-ups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Call-to-action / Info */}
      <div className="lg:w-1/2 flex items-center justify-center bg-primary-bg p-12">
        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Keep Track of Your Ministry
          </h2>

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-rose-50 rounded-xl p-4 shadow-sm">
              <p className="font-bold text-lg">Organize Prayer Groups</p>
              <p className="text-sm text-gray-600">Keep track of your prayer teams and their activities effortlessly.</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4 shadow-sm">
              <p className="font-bold text-lg">Track Evangelism</p>
              <p className="text-sm text-gray-600">Monitor souls reached and follow-ups directly from your dashboard.</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4 shadow-sm">
              <p className="font-bold text-lg">Simple Follow-ups</p>
              <p className="text-sm text-gray-600">Never miss checking in on new disciples and ongoing programs.</p>
            </div>
          </div>

          {/* Get Started / Login Button */}
          <Link
            href="/login"
            className="inline-block bg-secondary-bg hover:bg-secondary-bg/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
