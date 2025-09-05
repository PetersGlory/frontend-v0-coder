import { useState } from 'react'
import { Settings, User, Shield, Bell, Palette, Save, X } from 'lucide-react'
import AppLayout from '../components/AppLayout'

interface UserSettings {
  name: string
  email: string
  language: string
  theme: 'light' | 'dark' | 'auto'
  notifications: {
    email: boolean
    push: boolean
    updates: boolean
  }
  security: {
    twoFactor: boolean
    sessionTimeout: number
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState<UserSettings>({
    name: 'John Doe',
    email: 'john@example.com',
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      updates: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempSettings, setTempSettings] = useState(settings)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'advanced', label: 'Advanced', icon: Settings }
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' }
  ]

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto (System)' }
  ]

  const handleSave = () => {
    setSettings(tempSettings)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempSettings(settings)
    setIsEditing(false)
  }

  const updateTempSettings = (path: string, value: any) => {
    setTempSettings(prev => {
      const newSettings = { ...prev }
      const keys = path.split('.')
      let current: any = newSettings
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      
      return newSettings
    })
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-neutral-900 mb-6">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
            <input
              type="text"
              value={tempSettings.name}
              onChange={(e) => updateTempSettings('name', e.target.value)}
              disabled={!isEditing}
              className="input disabled:bg-neutral-50 disabled:text-neutral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              value={tempSettings.email}
              onChange={(e) => updateTempSettings('email', e.target.value)}
              disabled={!isEditing}
              className="input disabled:bg-neutral-50 disabled:text-neutral-500"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-display font-semibold text-neutral-900 mb-6">Account Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
            <select
              value={tempSettings.language}
              onChange={(e) => updateTempSettings('language', e.target.value)}
              disabled={!isEditing}
              className="select disabled:bg-neutral-50"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Theme</label>
            <select
              value={tempSettings.theme}
              onChange={(e) => updateTempSettings('theme', e.target.value)}
              disabled={!isEditing}
              className="select disabled:bg-neutral-50"
            >
              {themes.map(theme => (
                <option key={theme.value} value={theme.value}>{theme.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="card">
      <h3 className="text-lg font-display font-semibold text-neutral-900 mb-6">Notification Preferences</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-neutral-900">Email Notifications</h4>
            <p className="text-sm text-neutral-600">Receive updates and important information via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempSettings.notifications.email}
              onChange={(e) => updateTempSettings('notifications.email', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 disabled:opacity-50"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-neutral-900">Push Notifications</h4>
            <p className="text-sm text-neutral-600">Receive real-time notifications in your browser</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempSettings.notifications.push}
              onChange={(e) => updateTempSettings('notifications.push', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 disabled:opacity-50"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-neutral-900">Product Updates</h4>
            <p className="text-sm text-neutral-600">Get notified about new features and improvements</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempSettings.notifications.updates}
              onChange={(e) => updateTempSettings('notifications.updates', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 disabled:opacity-50"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-neutral-900 mb-6">Security Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-neutral-900">Two-Factor Authentication</h4>
              <p className="text-sm text-neutral-600">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tempSettings.security.twoFactor}
                onChange={(e) => updateTempSettings('security.twoFactor', e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 disabled:opacity-50"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={tempSettings.security.sessionTimeout}
              onChange={(e) => updateTempSettings('security.sessionTimeout', parseInt(e.target.value))}
              disabled={!isEditing}
              min="5"
              max="480"
              className="input disabled:bg-neutral-50 disabled:text-neutral-500"
            />
          </div>
        </div>
      </div>

      <div className="card border-red-200 bg-red-50/50">
        <h3 className="text-lg font-display font-semibold text-neutral-900 mb-6">Danger Zone</h3>
        <div className="space-y-4">
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
            <button className="btn-sm bg-red-600 hover:bg-red-700 text-white">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'notifications':
        return renderNotificationsTab()
      case 'security':
        return renderSecurityTab()
      default:
        return (
          <div className="card text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Settings className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">Coming Soon</h3>
            <p className="text-neutral-600">This section is under development</p>
          </div>
        )
    }
  }

  return (
    <AppLayout
      title="Settings"
      subtitle="Manage your account preferences and settings"
    >
      {/* Settings Container */}
      <div className="card overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-neutral-200/50">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-neutral-200/50">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Settings
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
