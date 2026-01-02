import React from 'react';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileSection = ({ title, children }: ProfileSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold border-b pb-2">{title}</h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);