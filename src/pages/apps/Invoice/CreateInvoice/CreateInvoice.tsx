import { usePageTitle, useRedux } from '../../../../hooks';
import { Row, Col, Card, Button, Form, Table, Alert } from 'react-bootstrap';
import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import { FormInput } from '../../../../components/form';
import { getCustomers } from '../../../../redux/customers/actions';
import { createInvoice, getInvoiceNumber, resetInvoice } from '../../../../redux/invoices/actions';
import { getAllCategories } from '../../../../redux/projectCategories/actions';
import InvoicePreview from '../../../../components/InvoicePreview';

const CreateInvoice = () => {
    const [previewModal, setPreviewModal] = useState(false);
    const [customer, setCustomer] = useState(undefined);
    const [customerId, setCustomerId] = useState('');

    const [currency, setCurrency] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [projectCategory, setProjectCategory] = useState<string | undefined>(undefined);
    const [projectName, setProjectName] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    const [price, setPrice] = useState(0);
    // const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');
    const [memo, setMemo] = useState('');

    const reset = () => {
        setCustomer(undefined);
        setCustomerId('');
        setCurrency('');
        setCustomerEmail('');
        setCustomerName('');
        setProjectName('');
        setAddress('');
        setAddress2('');
        setPhoneNumber('');
        setPrice(0);
        setQuantity(1);
        setDescription('');
        setMemo('');
    };

    const toggle = () => setPreviewModal(!previewModal);

    const componentRef = useRef(null);

    const { dispatch, appSelector } = useRedux();

    const { customers, categories, invoiceNumber, invoiceCreated, data, error } = appSelector((state) => ({
        customers: state.Customer.customers,
        categories: state.ProjectCategories.categories,
        invoiceNumber: state.Invoices.invoiceNumber,
        invoiceCreated: state.Invoices.invoiceCreated,
        data: state.Invoices.data,
        error: state.Invoices.error,
    }));

    usePageTitle({
        title: 'Create Invoice',
        breadCrumbItems: [
            {
                path: '/apps/invoice/create-invoice',
                label: 'Apps',
            },
            {
                path: '/apps/invoice/create-invoice',
                label: 'Create Invoice',
                active: true,
            },
        ],
    });

    const handleSelectCustomer: ChangeEventHandler<HTMLSelectElement> | undefined = (e) => {
        let found = customers.find((cust: any) => cust._id === e.target.value);
        setCustomer(found);
        setCustomerEmail(found.email);
        setCustomerId(found._id);
        setCustomerName(found.fullName);
        setPhoneNumber(found.phoneNumber);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(
            createInvoice({
                customerEmail,
                customerName,
                address,
                address2,
                phoneNumber,
                currency,
                amountDue: price,
                total: price,
                customer: customerId,
                quantity,
                invoiceDate,
                dueDate,
                invoiceNumber: invoiceNumber.data,
                memo,
                description,
                projectCategory,
            })
        );
    };

    const handleSelectProjectCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
        let found = categories.data?.find((category: any) => category._id === e.target.value);
        setProjectName(found.name);
        setProjectCategory(found._id);
    };

    useEffect(() => {
        if (invoiceCreated) {
            reset();
            dispatch(getInvoiceNumber());
        }
    }, [invoiceCreated, dispatch]);

    useEffect(() => {
        dispatch(getCustomers());
        dispatch(getAllCategories());
        dispatch(getInvoiceNumber());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetInvoice());
        };
    }, [dispatch]);

    console.log(customer);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Language</Form.Label>
                                        <Form.Select defaultValue="Choose...">
                                            <option>Choose...</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Currency</Form.Label>
                                        <Form.Select
                                            value={currency}
                                            defaultValue="Choose..."
                                            onChange={(e) => setCurrency(e.target.value)}>
                                            <option value={undefined}>Choose...</option>
                                            <option value="PKR">Pakistani Rupee (PKR)</option>
                                            <option value="USD">US Dollars (USD)</option>
                                            <option value="CAD">Canadian Dollars (CAD)</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <h3 className="mb-3 mt-4">Customer Details</h3>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Select Customer (Auto Fill)</Form.Label>
                                        <Form.Select defaultValue="Choose..." onChange={handleSelectCustomer}>
                                            <option value={undefined}>Choose...</option>
                                            {customers &&
                                                customers.map((customer: any, idx: number) => (
                                                    <option key={idx} value={customer._id}>
                                                        {customer.fullName}
                                                    </option>
                                                ))}
                                        </Form.Select>
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
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Invoice #</Form.Label>
                                        <Form.Control value={invoiceNumber ? invoiceNumber.data : '0000'} disabled />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Category</Form.Label>
                                        <Form.Select defaultValue="Choose..." onChange={handleSelectProjectCategory}>
                                            <option value={undefined}>Choose...</option>
                                            {categories &&
                                                categories.data?.map((category: { _id: string; name: string }) => (
                                                    <option value={category._id}>{category.name}</option>
                                                ))}
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

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Address 2</Form.Label>
                                    <Form.Control
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                        placeholder="Apartment, studio, or floor"
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
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Form.Select disabled value={projectName}>
                                                        <option>Choose...</option>
                                                    </Form.Select>
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
                                                <td>${price}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Row>
                                        <Col>
                                            <FormInput
                                                label="Description"
                                                type="textarea"
                                                name="textarea"
                                                rows={5}
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
                                                rows={5}
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
                                {data && (
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
                                )}

                                <Row className="mt-3">
                                    <Col>
                                        <Button type="submit" className="waves-effect waves-light">
                                            Send Email
                                        </Button>
                                        <Button type="button" className="waves-effect waves-light mx-2">
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
                                details={{
                                    customerName,
                                    customerEmail,
                                    invoiceNumber,
                                    invoiceDate,
                                    dueDate,
                                    price,
                                    memo,
                                    description,
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateInvoice;
