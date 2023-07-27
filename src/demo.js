import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";

export default function App() {
  const editorRef = useRef(null);

  let [post, setpost] = useState({
    content: "",
  });

  useEffect(() => {
    localStorage.setItem("commentArray", JSON.stringify([]));
  }, []);

  const storedData = () => {
    if (editorRef.current) {
      let editortext = editorRef.current.getContent();

      let oldarr = JSON.parse(localStorage.getItem("commentArray"));
      oldarr.push(editortext);
      localStorage.setItem("commentArray", JSON.stringify(oldarr));
      setpost({ ...post });
    }
  };

  return (
    <>
    <h1>hello</h1>
      {JSON.parse(localStorage.getItem("commentArray")).map((val, i) => {
        return (
          <div
            key={i}
            style={{
              margin: "20px",
              width: "500px",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "20px",
            }}
          >
            <h4 style={{ width: "100%", backgroundColor: "yellow" }}>
              Your Comment
            </h4>
            <div>{parse(val)}</div>
          </div>
        );
      })}
      <Editor
        apiKey="s9jvoykampgytrj68ak5w0jszgqe9sjkwplh9xopyde3hxzm"
        // onChange={(e)=>console.log(e.target.getContent())}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 300,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "link",
            "image",
            "lists",
            "charmap",
            "preview",
            "anchor",
            "pagebreak",
            "searchreplace",
            "wordcount",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "mathquill",
            "template",
            "help",
          ],
          
          forced_root_block: "div",
          forced_root_block_attrs: {
            style: "color:#040304 ; font-family:sans-serif,Roboto",
          },
          
          toolbar:
            "undo redo fontsizeinput fontfamilyinput | styles | bold italic underline | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | print preview media fullscreen | " +
            "forecolor backcolor charmap blockquote lineheight code selectall strikethrough subscript superscript addcomment",
          content_style:
            "body {line-height:18px;font-family:Arial;color:#040304}",
        }}
      />

      <button onClick={storedData}>Log editor content</button>
      
 
    </>
  );
}
