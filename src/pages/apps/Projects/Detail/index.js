import React, { useEffect, useState, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Dropdown,
  Tab,
  Nav,
  Modal,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamMembers,
  EditProjectById,
  GetProjectById,
  removeTeamMember,
  UploadProjectDocuments,
} from "../../../../redux/Slices/Project/Project";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { EditorState, ContentState, convertFromHTML } from "draft-js";

// components
import PageTitle from "../../../../components/PageTitle";
import Statistics from "./Statistics";
import TeamMembers from "./TeamMembers";
import Comments from "./Comments";
import ProgressChart from "./ProgressChart";
import Files from "./Files";
import Tasks from "../Tasks/Tasks";
import { getFileDetails, handleUpload } from "../../../../utils/FileUpload";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/Slices/utiltities/Utiltities";
import { FormInput } from "../../../../components";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner";

// Main Component
const ProjectDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, loading, employee,roles } = useSelector((state) => ({
    token: state.Auth.token,
    loading: state.utiltities.loading,
    employee: state.Employees.employees,
     roles: state.Roles.roles,
  }));
  const [hasSuperAdmin, sethasSuperAdmin] = useState(
      roles[0]?.role
        .split(",")
        .some((role) => role === "SuperAdmin" || role === "Project Manager" || role === "Sales") || ""
    );
  

  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [boardCount, setBoardCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const fetchProjectDetails = useCallback(async () => {
    try {
      dispatch(startLoading());
      const response = await dispatch(GetProjectById(id, token));

      if (response && response?.data[0]) {
        const fetchedProject = response?.data[0];
        setProject(fetchedProject);
        setDocuments(response?.data[0]?.projectDocuments);
        setTaskCount(response?.task_count||0)
        setBoardCount(response?.board_count||0)
        setCommentCount(response?.comment_count||0)
        setUserCount(response.user_count||0)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.error("Error fetching project details:", error);
      dispatch(stopLoading());
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  if (!project) {
    return (
      <div className="d-flex justify-content-center align-items-center  vh-100">
        <Spinner className="m-2" color={"primary"} />
      </div>
    );
  }
  const uploadDocuments = async (files) => {
    try {
      dispatch(startLoading());
      const Form = new FormData();
      Form.append("id", id);
      files.forEach((file) => {
        Form.append("files", file); // Append each file individually
      });

      await dispatch(UploadProjectDocuments(Form, token));
      await fetchProjectDetails();

      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };

  // ================================================================Edit project -================================================================
  const onEditProject = async () => {
    try {
      dispatch(startLoading());
      const Form = new FormData();
      Form.append("id", id);
      Form.append("title", title);
      Form.append("description", des);
      await dispatch(EditProjectById(Form, token));
      await fetchProjectDetails();
      setEditModal(!editModal);
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };
  // ================================================================Add team Members-================================================================

  const onAdd = async (selectedTeamMembers) => {
    try {
      dispatch(startLoading());
      const Form = new FormData();
      Form.append("project_id", id);
      selectedTeamMembers.forEach((member) => {
        Form.append("user_ids", member?.id);
      });
      await dispatch(addTeamMembers(Form, token));
      await fetchProjectDetails();

      dispatch(stopLoading());
    } catch (error) {
      console.error("Error adding team members:", error);
      dispatch(stopLoading());
    }
  };

  // ================================================================Remove team Members-================================================================
  const onRemove = async (user_id) => {
    try {
      dispatch(startLoading());
      const Form = new FormData();
      Form.append("project_id", id);
      Form.append("user_id", user_id);

      await dispatch(removeTeamMember(Form, token));
      await fetchProjectDetails();

      dispatch(stopLoading());
    } catch (error) {
      console.error("Error removing team members:", error);
      dispatch(stopLoading());
    }
  };

  const RenderDetail = () => (
    <>
      <Row>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-list"
            variant="primary"
            stats={taskCount||0}
            description="Total Tasks"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-check-square"
            variant="success"
            stats={boardCount||0}
            description="Total Boards"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-users"
            variant="info"
            stats={userCount || 0}
            description="Total Team Size"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-clock"
            variant="warning"
            stats={commentCount||0}
            description="Total Comments"
          />
        </Col>
      </Row>
      <Row>
        <Col xl={8} lg={6}>
          <Card className="d-block">
            <Card.Body>
              <Dropdown className="float-end" align="end">
                <Dropdown.Toggle
                  as="a"
                  className="card-drop cursor-pointer p-0 shadow-none"
                >
                  <i className="dripicons-dots-3"></i>
                </Dropdown.Toggle>
               
                <Dropdown.Menu>
                   {hasSuperAdmin&& (

                   <Dropdown.Item
                    onClick={() => {
                      setEditModal(!editModal);

                      setTitle(project?.title);
                      if (project?.description) {
                        const blocksFromHTML = convertFromHTML(
                          project?.description
                        );
                        const contentState = ContentState.createFromBlockArray(
                          blocksFromHTML.contentBlocks,
                          blocksFromHTML.entityMap
                        );
                        const newEditorState =
                          EditorState.createWithContent(contentState);
                        setDes(newEditorState);
                      }
                      // setDes( project?.description )
                    }}
                  >
                    <i className="mdi mdi-pencil me-1"></i>Edit
                  </Dropdown.Item>
                )}
                 
                  {/* <Dropdown.Item>
                    <i className="mdi mdi-delete me-1"></i>Delete
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="mdi mdi-email-outline me-1"></i>Invite
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="mdi mdi-exit-to-app me-1"></i>Leave
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
              <h2 className="mt-0 font-20">Title: {project.title}</h2>
              <div
                className={classNames(
                  "badge",
                  {
                    "bg-success": project.state === "Finished",
                    "bg-secondary": project.state === "Ongoing",
                    "bg-warning": project.state === "Planned",
                  },
                  "text-light",
                  "mb-3"
                )}
              >
                {project.status}
              </div>
              <h5>Project Overview:</h5>
              {/* <p className="text-muted mb-2">{project.description}</p> */}
              <p
                className="text-muted mb-2"
                dangerouslySetInnerHTML={{ __html: project.description }}
              ></p>
              <Row>
                <Col md={4}>
                  <div className="mb-4">
                    <h5>Start Date</h5>
                    <p>{moment(project.create_date).format("YYYY-MM-DD")}</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-4">
                    <h5>End Date</h5>
                    <p>{moment(project.endDate).format("YYYY-MM-DD")}</p>
                  </div>
                </Col>
              </Row>
              <TeamMembers
                teamMembers={project.project_Teams}
                employee={employee}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </Card.Body>
          </Card>
          <Comments projectId={id} />
        </Col>
        <Col xl={4} lg={6}>
          <ProgressChart />
          {/* {documents.length > 0 && <Files documents={documents} uploadDocuments={uploadDocuments} />} */}
          <Files documents={documents} uploadDocuments={uploadDocuments} />
        </Col>
      </Row>
    </>
  );

  const RenderTest = () => (
    <iframe
      src="https://pixelssoft.com"
      title="Test"
      style={{
        width: "100%",
        height: "600px",
      }}
    />
  );

  const tabContents = [
    {
      id: 1,
      title: "Details",
      icon: "mdi mdi-home-variant",
      component: <RenderDetail />,
    },
    {
      id: 2,
      title: "Tasks",
      icon: "mdi mdi-account-circle",
      component: <Tasks data={project} />,
    },
    // {
    //   id: 3,
    //   title: "Testing",
    //   icon: "mdi mdi-account-circle",
    //   component: <RenderTest />,
    // },
  ];

  return loading ? (
    <div className="d-flex justify-content-center align-items-center  vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Projects", path: "/apps/projects" },
          {
            label: "Project Details",
            path: "/apps/projects/detail",
            active: true,
          },
        ]}
        title={"Project Details"}
      />
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <Tab.Container defaultActiveKey="Details">
                <Nav as="ul" variant="tabs">
                  {tabContents.map((tab) => (
                    <Nav.Item as="li" key={tab.id}>
                      <Nav.Link className="cursor-pointer" eventKey={tab.title}>
                        {tab.title}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <Tab.Content>
                  {tabContents.map((tab) => (
                    <Tab.Pane
                      eventKey={tab.title}
                      id={String(tab.id)}
                      key={tab.id}
                    >
                      {tab.component}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h4 className="modal-title">Edit Project</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="px-2">
            <FormInput
              name="title"
              label="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter title"
              type="text"
              containerClass="mb-3"
              className="form-control form-control-light"
              key="title"
            />
            <Editor
              className={"md:6"}
              editorState={des}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setDes}
              editorStyle={{
                minHeight: "200px",
                border: "1px solid #ccc",
                marginBottam: 20,
                paddinghorizontal: 10,
              }}
            />

            <div className="text-end">
              <Button
                variant="light"
                className="me-1"
                onClick={() => setEditModal(!editModal)}
              >
                Cancel
              </Button>
              <Button onClick={onEditProject} variant="primary" type="submit">
                Edit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ProjectDetail;
