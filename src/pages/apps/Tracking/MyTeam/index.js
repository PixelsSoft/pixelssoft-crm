import { Card, Col, ProgressBar, Row,Container, Button } from "react-bootstrap";

import CountUp from "react-countup";

import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../../components/PageTitle";



export default function index() {
  const naviage = useNavigate();
  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: "My Team", path: "/apps/tracking/" }]}
        title={"My Team"}
      />
      
      <Container fluid className="p-4 ">
      {/* Status Filter */}
      <Row className="mb-4 d-flex justify-content-center flex-wrap">
        <Col xs="auto" className="mb-2">
          <Button className="btn btn-success mb-2 me-1">All Members (2)</Button>
        </Col>
        <Col xs="auto" className="mb-2">
          <Button className="btn btn-light mb-2 me-1">Currently Working</Button>
        </Col>
        <Col xs="auto" className="mb-2">
          <Button className="btn btn-light mb-2 me-1">Currently In Break</Button>
        </Col>
        <Col xs="auto" className="mb-2">
          <Button className="btn btn-light mb-2 me-1">Stopped Work</Button>
        </Col>
        <Col xs="auto" className="mb-2">
          <Button className="btn btn-light mb-2 me-1">On Leave</Button>
        </Col>
        <Col xs="auto" className="mb-2">
          <Button className="btn btn-light mb-2 me-1">Yet To Start (1)</Button>
        </Col>
        <Col xs="auto" className="mb-2">
          <Button className="btn btn-light mb-2 me-1">App Not Installed (1)</Button>
        </Col>
      </Row>

      <Row className="d-flex flex-wrap">
        {/* User 1 Card */}
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="user-card p-3 shadow-sm">
            <Card.Body>
              <div className="d-flex">
                <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
                  <span style={{ fontSize: "24px" }}>t</span>
                </div>
                <div className="ml-3" style={{marginLeft:5}}>
                  <Card.Title className="mb-1" >taimoor</Card.Title>
                  <Card.Text className="text-muted">Yet to start work</Card.Text>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>00:00 Checked-in</div>
                <div>00h 00m Hours worked</div>
              </div>
              <Button variant="warning" className="w-100 mt-3">Yet to Start</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* User 2 Card */}
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
       
      
          <Card className="user-card p-3 shadow-sm">
            <Card.Body>
              <div className="d-flex">
                <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
                  <span style={{ fontSize: "24px" }}>u</span>
                </div>
                <div className="ml-3" style={{marginLeft:5}}>
                  <Card.Title className="mb-1">usama</Card.Title>
                  <Card.Text className="text-muted">Yet to start work</Card.Text>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>00:00 Checked-in</div>
                <div>00h 00m Hours worked</div>
              </div>
              <Button onClick={() => naviage( `/apps/myteam/5`, )}variant="info" className="w-100 mt-3">Desktop app not installed</Button>
            </Card.Body>
          </Card>
        
        </Col>
      </Row>

      {/* End of team members message */}
      <Row>
        <Col className="text-center text-muted mt-4">
          You have seen all the team members
        </Col>
      </Row>
    </Container>

     
      {/* <Row>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title as="h5">Special title treatment</Card.Title>
                <Card.Text>yet to start work</Card.Text>
              </div>
              <div>
                <Card.Title as="h5">Special title treatment</Card.Title>
                <Card.Text>yet to start work</Card.Text>
              </div>
            </div>
            <Row className="d-flex justify-content-between">
              <Col lg={2}>
                <p style={{ textAlign:"center" }}>
                  00 <br />
                  Check-in
                </p>
              </Col>

              <Col lg={8}>
                <ProgressBar
                  now={20}
                  className="mb-1"
                  variant="success"
                  striped
                />
              </Col>

              <Col lg={2}>
                <p style={{ justifyContent: "center", alignContent: "center" }}>
                  00 <br />
                  Check-in
                </p>
              </Col>
            </Row>

            <Link to="#" className="btn btn-primary waves-effect waves-light">
              Go somewhere
            </Link>
          </Card.Body>
        </Card>
      </Row> */}
    </>
  );
}
