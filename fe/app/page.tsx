import { ProjectList } from "@/components/project-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4 sm:text-5xl">개발자를 위한 사이드 프로젝트 플랫폼</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          당신의 아이디어를 현실로 만들어줄 팀원을 찾거나, 흥미로운 프로젝트에 참여해보세요.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="프로젝트 검색..." className="pl-8" />
          </div>
          <Button asChild>
            <Link href="/projects/browse">검색</Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">인기 프로젝트</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/projects/browse?sort=recent">최신순</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/projects/browse?sort=popular">인기순</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/projects/browse?sort=deadline">마감임박</Link>
            </Button>
          </div>
        </div>
        <ProjectList />
      </section>
    </main>
  )
}
