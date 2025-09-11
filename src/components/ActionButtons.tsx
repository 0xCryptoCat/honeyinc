import { Star, ShoppingCart, TrendingUp, Settings } from "lucide-react";
import { HoneycombButton } from "./HoneycombButton";

interface ActionButtonsProps {
  layoutMode: "compact" | "expanded";
  onButtonClick?: (action: string) => void;
  onLayoutToggle?: () => void;
}

export function ActionButtons({ layoutMode, onButtonClick, onLayoutToggle }: ActionButtonsProps) {
  const buttons = [
    { icon: Star, action: "boosts", label: "Boosts" },
    { icon: ShoppingCart, action: "shop", label: "Shop" },
    { icon: TrendingUp, action: "tier-upgrade", label: "Tier Upgrade" },
    { icon: Settings, action: "settings", label: "Settings" },
  ];

  if (layoutMode === "compact") {
    return (
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="relative flex justify-center items-end space-x-4">
          {/* First two buttons */}
          {buttons.slice(0, 2).map((button, index) => (
            <HoneycombButton
              key={index}
              icon={button.icon}
              onClick={() => onButtonClick?.(button.action)}
              size="large"
            />
          ))}
          
          {/* Middle button - Spawn Bee with layout toggle above */}
          <div className="relative">
            {/* Small tap mode button above - now rounded rectangle */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Shadow layer */}
                <div className="absolute inset-0 transform translate-y-1 bg-amber-900/30 rounded-lg -z-10" />
                
                <button
                  onClick={onLayoutToggle}
                  className="relative bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-amber-300"
                >
                  {/* Inner highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-lg" />
                  
                  <span className="text-xs font-bold drop-shadow-sm relative">TAP</span>
                  
                  {/* Shine effect */}
                  <div className="absolute top-0.5 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm" />
                </button>
              </div>
            </div>
            
            {/* Main spawn bee button */}
            <div className="relative">
              {/* Shadow layers */}
              <div className="absolute inset-0 transform translate-x-1 translate-y-2 -z-10"
                style={{
                  clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
                }}
              >
                <div className="w-20 h-20 bg-amber-900/40" />
              </div>
              
              <div className="absolute inset-0 transform translate-x-0.5 translate-y-1 -z-10"
                style={{
                  clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
                }}
              >
                <div className="w-20 h-20 bg-amber-800/30" />
              </div>

              {/* Main button */}
              <button
                onClick={() => onButtonClick?.("create-bees")}
                className="relative w-20 h-20 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-2 border-amber-300 transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
                }}
              >
                {/* Inner highlight */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent"
                  style={{
                    clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
                  }}
                />
                
                {/* Bee emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🐝</span>
                </div>
                
                {/* Shine effect */}
                <div className="absolute top-2 left-3 w-3 h-3 bg-white/50 rounded-full blur-sm" />
              </button>
            </div>
          </div>
          
          {/* Last two buttons */}
          {buttons.slice(2, 4).map((button, index) => (
            <HoneycombButton
              key={index + 2}
              icon={button.icon}
              onClick={() => onButtonClick?.(button.action)}
              size="large"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
      {/* Top row - 4 small buttons + layout toggle */}
      <div className="flex justify-between items-center px-2">
        <div className="flex space-x-3">
          {buttons.map((button, index) => (
            <HoneycombButton
              key={index}
              icon={button.icon}
              onClick={() => onButtonClick?.(button.action)}
              size="small"
            />
          ))}
        </div>
        
        <div className="relative">
          {/* Shadow layer */}
          <div className="absolute inset-0 transform translate-x-0.5 translate-y-1 bg-gray-900/20 rounded-full -z-10" />
          
          <button
            onClick={onLayoutToggle}
            className="relative w-10 h-10 bg-gradient-to-b from-white to-amber-50 rounded-full shadow-xl border-2 border-amber-300 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
          >
            {/* Inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full" />
            
            {/* Just a circle - no arrow */}
            <div className="w-3 h-3 bg-amber-600 rounded-full" />
            
            {/* Shine effect */}
            <div className="absolute top-1 left-1.5 w-2 h-2 bg-white/50 rounded-full blur-sm" />
          </button>
        </div>
      </div>

      {/* Bottom - Large center tap button (halved height) */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Shadow layers for 3D effect */}
          <div className="absolute inset-0 transform translate-y-2 bg-amber-900/40 rounded-2xl -z-10" />
          <div className="absolute inset-0 transform translate-y-1 bg-amber-800/30 rounded-2xl -z-10" />
          
          <button
            onClick={() => onButtonClick?.("create-bees")}
            className="relative bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 text-white py-3 px-16 rounded-2xl shadow-2xl border-4 border-amber-300 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {/* Inner highlight for 3D effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-2xl" />
            
            <div className="relative flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-inner relative">
                {/* Bee container highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
                <span className="text-amber-600 text-lg relative">🐝</span>
              </div>
              <span className="text-lg font-bold drop-shadow-lg">SPAWN BEES</span>
            </div>
            
            {/* Main shine effect */}
            <div className="absolute top-1 left-4 w-6 h-6 bg-white/20 rounded-full blur-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}