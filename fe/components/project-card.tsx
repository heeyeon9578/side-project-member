"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Project } from "@/lib/type/projectType"
import { Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative h-48 w-full">
            <Image src={project.thumbnail || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl line-clamp-1">{project.title}</h3>
              <div className="flex -space-x-2">
                <div className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                  {project.owner ? (
                    <Image src={project.owner.avatar} alt={project.owner.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm text-gray-500">No Avatar</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {project.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.skills.length - 3}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{project.positions.length}명 모집</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>마감 {project.deadline}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
