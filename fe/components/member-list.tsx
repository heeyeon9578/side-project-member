"use client"

import { useState } from "react"
import { MemberCard } from "./member-card"
import { mockMembers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export function MemberList() {
  const [visibleMembers, setVisibleMembers] = useState(6)

  const loadMore = () => {
    setVisibleMembers((prev) => prev + 6)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMembers.slice(0, visibleMembers).map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {visibleMembers < mockMembers.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} variant="outline">
            더 보기
          </Button>
        </div>
      )}
    </div>
  )
}
