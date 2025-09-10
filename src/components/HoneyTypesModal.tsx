import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface HoneyType {
  id: string;
  name: string;
  amount: number;
  emoji: string;
  color: string;
}

interface HoneyTypesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSellFarm?: () => void;
}

export function HoneyTypesModal({ isOpen, onClose, onSellFarm }: HoneyTypesModalProps) {
  const [honeyTypes] = useState<HoneyType[]>([
    {
      id: "wildflower",
      name: "Wildflower",
      amount: 1250,
      emoji: "🍯",
      color: "from-amber-400 to-amber-600"
    },
    {
      id: "clover",
      name: "Clover",
      amount: 2340,
      emoji: "🍯",
      color: "from-green-400 to-amber-500"
    },
    {
      id: "acacia",
      name: "Acacia",
      amount: 5670,
      emoji: "🍯",
      color: "from-yellow-300 to-amber-400"
    },
    {
      id: "manuka",
      name: "Manuka",
      amount: 23450,
      emoji: "🍯",
      color: "from-orange-500 to-amber-700"
    },
    {
      id: "buckwheat",
      name: "********",
      amount: 123450,
      emoji: "❔",
      color: "from-gray-800 to-gray-900"
    }
  ]);

  const [currentHoneyIndex, setCurrentHoneyIndex] = useState(0);

  const nextHoney = () => {
    setCurrentHoneyIndex((prev) => (prev + 1) % honeyTypes.length);
  };

  const prevHoney = () => {
    setCurrentHoneyIndex((prev) => (prev - 1 + honeyTypes.length) % honeyTypes.length);
  };

  const currentHoney = honeyTypes[currentHoneyIndex];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-b from-white via-amber-50 to-amber-100 rounded-3xl p-6 w-full max-w-md shadow-2xl border-4 border-amber-300">
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
          <h2 className="text-amber-900 font-bold text-xl mb-2">HONEY FARMS</h2>
          <div className="flex justify-center">
            <div className="bg-amber-200 h-1 w-16 rounded-full shadow-inner">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-full rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Honey Type Slider */}
        <div className="relative mb-6">
          {/* Navigation Arrows */}
          <button
            onClick={prevHoney}
            className="absolute left-0 bottom-1/3 transform -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-gradient-to-br from-amber-400 to-white rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200 shadow-lg border-2 border-amber-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextHoney}
            className="absolute right-0 bottom-1/3 transform -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-gradient-to-br from-amber-400 to-white rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200 shadow-lg border-2 border-amber-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Current Honey Type Display */}
          <div className="relative bg-gradient-to-r from-white to-amber-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg transition-all duration-300">
            {/* Shadow layer */}
            <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
            
            {/* Inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-2xl" />
            
            <div className="flex items-center justify-between relative">
              <div className="flex items-center space-x-4">
                {/* Honey pot with custom color */}
                <div className={`w-16 h-16 bg-gradient-to-br ${currentHoney.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full" />
                  <span className="text-3xl relative">{currentHoney.emoji}</span>
                  <div className="absolute top-2 left-3 w-3 h-3 bg-white/40 rounded-full blur-sm" />
                </div>
                
                <div>
                  <div className="text-amber-900 font-bold text-lg">{currentHoney.name}</div>
                  <div className="text-amber-700 text-sm">Honey</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-amber-900 font-bold text-sm">{currentHoney.amount.toLocaleString()}</div>
                <div className="text-amber-600 text-sm">jars</div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {honeyTypes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHoneyIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentHoneyIndex 
                    ? "bg-gradient-to-r from-amber-400 to-amber-600 w-6" 
                    : "bg-amber-300 hover:bg-amber-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-gradient-to-r from-amber-200 to-amber-300 rounded-2xl p-4 mb-6 border-2 border-amber-400 shadow-lg">
          <div className="relative">
            <div className="absolute inset-0 transform translate-y-0.5 bg-amber-900/20 rounded-2xl -z-10" />
            <div className="flex justify-between items-center relative">
              <span className="text-amber-900 font-bold">Total Farm Value</span>
              <span className="text-amber-900 font-bold text-xl">$2,847,650</span>
            </div>
            <div className="absolute top-0 left-2 w-4 h-4 bg-white/30 rounded-full blur-md" />
          </div>
        </div>

        {/* Sell Farm Button */}
        <div className="relative">
          {/* Shadow layers for 3D effect */}
          <div className="absolute inset-0 transform translate-y-2 bg-amber-900/40 rounded-2xl -z-10" />
          <div className="absolute inset-0 transform translate-y-1 bg-amber-800/30 rounded-2xl -z-10" />
          
          <button
            onClick={onSellFarm}
            className="relative w-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 text-white py-4 px-6 rounded-2xl shadow-2xl border-4 border-amber-300 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {/* Inner highlight for 3D effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-2xl" />
            
            <div className="relative flex items-center justify-center space-x-3">
              <span className="text-lg font-bold drop-shadow-lg">SELL FARM</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-amber-600 text-lg">💰</span>
              </div>
            </div>
            
            {/* Main shine effect */}
            <div className="absolute top-1 left-4 w-6 h-6 bg-white/20 rounded-full blur-lg" />
          </button>
        </div>

        {/* Prestige info */}
        <div className="text-center mt-3">
          <div className="text-amber-700 text-xs">
            Gain <span className="font-bold text-amber-800">+15 Golden Combs</span> • Next Level: Forest Valley
          </div>
        </div>
      </div>
    </div>
  );
}