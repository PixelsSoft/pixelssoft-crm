
import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Container,
  Button,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../../components/PageTitle";
import { startLoading, stopLoading } from "../../../../redux/Slices/utiltities/Utiltities";
import EmployeeService from "../../../../redux/Services/employees.services";
import { useNavigate } from "react-router-dom";
// import { Search } from "react-bootstrap-icons";

export default function Tracking() {
  const naviage = useNavigate();

  const dispatch = useDispatch();
  const { loading, token } = useSelector((state) => ({
    loading: state.utiltities.loading,
    token: state.Auth.token,
  }));

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEmployees = async (query = "") => {
    try {
      dispatch(startLoading());
      const response = await EmployeeService.getEmployee(token, query);
    
      setEmployees(response?.user_details || []);
      dispatch(stopLoading());
    } catch (error) {
      console.log("error on fetching employee", error);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  return (
    <>
      <PageTitle breadCrumbItems={[{ label: "My Team", path: "/apps/tracking/" }]} title={"My Team"} />

      <Container fluid className="p-4">
        <Form onSubmit={handleSearch} className="mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search team members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-start-pill"
            />
            <Button type="submit" variant="primary" className="rounded-end-pill">
              {/* <Search /> */}
            </Button>
          </InputGroup>
        </Form>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="d-flex flex-wrap">
            {employees.length ? employees.map((user, idx) => (
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={idx}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <div
                      className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-3"
                      style={{ width: "60px", height: "60px", fontSize: "24px" }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text className="text-muted">{user.status || "No status"}</Card.Text>
                    <div className="d-flex justify-content-between w-100 mt-2 small text-muted">
                      <div>Check-in: {user.checkInTime || "00:00"}</div>
                      <div>Worked: {user.hoursWorked || "00h 00m"}</div>
                    </div>
                    <Button
onClick={() => naviage( `/apps/myteam/5`, )}
                      variant={user.status === "Yet to start work" ? "warning" : "info"}
                      className="w-100 mt-3"
                    >
                      {user.status || "Status Unknown"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )) : (
              <Col className="text-center text-muted mt-5">No team members found</Col>
            )}
          </Row>
        )}
      </Container>
    </>
  );
}
