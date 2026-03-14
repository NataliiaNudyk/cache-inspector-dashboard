import { RechartsDevtools } from "@recharts/devtools";
import { useEffect, useState } from "react";
import {
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  Bar,
  BarChart,
} from "recharts";

export default function LiveMetrics() {
  const [cpuData, setCpuData] = useState([
    { time: new Date().toLocaleTimeString(), cpu: 0 },
  ]);
  const [memoData, setMemoData] = useState([
    { time: new Date().toLocaleTimeString(), memory: 0 },
  ]);
  const [sessionData, setSessionsData] = useState([
    { time: new Date().toLocaleTimeString(), session: 0 },
  ]);
  const [isLive, setIsLive] = useState<boolean>();

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 100);
      const newMemory = Math.floor(Math.random() * 100);
      const newSessions = Math.floor(Math.random() * 50);

      const time = new Date().toLocaleTimeString();

      setCpuData((prev) => [...prev.slice(-49), { time, cpu: newCpu }]);
      setMemoData((prev) => [...prev.slice(-49), { time, memory: newMemory }]);
      setSessionsData((prev) => [
        ...prev.slice(-49),
        { time, session: newSessions },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="bg-(--dark-surface) p-6 rounded-[10px]">
      <h2>Live Metrics</h2>
      <div className="flex items-end">
        <div className="flex-1">
          <h3>CPU</h3>
          <AreaChart
            data={cpuData}
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "70vh",
              aspectRatio: 1.618,
            }}
            responsive
          >
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Area type="step" dataKey="cpu" stroke="#605CFF" fill="#FF69B4" />
            <RechartsDevtools />
          </AreaChart>
        </div>
        <div className="flex-1">
          <h3>Memory</h3>
          <AreaChart
            data={memoData}
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "70vh",
              aspectRatio: 1.618,
            }}
            responsive
          >
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Area
              type="monotone"
              dataKey="memory"
              stroke="#FF69B4"
              fill="#2FE5A7"
            />
            <RechartsDevtools />
          </AreaChart>
        </div>
        <div className="flex-1">
          <h3> Active Sessions</h3>
          <BarChart
            data={sessionData}
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "70vh",
              aspectRatio: 1.618,
            }}
            responsive
          >
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="session" fill="#605CFF" />
            <RechartsDevtools />
          </BarChart>
        </div>
      </div>
      <button
        onClick={() => setIsLive(!isLive)}
        className="w-30 h-12.5 bg-(--progreess-bar-accent) rounded-[10px] font-bold text-(--main-text-color) cursor-pointer"
      >
        {isLive ? "Pause" : "Live"}
      </button>
    </div>
  );
}
