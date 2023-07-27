import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import axios from "axios";

export default function App() {
  //          -------------------------------- screct -----------------------------------------------
  const PROJECT_CLOUD_NAME = "project";
  const PROJECT_CLOUD_API_KEY = "771814256556894";
  const PROJECT_CLOUD_SECRECT_KEY = "66_v55ZX7s0i_TNFTVcyORwQ_hw";
  //          -------------------------------- screct -----------------------------------------------

  const editorRef = useRef(null);

  let [post, setpost] = useState({
    content: "",
  });
  let [files, setfiles] = useState(0);

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

  async function setPostImage() {
    const formdata = new FormData();
    formdata.append("image", files);
  }
  return (
    <>
      <h1></h1>
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
    
      <input
        type="file"
        id="my-file"
        name="my-file"
        style={{visibility:"hidden"}}
        onChange={(e) => setfiles(e.target.files[0])}
      />
      

      <Editor
        id="data"
        apiKey="vgqslsc9vjjerm2s36zxvqup8dzwlo0sreuw2g3uk1ypv24j"
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
            "editimage",
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
          file_browser_callback_types: "image",
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype == "image") {
              var input = document.getElementById("my-file");
              input.click();
              input.onchange = async function () {
                var file = input.files[0];
                console.log(file);
                let f1 = new FormData();
                f1.append("image", file);

                const res = await axios.post(
                  "/api/image",
                  f1,
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  }
                );
                const res2 = await res.data;
                callback(`http://localhost:4000/uploads/${res2.FileName}`)
              };
            }
          },
          paste_data_images: true,
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
