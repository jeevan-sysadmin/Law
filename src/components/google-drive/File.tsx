'use client'

import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


interface FileProps {
  file: {
    url: string;
    name: string;
  };
}

const File: React.FC<FileProps> = ({ file }) => {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      {file.name}
    </a>
  );
};

export default File;
