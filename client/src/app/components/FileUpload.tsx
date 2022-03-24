import React, { ChangeEvent, useState } from "react";

function FileUpload() {
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const saveFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setErrMsg("Choose a file");
      return;
    }

    setErrMsg("");
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = () => {
    console.log("do something");
  };

  return (
    <div>
      <div className="App">
        <input type={"file"} onChange={saveFile} />
        <button onClick={uploadFile}>Upload</button>
      </div>
      <p>{errMsg}</p>
    </div>
  );
}

export default FileUpload;
