/**
 * FormField Component
 *
 * A reusable form field component that renders a label and an input.
 * Provides consistent styling and layout for form fields.
 */
import type React from "react"
import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  labelColor?: string
  children: ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({ label, labelColor = "text-gray-700", children }) => {
  return (
    <div className="flex items-center">
      <label className={`w-24 text-right ${labelColor} form-label chinese-text`}>{label}</label>
      <div className="ml-2 flex-1 flex">{children}</div>
    </div>
  )
}
