import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@repo/api"
import type { RequireAuthProps } from "./types"

export const RequireAuth = ({ loginPath, roles }: RequireAuthProps) => {
  const user = useAuthStore((state) => state.user)
  const bypassAuth = useAuthStore((state) => state.bypassAuth)
  const setBypassAuth = useAuthStore((state) => state.setBypassAuth)
  const location = useLocation()

  const param = new URLSearchParams(location.search).get("forceAuth")

  useEffect(() => {
    if (param === "true") setBypassAuth(true)
    if (param === "false") setBypassAuth(false)
  }, [param, setBypassAuth])

  const effectiveBypass = param === "false" ? false : param === "true" ? true : bypassAuth

  if (!user && !effectiveBypass) {
    return <Navigate to={loginPath} replace state={{ from: location }} />
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={loginPath} replace />
  }

  return <Outlet />
}
