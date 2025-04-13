/**
 * NavigationBar Component
 *
 * Renders the top navigation bars of the ERP interface.
 * This includes the main menu items and sub-menu items.
 */
import type React from "react"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"

interface NavigationItemProps {
  label: string
  iconName: string
  isLast?: boolean
}

const NavigationItem: React.FC<NavigationItemProps> = ({ label, iconName, isLast = false }) => (
  <div className={`flex items-center ${!isLast ? "border-r border-gray-300" : ""} px-2 py-1`}>
    <IconPlaceholder iconName={iconName} />
    <span className="text-sm">{label}</span>
  </div>
)

export const NavigationBar: React.FC = () => {
  // Main menu items with their icon names
  const mainMenuItems = [
    { label: "例行作業", iconName: "routine" },
    { label: "基本資料", iconName: "basic-data" },
    { label: "帳款作業", iconName: "accounting" },
    { label: "報表作業", iconName: "report" },
    { label: "系統設定", iconName: "system" },
  ]

  // Sub-menu items with their icon names
  const subMenuItems = [
    { label: "管理系統", iconName: "management" },
    { label: "分裝作業", iconName: "packaging" },
    { label: "會計總帳", iconName: "accounting" },
    { label: "來電顯示", iconName: "call-display" },
    { label: "訊息通知", iconName: "notification" },
    { label: "使用者", iconName: "user" },
    { label: "手動來電", iconName: "manual-call" },
  ]

  return (
    <>
      {/* Top navigation bar - first row */}
      <div className="bg-[#f0f0f0] border-b border-gray-300 flex">
        {mainMenuItems.map((item, index) => (
          <NavigationItem
            key={`main-${index}`}
            label={item.label}
            iconName={item.iconName}
            isLast={index === mainMenuItems.length - 1}
          />
        ))}
      </div>

      {/* Top navigation bar - second row */}
      <div className="bg-[#f0f0f0] border-b border-gray-300 flex">
        {subMenuItems.map((item, index) => (
          <NavigationItem
            key={`sub-${index}`}
            label={item.label}
            iconName={item.iconName}
            isLast={index === subMenuItems.length - 1}
          />
        ))}
      </div>
    </>
  )
}
