"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { mockProjects } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export function ProjectList() {
  const [visibleProjects, setVisibleProjects] = useState(6)

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.slice(0, visibleProjects).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {visibleProjects < mockProjects.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} variant="outline">
            더 보기
          </Button>
        </div>
      )}
    </div>
  )
}
