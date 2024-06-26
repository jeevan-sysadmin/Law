'use client'

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useAuth } from "../../contexts/AuthContext";
import { storage, database } from "../../configs/firebaseConfig";
// import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";


interface Props {
  currentFolder: any; // Adjust type according to your currentFolder structure
}

interface UploadFile {
  id: string;
  name: string;
  progress: number;
  error: boolean;
}

const AddFileButton: React.FC<Props> = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([]);
  // const { currentUser } = useAuth();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentFolder) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) =>
          prevUploadingFiles.map((uploadFile) =>
            uploadFile.id === id ? { ...uploadFile, progress } : uploadFile
          )
        );
      },
      () => {
        setUploadingFiles((prevUploadingFiles) =>
          prevUploadingFiles.map((uploadFile) =>
            uploadFile.id === id ? { ...uploadFile, error: true } : uploadFile
          )
        );
      },
      () => {
        setUploadingFiles((prevUploadingFiles) =>
          prevUploadingFiles.filter((uploadFile) => uploadFile.id !== id)
        );

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url });
              } else {
                database.files.add({
                  url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  };

  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevUploadingFiles) =>
                    prevUploadingFiles.filter((uploadFile) => uploadFile.id !== file.id)
                  );
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={file.error ? "Error" : `${Math.round(file.progress * 100)}%`}
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFileButton;
