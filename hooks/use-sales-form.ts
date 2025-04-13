"use client"

/**
 * useSalesForm Hook
 *
 * Custom hook to manage the sales form state and logic.
 * Encapsulates all form-related state and calculations.
 */
import { useState, useEffect, useCallback } from "react"
import type { SalesOrderFormData, OrderItem, TaxType, OrderStatus } from "@/types"
import { mockData, getWarehouseForProduct } from "@/lib/data"
import { useValidation } from "./use-validation"

// Tax rate constant - could be moved to configuration
const TAX_RATE = 0.05

// Generate a unique order number based on date and random number
const generateOrderNumber = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `SO${year}${month}${day}${random}`
}

// Format date in Traditional Chinese format
const formatDateTW = (date: Date): string => {
  return date
    .toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "/")
}

// Initial form state
const initialFormState: SalesOrderFormData = {
  orderNumber: generateOrderNumber(),
  orderDate: formatDateTW(new Date()),
  customerId: "",
  customerNumber: "",
  subtotalBeforeTax: 0,
  discount: 0,
  tax: 0,
  salespersonId: "",
  paymentDueDate: formatDateTW(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // Default to 30 days from now
  installerId: "",
  customerName: "",
  warehouseId: "",
  isRental: false,
  totalAmount: 0,
  paidAmount: 0,
  remainingAmount: 0,
  completionDate: "",
  notes: "",
  taxType: "exempt",
  orderItems: [],
  status: "draft",
  paymentMethod: "cash",
}

export const useSalesForm = () => {
  // Form state
  const [formData, setFormData] = useState<SalesOrderFormData>({
    ...initialFormState,
    // Add reference data to the form state
    customers: mockData.customers,
    products: mockData.products,
    warehouses: mockData.warehouses,
    salespersons: mockData.salespersons,
  })

  // Use validation hook
  const { errors, warnings, hasErrors, hasWarnings } = useValidation(formData)

  // Calculate remaining amount when total or paid amount changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      remainingAmount: prev.totalAmount - prev.paidAmount,
    }))
  }, [formData.totalAmount, formData.paidAmount])

  // Update a single form field
  const updateField = useCallback((field: keyof SalesOrderFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  // Add a new empty order item
  const addOrderItem = useCallback(() => {
    const newItem: OrderItem = {
      id: `item_${formData.orderItems.length + 1}`,
      productId: "",
      price: 0,
      quantity: 0,
      subtotal: 0,
      warehouseId: formData.warehouseId || "", // Use the default warehouse if set
      isAttachment: false,
      notes: "",
    }

    setFormData((prev) => ({
      ...prev,
      orderItems: [...prev.orderItems, newItem],
    }))
  }, [formData.orderItems.length, formData.warehouseId])

  // Update an order item and recalculate totals
  const updateOrderItem = useCallback((index: number, field: string, value: any) => {
    setFormData((prev) => {
      const updatedItems = [...prev.orderItems]
      const item = { ...updatedItems[index] }

      // Update the specified field
      ;(item as any)[field] = value

      // If product ID changes, update the price from the product catalog and set the default warehouse
      if (field === "productId") {
        const product = mockData.products.find((p) => p.id === value)
        if (product) {
          item.price = product.price

          // If warehouse is not set, use the product's default warehouse
          if (!item.warehouseId) {
            const defaultWarehouse = getWarehouseForProduct(value)
            item.warehouseId = defaultWarehouse || prev.warehouseId
          }
        }
      }

      // Recalculate subtotal if quantity or price changes
      if (field === "quantity" || field === "price") {
        // Ensure values are numbers and calculate subtotal
        const quantity = Number(item.quantity) || 0
        const price = Number(item.price) || 0
        item.subtotal = Number.parseFloat((quantity * price).toFixed(2)) // Round to 2 decimal places
      }

      updatedItems[index] = item

      // Calculate new subtotal
      const subtotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0)

      // Calculate tax based on the selected tax type
      let taxAmount = 0
      if (prev.taxType === "external") {
        taxAmount = Number.parseFloat((subtotal * TAX_RATE).toFixed(2))
      } else if (prev.taxType === "included") {
        taxAmount = Number.parseFloat(((subtotal * TAX_RATE) / (1 + TAX_RATE)).toFixed(2))
      }

      // Calculate the final total amount
      const total = Number.parseFloat(
        (prev.taxType === "external" ? subtotal - prev.discount + taxAmount : subtotal - prev.discount).toFixed(2),
      )

      return {
        ...prev,
        orderItems: updatedItems,
        subtotalBeforeTax: subtotal,
        tax: taxAmount,
        totalAmount: total,
      }
    })
  }, [])

  // Remove an order item
  const removeOrderItem = useCallback((index: number) => {
    setFormData((prev) => {
      const updatedItems = [...prev.orderItems]
      updatedItems.splice(index, 1)

      // Recalculate totals
      const subtotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0)

      // Calculate tax based on the selected tax type
      let taxAmount = 0
      if (prev.taxType === "external") {
        taxAmount = Number.parseFloat((subtotal * TAX_RATE).toFixed(2))
      } else if (prev.taxType === "included") {
        taxAmount = Number.parseFloat(((subtotal * TAX_RATE) / (1 + TAX_RATE)).toFixed(2))
      }

      // Calculate the final total amount
      const total = Number.parseFloat(
        (prev.taxType === "external" ? subtotal - prev.discount + taxAmount : subtotal - prev.discount).toFixed(2),
      )

      return {
        ...prev,
        orderItems: updatedItems,
        subtotalBeforeTax: subtotal,
        tax: taxAmount,
        totalAmount: total,
      }
    })
  }, [])

  // Update tax type and recalculate tax and total
  const updateTaxType = useCallback((type: TaxType) => {
    setFormData((prev) => {
      let taxAmount = 0
      if (type === "external") {
        taxAmount = Number.parseFloat((prev.subtotalBeforeTax * TAX_RATE).toFixed(2))
      } else if (type === "included") {
        taxAmount = Number.parseFloat(((prev.subtotalBeforeTax * TAX_RATE) / (1 + TAX_RATE)).toFixed(2))
      }

      const total = Number.parseFloat(
        (type === "external"
          ? prev.subtotalBeforeTax - prev.discount + taxAmount
          : prev.subtotalBeforeTax - prev.discount
        ).toFixed(2),
      )

      return {
        ...prev,
        taxType: type,
        tax: taxAmount,
        totalAmount: total,
      }
    })
  }, [])

  // Get product name by ID - memoized to prevent unnecessary recalculations
  const getProductName = useCallback((productId: string) => {
    const product = mockData.products.find((p) => p.id === productId)
    return product ? product.name : ""
  }, [])

  // Get product unit by ID - memoized to prevent unnecessary recalculations
  const getProductUnit = useCallback((productId: string) => {
    const product = mockData.products.find((p) => p.id === productId)
    return product ? product.unit : ""
  }, [])

  // Save the order
  const saveOrder = useCallback(() => {
    // Check for validation errors
    if (hasErrors) {
      alert("表單有錯誤，請修正後再儲存")
      return false
    }

    // Show warnings but allow save
    if (hasWarnings) {
      const confirmSave = window.confirm("表單有警告，確定要儲存嗎？")
      if (!confirmSave) {
        return false
      }
    }

    // Update status to confirmed
    setFormData((prev) => ({
      ...prev,
      status: "confirmed" as OrderStatus,
    }))

    // In a real application, this would send the data to the server
    console.log("Saving order:", formData)
    alert("訂單已儲存")
    return true
  }, [formData, hasErrors, hasWarnings])

  // Reset the form to initial state
  const resetForm = useCallback(() => {
    if (window.confirm("確定要清除所有資料嗎？")) {
      setFormData({
        ...initialFormState,
        orderNumber: generateOrderNumber(),
        orderDate: formatDateTW(new Date()),
        paymentDueDate: formatDateTW(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
        customers: mockData.customers,
        products: mockData.products,
        warehouses: mockData.warehouses,
        salespersons: mockData.salespersons,
      })
    }
  }, [])

  // Return all the form state and handlers
  return {
    formData,
    customers: mockData.customers,
    products: mockData.products,
    warehouses: mockData.warehouses,
    salespersons: mockData.salespersons,
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
  }
}
