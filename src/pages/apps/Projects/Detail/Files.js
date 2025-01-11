import React, { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFileDetails } from "../../../../utils/FileUpload";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../../redux/Slices/utiltities/Utiltities";
import FileUploader from "../../../../components/FileUploader";
import { CONSTANTS } from "../../../../constants/constant";

const Files = ( { documents, uploadDocuments } ) => {
  const [files, setFiles] = useState( [] )


  return (
    <Card>
      <Card.Body>
        <h5 className="card-title mb-3">Files</h5>

        {documents.map( ( file, index ) => (
          <Card key={index} className="mb-1 shadow-none border">
            <div className="p-2">
              <Row className="align-items-center">
                <div className="col-auto">
                  <div className="avatar-sm">
                    <span className="avatar-title badge-soft-primary text-primary rounded">
                      {file?.file_format}
                    </span>
                  </div>
                </div>
                <div className="col ps-0">
                  <div className="text-muted fw-bold">
                    {file?.filename}
                  </div>
                  <p className="mb-0"> {file?.filesize} MB</p>
                </div>
                <div className="col-auto">
                  <Link to={CONSTANTS.API_URLS.BASE+ file?.filepath} target="_blank"
                    className="btn btn-link btn-lg text-muted"
                  >
                    <i className="dripicons-download"></i>
                  </Link>
                </div>
              </Row>
            </div>
          </Card>
        ) )}
        <FileUploader
          onFileUpload={( file ) => { setFiles( file ) }}
        />
        {
          files.length !== 0 &&

          <Button
            onClick={() => {
              uploadDocuments( files );
            }}
            variant="success"
            className="waves-effect waves-light m-1 "
          >
            <i className="fe-check-circle w-10" ></i> Upload
          </Button>


        }
      </Card.Body>
    </Card>
  );
};

export default Files;

// import React, { useEffect, useState } from "react";
// import { Card, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { getFileDetails } from "../../../../utils/FileUpload";
// import { useDispatch } from "react-redux";
// import { startLoading, stopLoading } from "../../../../redux/Slices/utiltities/Utiltities";

// const Files = ( { documents } ) => {
//   const dispatch = useDispatch();
//   const [files, setFiles] = useState( [] );

//   const fetchFileDetails = async () => {
//     try {
//       console.log( "Fetching file details..." );
//       await dispatch( startLoading() );

//       // Clear existing files
//       setFiles( [] );

//       // Fetch file details
//       const filesDetails = await Promise.all(
//         ( documents || [] ).map( async ( file ) => {
//           console.log( `Fetching details for file: ${file?.filepath}` );
//           return getFileDetails( file?.filepath );
//         } )
//       );

//       console.log( "Files details fetched:", filesDetails );
//       setFiles( filesDetails ); // Update files state with fetched details

//       await dispatch( stopLoading() );
//     } catch ( error ) {
//       console.error( "Error fetching file details:", error );
//       await dispatch( stopLoading() );
//     }
//   };

//   useEffect( () => {
//     console.log( "Component mounted or documents changed" );
//     fetchFileDetails();
//   }, [documents] ); // Depend on documents to refetch when it changes

//   return (
//     <Card>
//       <Card.Body>
//         <h5 className="card-title mb-3">Files</h5>
//         {files.length > 0 ? (
//           files.map( ( file, index ) => (
//             <Card key={index} className="mb-1 shadow-none border">
//               <div className="p-2">
//                 <Row className="align-items-center">
//                   <div className="col-auto">
//                     <div className="avatar-sm">
//                       <span className="avatar-title badge-soft-primary text-primary rounded">
//                         {file?.fileFormat}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="col ps-0">
//                     <div className="text-muted fw-bold">
//                       {file?.fileName}
//                     </div>
//                     <p className="mb-0">{file?.fileSize} MB</p>
//                   </div>
//                   <div className="col-auto">
//                     <Link to={file?.url} target="_blank" className="btn btn-link btn-lg text-muted">
//                       <i className="dripicons-download"></i>
//                     </Link>
//                   </div>
//                 </Row>
//               </div>
//             </Card>
//           ) )
//         ) : (
//           <p>No files available</p>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default Files;
