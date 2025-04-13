/**
 * Type definitions for the ERP system
 * These types are used throughout the application to ensure type safety
 */
import type { CustomerExtended, ProductExtended, WarehouseExtended, SalespersonExtended } from "@/lib/data"

// Customer data structure
export interface Customer extends CustomerExtended {}

// Product data structure
export interface Product extends ProductExtended {}

// Warehouse data structure
export interface Warehouse extends WarehouseExtended {}

// Salesperson data structure
export interface Salesperson extends SalespersonExtended {}

// Order item structure for the sales order grid
export interface OrderItem {
  id: string
  productId: string
  price: number
  quantity: number
  subtotal: number
  warehouseId: string
  notes?: string
  isAttachment?: boolean
}

// Tax type options
export type TaxType = "exempt" | "external" | "included"

// Payment method options
export type PaymentMethod = "cash" | "credit" | "transfer" | "check"

// Order status options
export type OrderStatus = "draft" | "confirmed" | "shipped" | "completed" | "cancelled"

// Keyboard shortcut information
export interface ShortcutInfo {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  description: string
}

// Sales order form data structure
export interface SalesOrderFormData {
  orderNumber: string
  orderDate: string
  customerId: string
  customerNumber: string
  subtotalBeforeTax: number
  discount: number
  tax: number
  salespersonId: string
  paymentDueDate: string
  installerId: string
  customerName: string
  warehouseId: string
  isRental: boolean
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  completionDate: string
  notes: string
  taxType: TaxType
  orderItems: OrderItem[]
  paymentMethod?: PaymentMethod
  status?: OrderStatus
  deliveryDate?: string
  deliveryAddress?: string
  contactPerson?: string
  contactPhone?: string

  // References to lookup data
  customers?: Customer[]
  products?: Product[]
  warehouses?: Warehouse[]
  salespersons?: Salesperson[]
}
