/**
 * LegacyErpInterface Component
 *
 * This component renders the main layout of the legacy ERP interface.
 * It includes the navigation bar, sidebar menu, and the sales window.
 */
import type React from "react"
import { NavigationBar } from "./erp/navigation-bar"
import { SidebarMenu } from "./erp/sidebar-menu"
import SalesWindow from "./erp/sales-window"

const LegacyErpInterface: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Top navigation bars */}
      <NavigationBar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar menu */}
        <SidebarMenu />

        {/* Main content - Sales window */}
        <div className="flex-1 p-4 overflow-auto">
          <SalesWindow />
        </div>
      </div>
    </div>
  )
}

export default LegacyErpInterface
