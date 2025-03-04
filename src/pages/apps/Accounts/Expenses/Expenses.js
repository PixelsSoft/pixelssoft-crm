import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { FormInput } from "../../../../components";
import PageTitle from "../../../../components/PageTitle";
import Table from "../../../../components/Table";
import Spinner from "../../../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/Slices/utiltities/Utiltities";
import {
  AddExpense,
  DeleteExpense,
  EditExpense,
  GetExpense,
  GetExpenseById,
} from "../../../../redux/Slices/Expense/expense";
import { Link } from "react-router-dom";
import EditExpenseModal from "../../../../components/EditExpenseModal";
import { CONSTANTS } from "../../../../constants/constant";
import ViewExpense from "../../../../components/ViewExpense";
import { GetExpenseCategory } from "../../../../redux/Slices/ExpenseCategory/expenseCategory";
import { GetBanks } from "../../../../redux/Slices/Bank/banks";

export default function Expenses() {
  const { expenseCategory, loading, token, expenses, banks } = useSelector(
    (state) => ({
      token: state.Auth.token,
      loading: state.utiltities.loading,

      expenseCategory: state.ExpenseCategory.expenseCategory,
      expenses: state.Expense.expense,
      banks: state.Banks.banks,
    })
  );

  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [exModal, setExModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [inDate, setInDate] = useState("");
  const [catId, setCatId] = useState("");
  const [bankId, setBankId] = useState("");
  const [bankName, setBankName] = useState("");
  const [ExpCatName, setExpCatName] = useState("");
  const [pay, setPay] = useState("Cash");

  const [selectedId, setSelectedId] = useState("");

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const fetchExpense = async () => {
    try {
      dispatch(startLoading());

      await dispatch(GetExpense(token));
      await dispatch(GetBanks(token));
      await dispatch(GetExpenseCategory(token));
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    fetchExpense();
  }, []);

  /* action column render */
  const ActionColumn = ({ item }) => {
    return (
      <React.Fragment>
        <Link className="action-icon" onClick={() => ViewExpenseFunc(item)}>
          {" "}
          <i className="mdi mdi-eye"></i>
        </Link>
        <Link className="action-icon" onClick={() => toggleEdit(item)}>
          {" "}
          <i className="mdi mdi-square-edit-outline"></i>
        </Link>
        <Link className="action-icon" onClick={() => deleteExpense(item)}>
          {" "}
          <i className="mdi mdi-delete"></i>
        </Link>
      </React.Fragment>
    );
  };

  const ViewExpenseFunc = async (item) => {
    setTitle(item?.title);
    setInDate(item?.date);
    setDescription(item?.description);
    setExpCatName(item?.expenseCategory?.title);
    setBankName(item?.bank?.title);
    setAmount(item?.amount);
    setPay(item?.payby);

    setOpenView(!openView);
  };

  const deleteExpense = async (item) => {
    dispatch(startLoading());
    await dispatch(DeleteExpense(item?.id, token));
    dispatch(stopLoading());
  };

  const editEx = async (item) => {
    dispatch(startLoading());
    const formData = new FormData();
    formData.append("title", title);
    formData.append("payby", pay);
    formData.append("date", inDate);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("file", file);
    formData.append("expense_id", catId);
    formData.append("banks_id", bankId);
    await dispatch(EditExpense(selectedId, formData, token));
    dispatch(stopLoading());
    setExModal(!exModal);
  };

  const toggleEdit = (item) => {
    setSelectedId(item?.id);
    setTitle(item?.title);
    setInDate(item?.date);
    setDescription(item?.description);
    setCatId(item?.expenseCategory?.id);
    setBankId(item?.bank?.id);
    setAmount(item?.amount);
    setPay(item?.payby);
    setExModal(!exModal);
  };

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
      Header: "Amount",
      accessor: "amount",
      sort: false,
    },
    {
      Header: "description",
      accessor: "description",
      sort: false,
    },

    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => <ActionColumn item={row.original} />,
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
  ];

  const HandleFileUpload = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const addExpense = async () => {
    if (
      inDate === undefined ||
      title === undefined ||
      amount === undefined ||
      catId === undefined ||
      pay === undefined ||
      file === undefined
    ) {
      toast.error("Enter all fields", { position: toast.POSITION.TOP_RIGHT });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("payby", pay);
    formData.append("date", inDate);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("file", file);
    formData.append("expense_id", catId);
    formData.append("banks_id", bankId);
    dispatch(startLoading());

    dispatch(AddExpense(formData, token));
    dispatch(stopLoading());

    reset();

    toggleModal();
  };

  const reset = () => {
    setInDate("");
    setTitle("");
    setDescription("");
    setAmount("");
    setCatId("");
    setBankName("");
    setExpCatName("");
    setBankId("");
    setPay("");
    setFile("");
  };

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle title={"Expense"} />
      <Row>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <FormInput
                  label="Expense Category"
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
                  className="waves-effect waves-light px-5 "
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
            {expenses !== undefined && expenses !== null ? (
              <Table
                columns={columns}
                data={expenses}
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
      {/* ========================= add Expense Modal============ */}
      <Modal size="lg" show={visibleModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <h4 className="modal-title">Add Expense</h4>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Invoice Date</Form.Label>
                <Form.Control
                  type="date"
                  value={inDate}
                  onChange={(e) => setInDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
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
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                />
              </Form.Group>
            </Col>
            <Col>
              <FormInput
                label="Expense Category"
                name="select"
                type="select"
                className="form-select"
                key="select"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
              >
                <option>no Selected</option>
                {expenseCategory?.map((val) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.title}
                    </option>
                  );
                })}
              </FormInput>
            </Col>
          </Row>
          <Row>
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
            onClick={addExpense}
          >
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ========================= View Expense Modal============ */}
      <Modal
        size="lg"
        show={openView}
        onHide={() => {
          reset();
          setOpenView(false);
        }}
      >
        <Modal.Header closeButton>
          <h4 className="modal-title">View Expense Details</h4>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Invoice Date : </Form.Label>
                <Form.Label>{inDate}</Form.Label>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Title : </Form.Label>
                <Form.Label>{title}</Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label>Bank : </Form.Label>
              <Form.Label>{bankName}</Form.Label>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Description : </Form.Label>
                <Form.Label>{description}</Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Amount : </Form.Label>
                <Form.Label>{amount}</Form.Label>
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Expense Category : </Form.Label>
              <Form.Label>{ExpCatName}</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Pay By : </Form.Label>
              <Form.Label>{pay}</Form.Label>
            </Col>

            {/* <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Upload File</Form.Label>
                <FormInput
                  type="file"
                  name="file"
                  key="file"
                  onChange={HandleFileUpload}
                />
              </Form.Group>
            </Col> */}
          </Row>
        </Modal.Body>
      </Modal>
      {/* ========================= Edit Expense Modal============ */}
      <Modal
        size="lg"
        show={exModal}
        onHide={() => {
          setExModal(false);
          reset();
        }}
      >
        <Modal.Header closeButton>
          <h4 className="modal-title">Edit Expense</h4>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Invoice Date</Form.Label>
                <Form.Control
                  type="date"
                  value={inDate}
                  onChange={(e) => setInDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
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
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                />
              </Form.Group>
            </Col>
            <Col>
              <FormInput
                label="Expense Category"
                name="select"
                type="select"
                className="form-select"
                key="select"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
              >
                <option>no Selected</option>
                {expenseCategory?.map((val) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.title}
                    </option>
                  );
                })}
              </FormInput>
            </Col>
          </Row>
          <Row>
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
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => {
              setExModal(false);
              reset();
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant={"success"}
            className="waves-effect waves-light  "
            onClick={editEx}
          >
            Edit Expense
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
