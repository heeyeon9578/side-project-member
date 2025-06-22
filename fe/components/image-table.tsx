"use client"
import { useEffect, useRef, useCallback, Dispatch, SetStateAction, useState } from "react"
import { SquareArrowDown, SquareArrowUp, SquareCheck, SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageViewerModal from "@/components/image-viewer-modal";


interface Props {
    data: any[]
    rowSelection: Record<number, boolean>
    onRowSelectionChange: Dispatch<SetStateAction<Record<number, boolean>>>
    isDisabled: boolean
    fetchNextPage: () => void
    hasNextPage: boolean
    isFetchingNextPage: boolean
    isLoading: boolean
    handleEditImageName: (image: any, imageName: string) => void
}

export default function EditImageTable({
    data,
    // onSelectionChange,
    rowSelection,
    onRowSelectionChange,
    isDisabled,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handleEditImageName,
}: Props) {
    const [imageName, setImageName] = useState(""); // 이미지 파일명 수정 상태 관리
    // ✅ 무한 스크롤 옵저버용 ref
    const loadMoreRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        console.log(`
            
            
            
            data 
            
            
            
            `,data)
    }, [data])  
    useEffect(() => {
        // 🚫 현재 로딩 중이거나 다음 페이지가 없으면 옵저버 해제
        if (isFetchingNextPage || !hasNextPage) {
            observerRef.current?.disconnect()
            return
        }

        // 🔄 기존 옵저버가 있으면 해제
        observerRef.current?.disconnect()

        // ⚙️ 새로운 옵저버 생성 (rootMargin 적절 조정)
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchNextPage()
                }
            },
            { rootMargin: "0px 0px 500px 0px" } // 📐 아래 방향으로 200px 일찍 호출
        )

        // 👀 감시 대상 등록
        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        // ✂️ 컴포넌트 언마운트 시 해제
        return () => {
            observerRef.current?.disconnect()
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    // 🎯 행 클릭 토글
    const handleRowClick = useCallback((id: number) => {
        onRowSelectionChange(prev => ({ ...prev, [id]: !prev[id] }))
    }, [onRowSelectionChange])

    // 🎨 행 배경
    const getRowClassName = useCallback(
        (id: number) => rowSelection[id] ? "bg-green-100" : "bg-red-100",
        [rowSelection]
    )
    // 🚀 스크롤 버튼 핸들러 ✨
    /**
     * 스크롤 맨 위로 부드럽게 이동
     */
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }) // 🎯 부드러운 스크롤
    }

    /**
     * 로드 모어 위치로 부드럽게 이동하거나, 없으면 문서 맨 아래로 스크롤
     */
    const handleScrollToBottom = () => {
        if (loadMoreRef.current) {
            loadMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // 🎯 로드 모어 위치로 이동
        } else {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }) // 🎯 문서 맨 아래로 이동
        }
    }

    const [isEditMode, setIsEditMode] = useState<Record<number, boolean>>({})
    // ✨ 헤더 체크박스 indeterminate
    const headerRef = useRef<HTMLInputElement>(null)
    const allSelected = Object.values(rowSelection).every(Boolean)
    const someSelected = Object.values(rowSelection).some(Boolean) && !allSelected
    useEffect(() => {
        if (headerRef.current) headerRef.current.indeterminate = someSelected
    }, [someSelected])



    // 📊 Flex 레이아웃으로 테이블 대체
    return (
        <div className="flex flex-col w-full relative">
            <div className="fixed bottom-16 right-4 z-10 flex justify-end gap-2 mb-2  z-10">
                <Button size="sm" variant="outline" onClick={handleScrollToTop}>
                    <SquareArrowUp />맨 위로
                </Button>
                <Button size="sm" variant="outline" onClick={handleScrollToBottom}>
                    <SquareArrowDown /> {hasNextPage ? "더 불러오기" : "맨 아래로"}
                </Button>
            </div>
            {/* 헤더 */}
            <div className="flex items-center bg-gray-100 px-4 py-2 font-semibold">
                <div className="flex-1 pl-4">이미지 파일명 </div>
                <div className="w-82 text-center">원고이미지</div>
                <div className="w-82 text-center">원본이미지 (webq)</div>
                <div className="w-56 flex justify-center">
                    <input
                        ref={headerRef}
                        type="checkbox"
                        onClick={e => {
                            e.stopPropagation()   // 🎯 여기서 부모 클릭 전파 차단
                        }}
                        checked={allSelected}
                        onChange={e => onRowSelectionChange(
                            Object.fromEntries(data.map(d => [d.id, e.target.checked]))
                        )}
                        aria-label="전체 선택"
                    />
                </div>
            </div>

            {/* 바디 */}
            <div className="flex flex-col">
                {data.map(item => (
                    <div
                        key={item.id}
                        className={`flex items-center px-4 py-2 ${getRowClassName(item.id)} cursor-pointer`}
                        onClick={() => handleRowClick(item.id)}
                    >
                        <div className="flex flex-1 pl-4 items-center gap-2">
                            {
                                isEditMode[item.id] ? (
                                    <>
                                        <div className="">
                                            <Input type="text" value={imageName} onChange={(e) => {
                                                setImageName(e.target.value);
                                            }} onClick={(e) => {
                                                e.stopPropagation();
                                            }} />
                                        </div>
                                        <div className="w-10 h-10 flex items-center justify-center" onClick={(e) => {
                                            e.stopPropagation();
                                        }}>
                                            <SquareCheck className="w-4 h-4" onClick={() => {
                                                setIsEditMode(prev => ({ ...prev, [item.id]: false }));
                                                if (imageName !== item.image_name) {
                                                    handleEditImageName(item, imageName);
                                                }
                                            }} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="">
                                            {item.image_name}
                                        </div>
                                        <div
                                            className="w-10 h-10 flex items-center justify-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEditMode(prev => ({ ...prev, [item.id]: true }));
                                                setImageName(item.image_name);
                                            }}
                                        >
                                            <SquarePen className="w-4 h-4" />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-82 h-74 flex items-center justify-center" onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                {item.manuscript_url ? (
                                    <ImageViewerModal
                                        url={item.manuscript_url}
                                        alt="draft"
                                        className="object-contain w-full h-full"
                                        id={item.id}
                                        imageName={`${item.image_name} (원고)`}
                                        isOrigin={false}
                                    />
                                ) : <span>이미지 없음</span>}
                            </div>
                            <div className="w-82 h-74 flex items-center justify-center" onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                {item.original_transposed_url ? (
                                    <ImageViewerModal
                                        url={item.original_transposed_url}
                                        alt="original"
                                        className="object-contain w-full h-full"
                                        id={item.id}
                                        imageName={item.image_name + ' (원본)'}
                                        isOrigin={true}
                                    />
                                ) : <span>이미지 없음</span>}
                            </div>
                        </div>
                        <div className="w-56 flex justify-center">
                            <input
                                type="checkbox"
                                checked={rowSelection[item.id]}
                                onClick={e => {
                                    e.stopPropagation()   // 🎯 여기서 부모 클릭 전파 차단
                                }}
                                onChange={e => onRowSelectionChange(prev => ({
                                    ...prev,
                                    [item.id]: e.target.checked,
                                }))}
                                aria-label="행 선택"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 무한 스크롤 상태 */}
            <div ref={loadMoreRef} className="h-8 text-center mt-2" >
                {
                    isFetchingNextPage
                        ? "추가 로딩 중…"
                        : hasNextPage
                            ? "스크롤로 더 불러오기 📥"
                            : "모두 불러왔습니다! 🎉"
                }
            </div>
        </div>
    )
}

