import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

export default function Test() {
    interface EditHistoryLog {
        id: string; // 고유 id
        editor: string; // 수정자
        timestamp: string; // ISO 형식 시간
        changes: string[]; // 어떤 내용이 수정되었는지
      }
      
      const historyLogs: EditHistoryLog[] = [
        {
          id: "log-1",
          editor: "홍길동",
          timestamp: "2025-05-30T12:34:56Z",
          changes: ["제목을 '안녕하세요'로 변경", "본문 수정"],
        },
        {
          id: "log-2",
          editor: "김개발",
          timestamp: "2025-05-31T09:00:00Z",
          changes: ["카테고리 변경", "태그 추가"],
        },
      ];
  return (
    <>
      <Accordion type="single" collapsible>
      {historyLogs.map((log) => (
        <AccordionItem key={log.id} value={log.id}>
          <AccordionTrigger>
            🛠️ {log.editor}님이 {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm")}에 수정함
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-1">
              {log.changes.map((change, index) => (
                <li key={index}>📝 {change}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
      </Accordion>
    </>
  );
}
