import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { mockProjects } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApplyPageProps {
  params: {
    id: string
  }
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const project = mockProjects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <main className="container max-w-3xl mx-auto px-4 py-8">
      <Link href={`/projects/${params.id}`} className="inline-flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        프로젝트로 돌아가기
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">"{project.title}" 프로젝트 지원하기</CardTitle>
          <CardDescription>프로젝트에 관심을 가져주셔서 감사합니다. 아래 양식을 작성하여 지원해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="example@email.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">지원 포지션</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="지원하고자 하는 포지션을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {project.positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">포트폴리오 URL (선택사항)</Label>
              <Input id="portfolio" placeholder="https://your-portfolio.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL (선택사항)</Label>
              <Input id="github" placeholder="https://github.com/username" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">관련 경험</Label>
              <Textarea
                id="experience"
                placeholder="관련 프로젝트 경험이나 기술 스택에 대해 간략히 설명해주세요."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">지원 동기</Label>
              <Textarea
                id="motivation"
                placeholder="이 프로젝트에 지원하게 된 동기와 기여할 수 있는 부분에 대해 설명해주세요."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">참여 가능 시간</Label>
              <Textarea
                id="availability"
                placeholder="주당 몇 시간 정도 프로젝트에 참여할 수 있는지, 선호하는 작업 시간대가 있다면 알려주세요."
                rows={2}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">지원서 제출하기</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
