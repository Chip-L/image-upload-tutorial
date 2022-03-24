import { ChangeEvent, useState } from "react";
import ImagePreview from "./ImagePreview";
// import "./FileUpload.css";

function FileUpload() {
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile: File | null = e.target.files ? e.target.files[0] : null;

    if (!selectedFile) {
      setErrMsg("Choose a file");
      return;
    }

    setErrMsg("");
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const uploadFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);

      const options: RequestInit = {
        method: "POST",
        headers: {
          Accept: "multipart/form-data",
        },
        body: formData,
      };
      fetch("http://localhost:3000/upload", options)
        .then((res) => res.json())
        .then((res) => setStatusMsg(res.msg))
        .catch((err) => {
          setErrMsg("There was an error in upload");
          console.log("upload catch error:");
          console.log(err);
        });
    }
  };

  return (
    <div className="myCard">
      <div>
        <input
          type="file"
          name="image"
          accept="image/*"
          multiple={false}
          onChange={imageHandler}
        />
        <button onClick={uploadFile}>Upload</button>
      </div>
      {statusMsg && <p className="status">{statusMsg}</p>}
      {errMsg && <p className="status error">{errMsg}</p>}
      {file && <ImagePreview file={file} />}
    </div>
  );
}

export default FileUpload;
