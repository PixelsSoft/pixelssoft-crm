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
  Spinner,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typeahead } from "react-bootstrap-typeahead";

// components
import PageTitle from "../../../components/PageTitle";
import HyperDatepicker from "../../../components/Datepicker";
import FileUploader from "../../../components/FileUploader";
import { FormInput } from "../../../components";

import avatar1 from "../../../assets/images/users/user-6.jpg";
import avatar2 from "../../../assets/images/users/user-7.jpg";
import avatar3 from "../../../assets/images/users/user-8.jpg";
import avatar4 from "../../../assets/images/users/user-9.jpg";
import avatar5 from "../../../assets/images/users/user-10.jpg";
import avatar6 from "../../../assets/images/users/user-4.jpg";
import avatar7 from "../../../assets/images/users/user-5.jpg";
import avatar8 from "../../../assets/images/users/user-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { CreateProject } from "../../../redux/Slices/Project/Project";
import { startLoading, stopLoading } from "../../../redux/Slices/utiltities/Utiltities";

// interface MemberTypes {
//   value: string;
//   name: string;
//   image: string;
// }

const ProjectForm = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState( new Date() );
  const [endDate, setEndDate] = useState( new Date() );
  const [title, setTitle] = useState( 'dhjvhjdvhj' );
  const [desc, setDesc] = useState( 'ddd' );
  const [priority, setPriority] = useState( '' );
  const [cat, setCat] = useState( '' );
  const [prev, setPrev] = useState( '' );
  const [fileUpload, setFileUpload] = useState( [] );


  const [selectedTeamMembers, setSelectedTeamMembers] = useState( [] );
  const [selectedTeamMembersId, setSelectedTeamMembersId] = useState( [] );
  console.log( "privacy=====>", prev )

  const [base64Data, setBase64Data] = useState( null );
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
    setPrev( '' )
    setTitle( '' )
    setDesc( '' )
    setCat( '' )
    setStartDate( new Date() )
    setEndDate( new Date() )
    setSelectedTeamMembersId( [] )
    setPriority( '' )
    selectedTeamMembers( [] )
    setFileUpload( [] )

  }
  const addProject = async () => {
    try {
      console.log( "uploading project", title )
      // const data = {
      //   project_privacy: prev,
      //   project_name: title,
      //   description: desc,
      //   category_id: cat,
      //   start_date: startDate,
      //   end_date: endDate,
      //   team_members: selectedTeamMembersId,
      //   project_priority: priority,
      //   fileName: fileUpload,
      // }
      const Form = new FormData()
      Form.append( "project_privacy", prev )
      Form.append( "project_name", title )
      Form.append( "description", desc )
      Form.append( "category_id", cat )
      Form.append( "start_date", startDate )
      Form.append( "end_date", endDate )
      Form.append( "team_members", selectedTeamMembersId )
      Form.append( "project_priority", priority )
      // Form.append( "fileName[]", fileUpload[0] )

      for ( let i = 0; i < fileUpload.length; i++ ) {
        Form.append( "fileName[]", fileUpload[i], fileUpload[i].name );
      }
      await dispatch( startLoading() )
      await dispatch( CreateProject( Form, token, reset ) )
      await dispatch( stopLoading() )

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

  console.log( "base 64,", base64Data )
  const { token, user, category, loading, employee } = useSelector(
    ( state ) => ( {
      token: state.Auth.token,
      user: state.Auth.user,
      category: state.Category.category,
      loading: state.utiltities.loading,
      employee: state.Employees.employees,
    } )
  );
  const handleFileChange = ( event ) => {
    console.log( "uploaded file", event )
    try {
      setFileUpload( event )
    } catch ( error ) {
      console.log( "error", error )
    }

  };


  return (
    loading ? (
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
                        <label className="form-label">Project Privacy</label>
                        <br />

                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                            className="form-check-input"
                            value={"Private"}
                            onChange={( e ) => setPrev( e.target.value )}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customRadio1"
                          >
                            Private
                          </label>
                        </div>
                        <div className="form-check form-check-inline">

                          <label
                            className="form-check-label"
                            htmlFor="customRadio2"
                          >
                            <input
                              type="radio"
                              id="customRadio2"
                              value={"Team"}
                              name="customRadio"
                              className="form-check-input"
                              checked={prev === "Team"}
                              onChange={( e ) => setPrev( e.target.value )}
                            />
                            Team
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            id="customRadio3"
                            name="customRadio"
                            className="form-check-input"
                            value={"Public"}

                            defaultChecked
                            onChange={( e ) => setPrev( e.target.value )}

                          />
                          <label
                            className="form-check-label"
                            htmlFor="customRadio3"
                          >
                            Public
                          </label>
                        </div>
                      </div>
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
                            <Form.Label>Start Date</Form.Label>
                            <HyperDatepicker
                              hideAddon
                              value={startDate}
                              onChange={( date ) => setStartDate( date )}
                            />
                          </Form.Group>
                        </Col>
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
                      </Row>

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
                          placeholder="select Team Member..."
                        />
                      </Form.Group>


                    </Col>
                    <Col xl={6}>
                      <Form.Group className="my-3 mt-xl-0">
                        <Form.Label className="mb-0">File Uploads</Form.Label>

                        <FileUploader


                          onFileUpload={handleFileChange}
                        />
                      </Form.Group>

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
    ) )
};

export default ProjectForm;
