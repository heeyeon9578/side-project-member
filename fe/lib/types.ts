export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  skills: string[]
  deadline: string
  positions: string[]
  owner: {
    name: string
    avatar: string
  }
}

export interface Member {
  id: string
  name: string
  position: string
  avatar: string
  bio: string
  skills: string[]
  experience: string
  location: string
  email: string
  github?: string
  website?: string
}
