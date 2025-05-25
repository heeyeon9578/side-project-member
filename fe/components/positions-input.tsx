"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

export function PositionsInput() {
  const [positions, setPositions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const addPosition = () => {
    if (inputValue.trim() && !positions.includes(inputValue.trim())) {
      setPositions([...positions, inputValue.trim()])
      setInputValue("")
    }
  }

  const removePosition = (position: string) => {
    setPositions(positions.filter((p) => p !== position))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addPosition()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="프론트엔드 개발자, 백엔드 개발자, UI/UX 디자이너 등"
        />
        <Button type="button" onClick={addPosition} variant="secondary">
          추가
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {positions.map((position) => (
          <Badge key={position} variant="secondary" className="px-2 py-1">
            {position}
            <button
              type="button"
              onClick={() => removePosition(position)}
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {position}</span>
            </button>
          </Badge>
        ))}
        {positions.length === 0 && (
          <div className="text-sm text-muted-foreground">모집할 포지션을 입력하고 추가 버튼을 누르세요</div>
        )}
      </div>
    </div>
  )
}
