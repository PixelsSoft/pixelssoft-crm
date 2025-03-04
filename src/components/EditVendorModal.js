import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../redux/Slices/utiltities/Utiltities";
import { toast } from "react-toastify";
import utils from "../utils/utils";
import { UpdateVendor } from "../redux/Slices/Vendor/Vendor";
import FormInput from "./FormInput";

const EditVendorModal = ({ detail, editModal, closeEdit }) => {
  const { token ,vendorCategory} = useSelector((state) => ({
    token: state.Auth.token,
    vendorCategory: state.VendorCategory.venCat,

  }));

  const dispatch = useDispatch();
  const [name, setName] = useState(detail?.name);
  const [email, setEmail] = useState(detail?.email);
  const [phone, setPhone] = useState(detail?.phoneNo);
  const [catId, setCatId] = useState(detail?.Vendor_category_id);



  const phoneFunc = (e) => {
    if (e.target.value > 0) {
      setPhone(e.target.value);
    }
  };

  const editVendor = async () => {
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
    formdata.append("id", detail?.id);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phoneNo", phone);
    formdata.append("vendor_category_id", catId);
    dispatch(startLoading());
    await dispatch(UpdateVendor(formdata, token, closeEdit));
    dispatch(stopLoading());
  };

  return (
    <Modal show={editModal} onHide={closeEdit}>
      <Modal.Header closeButton>
        <h4 className="modal-title">Edit Vendor</h4>
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
          onClick={closeEdit}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant={"success"}
          className="waves-effect waves-light  "
          onClick={editVendor}
        >
          Update Vendor
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVendorModal;
