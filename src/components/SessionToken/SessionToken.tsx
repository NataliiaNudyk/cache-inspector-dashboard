import { useEffect, useState } from "react";

// Функція генерації 64-символьного hex токена
function generateToken(): string {
  const array = new Uint8Array(32); 
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

interface TokenData {
  token: string;
  createdAt: number;
}

const STORAGE_KEY = "cache_token";

export default function SessionToken() {
  const [age, setAge] = useState<string>("0s");

 const [tokenData] = useState<TokenData>(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    const newToken = generateToken();
    const data: TokenData = { token: newToken, createdAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
});

  // Таймер для Age (кожну секунду)
  useEffect(() => {
    const interval = setInterval(() => {
      if (tokenData) {
        const diffMs = Date.now() - tokenData.createdAt;
        const minutes = Math.floor(diffMs / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);
        setAge(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tokenData]);


  if (!tokenData) return <div>Loading token...</div>;

  return (
    <div className="bg-(--dark-surface) rounded-[10px] p-6 h-50">
      <h2>Session Token</h2>
      <div className="flex justify-between">
        <p className="flex flex-col bg-(--dark-theme) w-1/3 h-25 p-2 rounded-[10px] wrap-anywhere">
          <strong className="text-(--main-text-color)">Token:</strong> {tokenData.token}
        </p>
        <p className="flex  flex-col bg-(--dark-theme) w-1/4 h-25 p-2 rounded-[10px] wrap-anywhere">
          <strong className="text-(--main-text-color)">Created at:</strong>{" "}
          {new Date(tokenData.createdAt).toLocaleString()}
        </p>
        <p className="flex flex-col bg-(--dark-theme) w-1/4 h-25 p-2 rounded-[10px] wrap-anywhere">
          <strong className="text-(--main-text-color)">Age:</strong> {age}
        </p>
      </div>
    </div>
  );
}