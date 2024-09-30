import { Card, Col, ProgressBar, Row,Container } from "react-bootstrap";


import PageTitle from "../../../../components/PageTitle";


export default function index() {
  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: "Taimoor", path: "/apps/tracking/" }]}
        title={"My Team"}
      />
      

      <Row className="d-flex flex-wrap">
        {/* User Profile Card */}
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card className="p-3">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning text-white d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                <h3 className="mb-0">T</h3>
              </div>
              <div className="ml-3">
                <h5 className="mb-1">taimoor</h5>
                <p className="text-muted mb-0">taimoorkhan@yopmail.com</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Dashboard Metrics */}
        <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
          <Card className="text-center p-3">
            <Card.Title>Total Worked Hours</Card.Title>
            <Card.Text>00h 00m</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
          <Card className="text-center p-3">
            <Card.Title>Active Time</Card.Title>
            <Card.Text>00h 00m</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
          <Card className="text-center p-3">
            <Card.Title>Productive Apps %</Card.Title>
            <Card.Text>0%</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
          <Card className="text-center p-3">
            <Card.Title>Idle Time Spent %</Card.Title>
            <Card.Text>0%</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
          <Card className="text-center p-3">
            <Card.Title>Clock-in Time</Card.Title>
            <Card.Text>-</Card.Text>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
          <Card className="text-center p-3">
            <Card.Title>Clock-Out Time</Card.Title>
            <Card.Text>-</Card.Text>
          </Card>
        </Col>
      </Row>

      {/* Activities Section */}
      <Row className="mt-3">
        <Col>
          <Card className="p-3">
            <Card.Title>Activities</Card.Title>
            <Card.Text>No data found</Card.Text>
          </Card>
        </Col>
      </Row>
    {/* </Container> */}

     
     
    </>
  );
}
