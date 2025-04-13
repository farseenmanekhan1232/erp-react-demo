/**
 * Mock data for the ERP system
 *
 * This file contains the data structures that would typically come from a backend database.
 * For this recreation, we're using static data that matches the provided data.json structure.
 *
 * The data includes relationships between entities to simulate a real database.
 */

// Define relationships between entities
export interface CustomerExtended {
  id: string
  name: string
  contactPerson?: string
  phone?: string
  address?: string
  creditLimit?: number
  outstandingBalance?: number
}

export interface ProductExtended {
  id: string
  name: string
  unit: string
  price: number
  cost?: number
  stockQuantity?: number
  warehouseId?: string
  category?: string
  taxable?: boolean
}

export interface WarehouseExtended {
  id: string
  name: string
  location?: string
  manager?: string
  isActive?: boolean
}

export interface SalespersonExtended {
  id: string
  name: string
  department?: string
  commissionRate?: number
  phone?: string
}

// Mock data with extended information
export const mockData = {
  customers: [
    {
      id: "C001",
      name: "台北貿易行",
      contactPerson: "張先生",
      phone: "02-2345-6789",
      address: "台北市中山區中山北路123號",
      creditLimit: 100000,
      outstandingBalance: 45000,
    },
    {
      id: "C002",
      name: "台中鑫豐企業",
      contactPerson: "林小姐",
      phone: "04-2345-6789",
      address: "台中市西區民生路456號",
      creditLimit: 80000,
      outstandingBalance: 12000,
    },
    {
      id: "C003",
      name: "高雄電工社",
      contactPerson: "王先生",
      phone: "07-2345-6789",
      address: "高雄市前鎮區中山路789號",
      creditLimit: 50000,
      outstandingBalance: 0,
    },
  ] as CustomerExtended[],

  salespersons: [
    {
      id: "S01",
      name: "王小明",
      department: "銷售部",
      commissionRate: 0.05,
      phone: "0912-345-678",
    },
    {
      id: "S02",
      name: "陳美華",
      department: "銷售部",
      commissionRate: 0.06,
      phone: "0923-456-789",
    },
  ] as SalespersonExtended[],

  warehouses: [
    {
      id: "W01",
      name: "一號倉",
      location: "台北市南港區",
      manager: "李經理",
      isActive: true,
    },
    {
      id: "W02",
      name: "備品倉",
      location: "台北市內湖區",
      manager: "張經理",
      isActive: true,
    },
    {
      id: "W03",
      name: "油品區",
      location: "桃園市蘆竹區",
      manager: "陳經理",
      isActive: true,
    },
  ] as WarehouseExtended[],

  products: [
    {
      id: "P001",
      name: "柴油",
      unit: "公升",
      price: 32.5,
      cost: 28.5,
      stockQuantity: 5000,
      warehouseId: "W03",
      category: "油品",
      taxable: true,
    },
    {
      id: "P002",
      name: "齒輪油",
      unit: "瓶",
      price: 180,
      cost: 120,
      stockQuantity: 200,
      warehouseId: "W03",
      category: "油品",
      taxable: true,
    },
    {
      id: "P003",
      name: "引擎潤滑油",
      unit: "桶",
      price: 1500,
      cost: 1100,
      stockQuantity: 50,
      warehouseId: "W03",
      category: "油品",
      taxable: true,
    },
  ] as ProductExtended[],

  // Sample order data
  recentOrders: [
    {
      id: "SO001",
      customerId: "C001",
      date: "2025/04/08",
      total: 12500,
      status: "已完成",
    },
    {
      id: "SO002",
      customerId: "C002",
      date: "2025/04/09",
      total: 8750,
      status: "處理中",
    },
    {
      id: "SO003",
      customerId: "C003",
      date: "2025/04/10",
      total: 3250,
      status: "待處理",
    },
  ],
}

// Helper functions to work with the mock data
export const getProductStock = (productId: string): number => {
  const product = mockData.products.find((p) => p.id === productId)
  return product?.stockQuantity || 0
}

export const getCustomerCredit = (customerId: string): { limit: number; balance: number } => {
  const customer = mockData.customers.find((c) => c.id === customerId)
  return {
    limit: customer?.creditLimit || 0,
    balance: customer?.outstandingBalance || 0,
  }
}

export const getWarehouseForProduct = (productId: string): string => {
  const product = mockData.products.find((p) => p.id === productId)
  return product?.warehouseId || ""
}

export const getSalespersonDetails = (salespersonId: string): SalespersonExtended | undefined => {
  return mockData.salespersons.find((s) => s.id === salespersonId)
}
