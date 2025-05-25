import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">프로젝트</h1>
      <p className="mb-4">프로젝트 관련 페이지입니다.</p>
      <div className="flex gap-4">
        <Link href="/projects/browse" className="text-blue-500 hover:underline">
          프로젝트 찾기
        </Link>
        <Link href="/projects/create" className="text-blue-500 hover:underline">
          프로젝트 등록
        </Link>
      </div>
    </div>
  )
}
