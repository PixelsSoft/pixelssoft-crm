import { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { useParams, useSearchParams } from 'react-router-dom';
// import { Elements, useElements, useStripe, PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import './styles.css';
import { Col, Row, Card } from 'react-bootstrap';
import PSLogo from '../../../../assets/images/pixelssoft-logo-transparent.png';
import MaskedInput from 'react-text-mask';

// const stripePromise = loadStripe(
//     'pk_test_51NFDCqAO4wcA8VAjXBDOOaOqM3P0rS6iuf67ZhXKL2usSlfup4VUkQg23eZnWrDcGpG3sMdgYJRITs0u4NNWTMpE00zjYDx260'
// );

function CheckoutForm() {
    // const stripe = useStripe();
    // const elements = useElements();

    // const [email, setEmail] = useState( '' );
    // const [message, setMessage] = useState( null );
    // const [isLoading, setIsLoading] = useState( false );

    // useEffect(() => {
    //     if (!stripe) {
    //         return;
    //     }

    //     const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    //     if (!clientSecret) {
    //         return;
    //     }

    //     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //         switch (paymentIntent.status) {
    //             case 'succeeded':
    //                 setMessage('Payment succeeded!');
    //                 break;
    //             case 'processing':
    //                 setMessage('Your payment is processing.');
    //                 break;
    //             case 'requires_payment_method':
    //                 setMessage('Your payment was not successful, please try again.');
    //                 break;
    //             default:
    //                 setMessage('Something went wrong.');
    //                 break;
    //         }
    //     });
    // }, [stripe]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!stripe || !elements) {
    //         return;
    //     }

    //     setIsLoading(true);

    //     const { error } = await stripe.confirmPayment({
    //         elements,
    //         confirmParams: {
    //             return_url: 'http://localhost:3000/payment-success',
    //         },
    //     });

    //     if (error.type === 'card_error' || error.type === 'validation_error') {
    //         setMessage(error.message);
    //     } else {
    //         setMessage('An unexpected error occurred.');
    //     }

    //     setIsLoading(false);
    // };

    // const paymentElementOptions = {
    //     layout: 'tabs',
    // };

    // console.log(email);

    return (
        <form id="payment-form"
        // onSubmit={handleSubmit}
        >
            <div className="d-flex justify-content-center">
                <label className="h3" >Pay with Card</label> <br />
            </div>
            {/* <LinkAuthenticationElement id="link-authentication-element" onChange={(e) => setEmail(e.target.value)} />
            <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
            <div className="mb-2">
                <label className="form-label">Card Number</label> <br />
                <MaskedInput
                    mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,

                    ]}
                    placeholder="4242 4242 4242 4242"
                    className="form-control shadow-lg bg-body-tertiary rounded"

                />
            </div>
            <Row className="mb-2">
                <Col>
                    <label className="form-label">Expiration</label> <br />
                    <MaskedInput
                        mask={[
                            /[0-1]/,
                            /[0-9]/,
                            '/',
                            /\d/,
                            /\d/,
                        ]}
                        placeholder="MM/YY"
                        className="form-control shadow-lg bg-body-tertiary rounded"

                    />
                </Col>
                <Col>
                    <label className="form-label">CVC</label> <br />
                    <MaskedInput

                        mask={[
                            /\d/,
                            /\d/,
                            /\d/,
                        ]}
                        placeholder="123"
                        className="form-control shadow-lg bg-body-tertiary rounded"
                    />
                </Col>
            </Row>
            <button
                //  disabled={isLoading || !stripe || !elements}
                id="checkout-btn">
                <span id="button-text">
                    {
                        // isLoading ? <div className="spinner" id="spinner"></div> : 
                        'Pay now'}</span>
            </button>
            {/* Show any error or success messages */}
            {/* {message && <div id="payment-message">{message}</div>} */}
        </form>
    );
}

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState( '' );
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [invoiceDetails, setInvoiceDetails] = useState( {} );

    const appearance = {
        theme: 'stripe',
    };
    // eslint-disable-next-line
    const options = {
        clientSecret,
        appearance,
    };

    const amount = searchParams.get( 'amount' );
    const email = searchParams.get( 'email' );
    const fullName = searchParams.get( 'fullName' );
    const id = params.id;

    console.log( fullName );

    useEffect( () => {
        // Create PaymentIntent as soon as the page loads
        fetch( 'http://localhost:8001/api/v1/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { amount, id, email, fullName } ),
        } )
            .then( ( res ) => res.json() )
            .then( ( data ) => setClientSecret( data.data.clientSecret ) )
            .catch( ( err ) => console.log( err ) );
    }, [amount, id, email, fullName] );

    useEffect( () => {
        fetch( 'http://localhost:8001/api/v1/invoices/details/' + id )
            .then( ( res ) => res.json() )
            .then( ( data ) => setInvoiceDetails( data.data ) )
            .catch( ( err ) => console.log( err ) );
    }, [id] );

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <Card.Body

                            style={{ height: '100vh', }}
                        >
                            <Row className="align-items-center">
                                <Col>
                                    <img src={PSLogo} width={250} height={50} alt="" />
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <div className="d-flex align-items-end flex-column">
                                        <h2>Invoice</h2>
                                        <span style={{ fontWeight: 'bold' }}>Pixels Soft</span>
                                        <span className="text-end">pixelssoft22@gmail.com</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="border-bottom border-secondary my-3" />

                            <Row>
                                <Col>
                                    <div className="d-flex flex-column">
                                        <span style={{ fontWeight: 'bold' }}>Bill To:</span>
                                        <span>{invoiceDetails.customerName}</span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span style={{ fontWeight: 'bold' }}>Email:</span>
                                        <span>{invoiceDetails.customerEmail}</span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span style={{ fontWeight: 'bold' }}>Phone Number:</span>
                                        <span>{invoiceDetails.phoneNumber}</span>
                                    </div>
                                </Col>

                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <strong>Invoice #:</strong>
                                        <span style={{ marginLeft: 5 }}>
                                            {invoiceDetails.invoiceNumber ? invoiceDetails.invoiceNumber : '0000'}
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <strong>Invoice Date:</strong>
                                        <span style={{ marginLeft: 5 }}>{invoiceDetails.dueDate}</span>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <strong>Payment Due:</strong>
                                        <span style={{ marginLeft: 5 }}>{invoiceDetails.dueDate}</span>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <strong>Amount Due (USD):</strong>
                                        <span style={{ marginLeft: 5 }}>${invoiceDetails.total}</span>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="border-bottom border-gray my-3" />

                            <div
                                className="mt-3"
                            >
                                <Row className="my-2" style={{ height: '250px' }}>
                                    <div>
                                        <div className="d-flex flex-column">
                                            <strong>Item:</strong>
                                            <span>{invoiceDetails.projectCategory?.name}</span>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <strong>Description:</strong>
                                            <p style={{ width: '50%', whiteSpace: 'pre-wrap' }}>
                                                {invoiceDetails.description}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="d-flex mt-2 flex-column">
                                            </div> */}
                                </Row>
                                <Row className="border-bottom border-gray my-3" />
                                <div>
                                    <Row>
                                        <div className="d-flex flex-column align-items-end">
                                            <div>
                                                <strong>Total:</strong>
                                                <span style={{ marginLeft: 5 }}>${invoiceDetails.total}</span>
                                            </div>

                                            <div>
                                                <strong>Amount Due:</strong>
                                                <strong style={{ marginLeft: 5 }}>${invoiceDetails.total}</strong>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row className="mt-3 text-secondary p-1">
                                        <div>
                                            <span style={{ fontStyle: 'italic' }}>Notes:</span>
                                            <p style={{ whiteSpace: 'pre-wrap' }}>{invoiceDetails.memo}</p>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    {/* <div id="checkout-container"> */}
                    {/* {clientSecret && ( */}
                    {/* <Elements options={options} stripe={stripePromise}> */}
                    <CheckoutForm />
                    {/* </Elements> */}
                    {/* )} */}
                    {/* </div> */}
                </Col>
            </Row>
        </div>
    );
}
