import { X, Zap, Timer } from "lucide-react";
import { useState } from "react";

interface BoostItem {
  id: string;
  name: string;
  icon: string;
  count: number;
  effect: string;
  duration: string;
  color: string;
}

interface BoostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseBoost?: (boostId: string, amount: number) => void;
}

export function BoostsModal({ isOpen, onClose, onUseBoost }: BoostsModalProps) {
  const [selectedBoost, setSelectedBoost] = useState<string | null>(null);

  const boosts: BoostItem[] = [
    {
      id: "production",
      name: "Honey Rush",
      icon: "🍯",
      count: 15,
      effect: "+500% honey production",
      duration: "10 minutes",
      color: "from-amber-400 to-amber-600"
    },
    {
      id: "spawning",
      name: "Bee Frenzy",
      icon: "🐝",
      count: 8,
      effect: "+250% bee spawning rate",
      duration: "5 minutes",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: "shipping",
      name: "Speed Delivery",
      icon: "🚚",
      count: 12,
      effect: "+300% shipping speed",
      duration: "15 minutes",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "earnings",
      name: "Golden Touch",
      icon: "💰",
      count: 6,
      effect: "+400% honey value",
      duration: "8 minutes",
      color: "from-green-400 to-green-600"
    },
    {
      id: "soul",
      name: "Soul Boost",
      icon: "✨",
      count: 3,
      effect: "+200% soul honey gain",
      duration: "20 minutes",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const handleUse = (boostId: string, amount: number) => {
    onUseBoost?.(boostId, amount);
    setSelectedBoost(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-b from-white via-amber-50 to-amber-100 rounded-3xl p-6 w-full max-w-md shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-hidden">
        {/* Shadow for 3D effect */}
        <div className="absolute inset-0 transform translate-y-2 bg-amber-900/20 rounded-3xl -z-10" />
        
        {/* Inner highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-3xl" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg border-2 border-red-400 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 relative">
          <h2 className="text-amber-900 font-bold text-xl mb-2">BOOST INVENTORY</h2>
          <div className="flex justify-center">
            <div className="bg-amber-200 h-1 w-16 rounded-full shadow-inner">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-full rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Boost Items */}
        <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
          {boosts.map((boost) => (
            <div
              key={boost.id}
              className="relative bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 border-amber-200 shadow-lg"
            >
              {/* Shadow layer */}
              <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
              
              <div className="flex items-center justify-between relative">
                <div className="flex items-center space-x-3">
                  {/* Boost icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${boost.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 relative`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full" />
                    <span className="text-xl relative">{boost.icon}</span>
                    <div className="absolute top-1.5 left-2 w-2 h-2 bg-white/40 rounded-full blur-sm" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-amber-900 font-bold text-sm">{boost.name}</div>
                    <div className="text-amber-700 text-xs">{boost.effect}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Timer className="w-3 h-3 text-amber-600" />
                      <span className="text-amber-600 text-xs">{boost.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-1">
                  {/* Count badge */}
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    {boost.count}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleUse(boost.id, 1)}
                      disabled={boost.count === 0}
                      className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                        boost.count > 0
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 active:scale-95 shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      USE
                    </button>
                    
                    {boost.count > 1 && (
                      <button
                        onMouseDown={(e) => {
                          const button = e.currentTarget;
                          const timeout = setTimeout(() => {
                            // Multi-use logic (50% discount for bulk use)
                            setSelectedBoost(boost.id);
                            // Show confirmation dialog for multi-use
                          }, 500); // Hold for 500ms
                          
                          const handleMouseUp = () => {
                            clearTimeout(timeout);
                            button.removeEventListener('mouseup', handleMouseUp);
                            button.removeEventListener('mouseleave', handleMouseUp);
                          };
                          
                          button.addEventListener('mouseup', handleMouseUp);
                          button.addEventListener('mouseleave', handleMouseUp);
                        }}
                        className="px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-105 active:scale-95 shadow-lg transition-all duration-200"
                      >
                        <Zap className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Boosts */}
        <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-2xl p-3 mb-4 border-2 border-green-400 shadow-lg">
          <div className="relative">
            <div className="absolute inset-0 transform translate-y-0.5 bg-green-900/20 rounded-2xl -z-10" />
            <div className="relative">
              <div className="text-green-900 font-bold text-sm mb-2">Active Boosts</div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-green-800">🍯 Honey Rush</span>
                  <span className="text-green-700">2:45 remaining</span>
                </div>
                <div className="bg-green-400 h-1 rounded-full">
                  <div className="bg-green-600 h-full w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-2 w-3 h-3 bg-white/30 rounded-full blur-sm" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-amber-700 text-xs">
            💡 Hold ⚡ button for multi-use with 50% discount
          </div>
        </div>
      </div>

      {/* Multi-use confirmation modal */}
      {selectedBoost && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Multi-Use Boost</h3>
              <p className="text-gray-700 mb-4">Use multiple boosts at 50% discount?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedBoost(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUse(selectedBoost, 5)}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg font-bold"
                >
                  Use 5
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}