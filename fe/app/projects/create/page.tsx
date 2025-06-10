"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { SkillsInput } from "@/components/skills-input"
import { PositionsInput } from "@/components/positions-input"
import { DatePicker } from "@/components/date-picker"
import { useState } from "react"
import { CreateProjectRequest } from "@/lib/type/projectType"
import { useCreateProject } from "@/app/queries/projectQueries"

export default function CreateProjectPage() {
  const { mutate: createProject } = useCreateProject()
  const [form, setForm] = useState<CreateProjectRequest>({
    title: "",
    description: "",
    duration: "",
    skills: [] as string[],
    positions: [] as string[],
    category: "",
    deadline: "",
    thumbnail: "",
    githubUrl: "",
    homepageUrl: "",
    isRemote: true,
    meetingNote: "",
    maxMembers: 1,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createProject(form)
  }

  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        홈으로 돌아가기
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">새 프로젝트 등록</CardTitle>
          <CardDescription>사이드 프로젝트에 대한 정보를 입력하고 함께할 팀원을 찾아보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">프로젝트 제목</Label>
              <Input id="title" placeholder="프로젝트의 제목을 입력하세요" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">프로젝트 설명</Label>
              <Textarea id="description" placeholder="프로젝트에 대한 상세 설명을 입력하세요" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>프로젝트 카테고리</Label>
                <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">웹 개발</SelectItem>
                    <SelectItem value="mobile">모바일 앱</SelectItem>
                    <SelectItem value="ai">AI/머신러닝</SelectItem>
                    <SelectItem value="game">게임 개발</SelectItem>
                    <SelectItem value="blockchain">블록체인</SelectItem>
                    <SelectItem value="iot">IoT</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>예상 기간</Label>
                <Select value={form.duration} onValueChange={(value) => setForm({ ...form, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="예상 기간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1개월 미만</SelectItem>
                    <SelectItem value="3months">1-3개월</SelectItem>
                    <SelectItem value="6months">3-6개월</SelectItem>
                    <SelectItem value="year">6개월-1년</SelectItem>
                    <SelectItem value="longterm">1년 이상</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="isRemote">원격 협업 가능 여부</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isRemote"
                  checked={form.isRemote}
                  onChange={(e) => setForm({ ...form, isRemote: e.target.checked })}
                />
                <span className="text-sm">원격으로 진행할 수 있어요</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingNote">미팅 방식 및 기타 사항</Label>
              <Textarea
                id="meetingNote"
                placeholder="예: 매주 수요일 20시에 Google Meet로 진행 예정"
                rows={3}
                value={form.meetingNote}
                onChange={(e) => setForm({ ...form, meetingNote: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>필요한 기술 스택</Label>
              <SkillsInput skills={form.skills} setSkills={(skills) => setForm({ ...form, skills })} />
            </div>

            <div className="space-y-2">
              <Label>모집 포지션</Label>
              <PositionsInput positions={form.positions} setPositions={(positions) => setForm({ ...form, positions })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>모집 마감일</Label>
                <DatePicker deadline={form.deadline} setDeadline={(deadline) => setForm({ ...form, deadline })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxMembers">최대 팀원 수</Label>
                <Input id="maxMembers" type="number" min="1" placeholder="5" value={form.maxMembers} onChange={(e) => setForm({ ...form, maxMembers: parseInt(e.target.value) })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">프로젝트 썸네일 이미지 URL</Label>
              <Input id="thumbnail" placeholder="https://example.com/image.jpg" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
              <p className="text-xs text-muted-foreground">
                프로젝트를 대표하는 이미지 URL을 입력하세요. 입력하지 않으면 기본 이미지가 사용됩니다.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repoUrl">GitHub 저장소 URL (선택사항)</Label>
              <Input id="repoUrl" placeholder="https://github.com/username/repo" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">프로젝트 웹사이트 URL (선택사항)</Label>
              <Input id="websiteUrl" placeholder="https://your-project.com" value={form.homepageUrl} onChange={(e) => setForm({ ...form, homepageUrl: e.target.value })} />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/">취소</Link>
              </Button>
              <Button type="submit">프로젝트 등록</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
