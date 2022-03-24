import { Console } from "console";
import { ChangeEvent, useState } from "react";
import ImagePreview from "./ImagePreview";
// import "./FileUpload.css";

function FileUpload() {
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile: File | null = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      setErrMsg("");
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const uploadFile = () => {
    if (file) {
      setIsLoading(true);
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
      //  Note: don't use the full URL here... the proxy will pick up the correct path. Otherwise it will give a CORS error.
      fetch("/api/add-image", options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          console.log(res);
          throw new Error("Something went wrong");
        })
        .then((res: any) => {
          console.log(res);
          setIsLoading(false);
          setStatusMsg(res.msg);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrMsg("There was an error in upload");
          console.log("upload catch error:");
          console.log(err);
        });
    } else {
      setErrMsg("Choose a file");
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
      {isLoading && <p className="status">Loading...</p>}
      {statusMsg && <p className="status">{statusMsg}</p>}
      {errMsg && <p className="status error">{errMsg}</p>}
      {file && <ImagePreview file={file} />}
    </div>
  );
}

export default FileUpload;
