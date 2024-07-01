import React, { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFileDetails } from "../../../../utils/FileUpload";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../../redux/Slices/utiltities/Utiltities";

const Files = ( { documents } ) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState( [] );
  const fetchFileDetails = async () => {
    try {
      await dispatch( startLoading() );

      // Clear existing files when component mounts
      setFiles( [] );

      const filesDetails = await Promise.all(
        ( documents || [] ).map( async ( file ) => {
          // Get file details
          const fileDetails = await getFileDetails( file?.filepath );
          return fileDetails; // Return file details object
        } )
      );

      setFiles( filesDetails ); // Update files state with fetched details

      await dispatch( stopLoading() );
      console.log( "All files uploaded and details fetched:", filesDetails );
    } catch ( error ) {
      await dispatch( stopLoading() );
      console.error( "Error uploading files and fetching details:", error );
      // Handle error
    }
  };
  useEffect( () => {


    fetchFileDetails();
  }, [] ); // Empty dependency array ensures useEffect runs once on mount



  return (
    <Card>
      <Card.Body>
        <h5 className="card-title mb-3">Files</h5>

        {files.map( ( file, index ) => (
          <Card key={index} className="mb-1 shadow-none border">
            <div className="p-2">
              <Row className="align-items-center">
                <div className="col-auto">
                  <div className="avatar-sm">
                    <span className="avatar-title badge-soft-primary text-primary rounded">
                      {file?.fileFormat}
                    </span>
                  </div>
                </div>
                <div className="col ps-0">
                  <div className="text-muted fw-bold">
                    {file?.fileName}
                  </div>
                  <p className="mb-0"> {file?.fileSize} MB</p>
                </div>
                <div className="col-auto">
                  <Link to={file?.url} target="_blank"
                    className="btn btn-link btn-lg text-muted"
                  >
                    <i className="dripicons-download"></i>
                  </Link>
                </div>
              </Row>
            </div>
          </Card>
        ) )}
      </Card.Body>
    </Card>
  );
};

export default Files;
