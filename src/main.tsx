import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ MSW yalnız development mühitində işləsin:
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass", // xəbərdarlıqları susdurur
  });
}

createRoot(document.getElementById("root")!).render(<App />);
