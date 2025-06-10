export interface Project {
    id: number
    title: string
    description: string
    thumbnail?: string
    skills: string[]
    positions: string[]
    category?: string
    deadline?: string // ISO 형식 문자열
    duration?: string
    isRemote?: boolean
    meetingNote?: string
    githubUrl?: string
    maxMembers: number
    homepageUrl?: string
    owner: {
        id: number
        name: string
        avatar: string
    }
    createdAt: string
    updatedAt: string
}

export interface CreateProjectRequest {
    title: string
    description: string
    thumbnail?: string
    skills: string[]
    positions: string[]
    category?: string
    deadline?: string // ISO 8601 형식 e.g. "2025-06-30"
    duration?: string
    isRemote?: boolean
    meetingNote?: string
    githubUrl?: string
    homepageUrl?: string
    maxMembers: number
}


export interface UpdateProjectRequest {
    title?: string
    description?: string
    thumbnail?: string
    skills?: string[]
    positions?: string[]
    category?: string
    deadline?: string
    duration?: string
    isRemote?: boolean
    meetingNote?: string
    githubUrl?: string
    homepageUrl?: string
    maxMembers?: number
}   
