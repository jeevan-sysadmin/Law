'use client'

import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";


interface FolderProps {
  folder: {
    id: string;
    name: string;
  };
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  return (
    <Link href={`/folder/${folder.id}`} passHref legacyBehavior>
      <Button variant="outline-dark" className="text-truncate w-100">
        <FontAwesomeIcon icon={faFolder} className="mr-2" />
        {folder.name}
      </Button>
    </Link>
  );
};

export default Folder;
