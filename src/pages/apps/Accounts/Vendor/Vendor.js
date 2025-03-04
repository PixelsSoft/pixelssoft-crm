import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import PageTitle from "../../../../components/PageTitle";
import Table from "../../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../components/Spinner";
import { toast } from "react-toastify";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/Slices/utiltities/Utiltities";
import {
  AddVendor,
  DeleVendor,
  GetVendor,
} from "../../../../redux/Slices/Vendor/Vendor";
import utils from "../../../../utils/utils";
import { Link } from "react-router-dom";
import EditVendorModal from "../../../../components/EditVendorModal";
import { GetVenCat } from "../../../../redux/Slices/VendorCategory/VendorCategory";
import { FormInput } from "../../../../components";

export default function Vendor() {
  const { token, loading, vendors, vendorCategory } = useSelector((state) => ({
    token: state.Auth.token,
    loading: state.utiltities.loading,
    vendors: state.Vendor.vendors,
    vendorCategory: state.VendorCategory.venCat,
  }));

  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [catId, setCatId] = useState("");





  const [detail, setDetail] = useState();

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const closeEdit = () => {
    setDetail();
    setEditModal(!editModal);
  };
  const fetchVendorCategory = async () => {
    try {
      dispatch(startLoading());
      await dispatch(GetVenCat(token));
      await dispatch(GetVendor(token));

      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchVendorCategory();
  }, []);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      sort: false,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: false,
    },
    {
      Header: "Phone",
      accessor: "phoneNo",
      sort: false,
    },
    {
      Header: "Category",
      accessor: "vendorCategory.title",
      sort: false,
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => <ActionColumn data={row.original} />,
    },
  ];

  const ActionColumn = ({ data }) => {
    const { id } = data;
    return (
      <React.Fragment>
        <Link className="action-icon" onClick={() => editFunc(data)}>
          {" "}
          <i className="mdi mdi-square-edit-outline"></i>
        </Link>
        <Link className="action-icon" onClick={() => deleteFunc(id)}>
          {" "}
          <i className="mdi mdi-delete"></i>
        </Link>
      </React.Fragment>
    );
  };

  const deleteFunc = async (id) => {
    dispatch(startLoading());
    await dispatch(DeleVendor(id, token));
    dispatch(stopLoading());
  };

  const editFunc = (data) => {
    setDetail(data);
    setEditModal(!editModal);
  };

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
  ];

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const addVendor = async () => {
    if (name === "" || email === "" || phone === "") {
      return toast.error("Enter all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!utils.validateEmail(email)) {
      return toast.error("Enter correct email", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
   
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phoneNo", phone);
    formdata.append("vendor_category_id", catId);
    dispatch(startLoading());
    await dispatch(AddVendor(formdata, token, reset));
    toggleModal()
    dispatch(stopLoading());
  };

  const phoneFunc = (e) => {
    if (e.target.value > 0) {
      setPhone(e.target.value);
    }
  };

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle title={"Vendor"} />

      <Row>
        <Card>
          <Card.Body>
            <Row style={{ display: "flex", float: "right" }}>
              <Col lg={3}>
                <Button
                  onClick={toggleModal}
                  variant={"success"}
                  className="waves-effect waves-light px-5 "
                >
                  Add
                </Button>
              </Col>
            </Row>
            {vendors !== undefined && vendors !== null ? (
              <Table
                columns={columns}
                data={vendors}
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
      </Row>
      <Modal show={visibleModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <h4 className="modal-title">Add Vendor</h4>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  value={phone}
                  type="number"
                  onChange={(e) => phoneFunc(e)}
                />
              </Form.Group>
            </Col>
            <Col>
              <FormInput
                label="Vendor Category"
                name="select"
                type="select"
                className="form-select"
                key="select"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
              >
                <option>no Selected</option>
                {vendorCategory?.map((val) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.title}
                    </option>
                  );
                })}
              </FormInput>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={toggleModal}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant={"success"}
            className="waves-effect waves-light  "
            onClick={addVendor}
          >
            Add Vendor
          </Button>
        </Modal.Footer>
      </Modal>
      {detail !== undefined ? (
        <EditVendorModal
          detail={detail}
          editModal={editModal}
          closeEdit={closeEdit}
        />
      ) : null}
    </>
  );
}
