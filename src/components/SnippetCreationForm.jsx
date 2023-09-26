import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SnippetCreationForm() {
  const titleRef = useRef();
  const contentRef = useRef();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titleRef.current.value);
    console.log(contentRef.current.value);

    fetch("http://localhost:9000/snippets", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        content: contentRef.current.value,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) => history("/" + newlyCreatedSnippet.shortId));
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
      <label htmlFor="title">
        title<input name="title" ref={titleRef}></input>
      </label>
      <label htmlFor="content">
        content
        <textarea ref={contentRef} name="content"></textarea>
      </label>
      <button>create snippet</button>
    </form>
  );
}
