'use client';

import { useState } from "react";
import { ProjectCard } from "./project-card";
// import { mockProjects } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { useProjects } from "@/app/queries/projectQueries"

import { Project } from "@/lib/type/projectType";

export function ProjectList() {
  const { data: projects } = useProjects()

  // const loadMore = () => {
  //   setVisibleProjects((prev) => prev + 6);
  // }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project as Project} />
        ))}
      </div>

      {projects && projects.length > 0 && (
        <div className="flex justify-center mt-8">
          {/* <Button onClick={loadMore} variant="outline">
            더 보기
          </Button> */}
        </div>
      )}
    </div>
  );
}
