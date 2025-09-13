import { X, Home, Building, Truck, DollarSign, Wrench, Crown } from "lucide-react";
import { useState, useEffect } from "react";

interface ResearchItem {
  id: string;
  title: string;
  icon: any;
  level: number;
  maxLevel: number;
  effect: string;
  cost: number;
  category: string;
}

interface EpicResearchItem {
  id: string;
  title: string;
  icon: string;
  level: number;
  maxLevel: number;
  effect: string;
  cost: number;
  currency: "golden_combs";
}

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCash?: number;
  initialTab?: string;
}

export function ResearchModal({ isOpen, onClose, currentCash = 1500000, initialTab = "research" }: ResearchModalProps) {
  const [activeMainTab, setActiveMainTab] = useState("research"); // Always start with default
  const [activeResearchTab, setActiveResearchTab] = useState("all");

  // Reset tab when modal opens with new initialTab
  useEffect(() => {
    if (isOpen) {
      setActiveMainTab(initialTab || "research");
      setActiveResearchTab("all"); // Reset sub-tab as well
      console.log("ResearchModal: Setting initial tab to:", initialTab); // Debug log
    }
  }, [isOpen, initialTab]);

  const mainTabs = [
    { id: "research", label: "Research", icon: Home },
    { id: "epic", label: "Epic Research", icon: Crown }
  ];

  const researchTabs = [
    { id: "all", label: "All", icon: null },
    { id: "hatchery", label: "Hatchery", icon: Home },
    { id: "habitats", label: "Habitats", icon: Building },
    { id: "vehicles", label: "Vehicles", icon: Truck },
    { id: "value", label: "Value", icon: DollarSign },
    { id: "misc", label: "Misc", icon: Wrench }
  ];

  const researchItems: ResearchItem[] = [
    {
      id: "1",
      title: "Royal Jelly Supplements",
      icon: "🍯",
      level: 5,
      maxLevel: 25,
      effect: "Increase bee spawning rate by 10%",
      cost: 25000,
      category: "hatchery"
    },
    {
      id: "2", 
      title: "Honeycomb Packaging",
      icon: "📦",
      level: 8,
      maxLevel: 30,
      effect: "Increase honey value by 5%",
      cost: 450000,
      category: "value"
    },
    {
      id: "3",
      title: "Hive Climate Control",
      icon: "🏠",
      level: 12,
      maxLevel: 50,
      effect: "Increase hive capacity by 2%",
      cost: 125000,
      category: "habitats"
    },
    {
      id: "4",
      title: "Express Delivery Trucks",
      icon: "🚚",
      level: 3,
      maxLevel: 15,
      effect: "Increase shipping rate by 15%",
      cost: 75000,
      category: "vehicles"
    },
    {
      id: "5",
      title: "Hive Air Conditioning",
      icon: "❄️",
      level: 6,
      maxLevel: 20,
      effect: "Reduce bee fatigue by 8%",
      cost: 180000,
      category: "habitats"
    },
    {
      id: "6",
      title: "Premium Flower Seeds",
      icon: "🌸",
      level: 9,
      maxLevel: 35,
      effect: "Increase nectar quality by 12%",
      cost: 320000,
      category: "hatchery"
    },
    {
      id: "7",
      title: "Automated Honey Extractors",
      icon: "⚙️",
      level: 4,
      maxLevel: 25,
      effect: "Increase extraction efficiency by 20%",
      cost: 180000,
      category: "misc"
    }
  ];

  const epicResearchItems: EpicResearchItem[] = [
    {
      id: "e1",
      title: "Golden Nectar",
      icon: "✨",
      level: 12,
      maxLevel: 25,
      effect: "Increase golden honey bonus by 20%",
      cost: 25,
      currency: "golden_combs"
    },
    {
      id: "e2",
      title: "Royal Honey Multiplier", 
      icon: "💰",
      level: 8,
      maxLevel: 20,
      effect: "Increase royal honey value by 15%",
      cost: 50,
      currency: "golden_combs"
    },
    {
      id: "e3",
      title: "Prestige Bonus",
      icon: "🌟",
      level: 5,
      maxLevel: 15,
      effect: "Reduce prestige requirements by 10%",
      cost: 100,
      currency: "golden_combs"
    },
    {
      id: "e4",
      title: "Queen Bee Powers",
      icon: "👑",
      level: 3,
      maxLevel: 10,
      effect: "Increase bee productivity by 25%",
      cost: 150,
      currency: "golden_combs"
    }
  ];

  const filteredItems = activeResearchTab === "all" 
    ? researchItems 
    : researchItems.filter(item => item.category === activeResearchTab);

  const canAfford = (cost: number) => currentCash >= cost;
  const canAffordEpic = () => true; // Mock golden combs check

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
          <h2 className="text-amber-900 font-bold text-xl mb-2">RESEARCH LAB</h2>
          <div className="flex justify-center">
            <div className="bg-amber-200 h-1 w-16 rounded-full shadow-inner">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-full rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Main Tabs - Toggle Switch Style */}
        <div className="flex mb-4 bg-amber-200/50 p-1 rounded-xl">
          <div className="relative flex w-full">
            {/* Sliding indicator */}
            <div 
              className="absolute top-1 left-1 bottom-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg shadow-lg transition-transform duration-300 ease-out"
              style={{
                width: '50%',
                transform: `translateX(${activeMainTab === 'epic' ? '100%' : '0%'})`
              }}
            />
            
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id)}
                  className={`relative flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-1 z-10 ${
                    activeMainTab === tab.id
                      ? "text-white"
                      : "text-amber-800 hover:text-amber-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeMainTab === "research" && (
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

            {/* Research Category Tabs */}
            <div className="flex flex-wrap gap-1 mb-4 bg-amber-200/30 p-2 rounded-xl">
              {researchTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveResearchTab(tab.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 flex items-center space-x-1 ${
                      activeResearchTab === tab.id
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg"
                        : "bg-white/50 text-amber-800 hover:bg-white/80"
                    }`}
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Research Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {filteredItems.map((item) => {
                const affordable = canAfford(item.cost);
                const maxed = item.level >= item.maxLevel;
                
                return (
                  <div
                    key={item.id}
                    className={`relative bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 shadow-lg ${
                      maxed ? "opacity-50" : affordable ? "border-amber-200" : "border-red-200"
                    }`}
                  >
                    {/* Shadow layer */}
                    <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                    
                    <div className="flex items-center justify-between relative">
                      <div className="flex items-center space-x-3">
                        {/* Research icon */}
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-amber-900 font-bold text-sm">{item.title}</div>
                          <div className="text-amber-700 text-xs">{item.effect}</div>
                          
                          {/* Progress bar */}
                          <div className="mt-1 bg-amber-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-300"
                              style={{ width: `${(item.level / item.maxLevel) * 100}%` }}
                            />
                          </div>
                          <div className="text-amber-600 text-xs mt-1">
                            Level {item.level}/{item.maxLevel}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-3">
                        <div className={`font-bold text-sm ${affordable ? "text-green-700" : "text-red-700"}`}>
                          ${item.cost.toLocaleString()}
                        </div>
                        <button
                          disabled={!affordable || maxed}
                          className={`px-3 py-1 rounded-lg text-xs font-bold mt-1 transition-all duration-200 ${
                            maxed 
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : affordable
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 active:scale-95 shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {maxed ? "MAX" : "BUY +1"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="text-center">
              <div className="text-amber-700 text-xs">
                💡 Research resets on honey tier prestige
              </div>
            </div>
          </>
        )}

        {activeMainTab === "epic" && (
          <>
            {/* Golden Combs Display */}
            <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-2xl p-3 mb-4 border-2 border-yellow-400 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-0.5 bg-yellow-900/20 rounded-2xl -z-10" />
                <div className="flex justify-between items-center relative">
                  <span className="text-yellow-900 font-bold text-sm">Golden Combs</span>
                  <span className="text-yellow-900 font-bold text-lg">1,234</span>
                </div>
                <div className="absolute top-0 left-2 w-3 h-3 bg-white/30 rounded-full blur-sm" />
              </div>
            </div>

            {/* Epic Research Items */}
            <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
              {epicResearchItems.map((item) => {
                const affordable = canAffordEpic();
                const maxed = item.level >= item.maxLevel;
                
                return (
                  <div
                    key={item.id}
                    className={`relative bg-gradient-to-r from-white to-yellow-50 rounded-2xl p-4 border-2 shadow-lg ${
                      maxed ? "opacity-50" : affordable ? "border-yellow-200" : "border-red-200"
                    }`}
                  >
                    {/* Shadow layer */}
                    <div className="absolute inset-0 transform translate-y-1 bg-yellow-900/10 rounded-2xl -z-10" />
                    
                    <div className="flex items-center justify-between relative">
                      <div className="flex items-center space-x-3">
                        {/* Epic icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 relative">
                          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full" />
                          <span className="text-xl relative">{item.icon}</span>
                          <div className="absolute top-1.5 left-2 w-2 h-2 bg-white/40 rounded-full blur-sm" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-yellow-900 font-bold text-sm flex items-center space-x-1">
                            <span>{item.title}</span>
                            <Crown className="w-3 h-3 text-yellow-600" />
                          </div>
                          <div className="text-yellow-700 text-xs">{item.effect}</div>
                          
                          {/* Progress bar */}
                          <div className="mt-1 bg-yellow-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full transition-all duration-300"
                              style={{ width: `${(item.level / item.maxLevel) * 100}%` }}
                            />
                          </div>
                          <div className="text-yellow-600 text-xs mt-1">
                            Level {item.level}/{item.maxLevel}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-3">
                        <div className={`font-bold text-sm ${affordable ? "text-green-700" : "text-red-700"}`}>
                          {item.cost} 🍯
                        </div>
                        <button
                          disabled={!affordable || maxed}
                          className={`px-3 py-1 rounded-lg text-xs font-bold mt-1 transition-all duration-200 ${
                            maxed 
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : affordable
                                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:scale-105 active:scale-95 shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {maxed ? "MAX" : "BUY +1"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Epic Footer */}
            <div className="text-center">
              <div className="text-yellow-700 text-xs">
                ⭐ Epic Research is permanent and never resets
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}