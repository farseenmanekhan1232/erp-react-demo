"use client"

/**
 * SalesWindow Component
 *
 * Renders the complete sales window with all its sections.
 * This is the main container for the sales form.
 */
import type React from "react"
import { memo, useState } from "react"
import { WindowHeader } from "./window-header"
import { FormTab } from "./form-tab"
import { SalesForm } from "./sales-form"
import { OrderItemGrid } from "./order-item-grid"
import { ActionToolbar } from "./action-toolbar"
import { StatusBar } from "./status-bar"
import { QuickSearch } from "./quick-search"
import { useSalesForm } from "@/hooks/use-sales-form"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

const SalesWindow: React.FC = () => {
  // Use the custom hook to manage form state and logic
  const {
    formData,
    customers,
    products,
    warehouses,
    updateField,
    addOrderItem,
    updateOrderItem,
    removeOrderItem,
    updateTaxType,
    getProductName,
    getProductUnit,
    saveOrder,
    resetForm,
    errors,
    warnings,
    hasErrors,
    hasWarnings,
  } = useSalesForm()

  // State for quick search dialog
  const [showQuickSearch, setShowQuickSearch] = useState(false)

  // Define keyboard shortcuts
  const shortcuts = [
    {
      key: "s",
      ctrl: true,
      handler: () => {
        if (!hasErrors) saveOrder()
      },
      description: "儲存訂單",
    },
    {
      key: "n",
      ctrl: true,
      handler: resetForm,
      description: "新增訂單",
    },
    {
      key: "F3",
      handler: () => setShowQuickSearch(true),
      description: "快速搜尋",
    },
    {
      key: "F1",
      handler: () => {
        // Show help dialog
      },
      description: "顯示說明",
    },
    {
      key: "a",
      ctrl: true,
      handler: addOrderItem,
      description: "新增項目",
    },
  ]

  // Register keyboard shortcuts
  const { shortcuts: shortcutInfo } = useKeyboardShortcuts(shortcuts)

  // Format current date and time for the window title
  const currentDateTime = new Date().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  // Handle customer selection from quick search
  const handleSelectCustomer = (customerId: string) => {
    updateField("customerId", customerId)
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      updateField("customerName", customer.name)
    }
  }

  // Handle product selection from quick search
  const handleSelectProduct = (productId: string) => {
    // Add a new item with the selected product
    const newItem: any = {
      id: `item_${formData.orderItems.length + 1}`,
      productId,
      quantity: 1,
      warehouseId: formData.warehouseId || "",
    }

    // Find the product to get its price
    const product = products.find((p) => p.id === productId)
    if (product) {
      newItem.price = product.price
      newItem.subtotal = product.price
    }

    // Add the item to the order
    formData.orderItems.push(newItem)
    updateOrderItem(formData.orderItems.length - 1, "productId", productId)
  }

  return (
    <div className="border border-gray-400 shadow-md bg-white rounded erp-window">
      {/* Window title bar */}
      <WindowHeader title={`銷售作業 ${currentDateTime} 使用者:李中雲 Server:`} />

      {/* Form tabs */}
      <div className="flex border-b border-gray-300">
        <FormTab label="銷售主檔" iconName="sales-tab" />
      </div>

      {/* Sales form section */}
      <SalesForm
        formData={formData}
        customers={customers}
        onUpdateField={updateField}
        onUpdateTaxType={updateTaxType}
        errors={errors}
        warnings={warnings}
      />

      {/* Detail section tab */}
      <div className="flex border-b border-gray-300">
        <FormTab label="銷售明細" iconName="detail-tab" />
      </div>

      {/* Order items grid */}
      <div className="p-4">
        <OrderItemGrid
          orderItems={formData.orderItems}
          products={products}
          warehouses={warehouses}
          onUpdateItem={updateOrderItem}
          onRemoveItem={removeOrderItem}
          onAddItem={addOrderItem}
          getProductName={getProductName}
          getProductUnit={getProductUnit}
          warnings={warnings}
        />
      </div>

      {/* Action buttons */}
      <ActionToolbar
        onSave={saveOrder}
        onReset={resetForm}
        onSearch={() => setShowQuickSearch(true)}
        hasErrors={hasErrors}
        hasWarnings={hasWarnings}
        shortcuts={shortcutInfo}
      />

      {/* Status bar */}
      <StatusBar errors={errors} warnings={warnings} />

      {/* Quick search dialog */}
      <QuickSearch
        isOpen={showQuickSearch}
        onClose={() => setShowQuickSearch(false)}
        customers={customers}
        products={products}
        onSelectCustomer={handleSelectCustomer}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(SalesWindow)
