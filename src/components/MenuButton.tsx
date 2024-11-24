import React from 'react';

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  gradient: string;
}

export default function MenuButton({ 
  icon, 
  label, 
  description, 
  onClick, 
  gradient 
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-xl
        bg-gradient-to-r ${gradient}
        transform transition-all duration-200
        hover:scale-[1.02] hover:shadow-lg
        active:scale-[0.98]
        group
      `}
    >
      <div className="flex items-center gap-4 text-white">
        <div className="p-2 bg-white/20 rounded-lg">
          {icon}
        </div>
        <div className="text-left">
          <div className="font-bold text-lg">{label}</div>
          <div className="text-sm text-white/80">{description}</div>
        </div>
      </div>
    </button>
  );
}