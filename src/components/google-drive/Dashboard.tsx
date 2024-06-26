import React from 'react';
import Navbar from './Navbar'; // Adjust paths as needed
import Container from 'react-bootstrap/Container'; // Import Container from Bootstrap or your preferred library
import AddFileButton from './AddFileButton'; // Adjust paths as needed
import AddFolderButton from './AddFolderButton'; // Adjust paths as needed
import File from './File'; // Adjust paths as needed
import Folder from './Folder'; // Adjust paths as needed
import ProgressBar from 'react-bootstrap/ProgressBar'; // Import ProgressBar from Bootstrap or your preferred library
import FolderBreadcrumbs from './FolderBreadcrumbs'; // Import FolderBreadcrumbs component


const DashboardPage: React.FC = () => {
  const folder = ''; // Define your folder state as needed
  const childFolders: any[] = []; // Define your childFolders state as needed
  const childFiles: any[] = []; // Define your childFiles state as needed

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Container className="sidebar">
          <br />
          <button className="add_new">
            <img
              className="add_new_image"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"
            />
            <h6 className="add_new_text">New</h6>
          </button>
          <div className="sidebar__navigation">
            <a href="#">
              <div className="sidebar__navigation__item">
                <svg
                  className=""
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="#5f6368"
                  focusable="false"
                >
                  <path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path>
                  <path d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"></path>
                </svg>
                <p className="sidebar__navigation__item__text">My Drive</p>
              </div>
            </a>
            {/* Add other sidebar items as needed */}
          </div>
          <div className="sidebar__navigation__line" />
          <div className="sidebar__navigation__item">
            <svg
              fill="#5f6368"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" />
            </svg>{" "}
            <p className="sidebar__navigation__item__text">Storage</p>
          </div>
          <ProgressBar now={10} />
          <p className="progress_limit">0.1 GB of 10 GB used </p>
          <button className="buystorage"> Buy Storage </button>
        </Container>
        <Container fluid>
          <div className="d-flex align-items-center">
            <FolderBreadcrumbs currentFolder={folder} />
            <AddFileButton currentFolder={folder} />
            <AddFolderButton currentFolder={folder} />
          </div>
          {childFolders.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFolders.map((childFolder) => (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
          )}
          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {childFiles.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFiles.map((childFile) => (
                <div
                  key={childFile.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <File file={childFile} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default DashboardPage;
