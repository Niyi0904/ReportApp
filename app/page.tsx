"use client"

import { Cross} from 'lucide-react';

export default function Home () {

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
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
    </div>
  );
};
