import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ===============================

import { useEffect, useState } from "react";
// its the way we access lifecycle events ( componented started, data changed, component dying )

export default function SnippetDetail() {
  const history = useNavigate();
  let { snippet_id } = useParams();
  const [snippet, setSnippet] = useState();
  useEffect(() => {
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, []);

  const handleDelete = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "delete",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        history("/");
      } else {
        alert("Sorry, something went wrong. Please try again later.");
      }
    });
  };

  const handleSave = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
      }),
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        alert("Saved the changes successfully!");
      } else {
        alert("Sorry, something went wrong. Please try again later.");
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {snippet ? (
        <div style={{ border: "1px solid black", margin: "10px" }} key={snippet.shortId}>
          <a href={`/${snippet.shortId}`}>{snippet.title}</a>
          <p>{snippet.shortId}</p>
          <p>{new Date(snippet.updatedAt).toLocaleDateString()}</p>

          <input value={snippet.title} onChange={(e) => setSnippet({ ...snippet, title: e.target.value })} />
          <textarea value={snippet.content} onChange={(e) => setSnippet({ ...snippet, content: e.target.value })} />

          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
