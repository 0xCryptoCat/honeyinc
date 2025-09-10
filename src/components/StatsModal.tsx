import { X, BarChart3, TrendingUp } from "lucide-react";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  if (!isOpen) return null;

  const stats = [
    { label: "Total Honey Produced", value: "1,234,567", icon: "🍯", trend: "+12%" },
    { label: "Active Bees", value: "42", icon: "🐝", trend: "+3" },
    { label: "Hives Built", value: "8", icon: "🏠", trend: "+1" },
    { label: "Research Completed", value: "15", icon: "🔬", trend: "+2" },
    { label: "Flowers Pollinated", value: "9,876", icon: "🌸", trend: "+245" },
    { label: "Time Played", value: "12h 34m", icon: "⏰", trend: "" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl p-6 shadow-2xl border-2 border-amber-200 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-gray-800 font-bold text-xl">Statistics</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-amber-50 rounded-xl p-4 border border-amber-200"
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-gray-700 text-sm">{stat.label}</span>
              </div>
              <div className="font-bold text-gray-800 text-lg">{stat.value}</div>
              {stat.trend && (
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-600 text-xs">{stat.trend}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">🏆</span>
            <span className="font-bold text-gray-800">Recent Achievement</span>
          </div>
          <div className="text-gray-700 text-sm">
            "Busy Bee" - Produced 1 million honey!
          </div>
        </div>
      </div>
    </div>
  );
}