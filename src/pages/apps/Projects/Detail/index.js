import React, { useState } from "react";
import { Row, Col, Card, Dropdown, Tab, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import Board from 'react-trello'
import firebase from 'firebase/app';
import 'firebase/storage';
// components
import PageTitle from "../../../../components/PageTitle";

import Statistics from "./Statistics";
import TeamMembers from "./TeamMembers";
import Comments from "./Comments";
import ProgressChart from "./ProgressChart";
import Files from "./Files";


import Tasks from "../Tasks/Tasks";
import moment from "moment";


const ProjectDetail = () => {
  const location = useLocation();
  const project = location.state;
  console.log( "project", project )

  const RenderDetail = () => {
    return (
      <>
        <Row>
          <Col md={6} xl={3}>
            <Statistics
              icon="fe-list"
              variant="primary"
              stats="942"
              description="Total Tasks"
            />
          </Col>
          <Col md={6} xl={3}>
            <Statistics
              icon="fe-check-square"
              variant="success"
              stats="328"
              description="Total Tasks Completed"
            />
          </Col>
          <Col md={6} xl={3}>
            <Statistics
              icon="fe-users"
              variant="info"
              stats={project?.project_Teams?.length || 0}
              description="Total Team Size"
            />
          </Col>
          <Col md={6} xl={3}>
            <Statistics
              icon="fe-clock"
              variant="warning"
              stats="412"
              description="Total Hours Spent"
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
                    <Dropdown.Item>
                      <i className="mdi mdi-pencil me-1"></i>Edit
                    </Dropdown.Item>
                    <Dropdown.Item>
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

                <h3 className="mt-0 font-20">{project?.title}</h3>
                <div
                  className={classNames(
                    "badge",
                    {
                      "bg-success": project?.state === "Finished",
                      "bg-secondary": project?.state === "Ongoing",
                      "bg-warning": project?.state === "Planned",
                    },
                    "text-light",
                    "mb-3"
                  )}
                >
                  {project?.status}
                </div>

                <h5>Project Overview:</h5>

                <p className="text-muted mb-2">
                  {project?.description
                  }
                </p>


                {/* 
                <div className="mb-4">
                  <h5>Tags</h5>
                  <div className="text-uppercase">
                    <Link to="#" className="badge badge-soft-primary me-1">
                      Html
                    </Link>
                    <Link to="#" className="badge badge-soft-primary me-1">
                      Css
                    </Link>
                    <Link to="#" className="badge badge-soft-primary me-1">
                      Bootstrap
                    </Link>
                    <Link to="#" className="badge badge-soft-primary me-1">
                      JQuery
                    </Link>
                  </div>
                </div> */}

                <Row>
                  <Col md={4}>
                    <div className="mb-4">
                      <h5>Start Date</h5>
                      <p>
                        {moment( project?.create_date ).format( 'YYYY-MM-DD' )}
                        {/* {project?.create_date}{" "} */}
                        {/* <small className="text-muted">{project?.create_date}</small> */}
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-4">
                      <h5>End Date</h5>
                      <p>
                        {moment( project?.endDate ).format( 'YYYY-MM-DD' )}
                      </p>
                    </div>
                  </Col>
                </Row>
                <TeamMembers teamMembers={project?.project_Teams} />
              </Card.Body>
            </Card>
            <Comments />
          </Col>

          <Col xl={4} lg={6}>
            <ProgressChart />
            <Files documents={project?.projectDocuments} />
          </Col>
        </Row>
      </>
    )
  }

  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Planned Tasks',
        label: '2/2',
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane2',
        title: 'Completed',
        label: '0/0',
        cards: []
      }
    ]
  }



  const RenderCards = () => {
    const [state, setState] = useState()
    const setEventBus = ( eventBus ) => {
      setState( { eventBus } )
    }

    const handleDragStart = ( cardId, laneId ) => {
      console.log( 'drag started' )
      console.log( `cardId: ${cardId}` )
      console.log( `laneId: ${laneId}` )
    }

    const handleDragEnd = ( cardId, sourceLaneId, targetLaneId ) => {
      console.log( 'drag ended' )
      console.log( `cardId: ${cardId}` )
      console.log( `sourceLaneId: ${sourceLaneId}` )
      console.log( `targetLaneId: ${targetLaneId}` )
    }
    const shouldReceiveNewData = ( nextData ) => {
      console.log( 'New card has been added' )
      console.log( nextData )
    }

    const handleCardAdd = ( card, laneId ) => {
      console.log( `New card added to lane ${laneId}` )
      console.dir( card )
    }
    return (
      <Board
        editable
        onCardAdd={handleCardAdd}
        data={data}
        draggable
        onDataChange={shouldReceiveNewData}
        eventBusHandle={setEventBus}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
    );
  };
  const RenderTest = () => {
    return (
      <iframe src="https:pixelssoft.com"
        title="W3Schools Free Online Web Tutorials"
        style={{
          width: '100%',
          height: "600px"
        }}
      ></iframe>
    );
  };

  const tabContents = [
    {
      id: 1,
      title: "Details",
      icon: "mdi mdi-home-variant",
      function: <RenderDetail />,
    },
    {
      id: 2,
      title: "Tasks",
      icon: "mdi mdi-account-circle",
      function: <Tasks />,
      // function: <RenderCards />,
    },
    {
      id: 3,
      title: "Testing",
      icon: "mdi mdi-account-circle",
      function: <RenderTest />,
    },
  ];

  return (
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
                  {( tabContents || [] ).map( ( tab, index ) => {
                    return (
                      <Nav.Item as="li" key={index}>
                        <Nav.Link
                          className="cursor-pointer"
                          href="#"
                          eventKey={tab.title}
                        >
                          {tab.title}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  } )}
                </Nav>

                <Tab.Content>
                  {( tabContents || [] ).map( ( tab, index ) => {
                    return (
                      <Tab.Pane
                        eventKey={tab.title}
                        id={String( tab.id )}
                        key={index}
                      >
                        <>{tab.function}</>
                      </Tab.Pane>
                    );
                  } )}
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProjectDetail;
