import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnippetProvider } from "./contexts/SnippetContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnippetProvider>
    <App />
  </SnippetProvider>
);
