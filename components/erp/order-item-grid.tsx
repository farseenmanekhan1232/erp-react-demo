"use client"

/**
 * OrderItemGrid Component
 *
 * Renders the grid for order items in the sales form.
 * Handles the display and interaction with order items.
 */
import type React from "react"
import { useCallback, useState } from "react"
import type { OrderItem, Product, Warehouse } from "@/types"
import { ProductInfoPanel } from "./product-info-panel"
import type { ValidationErrors } from "@/hooks/use-validation"

interface OrderItemGridProps {
  orderItems: OrderItem[]
  products: Product[]
  warehouses: Warehouse[]
  onUpdateItem: (index: number, field: string, value: any) => void
  onRemoveItem: (index: number) => void
  onAddItem: () => void
  getProductName: (productId: string) => string
  getProductUnit: (productId: string) => string
  warnings: ValidationErrors
}

export const OrderItemGrid: React.FC<OrderItemGridProps> = ({
  orderItems,
  products,
  warehouses,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  getProductName,
  getProductUnit,
  warnings,
}) => {
  // State to track the selected product for showing details
  const [selectedProductId, setSelectedProductId] = useState<string>("")

  // Memoize the handler to prevent unnecessary re-renders
  const handleProductChange = useCallback(
    (index: number, value: string) => {
      onUpdateItem(index, "productId", value)
      setSelectedProductId(value)
    },
    [onUpdateItem],
  )

  const handlePriceChange = useCallback(
    (index: number, value: string) => {
      onUpdateItem(index, "price", Number.parseFloat(value) || 0)
    },
    [onUpdateItem],
  )

  const handleQuantityChange = useCallback(
    (index: number, value: string) => {
      onUpdateItem(index, "quantity", Number.parseFloat(value) || 0)
    },
    [onUpdateItem],
  )

  const handleWarehouseChange = useCallback(
    (index: number, value: string) => {
      onUpdateItem(index, "warehouseId", value)
    },
    [onUpdateItem],
  )

  const handleAttachmentToggle = useCallback(
    (index: number) => {
      const currentValue = orderItems[index].isAttachment || false
      onUpdateItem(index, "isAttachment", !currentValue)
    },
    [onUpdateItem, orderItems],
  )

  const handleRemoveItem = useCallback(
    (index: number) => {
      if (window.confirm("確定要刪除此項目嗎？")) {
        onRemoveItem(index)
      }
    },
    [onRemoveItem],
  )

  return (
    <div>
      <div className="border border-gray-300">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-grid-header">
              <th className="border border-gray-300 px-2 py-1 w-12 font-normal text-center">項次</th>
              <th className="border border-gray-300 px-2 py-1 font-normal">產品編號</th>
              <th className="border border-gray-300 px-2 py-1 w-16 font-normal text-center">單價</th>
              <th className="border border-gray-300 px-2 py-1 w-16 font-normal text-center">數量</th>
              <th className="border border-gray-300 px-2 py-1 w-20 font-normal text-center">小計</th>
              <th className="border border-gray-300 px-2 py-1 w-16 font-normal text-center">倉庫</th>
              <th className="border border-gray-300 px-2 py-1 font-normal">品名規格</th>
              <th className="border border-gray-300 px-2 py-1 w-12 font-normal text-center">單位</th>
              <th className="border border-gray-300 px-2 py-1 w-8 font-normal text-center">附</th>
              <th className="border border-gray-300 px-2 py-1 w-8 font-normal text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {/* Render existing order items */}
            {orderItems.map((item, index) => {
              // Check if there's a warning for this item
              const hasWarning = warnings[`item_${index}_stock`]

              return (
                <tr
                  key={item.id}
                  className={`
                    hover:bg-gray-50 
                    ${item.isAttachment ? "bg-[#fffde8]" : ""} 
                    ${hasWarning ? "bg-yellow-50" : ""}
                  `}
                >
                  <td className="border border-gray-300 px-2 py-1 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <select
                      className="w-full border-none focus:outline-none bg-transparent"
                      value={item.productId}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                    >
                      <option value="">選擇產品</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.id} - {product.name}
                        </option>
                      ))}
                    </select>
                    {hasWarning && <div className="text-xs text-yellow-600">{warnings[`item_${index}_stock`]}</div>}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full border-none focus:outline-none bg-transparent text-right"
                      value={item.price || ""}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full border-none focus:outline-none bg-transparent text-right"
                      value={item.quantity || ""}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-right">{item.subtotal.toFixed(2)}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <select
                      className="w-full border-none focus:outline-none bg-transparent"
                      value={item.warehouseId}
                      onChange={(e) => handleWarehouseChange(index, e.target.value)}
                    >
                      <option value="">選擇</option>
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.id}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-1">{getProductName(item.productId)}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{getProductUnit(item.productId)}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      checked={item.isAttachment || false}
                      onChange={() => handleAttachmentToggle(index)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700"
                      title="刪除項目"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              )
            })}

            {/* Empty row with arrow indicator */}
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1 text-center">
                <span className="text-black">▶</span>
              </td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
            </tr>

            {/* Empty rows to fill the grid */}
            {[...Array(5)].map((_, i) => (
              <tr key={`empty-${i}`} onClick={onAddItem} className="cursor-pointer hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product information panel - shown when a product is selected */}
      {selectedProductId && <ProductInfoPanel productId={selectedProductId} />}

      {/* Warning if no items are added */}
      {warnings.orderItems && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded">
          {warnings.orderItems}
        </div>
      )}
    </div>
  )
}
