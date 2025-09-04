
export function useLogger() {
  return function log(message) {

    let logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push({ timestamp: new Date().toISOString(), message });
    localStorage.setItem("logs", JSON.stringify(logs));
  };
}