/**
 * StatusBar Component
 *
 * Renders the status bar at the bottom of the sales form window.
 * Displays validation errors and warnings.
 */
import type React from "react"
import type { ValidationErrors } from "@/hooks/use-validation"

interface StatusBarProps {
  errors: ValidationErrors
  warnings: ValidationErrors
}

export const StatusBar: React.FC<StatusBarProps> = ({ errors, warnings }) => {
  // Get the first error or warning to display
  const firstError = Object.values(errors)[0]
  const firstWarning = Object.values(warnings)[0]

  // Determine the status message and style
  let statusMessage = ""
  let statusStyle = "bg-[#e6f3ff]"

  if (firstError) {
    statusMessage = `錯誤: ${firstError}`
    statusStyle = "bg-red-100 text-red-700"
  } else if (firstWarning) {
    statusMessage = `警告: ${firstWarning}`
    statusStyle = "bg-yellow-100 text-yellow-700"
  } else if (Object.keys(errors).length === 0 && Object.keys(warnings).length === 0) {
    statusMessage = "表單驗證通過"
    statusStyle = "bg-green-100 text-green-700"
  }

  return (
    <div className="flex border-t border-gray-300 bg-[#f0f0f0]">
      <div className="flex-1 p-1 border-r border-gray-300">
        <span className="text-sm">說明: 銷售訂單管理</span>
      </div>
      <div className={`w-80 p-1 ${statusStyle}`}>
        <span className="text-sm">狀態: {statusMessage}</span>
      </div>
    </div>
  )
}
