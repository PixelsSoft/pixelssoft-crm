import { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { EditExpense } from '../redux/Slices/Expense/expense';

const EditExpenseModal = ({ visibleModal, toggleModal }) => {

    const { expenseCategory, token, singleExpense } = useSelector(
        (state) => ({
            token: state.Auth.token,
            expenseCategory: state.ExpenseCategory.expenseCategory,
            singleExpense: state.Expense.singleExpense,
        })
    );

    const dispatch = useDispatch();
    const [title, setTitle] = useState(singleExpense?.title);
    const [amount, setAmount] = useState(singleExpense?.amount);
    const [file, setFile] = useState(singleExpense?.file);
    const [inDate, setInDate] = useState(singleExpense?.invoice_date);
    const [catId, setCatId] = useState(singleExpense?.expense_category_id);
    const [pay, setPay] = useState(singleExpense?.pay_by);

    const editEx = async () => {
        const formData = new FormData();
        formData.append("invoice_date", inDate);
        formData.append("title", title);
        formData.append("amount", amount);
        formData.append("expense_category_id", catId);
        formData.append("pay_by", pay);
        formData.append("file", file);
        dispatch(startLoading());
        await dispatch(EditExpense(singleExpense?.id, formData, token, reset));
        dispatch(stopLoading());
        toggleModal();
    };

    const reset = () => {
        setInDate();
        setTitle();
        setAmount();
        setCatId();
        setPay();
        setFile();
    };

    const HandleFileUpload = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFile(file);
        };
    };

    return (
        <Modal size="lg" show={visibleModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <h4 className="modal-title">Edit Expense</h4>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Row className='mb-3'>
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
                    <Col >
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type='number'
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
                            {expenseCategory?.map(val => {
                                return (
                                    <option key={val.id} value={val.id}>{val.name}</option>
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
                    onClick={editEx}
                >
                    Update Expense
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EditExpenseModal