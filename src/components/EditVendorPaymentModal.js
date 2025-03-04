import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./FormInput";
import {
  startLoading,
  stopLoading,
} from "../redux/Slices/utiltities/Utiltities";
import { toast } from "react-toastify";
import { UpdateVendorPayment } from "../redux/Slices/VendorPayment/VendorPayment";

const EditVendorPaymentModal = ({editData, edit, toggleClose,  }) => {
  const { token, vendors, vendorCategory, single, banks } = useSelector(
    (state) => ({
      token: state.Auth.token,
      vendors: state.Vendor.vendors,
      vendorCategory: state.VendorCategory.venCat,
      single: state.VendorPayment.singleVendor,
      banks: state.Banks.banks,
    })
  );

  const dispatch = useDispatch();
  const [title, setTitle] = useState(editData?.title);
  const [desc, setDesc] = useState(editData?.description);
  const [amount, setAmount] = useState(editData?.amount);
  const [date, setDate] = useState(editData?.date);
  const [file, setFile] = useState(editData?.file);
  const [vendorId, setVendorId] = useState(editData?.vendor?.id);

  const [pay, setPay] = useState("Cash");
  const [bankId, setBankId] = useState(editData?.bank?.id);

  const HandleFileUpload = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const reset = () => {
    setTitle("");
    setDesc("");
    setAmount("");
    setDate("");
    setFile("");
    setVendorId("");

    toggleClose();
  };

  const numFunc = (e) => {
    if (e.target.value > 0) {
      setAmount(e.target.value);
    }
  };

  const updatePayment = async () => {
    if (
      (date === "" ||
        title === "" ||
        desc === "" ||
        amount === "" ||
        file === "" ||
        bankId === "" ||
        bankId === "no Selected",
      vendorId === "" || vendorId === "no Selected")
    ) {
      return toast.error("Enter all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const formdata = new FormData();

    formdata.append("id", editData?.id);
    formdata.append("title", title);
    formdata.append("payby", pay);
    formdata.append("date", date);
    formdata.append("description", desc);
    formdata.append("amount", amount);
    formdata.append("venor_id", vendorId);
    formdata.append("file", file);
    formdata.append("banks_id", bankId);
    dispatch(startLoading());
    await dispatch(UpdateVendorPayment(formdata, token, reset));
    dispatch(stopLoading());
  };

  return (
    <Modal size="lg" show={edit} onHide={toggleClose}>
      <Modal.Header closeButton>
        <h4 className="modal-title">Edit Vendor Payments</h4>
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
          onClick={toggleClose}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant={"success"}
          className="waves-effect waves-light"
          onClick={updatePayment}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVendorPaymentModal;
