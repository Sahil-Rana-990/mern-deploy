import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";

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

  const insert_image = () => {
    document.getElementById("data").appendChild = "<h1>hello</h1>";
  };

  function setPostImage() {
    if (files != 0) {
      let f1 = new FormData();
      f1.append("file", files);
      f1.append("upload_preset", "RanaSahil");
      f1.append("cloud_name", "di3rw1zx3");

      fetch("https://api.cloudinary.com/v1_1/di3rw1zx3/image/upload", {
        method: "POST",
        body: f1,
      })
        .then((res) => res.json())
        .then((data) => console.log(data.url))
        .catch((err) => console.log(err));
    }
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
      <input type="file" onChange={(e) => setfiles(e.target.files[0])} />
      <input type="button" onClick={setPostImage} value="upload" />
      <Editor
        id="data"
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
      <button onClick={insert_image}>insert image</button>
      <button onClick={storedData}>Log editor content</button>
    </>
  );
}


/////////////////////////////////////======================================================================/////////////////////////////////
// App.jsx / App.tsx

// import React, { Component } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// function App() {
//   function uploadAdapter(loader) {
//     return {
//       onload: () => {
//         return new Promise((resolve, reject) => {
//           let f1 = new FormData();
//           loader.file.then((file) => {
//             f1.append("file", file);
//             f1.append("upload_preset", "RanaSahil");
//             f1.append("cloud_name", "di3rw1zx3");
//             fetch("https://api.cloudinary.com/v1_1/di3rw1zx3/image/upload", {
//               method: "POST",
//               body: f1,
//             })
//               .then((res) => res.json())
//               .then((res) => {
//                 resolve({ default: res.url });
//               })
//               .catch((err) => reject(err));
//           });
//         });
//       },
//     };
//   }
//   function uploadPlugin(editor){
//     editor.plugins.get('FileRepository').createUploadAdapter=(loader)=>{
//       return uploadAdapter(loader);
//     }
//   }
//   return (
//     <div className="App">
//       <h2>Using CKEditor 5 build in React</h2>
//       <CKEditor
//         config={{
//           extraPlugins:[uploadPlugin]
//         }}
//         editor={ClassicEditor}
//         data="<p>Hello from CKEditor 5!</p>"
//         // onReady={(editor) => {
//         //   // You can store the "editor" and use when it is needed.
//         //   console.log("Editor is ready to use!", editor);
//         // }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log({ event, editor, data });
//         }}
//         // onBlur={(event, editor) => {
//         //   console.log("Blur.", editor);
//         // }}
//         // onFocus={(event, editor) => {
//         //   console.log("Focus.", editor);
//         // }}
//       />
//     </div>
//   );
// }

// export default App;

