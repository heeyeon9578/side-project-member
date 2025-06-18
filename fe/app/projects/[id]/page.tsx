"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockProjects } from "@/lib/mock-data"
import { Calendar, ChevronLeft, Clock, ExternalLink, Github, Mail, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useProject } from "@/app/queries/projectQueries"
import { Project } from "@/lib/type/projectType"
import { useParams } from "next/navigation"

export default function ProjectPage() {
  const params = useParams();
  const projectId = Number(params.id)  // ← OK!
  const { data: project, isLoading } = useProject(projectId)
  const [localProject, setLocalProject] = useState<Project | null>(null)
  useEffect(() => {
    if (project) {
      setLocalProject(project)
      console.log("🚀 project loaded:", project)
    }
  }, [project])

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (!localProject) {
  //   notFound()
  // }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        모든 프로젝트로 돌아가기
      </Link>

      {
        localProject && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden">
                {localProject?.thumbnail && (
                  <Image src={localProject?.thumbnail} alt={localProject?.title} fill className="object-cover" />
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-4">{localProject?.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {localProject?.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="prose max-w-none">
                  <h2>프로젝트 소개</h2>
                  <p>{localProject?.description}</p>

                  <h2>우리가 찾고 있는 팀원</h2>
                  <ul>
                    {localProject?.positions.map((position: string) => (
                      <li key={position}>{position}</li>
                    ))}
                  </ul>

                  <h2>프로젝트 일정</h2>
                  <ul>
                    <li>기획 및 디자인: 2주</li>
                    <li>개발: 2개월</li>
                    <li>테스트 및 배포: 2주</li>
                    <li>유지보수 및 업데이트: 지속적</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      {localProject?.owner ? (
                        <Image src={localProject?.owner.avatar} alt={localProject?.owner.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm text-gray-500">No Avatar</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{localProject?.owner.name}</h3>
                      <p className="text-sm text-muted-foreground">프로젝트 리더</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{localProject?.maxMembers}명 모집 중</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>마감일: {localProject?.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>예상 기간: {localProject?.duration}개월</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{localProject?.isRemote ? "원격 작업" : "오프라인 작업"}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <Link href={`/projects/${localProject?.id}/apply`}>지원하기</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={`mailto:contact@example.com?subject=프로젝트 문의: ${localProject?.title}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        이메일로 문의하기
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">프로젝트 링크</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub 저장소
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        프로젝트 웹사이트
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      }
    </main>
  )
}
