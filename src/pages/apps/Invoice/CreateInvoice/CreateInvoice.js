import { Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { useRef, useState } from 'react';
import InvoicePreview from '../../../../components/InvoicePreview';
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddInvoice, GetInvoice } from '../../../../redux/Slices/Invoices/Invoices';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import Spinner from '../../../../components/Spinner';
import utils from '../../../../utils/utils';

const CreateInvoice = () => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState( '' );
    const [customerEmail, setCustomerEmail] = useState( '' );
    const [customerName, setCustomerName] = useState( '' );
    const [projectCategory, setProjectCategory] = useState( undefined );
    const [projectName, setProjectName] = useState( '' );
    const [address, setAddress] = useState( '' );
    const [phoneNumber, setPhoneNumber] = useState( '' );
    const [invoiceDate, setInvoiceDate] = useState( '' );
    const [dueDate, setDueDate] = useState( '' );
    const [price, setPrice] = useState( 0 );
    const [quantity, setQuantity] = useState( 0 );
    const [description, setDescription] = useState( '' );
    const [memo, setMemo] = useState( '' );
    const [previewModal, setPreviewModal] = useState( false )
    const [detail, setDetail] = useState();
    const [country, setCountry] = useState( '' );
    const [generatedLink, setGeneratedLink] = useState( null );
    const componentRef = useRef();

    const { token, user, category, loading } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,
            user: state.Auth.user,
            category: state.Category.category,
            loading: state.utiltities.loading,
        } )
    );

    const reset = () => {
        setInvoiceDate( '' );
        setDescription( '' );
        setCurrency( '' );
        setDueDate( '' );
        setProjectName( '' );
        setMemo( '' );
        setCustomerEmail( '' );
        setCustomerName( '' );
        setPhoneNumber( '' );
        setCountry( '' );
        setAddress( '' );
        setQuantity( 0 )
        setPrice( 0 )
        setProjectCategory( undefined );
        setGeneratedLink( null )
    }

    const toggle = () => {
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
            address: address
        };
        setDetail( data );

        setPreviewModal( !previewModal );
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        dispatch( startLoading() );
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
            address: address,
            country: country
        };

        if ( !utils.validateEmail( customerEmail ) ) {
            toast.error( 'Enter correct email', { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return;
        }

        if ( !projectName || !address || !phoneNumber || !description || !customerName || !memo || !dueDate || !invoiceDate || !price || !quantity || !currency || !customerEmail || !projectCategory ) {
            toast.error( 'Enter all fields', { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return;
        };

        const response = await dispatch( AddInvoice( data, token, reset ) );
        console.log( response?.Link );
        handleRedirect( response?.Link )
        setGeneratedLink( response?.Link )
        await dispatch( GetInvoice( token ) )
        dispatch( stopLoading() );
    };

    const handleSelectProjectCategory = ( e ) => {
        setProjectCategory( e.target.value );
    };

    const handleRedirect = ( link ) => {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
        );

    };

    const changeQuant = ( e ) => {
        if ( e.target.value >= 1 ) {
            setQuantity( parseInt( e.target.value ) )
        };
    };

    const changePrice = ( e ) => {
        if ( e.target.value >= 1 ) {
            setPrice( parseInt( e.target.value ) )
        };
    };

    const numFunc = ( e ) => {
        if ( e.target.value >= 0 ) {
            setPhoneNumber( e.target.value )
        };
    };

    const dueDateFuc = ( e ) => {
        const selectedDate = new Date( e.target.value );
        const today = new Date();

        if ( selectedDate < today && selectedDate > invoiceDate ) {
            setDueDate( new Date().toLocaleDateString() );
            toast.error( 'Due date cannot be older than today.', { position: toast.POSITION.TOP_RIGHT } );
        } else {
            setDueDate( e.target.value );
        }
    }

    const invoiceFuc = ( e ) => {
        const selectedDate = new Date( e.target.value );
        const today = new Date();

        if ( selectedDate < today ) {
            // setInvoiceDate(new Date().toLocaleDateString());
            toast.error( 'Invoice date cannot be older than today.', { position: toast.POSITION.TOP_RIGHT } );
        } else {
            setInvoiceDate( e.target.value );
        }
    }

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
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
                                {generatedLink != null &&
                                    <Row>
                                        <Form.Label>Generated Link : {generatedLink}</Form.Label>
                                    </Row>
                                }

                                <Row>
                                    <h3 className="mb-3 mt-4">Customer Details</h3>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Select Customer (Auto Fill)</Form.Label>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Email"
                                            value={customerEmail}
                                            onChange={( e ) => setCustomerEmail( e.target.value )}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            value={customerName}
                                            onChange={( e ) => setCustomerName( e.target.value )}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Category</Form.Label>
                                        <Form.Select defaultValue="Choose..." onChange={handleSelectProjectCategory}>
                                            <option >Choose...</option>

                                            {category.map( val => {
                                                return (
                                                    <option key={val.id} value={val.id}>{val.title}</option>
                                                );
                                            } )}

                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Currency</Form.Label>
                                        <Form.Select
                                            value={currency}
                                            onChange={( e ) => setCurrency( e.target.value )}
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
                                        onChange={( e ) => setAddress( e.target.value )}
                                        placeholder="1234 Main St"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        value={country}
                                        onChange={( e ) => setCountry( e.target.value )}
                                        placeholder="america"
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type='phone'
                                            value={phoneNumber}
                                            onChange={( e ) => numFunc( e )}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Invoice Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={invoiceDate}
                                            onChange={( e ) => invoiceFuc( e )}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={dueDate}
                                            onChange={( e ) => dueDateFuc( e )}
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
                                                        onChange={( e ) => setProjectName( e.target.value )}
                                                    />

                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        value={quantity}
                                                        onChange={( e ) => changeQuant( e )}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        value={price}
                                                        onChange={( e ) => changePrice( e )}
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
                                                containerClass={'mb-3'}
                                                key="textarea"
                                                value={description}
                                                onChange={( e ) => setDescription( e.target.value )}
                                            />
                                        </Col>
                                        <Col>
                                            <FormInput
                                                label="Memo / Notes"
                                                type="textarea"
                                                name="textarea"
                                                containerClass={'mb-3'}
                                                key="textarea"
                                                value={memo}
                                                onChange={( e ) => setMemo( e.target.value )}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <Row className="mt-3">
                                    <Col>
                                        <Button type="submit" className="waves-effect waves-light">
                                            Save
                                        </Button>
                                        {/* <Button type="button" className="waves-effect waves-light mx-2" onClick={handleRedirect}>
                                            Generate Link
                                        </Button> */}
                                        <Button
                                            type="button"
                                            onClick={toggle}
                                            className="waves-effect waves-light mx-2"
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
