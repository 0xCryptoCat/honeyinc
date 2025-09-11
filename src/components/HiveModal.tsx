import { X, Home, ArrowUp, RefreshCw } from "lucide-react";
import { useState } from "react";

interface HiveSlot {
  id: number;
  tier: number;
  maxTier: number;
  capacity: number;
  occupancy: number;
  upgradeCost: number;
  replaceCost: number;
}

interface HiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCash?: number;
  onUpgradeHive?: (slotId: number) => void;
  onReplaceHive?: (slotId: number) => void;
}

export function HiveModal({ isOpen, onClose, currentCash = 850000, onUpgradeHive, onReplaceHive }: HiveModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const hiveSlots: HiveSlot[] = [
    {
      id: 1,
      tier: 8,
      maxTier: 19,
      capacity: 12500,
      occupancy: 11200,
      upgradeCost: 125000,
      replaceCost: 89000
    },
    {
      id: 2,
      tier: 6,
      maxTier: 19,
      capacity: 8500,
      occupancy: 8500,
      upgradeCost: 85000,
      replaceCost: 65000
    },
    {
      id: 3,
      tier: 10,
      maxTier: 19,
      capacity: 18000,
      occupancy: 15600,
      upgradeCost: 185000,
      replaceCost: 142000
    },
    {
      id: 4,
      tier: 4,
      maxTier: 19,
      capacity: 5200,
      occupancy: 5200,
      upgradeCost: 52000,
      replaceCost: 38000
    }
  ];

  const getHiveName = (tier: number) => {
    const names = [
      "", "Coop", "Shack", "Super Shack", "Short House", "The Standard",
      "Long House", "Double Decker", "Warehouse", "Center", "Bunker",
      "Eggkea", "Super Bunker", "Egg Antique", "Rich", "Eggcelsior",
      "Chicken Palace", "Royal Dome", "Universe", "Edifis", "Monolith"
    ];
    return names[tier] || `Tier ${tier}`;
  };

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 100) return "from-red-400 to-red-600";
    if (percentage >= 80) return "from-yellow-400 to-yellow-600";
    return "from-green-400 to-green-600";
  };

  const canAfford = (cost: number) => currentCash >= cost;

  const selectedHive = selectedSlot ? hiveSlots.find(h => h.id === selectedSlot) : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-b from-white via-amber-50 to-amber-100 rounded-3xl p-6 w-full max-w-lg shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-hidden">
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
          <h2 className="text-amber-900 font-bold text-xl mb-2">HIVE MANAGEMENT</h2>
          <div className="flex justify-center">
            <div className="bg-amber-200 h-1 w-16 rounded-full shadow-inner">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-full rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Cash Display */}
        <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-2xl p-3 mb-4 border-2 border-green-400 shadow-lg">
          <div className="relative">
            <div className="absolute inset-0 transform translate-y-0.5 bg-green-900/20 rounded-2xl -z-10" />
            <div className="flex justify-between items-center relative">
              <span className="text-green-900 font-bold text-sm">Available Cash</span>
              <span className="text-green-900 font-bold text-lg">${currentCash.toLocaleString()}</span>
            </div>
            <div className="absolute top-0 left-2 w-3 h-3 bg-white/30 rounded-full blur-sm" />
          </div>
        </div>

        {/* Hive Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {hiveSlots.map((hive) => {
            const occupancyPercentage = (hive.occupancy / hive.capacity) * 100;
            const isSelected = selectedSlot === hive.id;
            
            return (
              <button
                key={hive.id}
                onClick={() => setSelectedSlot(isSelected ? null : hive.id)}
                className={`relative bg-gradient-to-r from-white to-amber-50 rounded-2xl p-3 border-2 shadow-lg transition-all duration-200 hover:scale-105 ${
                  isSelected ? "border-amber-400 ring-2 ring-amber-300" : "border-amber-200"
                }`}
              >
                {/* Shadow layer */}
                <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                
                <div className="relative">
                  {/* Hive icon and tier */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                      <Home className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-amber-900 font-bold text-xs">
                      T{hive.tier}/{hive.maxTier}
                    </div>
                  </div>
                  
                  {/* Hive name */}
                  <div className="text-amber-900 font-bold text-sm mb-1">
                    {getHiveName(hive.tier)}
                  </div>
                  
                  {/* Occupancy bar */}
                  <div className="bg-amber-200 h-2 rounded-full overflow-hidden mb-1">
                    <div 
                      className={`bg-gradient-to-r ${getOccupancyColor(hive.occupancy, hive.capacity)} h-full transition-all duration-300`}
                      style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
                    />
                  </div>
                  
                  {/* Capacity numbers */}
                  <div className="text-amber-700 text-xs">
                    {hive.occupancy.toLocaleString()}/{hive.capacity.toLocaleString()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        {selectedHive && (
          <div className="bg-gradient-to-r from-amber-200 to-amber-300 rounded-2xl p-4 mb-4 border-2 border-amber-400 shadow-lg">
            <div className="relative">
              <div className="absolute inset-0 transform translate-y-0.5 bg-amber-900/20 rounded-2xl -z-10" />
              
              <div className="relative">
                <div className="text-amber-900 font-bold text-lg mb-3">
                  {getHiveName(selectedHive.tier)} (Slot {selectedHive.id})
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-amber-800 text-sm font-bold">Capacity</div>
                    <div className="text-amber-700 text-xs">{selectedHive.capacity.toLocaleString()} bees</div>
                  </div>
                  <div>
                    <div className="text-amber-800 text-sm font-bold">Occupancy</div>
                    <div className="text-amber-700 text-xs">{Math.round((selectedHive.occupancy / selectedHive.capacity) * 100)}%</div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpgradeHive?.(selectedHive.id)}
                    disabled={selectedHive.tier >= selectedHive.maxTier || !canAfford(selectedHive.upgradeCost)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1 ${
                      selectedHive.tier >= selectedHive.maxTier
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : canAfford(selectedHive.upgradeCost)
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 active:scale-95 shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ArrowUp className="w-3 h-3" />
                    <span>
                      {selectedHive.tier >= selectedHive.maxTier 
                        ? "MAX" 
                        : `$${selectedHive.upgradeCost.toLocaleString()}`
                      }
                    </span>
                  </button>
                  
                  <button
                    onClick={() => onReplaceHive?.(selectedHive.id)}
                    disabled={!canAfford(selectedHive.replaceCost)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1 ${
                      canAfford(selectedHive.replaceCost)
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-105 active:scale-95 shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>${selectedHive.replaceCost.toLocaleString()}</span>
                  </button>
                </div>
                
                {/* Warnings */}
                <div className="mt-2 text-amber-800 text-xs">
                  {selectedHive.tier < selectedHive.maxTier && (
                    <div>💡 Upgrade increases capacity by 25%</div>
                  )}
                  <div>⚠️ Replace will refund 75% of current value</div>
                </div>
              </div>
              
              <div className="absolute top-0 left-2 w-4 h-4 bg-white/30 rounded-full blur-md" />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <div className="text-amber-700 text-xs">
            🏠 Select a hive slot to upgrade or replace
          </div>
        </div>
      </div>
    </div>
  );
}