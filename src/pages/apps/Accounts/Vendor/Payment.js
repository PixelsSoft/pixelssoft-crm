import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { FormInput } from "../../../../components";
import PageTitle from "../../../../components/PageTitle";
import Table from "../../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/Slices/utiltities/Utiltities";
import { Link } from "react-router-dom";
import {
  AddVendorPayment,
  DeleVendorPayment,
  GetVendorById,
  GetVendorPayments,
} from "../../../../redux/Slices/VendorPayment/VendorPayment";
import EditVendorPaymentModal from "../../../../components/EditVendorPaymentModal";
import { GetVenCat } from "../../../../redux/Slices/VendorCategory/VendorCategory";
import { GetVendor } from "../../../../redux/Slices/Vendor/Vendor";
import { GetBanks } from "../../../../redux/Slices/Bank/banks";

export default function Payments() {
  const { vendorPay, token, loading, vendors, vendorCategory, banks } =
    useSelector((state) => ({
      token: state.Auth.token,
      loading: state.utiltities.loading,
      vendors: state.Vendor.vendors,
      vendorCategory: state.VendorCategory.venCat,
      vendorPay: state.VendorPayment.vendorPayments,
      banks: state.Banks.banks,
    }));

  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [vendorId, setVendorId] = useState("");

  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [id, setId] = useState();
  const [pay, setPay] = useState("Cash");
  const [bankId, setBankId] = useState("");

  const reset = () => {
    setTitle("");
    setDesc("");
    setAmount("");
    setDate("");
    setCategory("");
    setFile("");
    setVendorId("");

    setVisibleModal(false);
    setId();
  };

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const toggleClose = () => {
    setEditData();
    setEdit(!edit);

    setId();
  };

  const fetchBankAndCategory = async () => {
    try {
      dispatch(startLoading());
      await dispatch(GetBanks(token));
      await dispatch(GetVendorPayments(token));
      await dispatch(GetVendor(token));
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchBankAndCategory();
  }, []);

  const columns = [
    {
      Header: "Date",
      accessor: "date",
      sort: false,
    },
    {
      Header: "Title",
      accessor: "title",
      sort: false,
    },
    {
      Header: "vendor",
      accessor: "vendor.name",
      sort: false,
    },
    {
      Header: "Amount",
      accessor: "amount",
      sort: false,
    },

    {
      Header: "Bank",
      accessor: "bank.title",
      sort: false,
    },
    // {
    //     Header: 'file',
    //     accessor: 'file',
    //     sort: false,
    // },
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

  const editFunc = async (data) => {
    setEditData(data);
    // setId(data?.id);
    setEdit(!edit);
  };

  const deleteFunc = async (id) => {
    dispatch(startLoading());
    await dispatch(DeleVendorPayment(id, token));
    dispatch(stopLoading());
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

  const HandleFileUpload = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const createPayment = async () => {
    if (
      date === "" ||
      title === "" ||
      desc === "" ||
      amount === "" ||
      bankId === "" ||
      bankId === "no Selected" ||
      vendorId === "" ||
      vendorId === "no Selected"
    ) {
      return toast.error("Enter all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("payby", pay);
    formdata.append("date", date);
    formdata.append("description", desc);
    formdata.append("amount", amount);
    formdata.append("venor_id", vendorId);
    formdata.append("file", file);
    formdata.append("banks_id", bankId);

    dispatch(startLoading());
    await dispatch(AddVendorPayment(formdata, token, reset));
    dispatch(stopLoading());
  };

  const numFunc = (e) => {
    if (e.target.value > 0) {
      setAmount(e.target.value);
    }
  };

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle title={"Vendor Payments"} />
      <Row>
        <Card>
          <Card.Body>
            <Row>
              <Col lg={4}>
                <FormInput
                  label="Vendor"
                  name="select"
                  type="select"
                  className="form-select"
                  key="select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option>no Selected</option>
                </FormInput>
              </Col>
              <Col lg={2}>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={2}>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <FormInput
                  label="Vendor Category"
                  name="select"
                  type="select"
                  className="form-select"
                  key="select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option>no Selected</option>
                </FormInput>
              </Col>
              <Col style={{ alignSelf: "end" }}>
                <Button
                  onClick={toggleModal}
                  variant={"info"}
                  className="waves-effect waves-light "
                >
                  Filter
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
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

            {vendorPay !== undefined && vendorPay !== null ? (
              <Table
                columns={columns}
                data={vendorPay}
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
      <Modal size="lg" show={visibleModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <h4 className="modal-title">Add Vendor Payments</h4>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <FormInput
                label="Vendor"
                name="select"
                type="select"
                className="form-select"
                key="select"
                value={vendorId}
                onChange={(e) => {
                  setVendorId(e.target.value);
                }}
              >
                <option>no Selected</option>
                {vendors?.map((val) => {
                  return (
                    <option value={val?.id} key={val?.id}>
                      {val?.name}
                    </option>
                  );
                })}
              </FormInput>
            </Col>
            <Col>
              <FormInput
                label="Bank"
                name="select"
                type="select"
                className="form-select"
                key="select"
                value={bankId}
                onChange={(e) => setBankId(e.target.value)}
              >
                <option>no Selected</option>
                {banks?.map((val) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.title}
                    </option>
                  );
                })}
              </FormInput>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  value={amount}
                  type="number"
                  onChange={(e) => numFunc(e)}
                />
              </Form.Group>
            </Col>
            <Col>
              <FormInput
                label="Pay by"
                name="select"
                type="select"
                className="form-select"
                key="select"
                value={pay}
                onChange={(e) => setPay(e.target.value)}
              >
                <option>Cash</option>
                <option>Online</option>
                <option>Card</option>
              </FormInput>
            </Col>
          </Row>
          <FormInput
            label="Description"
            type="textarea"
            name="textarea"
            containerClass={"mb-3"}
            key="textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Col>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Upload File</Form.Label>
              <FormInput
                type="file"
                name="file"
                key="file"
                onChange={HandleFileUpload}
              />
            </Form.Group>
          </Col>
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
            className="waves-effect waves-light"
            onClick={createPayment}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {editData !== undefined ? (
        <EditVendorPaymentModal
          editData={editData}
          edit={edit}
          toggleClose={toggleClose}
        />
      ) : null}
    </>
  );
}
