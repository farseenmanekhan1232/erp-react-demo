/**
 * WindowHeader Component
 *
 * Renders the title bar of a window in the ERP interface.
 * Includes the window title and control buttons (minimize, maximize, close).
 */
import type React from "react"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"

interface WindowHeaderProps {
  title: string
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between bg-window-header py-1 px-2 border-b border-gray-400">
      <div className="flex items-center">
        <IconPlaceholder iconName="app-icon" />
        <span className="text-sm ml-1">{title}</span>
      </div>
      <div className="flex items-center">
        <button className="mx-1 text-gray-700 hover:bg-gray-200 px-1">−</button>
        <button className="mx-1 text-gray-700 hover:bg-gray-200 px-1">□</button>
        <button className="mx-1 text-gray-700 hover:bg-gray-200 px-1">×</button>
      </div>
    </div>
  )
}
