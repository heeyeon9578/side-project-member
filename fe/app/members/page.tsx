import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemberList } from "@/components/member-list"

export default function MembersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">팀원 찾기</h1>
        <p className="text-muted-foreground">다양한 기술과 경험을 가진 개발자, 디자이너, 기획자를 찾아보세요.</p>
      </div>

      <div className="flex max-w-3xl mx-auto gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="이름, 기술 스택, 포지션 등으로 검색..." className="pl-8" />
        </div>
        <Button>검색</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">필터</h2>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">포지션</h3>
                  <div className="space-y-2">
                    {[
                      "프론트엔드 개발자",
                      "백엔드 개발자",
                      "풀스택 개발자",
                      "모바일 개발자",
                      "UI/UX 디자이너",
                      "기획자",
                    ].map((position) => (
                      <div key={position} className="flex items-center space-x-2">
                        <Checkbox id={`position-${position}`} />
                        <Label htmlFor={`position-${position}`} className="text-sm font-normal">
                          {position}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">기술 스택</h3>
                  <div className="space-y-2">
                    {["React", "Node.js", "Python", "TypeScript", "Flutter", "Unity", "Django"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox id={`skill-${skill}`} />
                        <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">경력</h3>
                  <div className="space-y-2">
                    {["신입", "1-3년", "3-5년", "5-10년", "10년 이상"].map((experience) => (
                      <div key={experience} className="flex items-center space-x-2">
                        <Checkbox id={`experience-${experience}`} />
                        <Label htmlFor={`experience-${experience}`} className="text-sm font-normal">
                          {experience}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">필터 적용</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="active">활동중</TabsTrigger>
                <TabsTrigger value="recent">최근 가입</TabsTrigger>
                <TabsTrigger value="experienced">경력자</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <MemberList />
            </TabsContent>
            <TabsContent value="active" className="mt-0">
              <MemberList />
            </TabsContent>
            <TabsContent value="recent" className="mt-0">
              <MemberList />
            </TabsContent>
            <TabsContent value="experienced" className="mt-0">
              <MemberList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
