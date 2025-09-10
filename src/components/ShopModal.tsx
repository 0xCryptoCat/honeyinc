import { X, Coins } from "lucide-react";
import { useState } from "react";

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus: string;
  popular?: boolean;
}

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCoins: number;
  onPurchase?: (packageId: string) => void;
}

export function ShopModal({ isOpen, onClose, currentCoins, onPurchase }: ShopModalProps) {
  const [coinPackages] = useState<CoinPackage[]>([
    {
      id: "starter",
      name: "Starter Pack",
      coins: 100,
      price: 0.99,
      bonus: "+10 Bonus"
    },
    {
      id: "sweet",
      name: "Sweet Deal",
      coins: 500,
      price: 4.99,
      bonus: "+75 Bonus"
    },
    {
      id: "golden",
      name: "Golden Hive",
      coins: 1200,
      price: 9.99,
      bonus: "+200 Bonus",
      popular: true
    },
    {
      id: "premium",
      name: "Premium Harvest",
      coins: 2500,
      price: 19.99,
      bonus: "+500 Bonus"
    },
    {
      id: "ultimate",
      name: "Ultimate Swarm",
      coins: 6000,
      price: 49.99,
      bonus: "+1500 Bonus"
    }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-b from-white via-amber-50 to-amber-100 rounded-3xl p-6 w-full max-w-md shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-y-auto">
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
          <h2 className="text-amber-900 font-bold text-xl mb-2">HONEY COIN SHOP</h2>
          <div className="flex justify-center">
            <div className="bg-amber-200 h-1 w-16 rounded-full shadow-inner">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-full rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Current Coins Display */}
        <div className="relative bg-gradient-to-r from-yellow-300 to-amber-400 rounded-2xl p-4 mb-6 border-2 border-yellow-500 shadow-lg">
          <div className="absolute inset-0 transform translate-y-1 bg-amber-900/20 rounded-2xl -z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-2xl" />
          
          <div className="flex items-center justify-center space-x-3 relative">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
              <Coins className="w-5 h-5 text-white drop-shadow-lg" />
              <div className="absolute top-1 left-1.5 w-2 h-2 bg-white/40 rounded-full blur-sm" />
            </div>
            <div className="text-center">
              <div className="text-amber-900 font-bold text-lg">{currentCoins.toLocaleString()}</div>
              <div className="text-amber-700 text-xs">Honey Coins</div>
            </div>
          </div>
          
          <div className="absolute top-1 left-4 w-4 h-4 bg-white/30 rounded-full blur-md" />
        </div>

        {/* Coin Packages */}
        <div className="space-y-3 mb-4">
          {coinPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 shadow-lg transition-all duration-200 hover:scale-102 ${
                pkg.popular 
                  ? "border-yellow-400 ring-2 ring-yellow-300" 
                  : "border-amber-200"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-lg border border-yellow-300 font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              {/* Shadow layer */}
              <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
              
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-2xl" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-amber-900 font-bold text-sm">{pkg.name}</div>
                    <div className="text-amber-600 text-xs">{pkg.bonus}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-amber-900 font-bold text-lg">{pkg.coins.toLocaleString()}</div>
                    <div className="text-amber-600 text-xs">coins</div>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => onPurchase?.(pkg.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-2 ${
                    pkg.popular
                      ? "bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 border-yellow-300"
                      : "bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-amber-300"
                  }`}
                >
                  {/* Inner highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-xl" />
                  
                  <div className="relative flex items-center justify-center space-x-2">
                    <span>${pkg.price}</span>
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Coins className="w-3 h-3 text-amber-600" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-2xl p-4 border-2 border-purple-300 shadow-lg">
          <div className="relative">
            <div className="absolute inset-0 transform translate-y-0.5 bg-purple-900/20 rounded-2xl -z-10" />
            <div className="text-center relative">
              <div className="text-purple-800 font-bold text-sm mb-1">🎁 DAILY BONUS</div>
              <div className="text-purple-700 text-xs">
                Get <span className="font-bold">50 FREE coins</span> in 23:45:12
              </div>
            </div>
            <div className="absolute top-0 left-2 w-3 h-3 bg-white/30 rounded-full blur-sm" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <div className="text-amber-600 text-xs">
            Secure payment • Instant delivery • No ads
          </div>
        </div>
      </div>
    </div>
  );
}