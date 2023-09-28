import CodeMirror from "@uiw/react-codemirror";
// lets add the linewrap extension
// we use the @uiw/codemirror-theme-vscode  theme
import { vscodeDark, vscodeDarkInit } from "@uiw/codemirror-theme-vscode";

// lang support
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";
import { json } from "@codemirror/lang-json";
import { java } from "@codemirror/lang-java";

const EXTENSIONS = {
  markdown: markdown(),
  python: python(),
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  jsx: javascript({ jsx: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  cpp: cpp(),
  "c++": cpp(),
  html: html(),
  json: json(),
  java: java(),
};

import { useContext } from "react";
import { SnippetContext } from "../contexts/SnippetContext";
export default function CodeBlock({ code, handleEdit }) {
  const { editor } = useContext(SnippetContext);
  const [snippet] = editor;
  let extensions = [];
  if (snippet.language !== "plaintext") {
    extensions.push(EXTENSIONS[snippet.language]);
  }

  const onChange = (value) => {
    handleEdit(value);
  };

  return <CodeMirror height="100%" className="h-screen" value={code} theme={vscodeDark} extensions={extensions} onChange={onChange} />;
}
