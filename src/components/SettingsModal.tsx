import { X, Settings, Info, Volume2, VolumeX, Bell, BellOff, Users, Mail, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export function SettingsModal({ isOpen, onClose, initialTab = "settings" }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState("settings"); // Always start with default
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  // Reset tab when modal opens with new initialTab
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || "settings");
      console.log("SettingsModal: Setting initial tab to:", initialTab); // Debug log
    }
  }, [isOpen, initialTab]);

  const tabs = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "info", label: "Info & Stats", icon: Info }
  ];

  const statsData = [
    { label: "Total Honey Produced", value: "2.4M jars", icon: "🍯" },
    { label: "Total Bees Spawned", value: "48,392", icon: "🐝" },
    { label: "Days Playing", value: "15 days", icon: "📅" },
    { label: "Lifetime Earnings", value: "$12.8M", icon: "💰" },
    { label: "Prestige Count", value: "3 times", icon: "⭐" },
    { label: "Hives Built", value: "24 hives", icon: "🏠" }
  ];

  const achievements = [
    { name: "First Drop", description: "Produce your first honey", unlocked: true },
    { name: "Bee Keeper", description: "Spawn 1,000 bees", unlocked: true },
    { name: "Sweet Success", description: "Earn $1M", unlocked: true },
    { name: "Hive Mind", description: "Build 10 hives", unlocked: false },
    { name: "Golden Touch", description: "Reach tier 10 honey", unlocked: false }
  ];

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
          <h2 className="text-amber-900 font-bold text-xl mb-2">
            {activeTab === "settings" ? "SETTINGS" : "INFO & STATISTICS"}
          </h2>
          <div className="flex justify-center">
            <div className="bg-amber-200 h-1 w-16 rounded-full shadow-inner">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-full rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-amber-200/50 p-1 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-1 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg"
                    : "bg-white/50 text-amber-800 hover:bg-white/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === "settings" && (
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {/* Audio Settings */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 border-amber-200 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                
                <div className="relative space-y-3">
                  <h3 className="text-amber-900 font-bold text-lg mb-3">Audio</h3>
                  
                  {/* Sound Effects */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {audioEnabled ? <Volume2 className="w-5 h-5 text-amber-600" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
                      <span className="text-amber-900 font-bold">Sound Effects</span>
                    </div>
                    <button
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        audioEnabled ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                        audioEnabled ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>

                  {/* Music */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎵</span>
                      <span className="text-amber-900 font-bold">Background Music</span>
                    </div>
                    <button
                      onClick={() => setMusicEnabled(!musicEnabled)}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        musicEnabled ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                        musicEnabled ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 border-amber-200 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                
                <div className="relative">
                  <h3 className="text-amber-900 font-bold text-lg mb-3">Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {notificationsEnabled ? <Bell className="w-5 h-5 text-amber-600" /> : <BellOff className="w-5 h-5 text-gray-500" />}
                      <span className="text-amber-900 font-bold">Push Notifications</span>
                    </div>
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        notificationsEnabled ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Support */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 border-amber-200 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                
                <div className="relative">
                  <h3 className="text-amber-900 font-bold text-lg mb-3">Social & Support</h3>
                  
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-amber-900 font-bold">Join Community</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200">
                      <Mail className="w-5 h-5 text-green-600" />
                      <span className="text-amber-900 font-bold">Contact Support</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <span className="text-amber-900 font-bold">Rate Game</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-gradient-to-r from-amber-200 to-amber-300 rounded-2xl p-4 border-2 border-amber-400 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-0.5 bg-amber-900/20 rounded-2xl -z-10" />
                <div className="relative text-center">
                  <div className="text-amber-900 font-bold text-lg">Honey, Inc.</div>
                  <div className="text-amber-700 text-sm">Version 1.2.3</div>
                  <div className="text-amber-600 text-xs mt-1">© 2024 Bee Studios</div>
                </div>
                <div className="absolute top-0 left-2 w-4 h-4 bg-white/30 rounded-full blur-md" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {/* Statistics */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 border-amber-200 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                
                <div className="relative">
                  <h3 className="text-amber-900 font-bold text-lg mb-3">Statistics</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {statsData.map((stat, index) => (
                      <div key={index} className="bg-white/50 rounded-xl p-3 border border-amber-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{stat.icon}</span>
                          <span className="text-amber-700 text-xs font-bold">{stat.label}</span>
                        </div>
                        <div className="text-amber-900 font-bold text-sm">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-2xl p-4 border-2 border-amber-200 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-1 bg-amber-900/10 rounded-2xl -z-10" />
                
                <div className="relative">
                  <h3 className="text-amber-900 font-bold text-lg mb-3">Achievements</h3>
                  
                  <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.unlocked ? "bg-green-100 border border-green-300" : "bg-gray-100 border border-gray-300"
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? "bg-green-500" : "bg-gray-400"
                        }`}>
                          <span className="text-white text-xs">
                            {achievement.unlocked ? "✓" : "?"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-sm ${
                            achievement.unlocked ? "text-green-900" : "text-gray-600"
                          }`}>
                            {achievement.name}
                          </div>
                          <div className={`text-xs ${
                            achievement.unlocked ? "text-green-700" : "text-gray-500"
                          }`}>
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Game Tips */}
            <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl p-4 border-2 border-blue-400 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 transform translate-y-0.5 bg-blue-900/20 rounded-2xl -z-10" />
                <div className="relative">
                  <h3 className="text-blue-900 font-bold text-lg mb-2">💡 Pro Tip</h3>
                  <div className="text-blue-800 text-sm">
                    Focus on research upgrades early to maximize your honey production efficiency!
                  </div>
                </div>
                <div className="absolute top-0 left-2 w-4 h-4 bg-white/30 rounded-full blur-md" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}