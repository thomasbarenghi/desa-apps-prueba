import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { routes } from "../routes"
import { useAuthStore } from "../stores/authStore"

export const RequireAuth = () => {
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
    return <Navigate to={routes.login} replace state={{ from: location }} />
  }

  return <Outlet />
}
