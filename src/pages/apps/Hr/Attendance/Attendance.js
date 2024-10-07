import React, { useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";


const attendanceData = [
  { name: "Taimoor Khan", email: "taimoor@yopmail.com", attendance: ["P", "P", "A", "P", "L", "P", "A", "P", "P", "A", "P", "P", "L", "P", "P", "A", "P", "P", "P", "L", "P", "A", "P", "P", "P", "A", "L", "P", "A", "P"] },
  { name: "Usama Malik", email: "usama@yopmail.com", attendance: ["P", "A", "P", "P", "P", "P", "A", "P", "A", "P", "P", "L", "P", "A", "P", "P", "P", "A", "P", "L", "P", "P", "A", "P", "L", "P", "P", "A", "P", "P"] },
  { name: "Ali Raza", email: "ali@yopmail.com", attendance: ["A", "A", "P", "L", "P", "P", "P", "A", "A", "L", "P", "P", "P", "P", "A", "P", "A", "P", "P", "P", "L", "A", "P", "A", "P", "P", "L", "P", "P", "P"] },
];

const daysInMonth = 30;

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("September");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // Function to generate dates based on the selected month
  const generateDates = () => {
    const monthStart = new Date(`2024-${getMonthNumber(month)}-01`);
    let dates = [];

    // Determine the number of days in the month
    const lastDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
    
    for (let i = 0; i < lastDayOfMonth; i++) {
      const date = new Date(monthStart);
      date.setDate(monthStart.getDate() + i); // Add i days to the start date
      dates.push(date);
    }

    return dates;
  };

  // Function to get the numeric value of the selected month
  const getMonthNumber = (monthName) => {
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    return months[monthName] || "01";
  };

  const dates = generateDates();

  const filteredData = attendanceData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  return (
    <Container fluid className="p-4">
      {/* Filter Bar */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            onChange={handleSearch}
          />
        </Col>
        <Col md={3}>
          <Form.Select aria-label="Month" onChange={handleMonthChange}>
            <option value="September">September</option>
            <option value="August">August</option>
            <option value="July">July</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button variant="primary">Filter</Button>
        </Col>
      </Row>

      {/* Scrollable Table */}
      <div style={{ overflowX: "auto" }}>
        <Table responsive striped bordered hover className="text-center">
          <thead className="bg-light">
            <tr>
              <th>Member Name</th>
              {dates.map((date, index) => (
                <th key={index}>
                  <div>Day {index + 1}</div>
                  <div>{date.toLocaleDateString()}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, userIndex) => (
              <tr key={userIndex} className="table-row-hover">
                <td>{user.name}</td>
                {user.attendance.map((status, index) => (
                  <td key={index} className={getStatusClass(status)}>
                    {status}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

// Helper function to get class based on attendance status
const getStatusClass = (status) => {
  if (status === "P") return "text-success font-weight-bold animate";
  if (status === "A") return "text-danger font-weight-bold animate";
  if (status === "L") return "text-primary font-weight-bold animate";
  return "";
};

export default Attendance;
