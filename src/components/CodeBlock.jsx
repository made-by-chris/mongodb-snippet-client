import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// we use the @uiw/codemirror-theme-vscode  theme
import { vscodeDark, vscodeDarkInit } from "@uiw/codemirror-theme-vscode";

// lang support
// import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
// import { cpp } from "@codemirror/lang-cpp";
// import { html } from "@codemirror/lang-html";
// import { python } from "@codemirror/lang-python";
// import { json } from "@codemirror/lang-json";
// import { java } from "@codemirror/lang-java";

// const EXTENSIONS = {
//   markdown: markdown(),
//   python: python(),
//   javascript: javascript(),
//   typescript: javascript(),
//   cpp: cpp(),
//   "c++": cpp(),
//   html: html(),
//   json: json(),
//   java: java(),
// };

const extensions = [javascript({ jsx: true })];

export default function CodeBlock({ code, handleEdit }) {
  const onChange = React.useCallback((value, viewUpdate) => {
    handleEdit(value);
  }, []);

  return <CodeMirror height="100%" className="h-screen" linewrapping="true" value={code} theme={vscodeDark} extensions={extensions} onChange={onChange} />;
}
