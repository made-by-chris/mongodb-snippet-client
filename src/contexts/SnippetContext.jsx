import { useState, createContext, useEffect } from "react";
import { AVAILABLE_LANGUAGES } from "../enums/editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SnippetContext = createContext(null);
const emptySnippetState = { title: "", content: "", language: AVAILABLE_LANGUAGES.plaintext };

export const SnippetProvider = ({ children }) => {
  const notify = (msg) => toast(msg);

  const history = (path) => window.history.pushState({}, "", path);
  const snippet_id = window.location.pathname.split("/")[1];
  // for the editor + navbar
  const [snippet, setSnippet] = useState(emptySnippetState);
  const [snippetDIFF, setSnippetDIFF] = useState(emptySnippetState);
  const [unsavedState, setUnsavedState] = useState(false);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    if (snippet.title !== snippetDIFF.title || snippet.content !== snippetDIFF.content || snippet.language !== snippetDIFF.language) {
      setUnsavedState(true);
    } else {
      setUnsavedState(false);
    }
  }, [snippet.title, snippet.content, snippet.language]);

  useEffect(() => {
    if (snippet_id) {
      fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet_id)
        .then((res) => res.json())
        .then((data) => {
          setSnippet(data);
          setSnippetDIFF(data);
        });
    }
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets")
      .then((res) => res.json())
      .then((data) => {
        setSnippets(data);
      });
  }, []);

  const sendDeleteSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet.shortId, {
      method: "delete",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet(emptySnippetState);
        setUnsavedState(false);
        setSnippetDIFF(emptySnippetState);
        history("/");
        notify("Deleted successfully!");
      } else {
        notify("Sorry, something went wrong. Please try again later.");
      }
    });
  };

  const sendUpdateSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet.shortId, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
      }),
    })
      .then((httpResponse) => {
        if (httpResponse.ok) {
          notify("Saved the changes successfully!");
        } else {
          notify("Sorry, something went wrong. Please try again later.");
        }
        return httpResponse.json();
      })
      .then((updatedSnippet) => {
        setSnippet(updatedSnippet);
        setUnsavedState(false);
        setSnippetDIFF(updatedSnippet);
      });
  };

  const sendCreateSnippetRequest = (e) => {
    e.preventDefault();

    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) => {
        setSnippet(newlyCreatedSnippet);
        setUnsavedState(false);
        setSnippetDIFF(newlyCreatedSnippet);

        history("/" + newlyCreatedSnippet.shortId);
        notify("Snippet successfully created!");
      });
  };

  const resetFields = () => {
    setSnippet(emptySnippetState);
    setSnippetDIFF(emptySnippetState);
    history("/");
  };

  const organisedSnippets = () => {
    if (snippet.shortId) {
      return [snippet, ...snippets.filter((s) => s.shortId !== snippet.shortId).sort((a, b) => b.updatedAt - a.updatedAt)];
    } else {
      return [...snippets.sort((a, b) => b.updatedAt - a.updatedAt)];
    }
  };

  return (
    <SnippetContext.Provider
      value={{
        editor: [snippet, setSnippet],
        unsavedState,
        sendDeleteSnippetRequest,
        sendUpdateSnippetRequest,
        sendCreateSnippetRequest,
        resetFields,
        snippetList: [organisedSnippets(), setSnippets],
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
