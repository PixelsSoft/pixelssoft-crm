import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Dropdown,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

// components
import PageTitle from "../../../components/PageTitle";

// dummy data
import { projects, ProjectsList } from "./data";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../../redux/Slices/utiltities/Utiltities";
import {
  DeleteProject,
  GetProject,
} from "../../../redux/Slices/Project/Project";

// single project
const SingleProject = (props) => {
  const project = props.project || {};
  const dispatch=useDispatch()


  const { token } = useSelector((state) => ({
    token: state.Auth.token,
  }));

  const navigate = useNavigate();
  return (
    <Card className="project-box">
      <Card.Body>
        <Dropdown className="card-widgets" align="end">
          <Dropdown.Toggle
            as="a"
            className="cursor-pointer card-drop p-0 shadow-none"
          >
            <i className="mdi mdi-dots-horizontal m-0 text-muted h3"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <i className="mdi mdi-pencil me-1"></i>Edit
            </Dropdown.Item>
            <Dropdown.Item
          
              onClick={async() => {
               await dispatch( DeleteProject(project?.id, token, navigate));
              }}
            >
              <i className="mdi mdi-delete me-1"></i>Delete
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="mdi mdi-email-outline me-1"></i>Invite
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="mdi mdi-exit-to-app me-1"></i>Leave
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="mt-0">
        <Link
  to={{
    pathname: `/apps/projects/${project?.id}/details`,
    state: { project }, // pass project data here
  }}
  className="text-dark"
>
  {project?.title}
</Link>
        </h4>
        <p className="text-muted text-uppercase">
          <i className="mdi mdi-account-circle"></i>{" "}
          <small>{project?.description}</small>
        </p>
        <div
          className={classNames(
            "badge",
            {
              "bg-soft-success text-success": project?.status === "Finished",
              "bg-soft-secondary text-secondary": project?.status === "Ongoing",
            },
            "mb-3"
          )}
        >
          {project?.status}
        </div>

        <p className="text-muted font-13 mb-3 sp-line-2">
          {project?.description}...
          <Link to="#" className="fw-bold text-muted">
            view more
          </Link>
        </p>
        <p className="mb-1">
          <span className="pe-2 text-nowrap mb-2 d-inline-block">
            <i className="mdi mdi-format-list-bulleted-type text-muted me-1"></i>
            <b>{project?.totalTasks}</b> Tasks
          </span>
          <span className="text-nowrap mb-2 d-inline-block">
            <i className="mdi mdi-comment-multiple-outline text-muted me-1"></i>
            <b>{project?.totalComments}</b> Comments
          </span>
        </p>
        <div className="avatar-group mb-3">
          {(project?.project_Teams || []).map((member, index) => {
            return (
              <OverlayTrigger
                key={index}
                placement="bottom"
                overlay={
                  <Tooltip id={member?.userDetails?.id}>
                    {member?.userDetails?.name}
                  </Tooltip>
                }
              >
                <Link to="#" className="avatar-group-item">
                  <img
                    src={member?.userDetails?.profile_img}
                    className="rounded-circle avatar-sm"
                    alt=""
                  />
                </Link>
              </OverlayTrigger>
            );
          })}
        </div>
        <p className="mb-2 fw-semibold">
          Task completed:
          <span className="float-end">
            {project.taskCompleted}/{project.totalTasks}
          </span>
        </p>
        <ProgressBar
          now={project.progress}
          className="mb-1"
          style={{ height: "7px" }}
        />
      </Card.Body>
    </Card>
  );
};

const Projects = () => {
  const [projects, setprojects] = useState([]);
  const dispatch = useDispatch();

  const { loading, token, project } = useSelector((state) => ({
    loading: state.utiltities.loading,
    token: state.Auth.token,
    project: state.Projects.project,
  }));


  const getProject = async () => {
    await dispatch(GetProject(token));
  };

  useEffect(() => {
    setprojects(project);
  }, []);
  // const getProject = async () => {
  //   try {

  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       },
  //       redirect: "follow"
  //     };
  //     await dispatch( startLoading() )
  //     await fetch( "https://crmupd.pixelssoft.com/api/project", requestOptions )
  //       .then( ( response ) => response.json() )
  //       .then( async ( result ) => {
  //         const res = result
  //         setprojects( res.data )

  //         await dispatch( stopLoading() )
  //       }
  //       )
  //       .catch( async ( error ) => {
  //         console.error( error )
  //         await dispatch( stopLoading() )
  //       }
  //       );

  //   } catch ( error ) {
  //     await dispatch( stopLoading() )

  //     console.log( "failed to get project", error )
  //   }

  // }

  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Projects", path: "/apps/projects/list" },
          { label: "Projects List", path: "/apps/projects/list", active: true },
        ]}
        title={"Projects List"}
      />

      <Row className="mb-2">
        <Col sm={4}>
          <Link
            to="/apps/projects/create"
            className="btn btn-danger rounded-pill waves-effect waves-light mb-3"
          >
            <i className="mdi mdi-plus"></i> Create Project
          </Link>
        </Col>
        <Col sm={8}>
          <div className="text-sm-end">
            <div className="btn-group mb-3">
              <Button variant="primary">All</Button>
            </div>
            <ButtonGroup className="btn-group mb-3 ms-1">
              <Button variant="light">Ongoing</Button>
              <Button variant="light">Finished</Button>
            </ButtonGroup>

            <div className="btn-group mb-3 ms-2 d-none d-sm-inline-block">
              <Button variant="dark">
                <i className="mdi mdi-apps"></i>
              </Button>
            </div>
            <div className="btn-group mb-3 d-none d-sm-inline-block">
              <Button variant="link" className="text-dark">
                <i className="mdi mdi-format-list-bulleted-type"></i>
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        {(projects || []).map((project, i) => {
          return (
            <Col lg={4} key={"proj-" + project.id}>
              <SingleProject project={project} />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <div className="text-center mb-3">
            <Link to="#" className="text-danger">
              <i className="mdi mdi-spin mdi-loading me-1"></i> Load more{" "}
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Projects;
