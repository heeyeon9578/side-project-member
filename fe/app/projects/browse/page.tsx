'use client';
import React from "react";
import { useProjects } from "@/app/queries/projectQueries";

export default async function BrowseProjectsPage() {
  const { data: projects } = useProjects();

  if (!projects) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">프로젝트 찾기</h1>
      <ul className="space-y-2">
        {projects.map((project: any) => (
          <li key={project.id} className="border p-4 rounded">
            <div className="font-semibold">{project.title}</div>
            <div className="text-sm text-gray-500">기술스택: {project.stack.join(", ")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
