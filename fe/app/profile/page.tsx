import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProjectCard } from "@/components/project-card"
import { mockProjects } from "@/lib/mock-data"
import { Briefcase, Calendar, Github, Globe, Mail, MapPin, Pencil } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProfilePage() {
  // 임시 사용자 데이터
  const user = {
    id: "1",
    name: "김개발",
    position: "프론트엔드 개발자",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "React와 TypeScript를 주로 사용하는 프론트엔드 개발자입니다. 사용자 경험을 중요시하며, 새로운 기술을 배우는 것을 좋아합니다. 현재 사이드 프로젝트를 통해 백엔드 기술도 학습 중입니다.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
    experience: "3년차",
    location: "서울특별시",
    email: "developer@example.com",
    github: "https://github.com/username",
    website: "https://portfolio.example.com",
    joinDate: "2023년 5월",
  }

  // 사용자의 프로젝트 (임시 데이터)
  const userProjects = mockProjects.slice(0, 2)
  const appliedProjects = mockProjects.slice(2, 4)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.position}</p>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {user.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  {user.skills.length > 3 && <Badge variant="outline">+{user.skills.length - 3}</Badge>}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{user.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub 프로필
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    포트폴리오
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>가입일: {user.joinDate}</span>
                </div>
              </div>

              <Button className="w-full" asChild>
                <Link href="/profile/edit">
                  <Pencil className="h-4 w-4 mr-2" />
                  프로필 수정
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>소개</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{user.bio}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="my-projects">
            <TabsList className="mb-4">
              <TabsTrigger value="my-projects">내 프로젝트</TabsTrigger>
              <TabsTrigger value="applied-projects">지원한 프로젝트</TabsTrigger>
              <TabsTrigger value="skills">기술 스택</TabsTrigger>
            </TabsList>

            <TabsContent value="my-projects">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">내가 만든 프로젝트</h2>
                  <Button asChild>
                    <Link href="/projects/create">새 프로젝트 등록</Link>
                  </Button>
                </div>
                {userProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">아직 등록한 프로젝트가 없습니다.</p>
                      <Button asChild>
                        <Link href="/projects/create">프로젝트 등록하기</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="applied-projects">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">지원한 프로젝트</h2>
                {appliedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appliedProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">아직 지원한 프로젝트가 없습니다.</p>
                      <Button asChild>
                        <Link href="/projects/browse">프로젝트 찾아보기</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>기술 스택</CardTitle>
                  <CardDescription>보유하고 있는 기술 스택과 경험</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">프론트엔드</h3>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS", "JavaScript"].map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">백엔드</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Node.js", "Express", "GraphQL", "REST API"].map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">기타</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Git", "GitHub", "Docker", "AWS", "Firebase"].map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
