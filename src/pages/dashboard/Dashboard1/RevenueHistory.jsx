import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";



const RevenueHistory = ({ data }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Dropdown className="float-end" align="end">
            <Dropdown.Toggle as="a" className="card-drop cursor-pointer">
              <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Edit Report</Dropdown.Item>
              <Dropdown.Item>Export Report</Dropdown.Item>
              <Dropdown.Item>Action</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h4 className="header-title mb-3">Last Sales History</h4>
          <div className="table-responsive">
            <table className="table table-borderless table-hover table-nowrap table-centered m-0">
              <thead className="table-light">
                <tr>
                  <th>Project Name</th>
                  <th>Sales Person Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Recevied Amount</th>
                </tr>
              </thead>
              <tbody>
                {(data?.last_15_sales || []).map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <h5 className="m-0 fw-normal">{item?.project_name}</h5>
                      </td>

                    

                      <td>{item?.user_name}</td>
                      <td>{item?.date}</td>
                      <td>{item?.amount}</td>
                      <td>{item?.received_amount}</td>
                      

                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RevenueHistory;
