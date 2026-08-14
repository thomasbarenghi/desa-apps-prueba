export interface NavItem {
  id: string
  label: string
  path: string
}

export interface StoreHeaderProps {
  clientId?: number
  onNavigate?: () => void
}
