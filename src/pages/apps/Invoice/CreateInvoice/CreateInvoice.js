import { Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
// import { getCustomers } from '../../../../redux/customers/actions';
// import { createInvoice, getInvoiceNumber, resetInvoice } from '../../../../redux/invoices/actions';
// import { getAllCategories } from '../../../../redux/projectCategories/actions';
import InvoicePreview from '../../../../components/InvoicePreview';
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
// import { CONSTANTS } from '../../../../constants/constant';
// import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { toast } from 'react-toastify';
import { AddInvoice } from '../../../../redux/Slices/Invoices/Invoices';
import { GetCategory } from '../../../../redux/Slices/Category/category';

const CreateInvoice = () => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [projectCategory, setProjectCategory] = useState(undefined);
    const [projectName, setProjectName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');
    const [memo, setMemo] = useState('');
    const [previewModal, setPreviewModal] = useState(false)
    const [detail, setDetail] = useState();
    const componentRef = useRef();

    const { token, user, category } = useSelector(
        (state) => ({
            token: state.Auth.token,
            user: state.Auth.user,
            category: state.Category.category
        })
    );

    const reset = () => {
        // setCustomer(undefined);
        // setCustomerId('');
        setCurrency('');
        setCustomerEmail('');
        setCustomerName('');
        setProjectName('');
        setAddress('');
        setPhoneNumber('');
        setPrice(0);
        setQuantity(1);
        setDescription('');
        setMemo('');
    };

    const toggle = () => setPreviewModal(!previewModal);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            created_by: user.id,
            invoice_date: invoiceDate,
            due_date: dueDate,
            title: projectName,
            quantity: quantity,
            price: price,
            currency_code: currency,
            description: description,
            notes: memo,
            email: customerEmail,
            name: customerName,
            phone: phoneNumber,
            category_id: projectCategory,
            platform: 'Facebook',
            address: address
        };

        if (!projectName || !price || !quantity || !currency || !customerEmail || !projectCategory) {
            toast.error('Enter all fields', { position: toast.POSITION.TOP_RIGHT });
            return;
        };

        dispatch(AddInvoice(data, token));
    };

    const handleSelectProjectCategory = (e) => {
        setProjectCategory(e.target.value);
    };

    const getCategory = async () => {
        dispatch(GetCategory(token));
    };

    const handleRedirect = () => {
        // Replace 'https://example.com' with the actual URL you want to redirect to
        window.location.href = 'https://crmupd.pixelssoft.com/invoice/MOe3GAkRFD6CW9Nz';
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Invoice", path: "/apps/invoice/" },
                    { label: "Create Invoice", path: "/apps/invoice/createInvoice", active: true },
                ]}
                title={"Create Invoice"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <h3 className="mb-3 mt-4">Customer Details</h3>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Select Customer (Auto Fill)</Form.Label>
                                        {/* <Form.Select defaultValue="Choose..." onChange={handleSelectCustomer}>
                                            <option value={undefined}>Choose...</option>
                                            {customers &&
                                                customers.map((customer: any, idx: number) => (
                                                    <option key={idx} value={customer._id}>
                                                        {customer.fullName}
                                                    </option>
                                                ))}
                                        </Form.Select> */}
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Invoice #</Form.Label>
                                        <Form.Control value={invoiceNumber ? invoiceNumber.data : '0000'} disabled /> 
                                    </Form.Group> */}
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Category</Form.Label>
                                        <Form.Select defaultValue="Choose..." onChange={handleSelectProjectCategory}>
                                            <option >Choose...</option>
                                            {category.map(val => {
                                                return (
                                                    <option key={val.id} value={val.id}>{val.title}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Currency</Form.Label>
                                        <Form.Select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                        >
                                            <option value={undefined}>Choose...</option>
                                            <option value="PKR">Pakistani Rupee (PKR)</option>
                                            <option value="GBP">UK Pound (GBP)</option>
                                            <option value="USD">US Dollars (USD)</option>
                                            <option value="EUR">Europe EURO (EUR)</option>
                                            <option value="CAD">Canadian Dollars (CAD)</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="1234 Main St"
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Invoice Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={invoiceDate}
                                            onChange={(e) => setInvoiceDate(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>

                                <div className="table-responsive">
                                    <Table className="mb-3">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>

                                                    <Form.Control
                                                        value={projectName}
                                                        onChange={(e) => setProjectName(e.target.value)}
                                                    />

                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        value={price}
                                                        onChange={(e) => setPrice(parseInt(e.target.value))}
                                                    />
                                                </td>
                                                <td>${quantity * price}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Row>
                                        <Col>
                                            <FormInput
                                                label="Description"
                                                type="textarea"
                                                name="textarea"
                                                // rows={5}
                                                containerClass={'mb-3'}
                                                // register={register}
                                                key="textarea"
                                                // errors={errors}
                                                // control={control}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </Col>
                                        <Col>
                                            <FormInput
                                                label="Memo / Notes"
                                                type="textarea"
                                                name="textarea"
                                                // rows={5}
                                                containerClass={'mb-3'}
                                                // register={register}
                                                key="textarea"
                                                value={memo}
                                                onChange={(e) => setMemo(e.target.value)}
                                            // errors={errors}
                                            // control={control}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                {/* {data && (
                                    <Alert variant="success" className="my-2">
                                        {data.message}
                                    </Alert>
                                )}

                                {data && (
                                    <Alert variant="info" className="my-2">
                                        Invoice share link: {data.data.shareLink}
                                    </Alert>
                                )}

                                {error && (
                                    <Alert variant="danger" className="my-2">
                                        {error}
                                    </Alert>
                                )} */}

                                <Row className="mt-3">
                                    <Col>
                                        <Button type="submit" className="waves-effect waves-light">
                                            Save
                                        </Button>
                                        <Button type="button" className="waves-effect waves-light mx-2" onClick={handleRedirect}>
                                            Generate Link
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={toggle}
                                            className="waves-effect waves-light"
                                            variant="outline-primary">
                                            Preview
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                            <InvoicePreview
                                previewModal={previewModal}
                                toggle={toggle}
                                componentRef={componentRef}
                                details={detail}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateInvoice;
