"use client"

/**
 * HelpDialog Component
 *
 * Displays a dialog with keyboard shortcuts and help information.
 */
import type React from "react"
import { useState, useEffect } from "react"

interface ShortcutInfo {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  description: string
}

interface HelpDialogProps {
  shortcuts: ShortcutInfo[]
  isOpen: boolean
  onClose: () => void
}

export const HelpDialog: React.FC<HelpDialogProps> = ({ shortcuts, isOpen, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
    } else {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!visible) return null

  // Format the shortcut key for display
  const formatShortcut = (shortcut: ShortcutInfo) => {
    const parts = []
    if (shortcut.ctrl) parts.push("Ctrl")
    if (shortcut.alt) parts.push("Alt")
    if (shortcut.shift) parts.push("Shift")
    parts.push(shortcut.key.toUpperCase())
    return parts.join(" + ")
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-lg w-[500px] max-w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-[#d8d8d8] to-[#f0f0f0] py-2 px-4 border-b border-gray-300">
          <h3 className="text-sm font-medium">銷售作業 - 說明與快捷鍵</h3>
          <button className="text-gray-700 hover:bg-gray-200 px-2 py-1" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="p-4">
          <h4 className="font-medium mb-2">鍵盤快捷鍵</h4>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-[#f0f0f0]">
                <th className="border border-gray-300 px-3 py-1 text-left">快捷鍵</th>
                <th className="border border-gray-300 px-3 py-1 text-left">功能</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((shortcut, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-1 font-mono">{formatShortcut(shortcut)}</td>
                  <td className="border border-gray-300 px-3 py-1">{shortcut.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="font-medium mb-2">使用說明</h4>
          <div className="text-sm space-y-2">
            <p>
              <strong>銷售主檔：</strong> 輸入客戶資訊、稅別、折讓等基本資料。紅色標示欄位為必填項目。
            </p>
            <p>
              <strong>銷售明細：</strong> 添加產品項目，設定數量、單價和倉庫。點擊空白行可新增項目，點擊 × 可刪除項目。
            </p>
            <p>
              <strong>驗證系統：</strong> 紅色提示為錯誤（必須修正），黃色提示為警告（可以繼續但需確認）。
            </p>
            <p>
              <strong>庫存檢查：</strong> 系統會自動檢查庫存是否足夠，不足時會顯示警告。
            </p>
            <p>
              <strong>信用額度：</strong> 系統會檢查客戶信用額度，超過時會顯示警告。
            </p>
          </div>
        </div>

        <div className="bg-[#f0f0f0] px-4 py-2 border-t border-gray-300 flex justify-end">
          <button className="bg-[#e6e6e6] border border-gray-300 px-4 py-1 rounded hover:bg-gray-200" onClick={onClose}>
            關閉
          </button>
        </div>
      </div>
    </div>
  )
}
