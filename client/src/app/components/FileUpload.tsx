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
      setStatusMsg("");
      setErrMsg("");
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const uploadFile = async (url: string) => {
    if (!file) {
      setErrMsg("Choose a file");
      return;
    }

    // reset the messaging properly
    setIsLoading(true);
    setStatusMsg("");
    setErrMsg("");

    // create the multipart form
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    // create the header options
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    };

    try {
      //  Note: don't use the full URL here... the proxy will pick up the correct path. Otherwise it will give a CORS error.
      const res = await fetch(url, options);
      const body = (await res.json()) as any;

      console.log("res:", res);
      console.log("body:", body);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      console.log("Success section:", res);
      if (body.code > 200) {
        setErrMsg(body.msg);
      } else {
        setStatusMsg(body.msg);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setErrMsg("There was an error in upload");
      console.log("upload catch error:");
      console.log(JSON.stringify(err));
    }
  };

  return (
    <div className="myCard">
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple={false}
        onChange={imageHandler}
      />

      {/* <button onClick={() => uploadFile("/api/add-image")}>
        Upload using Middleware
      </button> */}
      <button onClick={() => uploadFile("/api/add-image-no-mw")}>
        Upload not using Middleware
      </button>

      <p className={`status${errMsg ? " error" : ""}`}>
        {errMsg ? (
          errMsg
        ) : isLoading ? (
          "Loading..."
        ) : statusMsg ? (
          statusMsg
        ) : (
          <br />
        )}
      </p>
      {file && <ImagePreview file={file} />}
    </div>
  );
}

export default FileUpload;
