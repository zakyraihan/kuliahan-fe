import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

const CameraComponent: React.FC = () => {
  const camera = useRef<any | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Camera
        ref={camera}
        errorMessages={{
          noCameraAccessible: undefined,
          permissionDenied: undefined,
          switchCamera: undefined,
          canvas: undefined,
        }}
      />
      <button
        onClick={takePhoto}
        style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
      >
        Take photo
      </button>
      {image && (
        <img src={image} alt="Taken photo" style={{ marginTop: "20px" }} />
      )}
    </div>
  );
};

export default CameraComponent;
