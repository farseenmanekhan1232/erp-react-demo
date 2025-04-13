/**
 * Main application page
 *
 * Entry point for the ERP interface application.
 * Renders the legacy ERP interface in a full-screen container.
 */
import LegacyErpInterface from "@/components/legacy-erp-interface"

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#e6f3f7]">
      <LegacyErpInterface />
    </div>
  )
}
