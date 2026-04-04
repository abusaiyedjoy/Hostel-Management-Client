// src/hooks/useAuth.ts
'use client'

import { useAppSelector, useAppDispatch } from '@/redux/store/hooks'
import {
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectIsAuthLoading,
  selectUserRole,
  selectIsAdmin,
  selectIsMessManager,
  selectIsMealManager,
  selectIsMember,
  logout,
  setCredentials,
} from '@/redux/features/auth/authSlice'
import { useLogoutApiMutation } from '@/redux/features/auth/authApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useAuth() {
  const dispatch = useAppDispatch()
  const router   = useRouter()

  const user            = useAppSelector(selectCurrentUser)
  const token           = useAppSelector(selectCurrentToken)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading       = useAppSelector(selectIsAuthLoading)
  const role            = useAppSelector(selectUserRole)
  const isAdmin         = useAppSelector(selectIsAdmin)
  const isMessManager   = useAppSelector(selectIsMessManager)
  const isMealManager   = useAppSelector(selectIsMealManager)
  const isMember        = useAppSelector(selectIsMember)

  const [logoutApi] = useLogoutApiMutation()

  const signOut = async () => {
    try {
      await logoutApi().unwrap()
    } catch {
      // still clear local state even if server call fails
    } finally {
      dispatch(logout())
      toast.success('Signed out successfully')
      router.push('/login')
    }
  }

  const getDashboardPath = () => {
    const map = {
      admin:        '/admin/dashboard',
      mess_manager: '/mess/dashboard',
      meal_manager: '/meal/dashboard',
      member:       '/member/dashboard',
    }
    return role ? map[role] : '/login'
  }

  const hasRole = (...roles: string[]) => !!role && roles.includes(role)

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    role,
    isAdmin,
    isMessManager,
    isMealManager,
    isMember,
    signOut,
    getDashboardPath,
    hasRole,
  }
}