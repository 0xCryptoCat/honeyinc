import { Package, Gift, X } from "lucide-react";
import { useState } from "react";

interface NotificationItem {
  id: string;
  type: "package" | "gift";
  count: number;
  color: string;
}

interface NotificationPanelProps {
  notifications: NotificationItem[];
  position: "left" | "right";
  onDismiss?: (id: string) => void;
}

export function NotificationPanel({ notifications, position, onDismiss }: NotificationPanelProps) {
  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissingIds(prev => new Set(prev).add(id));
    // Call the actual dismiss after animation completes
    setTimeout(() => {
      onDismiss?.(id);
      setDismissingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  if (notifications.length === 0) return null;

  return (
    <div className={`absolute top-32 ${position === "left" ? "left-4" : "right-4"} z-40 space-y-2`}>
      {notifications.map((notification) => {
        const isDismissing = dismissingIds.has(notification.id);
        return (
          <div
            key={notification.id}
            className={`relative transition-all duration-300 ${
              isDismissing 
                ? `transform ${position === "left" ? "-translate-x-16" : "translate-x-16"} opacity-0` 
                : "transform translate-x-0 opacity-100"
            }`}
          >
            {/* Small pill-shaped notification with increased height */}
            <div className="relative">
            
              
              {/* Main notification pill - increased height by 5px */}
              <div className={`${notification.color} px-3 py-2.5 rounded-full shadow-lg border border-white/30 flex items-center space-x-1.5 min-w-14`}>
                {/* Icon */}
                {notification.type === "package" ? (
                  <Package className="w-3 h-3 text-white drop-shadow-sm" />
                ) : (
                  <Gift className="w-3 h-3 text-white drop-shadow-sm" />
                )}
                
                {/* Count */}
                <span className="text-white text-xs font-bold drop-shadow-sm">+{notification.count}</span>
                
                {/* Inner shine effect */}
                <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm" />
              </div>
            </div>
            
            {onDismiss && (
              <button
                onClick={() => handleDismiss(notification.id)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md border border-red-400"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}