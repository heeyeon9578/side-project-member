'use client';
import React from "react";

async function getProjects() {
  const res = await fetch("http://localhost:5001/projects", { cache: "no-store" });
  console.log(res);
  if (!res.ok) throw new Error("프로젝트 목록을 불러오지 못했습니다");
  return res.json();
}

export default async function BrowseProjectsPage() {
  const projects = await getProjects();
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
