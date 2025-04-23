import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set document title
document.title = "CrimeMapper - Crime Hotspot Analysis";

createRoot(document.getElementById("root")!).render(<App />);
