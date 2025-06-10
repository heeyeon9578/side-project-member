"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

export function SkillsInput({ skills, setSkills }: { skills: string[], setSkills: (skills: string[]) => void }) {
  const [inputValue, setInputValue] = useState("")

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills([...skills, inputValue.trim()])
      setInputValue("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="React, Node.js, TypeScript 등"
        />
        <Button type="button" onClick={addSkill} variant="secondary">
          추가
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="px-2 py-1">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {skill}</span>
            </button>
          </Badge>
        ))}
        {skills.length === 0 && (
          <div className="text-sm text-muted-foreground">기술 스택을 입력하고 추가 버튼을 누르세요</div>
        )}
      </div>
    </div>
  )
}
