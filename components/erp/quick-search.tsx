"use client"

/**
 * QuickSearch Component
 *
 * Provides a quick search interface for finding products, customers, etc.
 */
import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { Customer, Product } from "@/types"

type SearchResultType = "customer" | "product"

interface SearchResult {
  id: string
  name: string
  type: SearchResultType
  description: string
}

interface QuickSearchProps {
  isOpen: boolean
  onClose: () => void
  customers: Customer[]
  products: Product[]
  onSelectCustomer: (customerId: string) => void
  onSelectProduct: (productId: string) => void
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  isOpen,
  onClose,
  customers,
  products,
  onSelectCustomer,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show/hide the dialog with animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      const timer = setTimeout(() => {
        setVisible(false)
        setSearchTerm("")
        setResults([])
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Search for matching items when the search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    const term = searchTerm.toLowerCase()
    const customerResults = customers
      .filter((c) => c.id.toLowerCase().includes(term) || c.name.toLowerCase().includes(term))
      .map((c) => ({
        id: c.id,
        name: c.name,
        type: "customer" as SearchResultType,
        description: `客戶 - ${c.phone || "無電話"}`,
      }))

    const productResults = products
      .filter((p) => p.id.toLowerCase().includes(term) || p.name.toLowerCase().includes(term))
      .map((p) => ({
        id: p.id,
        name: p.name,
        type: "product" as SearchResultType,
        description: `產品 - ${p.price.toFixed(2)} / ${p.unit}`,
      }))

    setResults([...customerResults, ...productResults])
    setSelectedIndex(0)
  }, [searchTerm, customers, products])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[selectedIndex])
    }
  }

  // Handle selection of a result
  const handleSelect = (result: SearchResult) => {
    if (result.type === "customer") {
      onSelectCustomer(result.id)
    } else if (result.type === "product") {
      onSelectProduct(result.id)
    }
    onClose()
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="bg-white rounded-md shadow-lg w-[500px] max-w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="搜尋客戶或產品..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {results.length > 0 && (
            <div className="mt-2 max-h-[300px] overflow-y-auto border border-gray-200 rounded">
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className={`p-2 cursor-pointer ${index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"}`}
                  onClick={() => handleSelect(result)}
                >
                  <div className="font-medium">
                    {result.id} - {result.name}
                  </div>
                  <div className="text-sm text-gray-600">{result.description}</div>
                </div>
              ))}
            </div>
          )}

          {searchTerm && results.length === 0 && (
            <div className="mt-2 p-3 text-center text-gray-500">無符合的搜尋結果</div>
          )}
        </div>

        <div className="bg-[#f0f0f0] px-4 py-2 border-t border-gray-300 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-mono">↑↓</span> 選擇 <span className="font-mono">Enter</span> 確認{" "}
            <span className="font-mono">Esc</span> 取消
          </div>
          <button className="bg-[#e6e6e6] border border-gray-300 px-4 py-1 rounded hover:bg-gray-200" onClick={onClose}>
            取消
          </button>
        </div>
      </div>
    </div>
  )
}
