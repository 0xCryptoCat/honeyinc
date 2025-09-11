import { X, Building, Home, ArrowUp, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
}

interface HiveSlot {
  id: number;
  tier: number;
  maxTier: number;
  capacity: number;
  occupancy: number;
  upgradeCost: number;
  replaceCost: number;
}

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  capacity: number;
  utilization: number;
  upgrades: Upgrade[];
  onUpgrade: (upgradeId: string) => void;
  onUpgradeHive?: (slotId: number) => void;
  onReplaceHive?: (slotId: number) => void;
  currentCash?: number;
  initialTab?: string;
}

export function UpgradeModal({
  isOpen,
  onClose,
  title,
  capacity,
  utilization,
  upgrades,
  onUpgrade,
  onUpgradeHive,
  onReplaceHive,
  currentCash = 850000,
  initialTab = "buildings"
}: UpgradeModalProps) {
  const [activeTab, setActiveTab] = useState("buildings"); // Always start with default
  const [selectedHiveSlot, setSelectedHiveSlot] = useState<number | null>(null);

  // Reset tab when modal opens with new initialTab
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || "buildings");
      console.log("UpgradeModal: Setting initial tab to:", initialTab); // Debug log
    }
  }, [isOpen, initialTab]);

  const tabs = [
    { id: "buildings", label: "Buildings", icon: Building },
    { id: "hives", label: "Hives", icon: Home }
  ];

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

  const selectedHive = selectedHiveSlot ? hiveSlots.find(h => h.id === selectedHiveSlot) : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-b from-white via-amber-50 to-amber-100 rounded-3xl p-6 w-full max-w-lg shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-y-auto">
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
          <h2 className="text-amber-900 font-bold text-xl mb-2">{title}</h2>
          <div className="flex justify-center">
            <div className="bg-amber-200 h-1 w-16 rounded-full shadow-inner">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-full rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-amber-200/50 p-1 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-1 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg"
                    : "bg-white/50 text-amber-800 hover:bg-white/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === "buildings" && (
          <>
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

            {/* Capacity and Utilization */}
            <div className="bg-gradient-to-r from-amber-200 to-amber-300 rounded-2xl p-4 mb-6 border-2 border-amber-400 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-0.5 bg-amber-900/20 rounded-2xl -z-10" />
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-900 font-bold">Capacity</span>
                    <span className="text-amber-900 font-bold">{capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-900 font-bold">Utilization</span>
                    <span className="text-amber-900 font-bold">{utilization}%</span>
                  </div>
                  <div className="bg-amber-500 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-600 to-amber-700 h-full transition-all duration-300"
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                </div>
                <div className="absolute top-0 left-2 w-4 h-4 bg-white/30 rounded-full blur-md" />
              </div>
            </div>

            {/* Building Upgrades */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {upgrades.map((upgrade) => {
                const affordable = canAfford(upgrade.cost);
                const maxed = upgrade.level >= upgrade.maxLevel;
                
                return (
                  <div
                    key={upgrade.id}
                    className={`relative bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 shadow-lg ${
                      maxed ? "opacity-50" : affordable ? "border-amber-200" : "border-red-200"
                    }`}
                  >
                    {/* Shadow layer */}
                    <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                    
                    <div className="flex items-center justify-between relative">
                      <div className="flex items-center space-x-3">
                        {/* Building icon */}
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-amber-900 font-bold text-sm">{upgrade.name}</div>
                          <div className="text-amber-700 text-xs">{upgrade.description}</div>
                          
                          {/* Progress bar */}
                          <div className="mt-1 bg-amber-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-300"
                              style={{ width: `${(upgrade.level / upgrade.maxLevel) * 100}%` }}
                            />
                          </div>
                          <div className="text-amber-600 text-xs mt-1">
                            Level {upgrade.level}/{upgrade.maxLevel}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-3">
                        <div className={`font-bold text-sm ${affordable ? "text-green-700" : "text-red-700"}`}>
                          ${upgrade.cost.toLocaleString()}
                        </div>
                        <button
                          onClick={() => onUpgrade(upgrade.id)}
                          disabled={!affordable || maxed}
                          className={`px-3 py-1 rounded-lg text-xs font-bold mt-1 transition-all duration-200 ${
                            maxed 
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : affordable
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 active:scale-95 shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {maxed ? "MAX" : "UPGRADE"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "hives" && (
          <>
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
                const isSelected = selectedHiveSlot === hive.id;
                
                return (
                  <button
                    key={hive.id}
                    onClick={() => setSelectedHiveSlot(isSelected ? null : hive.id)}
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
          </>
        )}
      </div>
    </div>
  );
}