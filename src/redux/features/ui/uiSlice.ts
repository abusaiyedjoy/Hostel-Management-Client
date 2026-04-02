// src/redux/features/ui/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

interface UIState {
  sidebarCollapsed: boolean
  activeModal: string | null
  modalData: Record<string, any>
  notifications: Notification[]
  unreadCount: number
  isPageLoading: boolean
}

const initialState: UIState = {
  sidebarCollapsed: false,
  activeModal: null,
  modalData: {},
  notifications: [],
  unreadCount: 0,
  isPageLoading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },

    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },

    openModal: (state, action: PayloadAction<{ name: string; data?: Record<string, any> }>) => {
      state.activeModal = action.payload.name
      state.modalData = action.payload.data ?? {}
    },

    closeModal: (state) => {
      state.activeModal = null
      state.modalData = {}
    },

    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, 'id' | 'read' | 'createdAt'>>
    ) => {
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).slice(2),
        read: false,
        createdAt: new Date().toISOString(),
      }
      state.notifications = [notification, ...state.notifications].slice(0, 50)
      state.unreadCount += 1
    },

    markNotificationRead: (state, action: PayloadAction<string>) => {
      const n = state.notifications.find((n) => n.id === action.payload)
      if (n && !n.read) {
        n.read = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },

    markAllNotificationsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true))
      state.unreadCount = 0
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      const wasUnread = state.notifications.find(
        (n) => n.id === action.payload && !n.read
      )
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      )
      if (wasUnread) state.unreadCount = Math.max(0, state.unreadCount - 1)
    },

    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },

    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isPageLoading = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarCollapsed,
  openModal,
  closeModal,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  clearNotifications,
  setPageLoading,
} = uiSlice.actions

// ─── Selectors ───────────────────────────────────────────────────────────────
export const selectSidebarCollapsed   = (s: { ui: UIState }) => s.ui.sidebarCollapsed
export const selectActiveModal        = (s: { ui: UIState }) => s.ui.activeModal
export const selectModalData          = (s: { ui: UIState }) => s.ui.modalData
export const selectNotifications      = (s: { ui: UIState }) => s.ui.notifications
export const selectUnreadCount        = (s: { ui: UIState }) => s.ui.unreadCount
export const selectIsPageLoading      = (s: { ui: UIState }) => s.ui.isPageLoading

export default uiSlice.reducer