import { useState } from "react";
import { GameHeader } from "./components/GameHeader";
import { ActionButtons } from "./components/ActionButtons";
import { NotificationPanel } from "./components/NotificationPanel";
import { UpgradeModal } from "./components/UpgradeModal";
import { ResearchModal } from "./components/ResearchModal";
import { SettingsModal } from "./components/SettingsModal";
import { HoneyTypesModal } from "./components/HoneyTypesModal";
import { ShopModal } from "./components/ShopModal";
import { GameScene } from "./components/GameScene";

export default function App() {
  const [layoutMode, setLayoutMode] = useState<"compact" | "expanded">("compact");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<string>("");
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
    
    // Map actions to consolidated modals with specific tabs
    const modalConfig: { [key: string]: { modal: string, tab: string } } = {
      "boosts": { modal: "research", tab: "epic" },           // Star -> Epic Research
      "tier-upgrade": { modal: "research", tab: "research" }, // Trending -> Regular Research
      "upgrade": { modal: "upgrade", tab: "buildings" },     // Building -> Building Upgrades
      "shop": { modal: "shop", tab: "shop" },                // Cart -> Shop
      "settings": { modal: "settings", tab: "settings" }     // Settings -> Settings
    };

    if (modalConfig[action]) {
      console.log("App: Setting modalInitialTab to:", modalConfig[action].tab); // Debug log
      setModalInitialTab(modalConfig[action].tab);
      setActiveModal(modalConfig[action].modal);
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
    setModalInitialTab("");
  };

  const handleDismissLeftNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDismissRightNotification = (id: string) => {
    setRightNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLeftHexagonClick = () => {
    setModalInitialTab("");
    setActiveModal("honey-types");
  };

  const handleRightHexagonClick = () => {
    setModalInitialTab("shop");
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

  const handleUseBoost = (boostId: string, amount: number) => {
    console.log("Using boost:", boostId, "amount:", amount);
    // Add boost logic here
  };

  const handleUpgradeHive = (slotId: number) => {
    console.log("Upgrading hive slot:", slotId);
    // Add hive upgrade logic here
  };

  const handleReplaceHive = (slotId: number) => {
    console.log("Replacing hive slot:", slotId);
    // Add hive replacement logic here
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* 3D Game Scene */}
      <GameScene />

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

      {/* Consolidated Modals */}
      <UpgradeModal
        isOpen={activeModal === "upgrade"}
        onClose={closeModal}
        title="HIVE MANAGEMENT"
        capacity={1234}
        utilization={85}
        upgrades={mockUpgrades}
        onUpgrade={(id) => console.log("Upgrade:", id)}
        onUpgradeHive={handleUpgradeHive}
        onReplaceHive={handleReplaceHive}
        initialTab={modalInitialTab}
      />

      <ResearchModal
        isOpen={activeModal === "research"}
        onClose={closeModal}
        initialTab={modalInitialTab}
      />

      <SettingsModal
        isOpen={activeModal === "settings"}
        onClose={closeModal}
        initialTab={modalInitialTab}
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
        onUseBoost={handleUseBoost}
        initialTab={modalInitialTab}
      />
    </div>
  );
}