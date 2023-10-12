import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnippetProvider } from "./contexts/SnippetContext";
import { ApplicationSettingsProvider } from "./contexts/ApplicationSettingsContext";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnippetProvider>
    <UserProvider>
      <ApplicationSettingsProvider>
        <App />
      </ApplicationSettingsProvider>
    </UserProvider>
  </SnippetProvider>
);
