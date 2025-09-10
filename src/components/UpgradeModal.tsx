import { X, Hexagon } from "lucide-react";
import { Button } from "./ui/button";

interface UpgradeItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  image?: string;
}

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  capacity: number;
  utilization: number;
  upgrades: UpgradeItem[];
  onUpgrade?: (id: string) => void;
}

export function UpgradeModal({ 
  isOpen, 
  onClose, 
  title, 
  capacity, 
  utilization, 
  upgrades, 
  onUpgrade 
}: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-6 shadow-2xl border-2 border-amber-200 max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🏠</span>
            </div>
            <h2 className="text-gray-800 font-bold text-lg">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capacity Info */}
        <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
          <div className="flex items-center justify-between text-gray-800">
            <span className="font-medium">MAX CAPACITY</span>
            <div className="flex items-center space-x-1">
              <Hexagon className="w-4 h-4 text-amber-500 fill-current" />
              <span className="font-bold">{capacity.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-gray-600 text-sm mt-1">↳ UTILIZATION: {utilization}%</div>
        </div>

        {/* Upgrades Grid */}
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {upgrades.map((upgrade) => (
            <div
              key={upgrade.id}
              className="bg-white rounded-xl p-3 border-2 border-amber-200 shadow-sm"
            >
              <div className="text-gray-800 text-sm font-medium mb-2">{upgrade.name}</div>
              <div className="text-gray-600 text-xs mb-2">{upgrade.description}</div>
              
              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(upgrade.level / upgrade.maxLevel) * 100}%` }}
                />
              </div>

              {/* Upgrade Image */}
              <div className="bg-amber-100 rounded-lg p-2 mb-3 flex items-center justify-center h-16 border border-amber-200">
                <Hexagon className="w-8 h-8 text-amber-500 fill-current" />
              </div>

              {/* Cost and Button */}
              <div className="text-amber-600 text-xs font-bold mb-2">{upgrade.cost} 🍯</div>
              <Button
                onClick={() => onUpgrade?.(upgrade.id)}
                className={`w-full text-white font-bold py-2 rounded-lg text-sm transition-colors ${
                  upgrade.level >= upgrade.maxLevel
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
                disabled={upgrade.level >= upgrade.maxLevel}
              >
                {upgrade.level >= upgrade.maxLevel ? "MAX" : "UPGRADE"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}