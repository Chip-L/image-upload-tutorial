import { ChangeEvent, useState } from "react";
import doFetch from "../utils/doFetch";
import ImagePreview from "../components/ImagePreview";
// import "./FileUpload.css";

function MultiUpload() {
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
      const { body, res } = await doFetch(url, options);

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
        MultiUploads not using Middleware
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

export default MultiUpload;
