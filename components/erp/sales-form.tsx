"use client"

/**
 * SalesForm Component
 *
 * Renders the main sales form section with all input fields.
 * This component handles the form state and calculations.
 */
import type React from "react"
import { useCallback, useState } from "react"
import { FormField } from "./form-field"
import { TaxOptions } from "./tax-options"
import { CustomerInfoPanel } from "./customer-info-panel"
import type { SalesOrderFormData, Customer, TaxType } from "@/types"
import type { ValidationErrors } from "@/hooks/use-validation"

interface SalesFormProps {
  formData: SalesOrderFormData
  customers: Customer[]
  onUpdateField: (field: keyof SalesOrderFormData, value: any) => void
  onUpdateTaxType: (type: TaxType) => void
  errors: ValidationErrors
  warnings: ValidationErrors
}

export const SalesForm: React.FC<SalesFormProps> = ({
  formData,
  customers,
  onUpdateField,
  onUpdateTaxType,
  errors,
  warnings,
}) => {
  // State to track if customer info panel should be shown
  const [showCustomerInfo, setShowCustomerInfo] = useState(false)

  // Handler for customer ID change that also updates customer name
  const handleCustomerChange = useCallback(
    (value: string) => {
      onUpdateField("customerId", value)
      setShowCustomerInfo(!!value)

      // Update customer name when ID changes
      const customer = customers.find((c) => c.id === value)
      if (customer) {
        onUpdateField("customerName", customer.name)
      }
    },
    [customers, onUpdateField],
  )

  // Handler for discount change that also recalculates total
  const handleDiscountChange = useCallback(
    (value: number) => {
      onUpdateField("discount", value)

      // Recalculate total when discount changes
      const newTotal =
        formData.taxType === "external"
          ? formData.subtotalBeforeTax - value + formData.tax
          : formData.subtotalBeforeTax - value

      onUpdateField("totalAmount", newTotal)
    },
    [formData.subtotalBeforeTax, formData.tax, formData.taxType, onUpdateField],
  )

  return (
    <div className="p-4 border-b border-gray-300">
      <div className="grid grid-cols-4 gap-x-2 gap-y-3">
        {/* Row 1 */}
        <FormField label="銷售單號">
          <input
            type="text"
            className={`erp-input ${errors.orderNumber ? "border-red-500" : "border-gray-300"} w-full`}
            value={formData.orderNumber}
            onChange={(e) => onUpdateField("orderNumber", e.target.value)}
          />
          {errors.orderNumber && <div className="text-xs text-red-500">{errors.orderNumber}</div>}
        </FormField>

        <FormField label="銷售日期">
          <input
            type="text"
            className={`erp-input ${errors.orderDate ? "border-red-500" : "border-gray-300"} w-full`}
            value={formData.orderDate}
            onChange={(e) => onUpdateField("orderDate", e.target.value)}
          />
          {errors.orderDate && <div className="text-xs text-red-500">{errors.orderDate}</div>}
        </FormField>

        <FormField label="客戶編號" labelColor="text-red-500">
          <select
            className={`erp-select ${errors.customerId ? "border-red-500" : "border-[#abd5f5]"} bg-[#e6f3ff] w-full`}
            value={formData.customerId}
            onChange={(e) => handleCustomerChange(e.target.value)}
          >
            <option value="">選擇客戶</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.id} - {customer.name}
              </option>
            ))}
          </select>
          {errors.customerId && <div className="text-xs text-red-500">{errors.customerId}</div>}
        </FormField>

        <FormField label="客戶貨號">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.customerNumber}
            onChange={(e) => onUpdateField("customerNumber", e.target.value)}
          />
        </FormField>

        {/* Row 2 */}
        <FormField label="未稅小計">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.subtotalBeforeTax.toFixed(2)}
            readOnly
          />
        </FormField>

        <FormField label="折讓金額">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.discount}
            onChange={(e) => handleDiscountChange(Number.parseFloat(e.target.value) || 0)}
          />
        </FormField>

        <FormField label="稅　　額" labelColor="text-form-blue">
          <input type="text" className="erp-input border-gray-300 w-full" value={formData.tax.toFixed(2)} readOnly />
        </FormField>

        <FormField label="銷售人員" labelColor="text-form-blue">
          <select
            className={`erp-select ${errors.salespersonId ? "border-red-500" : "border-gray-300"} w-full`}
            value={formData.salespersonId}
            onChange={(e) => onUpdateField("salespersonId", e.target.value)}
          >
            <option value="">選擇銷售人員</option>
            {formData.salespersons?.map((person) => (
              <option key={person.id} value={person.id}>
                {person.id} - {person.name}
              </option>
            ))}
          </select>
          {errors.salespersonId && <div className="text-xs text-red-500">{errors.salespersonId}</div>}
        </FormField>

        {/* Row 3 */}
        <FormField label="帳款日期" labelColor="text-form-blue">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.paymentDueDate}
            onChange={(e) => onUpdateField("paymentDueDate", e.target.value)}
          />
        </FormField>

        <FormField label="安裝人員">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.installerId}
            onChange={(e) => onUpdateField("installerId", e.target.value)}
          />
        </FormField>

        <FormField label="姓　　名">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.customerName}
            onChange={(e) => onUpdateField("customerName", e.target.value)}
          />
        </FormField>

        <FormField label="預設倉庫">
          <select
            className="erp-select border-gray-300 w-[70%]"
            value={formData.warehouseId}
            onChange={(e) => onUpdateField("warehouseId", e.target.value)}
          >
            <option value="">選擇倉庫</option>
            {formData.warehouses?.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.id} - {warehouse.name}
              </option>
            ))}
          </select>
          <div className="flex items-center ml-1">
            <span className="text-sm mr-1">是否借出</span>
            <input
              type="checkbox"
              checked={formData.isRental}
              onChange={(e) => onUpdateField("isRental", e.target.checked)}
              className="w-4 h-4"
            />
          </div>
        </FormField>

        {/* Row 4 */}
        <FormField label="金額合計">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.totalAmount.toFixed(2)}
            readOnly
          />
        </FormField>

        <FormField label="已付金額">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.paidAmount}
            onChange={(e) => onUpdateField("paidAmount", Number.parseFloat(e.target.value) || 0)}
          />
        </FormField>

        <FormField label="未結金額">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.remainingAmount.toFixed(2)}
            readOnly
          />
        </FormField>

        <FormField label="結清日期">
          <input
            type="text"
            className="erp-input border-gray-300 w-full"
            value={formData.completionDate}
            onChange={(e) => onUpdateField("completionDate", e.target.value)}
          />
        </FormField>

        {/* Tax type radio buttons - positioned to align with the original layout */}
        <div className="col-start-4 row-span-3 flex justify-end">
          <TaxOptions taxType={formData.taxType} onChange={onUpdateTaxType} />
        </div>

        {/* Notes field - spans full width of first 3 columns */}
        <div className="col-span-3 flex items-start">
          <label className="w-24 text-right text-gray-700 mt-1">附記事項</label>
          <textarea
            className="ml-2 border border-gray-300 px-2 py-1 flex-1 h-16"
            value={formData.notes}
            onChange={(e) => onUpdateField("notes", e.target.value)}
          />
        </div>
      </div>

      {/* Credit limit warning */}
      {warnings.creditLimit && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded">
          {warnings.creditLimit}
        </div>
      )}

      {/* Customer information panel - shown when a customer is selected */}
      {showCustomerInfo && <CustomerInfoPanel customerId={formData.customerId} />}
    </div>
  )
}
