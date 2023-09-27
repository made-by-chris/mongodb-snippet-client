import { useParams } from "react-router-dom";
import CodeBlock from "./CodeBlock";
import { useContext, useEffect } from "react";
import { SnippetContext } from "../contexts/SnippetContext";

export default function Editor() {
  let { snippet_id } = useParams();

  const { editor } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

  useEffect(() => {
    if (!snippet_id) {
      return;
    }
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, []);

  return (
    <div className="mt-14 md:mt-0">
      <CodeBlock code={snippet.content} handleEdit={handleEdit} />
    </div>
  );
}
