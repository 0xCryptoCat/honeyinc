import { LucideIcon } from "lucide-react";

interface HoneycombButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
}

export function HoneycombButton({ 
  icon: Icon, 
  onClick, 
  size = "medium"
}: HoneycombButtonProps) {

  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16", 
    large: "w-20 h-20"
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8"
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} relative transition-all duration-200 hover:scale-105 active:scale-95 filter drop-shadow-lg`}
    >
      {/* Main hexagon button */}
      <div 
        className="relative w-full h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-2 border-amber-300"
        style={{
          clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
        }}
      >
        {/* Inner highlight for 3D effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent"
          style={{
            clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
          }}
        />
        
        {/* Shine highlight in top-left */}
        <div className="absolute top-2 left-3 w-3 h-3 bg-white/50 rounded-full blur-sm" />
        
        {/* Icon container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`${iconSizes[size]} text-white drop-shadow-md`} />
        </div>
      </div>
      
      {/* Subtle outer glow */}
      <div 
        className="absolute inset-0 -m-1 bg-amber-400/20 blur-sm -z-20"
        style={{
          clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
        }}
      />
    </button>
  );
}