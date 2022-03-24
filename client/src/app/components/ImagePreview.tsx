import React from "react";

interface ImagePreviewProps {
  file: File;
}
function ImagePreview({ file }: ImagePreviewProps) {
  return (
    <div className="displayImage">
      <p>Preview:</p>
      <img src={URL.createObjectURL(file)} className="myImage" />
    </div>
  );
}

export default ImagePreview;
