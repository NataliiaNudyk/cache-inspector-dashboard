import { useEffect, useState } from "react";

type RequestStatus = "success" | "error";


interface RequestLogItem {
  id: number;
  time: string;
  status: RequestStatus;
  delay: number; 
}

export default function RequestLog() {
  const [logs, setLogs] = useState<RequestLogItem[]>([]);
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

   const addLog = async (id: number) => {
    const start = Date.now();
    const url = "https://api.coingecko.com/api/v3/ping";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
      const end = Date.now();
      setLogs((prev) => [
        { id, time: new Date().toLocaleTimeString(), status: "success", delay: end - start },
        ...prev.slice(0, 9),
      ]);
    } catch {
      const end = Date.now();
      setLogs((prev) => [
        { id, time: new Date().toLocaleTimeString(), status: "error", delay: end - start },
        ...prev.slice(0, 9),
      ]);
    }
  };

  useEffect(() => {
    for (let i = 1; i <= 10; i++) {
      addLog(i);
    }
  }, []);

  const filteredLogs = logs.filter((log) => filter === "all" || log.status === filter);
 
  return (
    <div className="bg-(--dark-surface) p-6 rounded-[10px]">
      <h2 className="text-xl font-bold mb-2">Request Log</h2>
      <div className="mb-2">
        <button onClick={() => setFilter("all")} className={`mr-2 px-2 py-1 border rounded-[10px]  ${filter === 'all' ? 'bg-(--progreess-bar-secondary) text-(--main-text-color)' : ''}`}>All</button>
        <button onClick={() => setFilter("success")} className={`mr-2 px-2 py-1 border rounded-[10px]  ${filter === 'success' ? 'bg-(--progreess-bar-secondary) text-(--main-text-color)' : ''}`}>Success</button>
        <button onClick={() => setFilter("error")} className={`mr-2 px-2 py-1 border rounded-[10px]  ${filter === 'error' ? 'bg-(--progreess-bar-secondary) text-(--main-text-color)' : ''}`}>Error</button>
      </div>
      <table className="border-collapse border w-full text-left">
        <thead>
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Delay (ms)</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr key={log.id}>
              <td className="border px-2 py-1">{log.id}</td>
              <td className="border px-2 py-1">{log.time}</td>
              <td className={`border px-2 py-1 ${log.status === "success" ? "text-green-600" : "text-red-600"}`}>
                {log.status}
              </td>
              <td className="border px-2 py-1">{log.delay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
