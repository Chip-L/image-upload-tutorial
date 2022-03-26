import { ChangeEvent, useState } from "react";
import doFetch from "../utils/doFetch";
import ImagePreview from "../components/ImagePreview";
import Carousel from "../components/Carousel";

function MultiUpload() {
  const [files, setFiles] = useState<File[]>();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles) return;

    setStatusMsg("");
    setErrMsg("");

    const fileList: File[] = Object.values(selectedFiles);
    const fileNames = fileList.map((file) => file.name);

    setFiles(fileList);
    setFileNames(fileNames);
  };

  const uploadFile = async (url: string) => {
    if (!files) {
      setErrMsg("Choose a file");
      return;
    }
    /*
    // reset the messaging properly
    setIsLoading(true);
    setStatusMsg("");
    setErrMsg("");

    // create the multipart form
    const formData = new FormData();
    formData.append("file", files);
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
    }*/
  };

  return (
    <div className="myCard">
      <h3>Multiple Inputs</h3>
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple={true}
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
      {files && (
        <Carousel>
          {files.map((file, idx) => (
            <ImagePreview file={file} key={idx} />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default MultiUpload;
