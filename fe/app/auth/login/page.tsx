'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { login } from "@/lib/api/login"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * 로그인 핸들러
   */
  const handleSubmit = async () => {
    const response = await login(email, password);
    console.log('🔍 [handleSubmit] response →', response);
    if (response.accessToken) {
      // localStorage.setItem('accessToken', response.accessToken);
       router.push('/');ㄹㄹㄹㄹㄹㄹㄹㄹㄹ
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">로그인</CardTitle>
          <CardDescription className="text-center">계정에 로그인하여 프로젝트를 찾거나 등록하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
              <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요" />
          </div>
          <Button className="w-full" onClick={handleSubmit}>로그인</Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">또는</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white text-black border-gray-300 hover:bg-gray-100 hover:text-black"
            >
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              회원가입
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
