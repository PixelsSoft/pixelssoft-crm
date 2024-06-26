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
import { handleUpload } from "../../../utils/FileUpload";
import Spinner from "../../../components/Spinner";

// interface MemberTypes {
//   value: string;
//   name: string;
//   image: string;
// }

const ProjectForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [endDate, setEndDate] = useState( new Date() );
  const [title, setTitle] = useState( 'dhjvhjdvhj' );
  const [desc, setDesc] = useState( 'ddd' );
  const [priority, setPriority] = useState( '' );
  const [cat, setCat] = useState( '' );

  const [fileUpload, setFileUpload] = useState( [] );

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

  }
  const addProject = async () => {
    try {

      const Form = new FormData()
      Form.append( "title", title )
      Form.append( "description", desc )
      Form.append( "projectType", cat )
      Form.append( "due_date", endDate )

      Form.append( "teams", selectedTeamMembersId )
      Form.append( "priority", priority )
      Form.append( "files", fileUpload )


      // for ( let i = 0; i < fileUpload.length; i++ ) {
      //   Form.append( "ffiles[]", fileUpload[i], fileUpload[i].name );
      // }
      await dispatch( startLoading() )
      await dispatch( CreateProject( Form, token, reset ) )
      await dispatch( stopLoading() )
      // const myHeaders = new Headers();
      // myHeaders.append( "", "" );
      // myHeaders.append( "Authorization", "Bearer 77|DlnLRqCxkxXC8vaMzhRExZDKAVSi21gAHYRsjdGK" );


    } catch ( error ) {
      console.log( "submit Foam error: " + error )
    }
  }


  /*
   * form methods
   */
  const methods = useForm( { resolver: schemaResolver } );
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;


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

      if ( event.target.files ) {
        const file = event.target.files[0];
        await handleUpload( dispatch, file ).then( ( res ) => {
          console.log( "red", res )
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
    <div className='d-flex justify-content-center align-items-center'>
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
              <form onSubmit={handleSubmit( () => { } )}>
                <Row>
                  <Col xl={6}>
                    <FormInput
                      name="name"
                      label="Project Name"
                      placeholder="Enter project name"
                      containerClass={"mb-3"}
                      register={register}
                      key="name"
                      value={title}
                      onChange={( e ) => setTitle( e.target.value )}
                      errors={errors}
                      control={control}
                    />

                    <FormInput
                      name="overview"
                      label="Project Overview"
                      placeholder="Enter some brief about project.."
                      type="textarea"
                      rows="5"
                      containerClass={"mb-3"}
                      register={register}
                      value={desc}
                      onChange={( e ) => setDesc( e.target.value )}
                      key="overview"
                      errors={errors}
                      control={control}
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
                        <Form.Group className="mb-3">
                          <Form.Label>Due Date</Form.Label>
                          <HyperDatepicker
                            hideAddon
                            value={endDate}
                            onChange={( date ) => setEndDate( date )}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3 mt-3 mt-xl-0">
                          <Form.Label>Project Priority</Form.Label>
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
                        </Form.Group>
                      </Col>
                    </Row>

                  </Col>
                  <Col xl={6}>
                    <Form.Group className="my-3 mt-xl-0">
                      <Form.Label className="mb-0">File Uploads</Form.Label>
                      <FormInput
                        type="file"
                        name="file"
                        containerClass={'mb-3'}
                        key="photo file"
                        onChange={handleFileChange}
                      />

                      {/* <FileUploader

                          onChange={handleFileChange}
                        // onFileUpload={handleFileChange}
                        /> */}
                    </Form.Group>


                    {( fileUpload || [] ).map( ( f, i ) => {

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
                    } )}



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
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default ProjectForm;
