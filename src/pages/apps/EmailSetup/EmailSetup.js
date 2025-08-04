import { Button, Card, Col, Row } from "react-bootstrap";
import Table from "../../../components/Table";
import PageTitle from "../../../components/PageTitle";
import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../../components/Spinner";

export default function EmailSetup() {
  const { roles, token, loading, employee ,Mails} = useSelector((state) => ({
    roles: state.Roles.roles,
    token: state.Auth.token,
    loading: state.utiltities.loading,
    employee: state.Employees.employees,
    Mails: state.Mails.Mails,
  }));
  console.log({employee})
  /* action column render */
  const ActionColumn = ({ employeeId }) => {
    return (
      <React.Fragment>
        <Link
          className="action-icon"
          // to={"/apps/administartor/emailSetup/${employeeId}"}
          to={`/apps/administartor/emailSetup/${employeeId}`}
          // onClick={() => closeView(projectId)}
        >
          {" "}
          <i className="mdi mdi-eye"></i>
        </Link>
      </React.Fragment>
    );
  };
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "name",
      sort: false,
    },
    {
      Header: "Designation",
      accessor: "details[0].designation",
      sort: false,
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => <ActionColumn employeeId={row.original.id} />,
    },
  ];

  const sizePerPageList = [
    {
      text: "10",
      value: 10,
    },
    {
      text: "20",
      value: 20,
    },
    {
      text: "35",
      value: 35,
    },
    {
      text: "All",
      value: roles?.length,
    },
  ];

  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle title={"Email Setup"} />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <div className="text-sm-end">
                    <Button className="btn btn-success mb-2 me-1">
                      <i className="mdi mdi-cog-outline"></i>
                    </Button>

                    <Button className="btn btn-light mb-2 me-1">Import</Button>

                    <Button className="btn btn-light mb-2">Export</Button>
                  </div>
                </Col>
              </Row>
              {employee !== undefined && employee !== null ? (
                <Table
                  columns={columns}
                  data={employee}
                  pageSize={10}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSelectable={true}
                  isSearchable={true}
                  tableClass="table-striped dt-responsive nowrap w-100"
                  searchBoxClass="my-2"
                />
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
