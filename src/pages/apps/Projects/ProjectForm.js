import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,

} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typeahead } from "react-bootstrap-typeahead";

// components
import PageTitle from "../../../components/PageTitle";
import HyperDatepicker from "../../../components/Datepicker";
import FileUploader from "../../../components/FileUploader";
import { FormInput } from "../../../components";

import { useDispatch, useSelector } from "react-redux";
import { CreateProject } from "../../../redux/Slices/Project/Project";
import { startLoading, stopLoading } from "../../../redux/Slices/utiltities/Utiltities";
import { Link, useNavigate } from "react-router-dom";
import { getFileDetails, handleUpload } from "../../../utils/FileUpload";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";

// interface MemberTypes {
//   value: string;
//   name: string;
//   image: string;
// }

const ProjectForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [endDate, setEndDate] = useState( new Date() );
  const [title, setTitle] = useState( '' );
  const [desc, setDesc] = useState( '' );
  const [priority, setPriority] = useState( '' );
  const [cat, setCat] = useState( '' );

  const [fileUpload, setFileUpload] = useState( [] );
  const [files, setFiles] = useState( [] );

  const [selectedTeamMembers, setSelectedTeamMembers] = useState( [] );
  const [selectedTeamMembersId, setSelectedTeamMembersId] = useState( [] );


  const removeFile = ( fileIndex ) => {
    const newFiles = [...fileUpload];
    newFiles.splice( fileIndex, 1 );
    setFileUpload( newFiles );
    // if (props.onFileUpload) props.onFileUpload(newFiles);
  };

  /*
   *  add selected team members
   */
  const selectTeamMembers = ( e ) => {
    setSelectedTeamMembers( e )
    const ids = e.map( item => item.id );
    setSelectedTeamMembersId( ids )
  };

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape( {
      name: yup.string().required( "Please enter Project Name" ),
    } )
  );
  const reset = () => {
    setTitle( '' )
    setDesc( '' )
    setCat( '' )
    setEndDate( new Date() )
    setSelectedTeamMembersId( [] )
    setPriority( '' )
    setSelectedTeamMembers( [] )
    setFileUpload( [] )
    setFiles( [] )

  }
  // const addProject = async () => {
  //   try {
  //     await dispatch( startLoading() )
  //     if ( title === '' ) {
  //       toast.error( "Enter Title please", { position: toast.POSITION.TOP_RIGHT } );
  //       dispatch( stopLoading() );
  //       return
  //     }
  //     if ( desc === '' ) {
  //       toast.error( "Enter Project Overview please", { position: toast.POSITION.TOP_RIGHT } );
  //       dispatch( stopLoading() );
  //       return
  //     }
  //     if ( cat === '' ) {
  //       toast.error( "Select Project Category please", { position: toast.POSITION.TOP_RIGHT } );
  //       dispatch( stopLoading() );
  //       return
  //     }
  //     if ( priority === '' ) {
  //       toast.error( "Select Project priority please", { position: toast.POSITION.TOP_RIGHT } );
  //       dispatch( stopLoading() );
  //       return
  //     }
  //     if ( selectedTeamMembersId.length === 0 ) {
  //       toast.error( "Select Team member please", { position: toast.POSITION.TOP_RIGHT } );
  //       dispatch( stopLoading() );
  //       return
  //     }
  //     const Form = new FormData()
  //     Form.append( "title", title )
  //     Form.append( "description", desc )
  //     Form.append( "projectType", cat )
  //     Form.append( "due_date", endDate )
  //     Form.append( "priority", priority )
  //     Form.append( "status", "Ongoing" )


  //     // if ( fileUpload.length > 0 ) {
  //     //   Form.append( "files", fileUpload.join( "," ) ); 
  //     // }
  //     // Handle file uploads
  //     if ( files.length > 0 ) {
  //       const fileUploadPromises = files.map( file => handleUpload( dispatch, file ) );

  //       try {
  //         // Wait for all file uploads to complete
  //         const uploadedFiles = await Promise.all( fileUploadPromises );

  //         // Join file URLs with a comma and append to FormData
  //         const fileUrlsString = uploadedFiles.join( "," );
  //         Form.append( "files", fileUrlsString );
  //         // Optionally, update fileUpload state here
  //         setFileUpload( uploadedFiles );  // If you need to use fileUpload later
  //       } catch ( uploadError ) {
  //         console.error( "File upload error: ", uploadError );
  //         toast.error( "Failed to upload files", { position: toast.POSITION.TOP_RIGHT } );
  //         return;
  //       }
  //     }

  //     for ( let i = 0; i < selectedTeamMembersId.length; i++ ) {
  //       Form.append( "teams", selectedTeamMembersId[i] );
  //     }

  //     await dispatch( CreateProject( Form, token, reset ) )
  //     navigate( -1 );

  //     await dispatch( stopLoading() )


  //   } catch ( error ) {
  //     console.log( "submit Foam error: " + error )
  //   }
  // }

  const addProject = async () => {
    try {

  
      await dispatch(startLoading());
      
      // Validate inputs
      if (title === '') {
        toast.error("Enter Title please", { position: toast.POSITION.TOP_RIGHT });
        dispatch(stopLoading());
        return;
      }
      if (desc === '') {
        toast.error("Enter Project Overview please", { position: toast.POSITION.TOP_RIGHT });
        dispatch(stopLoading());
        return;
      }
      if (cat === '') {
        toast.error("Select Project Category please", { position: toast.POSITION.TOP_RIGHT });
        dispatch(stopLoading());
        return;
      }
      if (priority === '') {
        toast.error("Select Project priority please", { position: toast.POSITION.TOP_RIGHT });
        dispatch(stopLoading());
        return;
      }
      if (selectedTeamMembersId.length === 0) {
        toast.error("Select Team member please", { position: toast.POSITION.TOP_RIGHT });
        dispatch(stopLoading());
        return;
      }
  
   
      // Create FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("projectType", cat);
      formData.append("due_date", endDate);
      formData.append("priority", priority);
      formData.append("status", "Ongoing");
   
      console.log({files})
      files.forEach((file) => {
        formData.append("files", file); // Append each file individually
      });
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      // if (files && files.length > 0) {
      //   for (let i = 0; i < files.length; i++) {
      //     formData.append("files", files[i]);  // Attach multiple files
      //   }
      // }
    //   if (Array.isArray(files)) {
    //     files.forEach((file) => formData.append("files", file));
    // } else {
    //     formData.append("files", files); // Handle single file case
    // }
    
    
      for (let i = 0; i < selectedTeamMembersId.length; i++) {
        formData.append("teams", selectedTeamMembersId[i]);
      }
  
      // Dispatch the API call
      await dispatch(CreateProject(formData, token, reset));
      navigate(-1);
      dispatch(stopLoading());
    } catch (error) {
      console.error("Error submitting form: ", error);
      dispatch(stopLoading());
    }
  };
  

  const { token, user, category, loading, employee } = useSelector(
    ( state ) => ( {
      token: state.Auth.token,
      user: state.Auth.user,
      category: state.Category.category,
      loading: state.utiltities.loading,
      employee: state.Employees.employees,
    } )
  );

  const extractFilename = ( url ) => {
    // Split the URL by "/"
    const parts = url.split( "/" );
    const filenameWithQuery = parts[parts.length - 1];

    // Split the filename by "?" to remove the query parameters
    const filenameParts = filenameWithQuery.split( "?" );
    const filename = filenameParts[0];
    return filename;
  };

  const getFileExtensionFromUrl = ( url ) => {
    // Get the filename from the URL
    const parts = url.split( "/" );
    const filenameWithQuery = parts[parts.length - 1]; // "m2.jpg?alt=media&token=11d865cd-6f66-4bde-a29b-204fbc5f219d"

    // Split the filename by "?" to remove the query parameters
    const filenameParts = filenameWithQuery.split( "?" );
    const filename = filenameParts[0]; // "m2.jpg"

    // Find the last occurrence of dot (.) in the filename
    const dotIndex = filename.lastIndexOf( "." );

    // Extract the file extension
    const fileExtension = filename.substring( dotIndex + 1 );

    return fileExtension;
  };


  const handleFileChange = async ( event ) => {
    try {
      const newFiles = [...fileUpload];
      const newFilesData = [...files];

      if ( event.target.files ) {
        const file = event.target.files[0];
        await handleUpload( dispatch, file ).then( async ( res ) => {
          const fileDetails = await getFileDetails( res );
          newFilesData.push( fileDetails )
          setFiles( newFilesData )
          newFiles.push( res )
          setFileUpload( newFiles )
        } ).catch( err => {
          console.log( err )
        } )
          ;
      }
    } catch ( error ) {
      console.log( "error", error )
    }

  };


  return loading ? (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Spinner className="m-2" color={'primary'} />
    </div>
  ) : (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Projects", path: "/apps/projects/create" },
          {
            label: "Create Project",
            path: "/apps/projects/create",
            active: true,
          },
        ]}
        title={"Create Project"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {/* <form onSubmit={handleSubmit( () => { } )}> */}
              <Row>
                <Col xl={6}>
                  <FormInput
                    name="name"
                    label="Project Name"
                    placeholder="Enter project name"
                    containerClass={"mb-3"}

                    key="name"
                    value={title}
                    onChange={( e ) => setTitle( e.target.value )}

                  />

                  <FormInput
                    name="overview"
                    label="Project Overview"
                    placeholder="Enter some brief about project.."
                    type="textarea"
                    rows="5"
                    containerClass={"mb-3"}

                    value={desc}
                    onChange={( e ) => setDesc( e.target.value )}
                    key="overview"

                  />

                  <div className="mb-3">
                    <label className="form-label">Project Category</label>
                    <br />
                    {category !== null && category !== undefined
                      &&
                      category.map( ( e, index ) => {

                        return (
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              id="customRadio1"
                              name="projectCategory"
                              className="form-check-input"
                              value={e?.id}
                              onChange={( e ) => setCat( e.target.value )}

                            />
                            <label
                              className="form-check-label"
                              htmlFor="customRadio1"
                            >
                              {e?.title}
                            </label>
                          </div>
                        )
                      } )
                    }

                  </div>

                  <Row>

                    <Col lg={6}>
                      <div className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <HyperDatepicker
                          hideAddon
                          value={endDate}
                          onChange={( date ) => setEndDate( date )}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3 mt-3 mt-xl-0">
                        <Form.Label >Project Priority</Form.Label>
                        <Typeahead
                          id="select3"
                          multiple={false}
                          onChange={( e ) => setPriority( e[0].label )}
                          options={[
                            { id: 1, value: "MD", label: "Medium" },
                            { id: 2, value: "HI", label: "High" },
                            { id: 3, value: "LW", label: "Low" },
                          ]}
                          placeholder="Select Project Priority..."
                        />
                      </div>
                    </Col>
                  </Row>

                </Col>
                <Col xl={6}>
                  <div className="my-3 mt-xl-0">
                    {/* <Form.Label className="mb-0">File Uploads</Form.Label>
                    <FormInput
                      type="file"
                      name="file"
                      containerClass={'mb-3'}
                      key="photo file"
                      onChange={handleFileChange}
                    /> */}

                    <FileUploader

                      onFileUpload={( file ) => {       setFiles( file ) }}
                     
                    />
                  </div>


                  {/* {( fileUpload || [] ).map( ( f, i ) => {

                      return (
                        <Card className="mt-1 mb-0 shadow-none border" key={i + "-file"}>
                          <div className="p-2">
                            <Row className="align-items-center">

                              {!f.preview && (
                                <Col className="col-auto">
                                  <div className="avatar-sm">
                                    <span className="avatar-title bg-primary rounded">
                                      {getFileExtensionFromUrl( f )}
                                    </span>
                                  </div>
                                </Col>
                              )}
                              <Col className="ps-0">
                                <Link to="#" className="text-muted fw-bold">
                                  {extractFilename( f )}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                              <Col className="text-end">
                                <Link
                                  to="#"
                                  className="btn btn-link btn-lg text-muted shadow-none"
                                >
                                  <i
                                    className="dripicons-cross"
                                    onClick={() => removeFile( i )}
                                  ></i>
                                </Link>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    } )} */}
                  {/* {files.map( ( file, index ) => (
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
                  ) )} */}
                  <Form.Group className="mb-3">
                    <Form.Label>Team Members</Form.Label>
                    <Typeahead
                      id="select3"
                      labelKey="name"
                      multiple={true}
                      options={employee}
                      placeholder="select Team Member..."
                      onChange={selectTeamMembers}
                    />
                    <div className="mt-2">
                      {( selectedTeamMembers || [] ).map( ( member, index ) => {

                        return (
                          <OverlayTrigger
                            key={index}
                            placement="top"
                            overlay={
                              <Tooltip id={member.name}>
                                {member?.name}
                              </Tooltip>
                            }
                          >
                            {/* <a
                                href="/"
                                title={member.name}
                                data-original-title="James Anderson"
                                className="d-inline-block me-1"
                              > */}

                            <label
                              className="form-check-label"
                            >
                              {member?.name}{" ,"}
                            </label>


                            {/* <img
                                  src={member.image}
                                  className="rounded-circle avatar-xs"
                                  alt="friend"
                                /> */}
                            {/* </a> */}
                          </OverlayTrigger>
                        );
                      } )}
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col className="text-center">
                  <Button
                    onClick={() => {
                      addProject()
                    }}
                    variant="success"
                    className="waves-effect waves-light m-1"
                  >
                    <i className="fe-check-circle me-1"></i> Create
                  </Button>
                  <Button
                    variant="light"
                    className="waves-effect waves-light m-1"
                    onClick={() => navigate( -1 )}
                  >
                    <i className="fe-x me-1"></i> Cancel
                  </Button>
                </Col>
              </Row>
              {/* </form> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default ProjectForm;
