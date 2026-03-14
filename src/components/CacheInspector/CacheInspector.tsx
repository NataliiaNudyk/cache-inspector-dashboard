export default function CacheInspector() {
  const localStorageKeys = Object.keys(localStorage);

  const localStorageData = localStorageKeys.map((key) => {
    const value = localStorage.getItem(key);
    let token = "";
    let createdAt = "";

    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.token) token = parsed.token;
        if (parsed.createdAt)
          createdAt = new Date(parsed.createdAt).toLocaleString();
      } catch (e) {
        console.log(e);
        token = value;
      }
    }

    return { key, token, createdAt };
  });

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className=" bg-(--dark-surface) p-6 rounded-[10px]">
      <h2>Cache Inspector</h2>
      <div className="flex flex-col">
        <table className="mb-4">
          <thead className="border-b h-12.5">
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody >
            {localStorageData.map((data) => (
              <tr key={data.token} className={`h-12.5 text-center ${data.key === "cache_token" ? "bg-(--dark-theme) font-bold text-(--main-text-color) rounded-[10px]" : " " }`}>
                <td>{data.key}</td>
                <td>{data.token}</td>
                <td>{data.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={refreshPage}
            className="w-30 h-12.5 mr-6.25 bg-(--progreess-bar-primary) rounded-[10px] font-bold text-(--main-text-color) cursor-pointer"
          >
            Refresh
          </button>
          <button
            onClick={() => localStorage.clear()}
            className="w-30 h-12.5 bg-(--progreess-bar-secondary) rounded-[10px] font-bold text-(--main-text-color) cursor-pointer"
          >
            Clear Cache
          </button>
              </div>
      </div>
      </div>
  );
}
