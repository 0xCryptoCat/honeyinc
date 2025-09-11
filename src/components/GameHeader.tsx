import { Coins, Hexagon } from "lucide-react";

interface GameHeaderProps {
  honeyCount: number;
  goldenHoney: number;
  timeBonus: number;
  onLeftHexagonClick?: () => void;
  onRightHexagonClick?: () => void;
}

export function GameHeader({ honeyCount, goldenHoney, timeBonus, onLeftHexagonClick, onRightHexagonClick }: GameHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-4">
      <div className="flex items-center justify-between">
        {/* Left side - Bee icon (honeycomb) - scaled up 50% and moved right */}
        <button 
          onClick={onLeftHexagonClick}
          className="relative transform scale-[1.5] translate-x-4 hover:scale-[1.55] transition-transform duration-200 z-10"
        >
          <div className="w-14 h-14 relative">
            
            
            {/* Main honeycomb */}
            <div 
              className="relative w-full h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-2 border-amber-300 shadow-xl"
              style={{
                clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
              }}
            >
              {/* Inner highlight */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
                style={{
                  clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white drop-shadow-lg">🍯</span>
              </div>
              
              {/* Shine effect */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-white/40 rounded-full blur-sm" />
            </div>
          </div>
          
          {timeBonus > 0 && (
            <div className="absolute scale-[0.75] -top-2 -right-2 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs px-2 py-1 rounded-full shadow-lg border-2 border-red-300">
              {timeBonus}
            </div>
          )}
        </button>

        {/* Center - Main honey counter */}
        <div className="flex-1 mx-2">
          <div className="relative bg-gradient-to-b from-white via-amber-50 to-amber-100 rounded-2xl px-6 py-3 border-2 border-amber-300 shadow-xl">
            
            <div className="text-center relative">
              <div className="text-amber-900 text-xl font-bold drop-shadow-sm">{honeyCount.toLocaleString()}</div>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <Hexagon className="w-4 h-4 text-amber-600 fill-current drop-shadow-sm" />
                <span className="text-amber-700 font-bold text-sm">{goldenHoney}</span>
                <div className="bg-amber-200 h-2 flex-1 rounded-full max-w-20 shadow-inner">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-3/4 rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
            
            {/* Shine effect on center */}
            <div className="absolute top-1 left-4 w-4 h-4 bg-white/40 rounded-full blur-md" />
          </div>
        </div>

        {/* Right side - Coins (honeycomb) - scaled up 50% and moved left */}
        <button 
          onClick={onRightHexagonClick}
          className="relative transform scale-[1.5] -translate-x-4 hover:scale-[1.55] transition-transform duration-200"
        >
          <div className="w-14 h-14 relative">
            
            
            {/* Main honeycomb */}
            <div 
              className="relative w-full h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-2 border-amber-300 shadow-xl"
              style={{
                clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
              }}
            >
              {/* Inner highlight */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
                style={{
                  clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <Coins className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
              
              {/* Shine effect */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-white/40 rounded-full blur-sm" />
            </div>
          </div>
          
          <div className="absolute scale-[0.75] -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full shadow-lg border-2 border-yellow-300">
            6
          </div>
        </button>
      </div>
    </div>
  );
}