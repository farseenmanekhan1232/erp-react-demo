"use client"

/**
 * useKeyboardShortcuts Hook
 *
 * Custom hook for handling keyboard shortcuts in the ERP interface.
 * Provides a way to register and handle keyboard shortcuts.
 */
import { useEffect } from "react"

type ShortcutHandler = () => void

interface ShortcutConfig {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  handler: ShortcutHandler
  description: string
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      for (const shortcut of shortcuts) {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!event.ctrlKey === !!shortcut.ctrl &&
          !!event.altKey === !!shortcut.alt &&
          !!event.shiftKey === !!shortcut.shift
        ) {
          event.preventDefault()
          shortcut.handler()
          break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [shortcuts])

  // Return the list of shortcuts for help display
  return {
    shortcuts: shortcuts.map((s) => ({
      key: s.key,
      ctrl: s.ctrl,
      alt: s.alt,
      shift: s.shift,
      description: s.description,
    })),
  }
}
