import { X, Beaker } from "lucide-react";
import { Button } from "./ui/button";

interface ResearchItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  completed: boolean;
  icon: string;
}

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResearchModal({ isOpen, onClose }: ResearchModalProps) {
  if (!isOpen) return null;

  const research: ResearchItem[] = [
    { id: "1", name: "Efficient Foraging", description: "Bees collect 25% more honey per trip", cost: 500, completed: true, icon: "🍯" },
    { id: "2", name: "Hive Expansion", description: "Increase maximum bee capacity by 10", cost: 1000, completed: false, icon: "🏠" },
    { id: "3", name: "Queen Bee", description: "Unlocks royal honey production", cost: 2500, completed: false, icon: "👑" },
    { id: "4", name: "Pollination Network", description: "Bees work 15% faster", cost: 750, completed: false, icon: "🌸" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl p-6 shadow-2xl border-2 border-amber-200 max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Beaker className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-gray-800 font-bold text-xl">Research Lab</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Research Items */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {research.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 ${
                item.completed 
                  ? "bg-green-50 border-green-200" 
                  : "bg-white border-amber-200 shadow-sm"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-amber-600 font-bold">{item.cost} 🍯</span>
                    <Button
                      className={`${
                        item.completed
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-amber-500 hover:bg-amber-600"
                      } text-white px-4 py-2 rounded-lg`}
                      disabled={item.completed}
                    >
                      {item.completed ? "Complete" : "Research"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}