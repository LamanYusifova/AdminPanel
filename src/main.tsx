import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";


if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass", 
  });
}

createRoot(document.getElementById("root")!).render(<App />);
