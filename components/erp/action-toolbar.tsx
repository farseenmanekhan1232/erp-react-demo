"use client"

/**
 * ActionToolbar Component
 *
 * Renders the action buttons toolbar at the bottom of the sales form.
 * Provides functionality for saving, printing, and other actions.
 */
import type React from "react"
import { useState } from "react"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
import { HelpDialog } from "./help-dialog"
import type { ShortcutInfo } from "@/types"

interface ActionToolbarProps {
  onSave: () => void
  onReset: () => void
  onSearch: () => void
  hasErrors: boolean
  hasWarnings: boolean
  shortcuts: ShortcutInfo[]
}

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  onSave,
  onReset,
  onSearch,
  hasErrors,
  hasWarnings,
  shortcuts,
}) => {
  const [showHelp, setShowHelp] = useState(false)

  // Define the action buttons with their icon names and handlers
  const actionButtons = [
    { iconName: "icon-arrow-left", tooltip: "上一筆", onClick: () => alert("功能尚未實作") },
    { iconName: "icon-arrow-right", tooltip: "下一筆", onClick: () => alert("功能尚未實作") },
    { iconName: "icon-search", tooltip: "搜尋 (F3)", onClick: onSearch },
    { iconName: "icon-document", tooltip: "新增 (Ctrl+N)", onClick: onReset },
    {
      iconName: "icon-save",
      tooltip: "儲存 (Ctrl+S)",
      onClick: onSave,
      disabled: hasErrors,
      className: hasErrors ? "opacity-50 cursor-not-allowed" : hasWarnings ? "bg-yellow-50" : "",
    },
    { iconName: "icon-print", tooltip: "列印 (Ctrl+P)", onClick: () => alert("功能尚未實作") },
    { iconName: "icon-upload", tooltip: "上傳", onClick: () => alert("功能尚未實作") },
    { iconName: "icon-detail-view", tooltip: "詳細資料", onClick: () => alert("功能尚未實作") },
    { iconName: "icon-upload-order", tooltip: "上傳訂單", onClick: () => alert("功能尚未實作") },
    { iconName: "icon-filter", tooltip: "篩選", onClick: () => alert("功能尚未實作") },
  ]

  return (
    <>
      <div className="flex border-t border-gray-300 bg-[#f0f0f0]">
        <div className="flex p-1">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              className={`erp-toolbar-button mx-0.5 ${button.className || ""}`}
              onClick={button.onClick}
              disabled={button.disabled}
              title={button.tooltip}
            >
              <IconPlaceholder iconName={button.iconName} />
            </button>
          ))}
        </div>
      </div>

      <HelpDialog shortcuts={shortcuts} isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  )
}
