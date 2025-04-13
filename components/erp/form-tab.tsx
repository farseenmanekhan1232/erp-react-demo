/**
 * FormTab Component
 *
 * Renders a tab in the form section of the ERP interface.
 */
import type React from "react"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"

interface FormTabProps {
  label: string
  iconName?: string
  isActive?: boolean
}

export const FormTab: React.FC<FormTabProps> = ({ label, iconName = "sales-tab", isActive = true }) => {
  return (
    <div
      className={`
      ${isActive ? "erp-tab-active" : "erp-tab-inactive"} 
      border-r border-t border-l border-gray-300 
      px-4 py-1 
      ${isActive ? "text-form-blue" : "text-gray-600"} 
      font-medium rounded-t-md
    `}
    >
      <div className="flex items-center">
        <IconPlaceholder iconName={iconName} />
        <span className="ml-1">{label}</span>
      </div>
    </div>
  )
}
