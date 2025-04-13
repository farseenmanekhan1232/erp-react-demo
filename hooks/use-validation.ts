"use client"

/**
 * useValidation Hook
 *
 * Custom hook for validating sales order data.
 * Provides validation rules and error messages for the sales form.
 */
import { useState, useEffect } from "react"
import type { SalesOrderFormData } from "@/types"
import { getCustomerCredit, getProductStock } from "@/lib/data"

export type ValidationErrors = {
  [key: string]: string
}

export const useValidation = (formData: SalesOrderFormData) => {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [warnings, setWarnings] = useState<ValidationErrors>({})

  // Validate the form data whenever it changes
  useEffect(() => {
    const newErrors: ValidationErrors = {}
    const newWarnings: ValidationErrors = {}

    // Required fields validation
    if (!formData.customerId) {
      newErrors.customerId = "請選擇客戶"
    }

    if (!formData.orderDate) {
      newErrors.orderDate = "請輸入銷售日期"
    }

    // Credit limit validation
    if (formData.customerId) {
      const { limit, balance } = getCustomerCredit(formData.customerId)
      const newTotal = formData.totalAmount

      if (balance + newTotal > limit) {
        newWarnings.creditLimit = `訂單金額將超過客戶信用額度 (${limit.toLocaleString()})`
      }
    }

    // Order items validation
    formData.orderItems.forEach((item, index) => {
      if (item.productId && item.quantity > 0) {
        // Check stock availability
        const stock = getProductStock(item.productId)
        if (item.quantity > stock) {
          newWarnings[`item_${index}_stock`] = `庫存不足 (現有: ${stock})`
        }
      }
    })

    // Validate at least one item is added if we're saving
    if (formData.orderItems.length === 0) {
      newWarnings.orderItems = "尚未添加任何產品"
    }

    // Update the errors and warnings state
    setErrors(newErrors)
    setWarnings(newWarnings)
  }, [formData])

  // Check if the form has any errors
  const hasErrors = Object.keys(errors).length > 0

  // Check if the form has any warnings
  const hasWarnings = Object.keys(warnings).length > 0

  return {
    errors,
    warnings,
    hasErrors,
    hasWarnings,
  }
}
