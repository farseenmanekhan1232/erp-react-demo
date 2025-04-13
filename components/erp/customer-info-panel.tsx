/**
 * CustomerInfoPanel Component
 *
 * Displays detailed customer information when a customer is selected.
 * Shows credit information, contact details, and recent orders.
 */
import type React from "react"
import { mockData } from "@/lib/data"

interface CustomerInfoPanelProps {
  customerId: string
}

export const CustomerInfoPanel: React.FC<CustomerInfoPanelProps> = ({ customerId }) => {
  // Find the customer in the mock data
  const customer = mockData.customers.find((c) => c.id === customerId)

  // Find recent orders for this customer
  const customerOrders = mockData.recentOrders.filter((order) => order.customerId === customerId)

  if (!customer) {
    return null
  }

  return (
    <div className="border border-gray-300 bg-[#f8f8f8] p-2 mt-2 text-sm">
      <div className="flex justify-between mb-2">
        <div className="font-medium">
          {customer.name} ({customer.id})
        </div>
        <div className="text-blue-600">
          信用額度: {customer.creditLimit?.toLocaleString()} | 未結餘額: {customer.outstandingBalance?.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <div>聯絡人: {customer.contactPerson}</div>
          <div>電話: {customer.phone}</div>
          <div>地址: {customer.address}</div>
        </div>

        <div>
          <div className="font-medium mb-1">近期訂單:</div>
          {customerOrders.length > 0 ? (
            <table className="w-full text-xs border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-1 py-0.5">訂單編號</th>
                  <th className="border border-gray-300 px-1 py-0.5">日期</th>
                  <th className="border border-gray-300 px-1 py-0.5">金額</th>
                  <th className="border border-gray-300 px-1 py-0.5">狀態</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-300 px-1 py-0.5">{order.id}</td>
                    <td className="border border-gray-300 px-1 py-0.5">{order.date}</td>
                    <td className="border border-gray-300 px-1 py-0.5 text-right">{order.total.toLocaleString()}</td>
                    <td className="border border-gray-300 px-1 py-0.5">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500">無近期訂單</div>
          )}
        </div>
      </div>
    </div>
  )
}
