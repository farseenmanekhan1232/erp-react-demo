/**
 * SidebarMenu Component
 *
 * Renders the left sidebar menu of the ERP interface.
 * This includes the collapsible menu tree with various operation options.
 */
import type React from "react"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"

interface MenuItemProps {
  label: string
  iconName: string
  isActive?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ label, iconName, isActive = false }) => (
  <div className={`flex items-center px-2 py-1 ${isActive ? "bg-active-item" : ""} hover:bg-[#f0f0f0]`}>
    <IconPlaceholder width={24} height={24} iconName={iconName} />
    <span className="text-sm ml-1">{label}</span>
  </div>
)

export const SidebarMenu: React.FC = () => {
  // Menu items for the sidebar with their respective icon names
  const menuItems = [
    { label: "叫貨管理", iconName: "order", active: false },
    { label: "瓦斯綜合管理", iconName: "gas", active: false },
    { label: "銷售作業", iconName: "sales", active: true },
    { label: "進貨作業", iconName: "purchase", active: false },
    { label: "報價作業", iconName: "price", active: false },
    { label: "廠商訂貨作業", iconName: "wholesale", active: false },
    { label: "盤點作業", iconName: "inventory", active: false },
    { label: "車輛狀況記錄", iconName: "vehicle", active: false },
    { label: "每日基本設定", iconName: "daily", active: false },
    { label: "車輛加油記錄", iconName: "refuel", active: false },
    { label: "瓦斯異動登錄", iconName: "gas-activity", active: false },
    { label: "訊息通知", iconName: "message", active: false },
    { label: "驗瓶資料匯入", iconName: "import", active: false },
    { label: "流量表登錄作業", iconName: "flow", active: false },
    { label: "調撥作業", iconName: "adjust", active: false },
    { label: "車次管理", iconName: "vehicle-fault", active: false },
    { label: "送貨管理", iconName: "delivery", active: false },
    { label: "發票開立作業", iconName: "invoice", active: false },
  ]

  return (
    <div className="w-60 bg-sidebar border-r border-gray-300 overflow-y-auto">
      <div className="flex items-center px-2 py-1 border-b border-gray-200 bg-form-gray">
        <IconPlaceholder iconName="folder" />
        <IconPlaceholder iconName="collapse" />
        <span className="text-sm ml-1">例行作業</span>
      </div>
      <div className="pl-6">
        {menuItems.map((item, index) => (
          <MenuItem key={index} label={item.label} iconName={item.iconName} isActive={item.active} />
        ))}
      </div>
    </div>
  )
}
