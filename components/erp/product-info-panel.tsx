/**
 * ProductInfoPanel Component
 *
 * Displays detailed product information when a product is selected in the order grid.
 * Shows stock information, pricing details, and warehouse location.
 */
import type React from "react"
import { mockData } from "@/lib/data"

interface ProductInfoPanelProps {
  productId: string
}

export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({ productId }) => {
  // Find the product in the mock data
  const product = mockData.products.find((p) => p.id === productId)

  if (!productId || !product) {
    return null
  }

  // Find the warehouse for this product
  const warehouse = mockData.warehouses.find((w) => w.id === product.warehouseId)

  return (
    <div className="border border-gray-300 bg-[#f0f7ff] p-2 mt-2 text-sm">
      <div className="flex justify-between mb-2">
        <div className="font-medium">
          {product.name} ({product.id})
        </div>
        <div className="text-blue-600">
          庫存:{" "}
          <span className={product.stockQuantity && product.stockQuantity < 10 ? "text-red-500 font-bold" : ""}>
            {product.stockQuantity} {product.unit}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <div>單價: {product.price.toFixed(2)}</div>
          <div>成本: {product.cost?.toFixed(2)}</div>
          <div>類別: {product.category}</div>
          <div>課稅: {product.taxable ? "是" : "否"}</div>
        </div>

        <div>
          <div>
            倉庫: {warehouse?.name} ({warehouse?.id})
          </div>
          <div>倉庫位置: {warehouse?.location}</div>
          <div>倉庫管理員: {warehouse?.manager}</div>
        </div>
      </div>
    </div>
  )
}
