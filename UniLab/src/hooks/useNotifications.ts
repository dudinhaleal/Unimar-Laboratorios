import { useState } from 'react'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
  timestamp: number
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now()
    }
    
    setNotifications(prev => [...prev, newNotification])

    // auto remove após a duração
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const showSuccess = (title: string, message: string) => {
    addNotification({ type: 'success', title, message })
  }

  const showError = (title: string, message: string) => {
    addNotification({ type: 'error', title, message, duration: 0 })
  }

  const showInfo = (title: string, message: string) => {
    addNotification({ type: 'info', title, message })
  }

  const showWarning = (title: string, message: string) => {
    addNotification({ type: 'warning', title, message })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showInfo,
    showWarning
  }
}
