import { useState } from "react";
import { GameHeader } from "./components/GameHeader";
import { ActionButtons } from "./components/ActionButtons";
import { NotificationPanel } from "./components/NotificationPanel";
import { UpgradeModal } from "./components/UpgradeModal";
import { ResearchModal } from "./components/ResearchModal";
import { StatsModal } from "./components/StatsModal";
import { SettingsModal } from "./components/SettingsModal";
import { HoneyTypesModal } from "./components/HoneyTypesModal";
import { ShopModal } from "./components/ShopModal";

export default function App() {
  const [layoutMode, setLayoutMode] = useState<"compact" | "expanded">("compact");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentCoins] = useState(1247);
  
  const [notifications, setNotifications] = useState([
    { id: "1", type: "package" as const, count: 3, color: "bg-gradient-to-r from-purple-500 to-purple-600" },
  ]);

  const [rightNotifications, setRightNotifications] = useState([
    { id: "2", type: "gift" as const, count: 3, color: "bg-gradient-to-r from-amber-500 to-amber-600" },
    { id: "3", type: "package" as const, count: 1, color: "bg-gradient-to-r from-gray-400 to-gray-500" },
    { id: "4", type: "package" as const, count: 1, color: "bg-gradient-to-r from-gray-400 to-gray-500" },
  ]);

  const mockUpgrades = [
    {
      id: "1",
      name: "Expand East Corner",
      description: "OCCUPANCY +5",
      cost: 1000,
      level: 3,
      maxLevel: 5,
    },
    {
      id: "2", 
      name: "Expand West Corner",
      description: "OCCUPANCY +5", 
      cost: 2000,
      level: 4,
      maxLevel: 5,
    },
    {
      id: "3",
      name: "Expand North Corner", 
      description: "OCCUPANCY +5",
      cost: 1500,
      level: 5,
      maxLevel: 5,
    },
    {
      id: "4",
      name: "Expand South Corner",
      description: "OCCUPANCY +5",
      cost: 3000, 
      level: 2,
      maxLevel: 5,
    },
  ];

  const handleActionClick = (action: string) => {
    console.log("Action clicked:", action);
    
    // Map actions to modals
    const modalMap: { [key: string]: string } = {
      "star": "research",
      "timer": "upgrade",
      "network": "settings",
      "grid": "upgrade"
    };

    if (modalMap[action]) {
      setActiveModal(modalMap[action]);
    } else if (action === "create-bees") {
      // Handle bee creation logic
      console.log("Creating bees!");
      // Could add bee creation animation here
    }
  };

  const handleLayoutToggle = () => {
    setLayoutMode(layoutMode === "compact" ? "expanded" : "compact");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleDismissLeftNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDismissRightNotification = (id: string) => {
    setRightNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLeftHexagonClick = () => {
    setActiveModal("honey-types");
  };

  const handleRightHexagonClick = () => {
    setActiveModal("shop");
  };

  const handleSellFarm = () => {
    console.log("Selling farm and prestiging!");
    // Add prestige logic here
    closeModal();
  };

  const handlePurchase = (packageId: string) => {
    console.log("Purchasing package:", packageId);
    // Add purchase logic here
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Background placeholder with smaller text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-amber-200/15 text-6xl font-bold rotate-12 select-none tracking-wider">
          HONEY, INC.
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpolygon points='30,5 55,25 55,55 30,75 5,55 5,25'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Game UI */}
      <GameHeader
        honeyCount={1234567}
        goldenHoney={1234}
        timeBonus={6}
        onLeftHexagonClick={handleLeftHexagonClick}
        onRightHexagonClick={handleRightHexagonClick}
      />

      {/* Notifications */}
      <NotificationPanel
        notifications={notifications}
        position="left"
        onDismiss={handleDismissLeftNotification}
      />

      <NotificationPanel
        notifications={rightNotifications}
        position="right"
        onDismiss={handleDismissRightNotification}
      />

      {/* Action Buttons */}
      <ActionButtons
        layoutMode={layoutMode}
        onButtonClick={handleActionClick}
        onLayoutToggle={handleLayoutToggle}
      />

      {/* Modals */}
      <UpgradeModal
        isOpen={activeModal === "upgrade"}
        onClose={closeModal}
        title="HIVE TOWER"
        capacity={1234}
        utilization={85}
        upgrades={mockUpgrades}
        onUpgrade={(id) => console.log("Upgrade:", id)}
      />

      <ResearchModal
        isOpen={activeModal === "research"}
        onClose={closeModal}
      />

      <StatsModal
        isOpen={activeModal === "stats"}
        onClose={closeModal}
      />

      <SettingsModal
        isOpen={activeModal === "settings"}
        onClose={closeModal}
      />

      <HoneyTypesModal
        isOpen={activeModal === "honey-types"}
        onClose={closeModal}
        onSellFarm={handleSellFarm}
      />

      <ShopModal
        isOpen={activeModal === "shop"}
        onClose={closeModal}
        currentCoins={currentCoins}
        onPurchase={handlePurchase}
      />
    </div>
  );
}