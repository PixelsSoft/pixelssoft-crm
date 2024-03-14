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

import avatar1 from "../../../assets/images/users/user-6.jpg";
import avatar2 from "../../../assets/images/users/user-7.jpg";
import avatar3 from "../../../assets/images/users/user-8.jpg";
import avatar4 from "../../../assets/images/users/user-9.jpg";
import avatar5 from "../../../assets/images/users/user-10.jpg";
import avatar6 from "../../../assets/images/users/user-4.jpg";
import avatar7 from "../../../assets/images/users/user-5.jpg";
import avatar8 from "../../../assets/images/users/user-1.jpg";
import { useSelector } from "react-redux";

// interface MemberTypes {
//   value: string;
//   name: string;
//   image: string;
// }

const ProjectForm = () => {
  const [startDate, setStartDate] = useState( new Date() );
  const [endDate, setEndDate] = useState( new Date() );
  const [teamMembers] = useState( [
    { value: "Shreyu N", name: "Shreyu N", image: avatar2 },
    { value: "Greeva N", name: "Greeva N", image: avatar5 },
    { value: "Dhyanu B", name: "Dhyanu B", image: avatar4 },
    { value: "Mannat B", name: "Mannat B", image: avatar6 },
    { value: "Katu S", name: "Katu S", image: avatar7 },
    { value: "Nik N", name: "Nik N", image: avatar1 },
    { value: "Rik N", name: "Rik N", image: avatar8 },
  ] );
  const [selectedTeamMembers, setSelectedTeamMembers] = useState(
    [
      
    ]
  );

  /*
   *  add selected team members
   */
  const selectTeamMembers = ( e ) => {
    if ( e.length !== 0 ) {
      const isAlreadySelected = selectedTeamMembers.filter(
        ( x ) => x["name"] === e[0].name
      );

setSelectedTeamMembers(e)
console.log("selected team",selectedTeamMembers)
    }
  };

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape( {
      name: yup.string().required( "Please enter Project Name" ),
    } )
  );

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


  const { token, user, category, loading,employee } = useSelector(
    (state) => ({
        token: state.Auth.token,
        user: state.Auth.user,
        category: state.Category.category,
        loading: state.utiltities.loading,
        employee: state.Employees.employees,
    })
);


  return (
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
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customRadio1"
                        >
                          Private
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          id="customRadio2"
                          name="customRadio"
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customRadio2"
                        >
                          Team
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          id="customRadio3"
                          name="customRadio"
                          className="form-check-input"
                          defaultChecked
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
                      {category!==null && category !==undefined
                      
                      &&
                      category.map((e,index)=>{
return(
  <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          id="customRadio1"
                          name="projectCategory"
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customRadio1"
                        >
                      {e?.title}
                        </label>
                      </div>
)
                      })
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

                      <FileUploader />
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
                          console.log("member===>",member?.name)
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
  );
};

export default ProjectForm;
