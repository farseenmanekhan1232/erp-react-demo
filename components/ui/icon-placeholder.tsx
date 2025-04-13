/**
 * IconPlaceholder Component
 *
 * This component renders appropriate SVG icons for the ERP interface
 * based on the icon name passed. If no specific icon is found,
 * it falls back to a colored placeholder that matches the style.
 */
import type React from "react"

interface IconPlaceholderProps {
  className?: string
  width?: number
  height?: number
  iconName?: string
  color?: string
}

export const IconPlaceholder: React.FC<IconPlaceholderProps> = ({
  className = "mr-1",
  width = 16,
  height = 16,
  iconName = "",
  color = "#4a7ebb",
}) => {
  // Render appropriate icon based on iconName
  const renderIcon = () => {
    switch (iconName) {
      case "routine":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height} fill={color}>
            <rect x="1" y="3" width="14" height="10" fill="#f8cb4c" stroke="#b5873b" strokeWidth="1" />
            <rect x="3" y="5" width="10" height="2" fill="#fffbe6" />
            <rect x="3" y="8" width="10" height="2" fill="#fffbe6" />
          </svg>
        )
      case "basic-data":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <rect x="2" y="2" width="12" height="12" fill="#e6e6e6" stroke="#666" strokeWidth="1" />
            <rect x="4" y="4" width="8" height="2" fill="#7b7b7b" />
            <rect x="4" y="7" width="8" height="1" fill="#7b7b7b" />
            <rect x="4" y="9" width="8" height="1" fill="#7b7b7b" />
            <rect x="4" y="11" width="5" height="1" fill="#7b7b7b" />
          </svg>
        )
      case "accounting":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <circle cx="8" cy="8" r="7" fill="#acd0e5" stroke="#4a7ebb" strokeWidth="1" />
            <rect x="5" y="5" width="6" height="6" fill="#fffbe6" stroke="#666" strokeWidth="1" />
            <line x1="6" y1="7" x2="10" y2="7" stroke="#333" strokeWidth="1" />
            <line x1="6" y1="9" x2="10" y2="9" stroke="#333" strokeWidth="1" />
          </svg>
        )
      case "report":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <rect x="3" y="2" width="10" height="12" fill="#d9ecff" stroke="#4a7ebb" strokeWidth="1" />
            <rect x="5" y="4" width="6" height="1" fill="#4a7ebb" />
            <rect x="5" y="6" width="6" height="1" fill="#4a7ebb" />
            <rect x="5" y="8" width="6" height="1" fill="#4a7ebb" />
            <rect x="5" y="10" width="4" height="1" fill="#4a7ebb" />
          </svg>
        )
      case "system":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <circle cx="8" cy="8" r="6" fill="#a5e8aa" stroke="#458f49" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="#ffffff" stroke="#333" strokeWidth="1" />
            <line x1="8" y1="2" x2="8" y2="4" stroke="#333" strokeWidth="1" />
            <line x1="8" y1="12" x2="8" y2="14" stroke="#333" strokeWidth="1" />
            <line x1="2" y1="8" x2="4" y2="8" stroke="#333" strokeWidth="1" />
            <line x1="12" y1="8" x2="14" y2="8" stroke="#333" strokeWidth="1" />
          </svg>
        )
      case "management":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <rect x="1" y="3" width="14" height="10" fill="#f0d89e" stroke="#b08d3c" strokeWidth="1" />
            <path d="M4,8 L12,8 L10,12 L6,12 Z" fill="#b08d3c" />
            <rect x="7" y="1" width="2" height="5" fill="#b08d3c" />
          </svg>
        )
      case "packaging":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <rect x="2" y="4" width="12" height="8" fill="#a0c8e0" stroke="#4a7ebb" strokeWidth="1" />
            <rect x="4" y="6" width="8" height="4" fill="#ffffff" stroke="#4a7ebb" strokeWidth="1" />
            <path d="M5,8 L11,8" stroke="#4a7ebb" strokeWidth="1" />
            <path d="M8,6 L8,10" stroke="#4a7ebb" strokeWidth="1" />
          </svg>
        )
      case "call-display":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <path
              d="M3,4 C3,3 4,2 5,2 L11,2 C12,2 13,3 13,4 L13,12 C13,13 12,14 11,14 L5,14 C4,14 3,13 3,12 Z"
              fill="#e6e6e6"
              stroke="#333"
              strokeWidth="1"
            />
            <rect x="4" y="3" width="8" height="5" fill="#a0c8e0" />
            <path
              d="M5,10 C5,9.5 5.5,9 6,9 L10,9 C10.5,9 11,9.5 11,10 L11,12 C11,12.5 10.5,13 10,13 L6,13 C5.5,13 5,12.5 5,12 Z"
              fill="#333"
            />
          </svg>
        )
      case "notification":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <circle cx="8" cy="8" r="7" fill="#c9e7ff" stroke="#4a7ebb" strokeWidth="1" />
            <circle cx="8" cy="5" r="1.5" fill="#4a7ebb" />
            <rect x="7" y="7" width="2" height="5" rx="0.5" fill="#4a7ebb" />
          </svg>
        )
      case "user":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <circle cx="8" cy="5" r="3" fill="#8bc4f3" stroke="#4a7ebb" strokeWidth="1" />
            <path d="M3,15 C3,11 5,9 8,9 C11,9 13,11 13,15" fill="#8bc4f3" stroke="#4a7ebb" strokeWidth="1" />
          </svg>
        )
      case "manual-call":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <path d="M4,3 L7,3 L9,5 L12,5 L12,12 L4,12 Z" fill="#e6e6e6" stroke="#666" strokeWidth="1" />
            <path d="M6,8 L10,8 M8,6 L8,10" stroke="#e62e2e" strokeWidth="1.5" />
          </svg>
        )
      case "sales":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <rect x="2" y="3" width="12" height="10" fill="#e6e6e6" stroke="#666" strokeWidth="1" />
            <path d="M3,5 L13,5" stroke="#666" />
            <path d="M3,7 L13,7" stroke="#666" />
            <path d="M3,9 L13,9" stroke="#666" />
            <path d="M3,11 L13,11" stroke="#666" />
            <path d="M5,3 L5,13" stroke="#666" />
            <path d="M9,3 L9,13" stroke="#666" />
          </svg>
        )
      case "app-icon":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <circle cx="8" cy="8" r="7" fill="#4a7ebb" />
            <path d="M4,6 L12,6 L12,10 L4,10 Z" fill="#ffffff" />
            <path d="M5,7 L11,7 M5,8 L11,8 M5,9 L9,9" stroke="#4a7ebb" strokeWidth="0.5" />
          </svg>
        )
      case "icon-help":
        return (
          <svg viewBox="0 0 16 16" width={width} height={height}>
            <circle cx="8" cy="8" r="7" fill="#4a7ebb" stroke="#2a5e9b" strokeWidth="1" />
            <text x="8" y="12" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
              ?
            </text>
          </svg>
        )
      // Add more icon cases as needed
      default:
        // Fall back to a colored placeholder that fits the interface style
        return (
          <div
            className={`bg-blue-100 border border-blue-300 rounded-sm ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        )
    }
  }

  return renderIcon()
}
