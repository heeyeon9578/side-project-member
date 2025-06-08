import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import QueryProvider from "@/app/query-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "사이드 프로젝트 멤버 모집 플랫폼",
  description: "개발자를 위한 사이드 프로젝트 멤버 모집 플랫폼",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <Link href="/" className="font-bold text-xl">
                    DevTeam
                  </Link>
                  <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-primary">
                      홈
                    </Link>
                    <Link href="/projects/browse" className="text-sm font-medium hover:text-primary">
                      프로젝트 찾기
                    </Link>
                    <Link href="/members" className="text-sm font-medium hover:text-primary">
                      팀원 찾기
                    </Link>
                    <Link href="/profile" className="text-sm font-medium hover:text-primary">
                      내 프로필
                    </Link>
                  </nav>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
                      <Link href="/auth/login">로그인</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/projects/create">프로젝트 등록</Link>
                    </Button>
                  </div>
                </div>
              </header>
              <div className="flex-1">{children}</div>
              <footer className="border-t py-8 bg-muted/40">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="font-bold mb-4">DevTeam</h3>
                      <p className="text-sm text-muted-foreground">
                        개발자를 위한 사이드 프로젝트 멤버 모집 플랫폼입니다. 함께 성장하고 배울 수 있는 팀을 찾아보세요.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">서비스</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/projects/browse" className="text-muted-foreground hover:text-foreground">
                            프로젝트 찾기
                          </Link>
                        </li>
                        <li>
                          <Link href="/members" className="text-muted-foreground hover:text-foreground">
                            팀원 찾기
                          </Link>
                        </li>
                        <li>
                          <Link href="/projects/create" className="text-muted-foreground hover:text-foreground">
                            프로젝트 등록
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            자주 묻는 질문
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">회사</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            소개
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            블로그
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            채용
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            연락처
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">법적 정보</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            이용약관
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            개인정보처리방침
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground hover:text-foreground">
                            쿠키 정책
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} DevTeam. All rights reserved.
                  </div>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
