"use client"

/**
 * TaxOptions Component
 *
 * Renders the tax type selection radio buttons.
 * Handles the tax type selection and displays the options in the correct format.
 */
import type React from "react"
import type { TaxType } from "@/types"

interface TaxOptionsProps {
  taxType: TaxType
  onChange: (type: TaxType) => void
}

export const TaxOptions: React.FC<TaxOptionsProps> = ({ taxType, onChange }) => {
  return (
    <div className="flex flex-col justify-start items-end">
      <div className="text-right mb-2 text-red-500 font-medium">稅別</div>
      <div className="flex items-center mb-1">
        <input
          type="radio"
          id="tax-exempt"
          name="tax-type"
          value="exempt"
          checked={taxType === "exempt"}
          onChange={() => onChange("exempt")}
          className="mr-1"
        />
        <label htmlFor="tax-exempt" className="chinese-text">
          免稅
        </label>
      </div>
      <div className="flex items-center mb-1">
        <input
          type="radio"
          id="tax-external"
          name="tax-type"
          value="external"
          checked={taxType === "external"}
          onChange={() => onChange("external")}
          className="mr-1"
        />
        <label htmlFor="tax-external" className="chinese-text">
          外加
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="tax-included"
          name="tax-type"
          value="included"
          checked={taxType === "included"}
          onChange={() => onChange("included")}
          className="mr-1"
        />
        <label htmlFor="tax-included" className="chinese-text">
          內含
        </label>
      </div>
    </div>
  )
}
