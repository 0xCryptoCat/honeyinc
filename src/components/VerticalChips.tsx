import { 
  Calendar, 
  FileText, 
  Target, 
  Gem, 
  Zap, 
  Gift, 
  Package, 
  Newspaper, 
  Info, 
  Bell 
} from "lucide-react";

interface ChipItem {
  id: string;
  icon: any;
  label: string;
  color: string;
  count?: number;
}

interface VerticalChipsProps {
  position: "left" | "right";
  onChipClick?: (chipId: string) => void;
}

export function VerticalChips({ position, onChipClick }: VerticalChipsProps) {
  const leftChips: ChipItem[] = [
    { 
      id: "events", 
      icon: Calendar, 
      label: "Events", 
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      count: 2
    },
    { 
      id: "contracts", 
      icon: FileText, 
      label: "Contracts", 
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      count: 5
    },
    { 
      id: "missions", 
      icon: Target, 
      label: "Missions", 
      color: "bg-gradient-to-r from-green-500 to-green-600",
      count: 3
    },
    { 
      id: "artifacts", 
      icon: Gem, 
      label: "Artifacts", 
      color: "bg-gradient-to-r from-pink-500 to-pink-600"
    },
    { 
      id: "boosts", 
      icon: Zap, 
      label: "Boosts", 
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      count: 12
    }
  ];

  const rightChips: ChipItem[] = [
    { 
      id: "rewards", 
      icon: Gift, 
      label: "Rewards", 
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      count: 4
    },
    { 
      id: "boxes", 
      icon: Package, 
      label: "Boxes", 
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      count: 7
    },
    { 
      id: "newspaper", 
      icon: Newspaper, 
      label: "News", 
      color: "bg-gradient-to-r from-gray-500 to-gray-600"
    },
    { 
      id: "info", 
      icon: Info, 
      label: "Info", 
      color: "bg-gradient-to-r from-cyan-500 to-cyan-600"
    },
    { 
      id: "alerts", 
      icon: Bell, 
      label: "Alerts", 
      color: "bg-gradient-to-r from-red-500 to-red-600",
      count: 1
    }
  ];

  const chips = position === "left" ? leftChips : rightChips;

  return (
    <div className={`absolute top-24 ${position === "left" ? "left-2" : "right-2"} z-30 space-y-3`}>
      {chips.map((chip) => {
        const Icon = chip.icon;
        return (
          <button
            key={chip.id}
            onClick={() => onChipClick?.(chip.id)}
            className="relative group"
          >
            {/* Main chip container */}
            <div className="relative">
              {/* Shadow layer */}
              <div className="absolute inset-0 transform translate-x-1 translate-y-1 bg-black/20 rounded-full -z-10" />
              
              {/* Main chip */}
              <div className={`${chip.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 hover:scale-110 active:scale-95 transition-all duration-200`}>
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full" />
                
                <Icon className="w-5 h-5 text-white drop-shadow-lg relative" />
                
                {/* Shine effect */}
                <div className="absolute top-1.5 left-2 w-2 h-2 bg-white/40 rounded-full blur-sm" />
              </div>

              {/* Count badge */}
              {chip.count && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border border-red-400">
                  {chip.count > 9 ? "9+" : chip.count}
                </div>
              )}
            </div>

            {/* Tooltip */}
            <div className={`absolute top-1/2 transform -translate-y-1/2 ${
              position === "left" ? "left-16" : "right-16"
            } bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50`}>
              {chip.label}
              <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                position === "left" ? "-left-1" : "-right-1"
              } w-2 h-2 bg-gray-900 rotate-45`} />
            </div>
          </button>
        );
      })}
    </div>
  );
}