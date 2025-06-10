"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Member } from "@/lib/type/memberType"
import { Briefcase, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link href={`/members/${member.id}`}>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image src={member.avatar || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.position}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 mb-4">
              {member.skills.slice(0, 5).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{member.skills.length - 5}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{member.bio}</p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                <span>{member.experience}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{member.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              프로필 보기
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
