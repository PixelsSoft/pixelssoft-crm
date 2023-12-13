import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Col } from 'react-bootstrap'
import FormInput from './FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleCustomer, UpdateCustomerAPI } from '../redux/Slices/Customer/customer'
import { toast } from 'react-toastify'
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities'
import Spinner from './Spinner'

const CustomerEditModal = ({ profileId, editUserModal, toggleClose }) => {
    const dispatch = useDispatch();

    const { token, SingleCustomer, plat, category, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            SingleCustomer: state.Customer.singleCustomer,
            plat: state.Platform.platform,
            category: state.Category.category,
            loading: state.utiltities.loading,
        })
    );

    const [name, setName] = useState(SingleCustomer?.name);
    const [email, setEmail] = useState(SingleCustomer?.email);
    const [phone, setPhone] = useState(SingleCustomer?.phone);
    const [title, setTitle] = useState(SingleCustomer?.project_title);
    const [paidAm, setPaidAm] = useState(SingleCustomer?.paid_amount);
    const [total, setTotal] = useState(SingleCustomer?.total_amount);
    const [platform, setPlatform] = useState(SingleCustomer?.platform)
    const [salePerson, setSalePerson] = useState(SingleCustomer?.category_id);

    const getSingleProfile = async () => {
        // dispatch(startLoading());
        await dispatch(GetSingleCustomer(profileId, token));
        // dispatch(stopLoading());
    };

    const update = async (e) => {
        // e.preventDefault();

        if (!email) {
            return toast.error('Enter Email', { position: toast.POSITION.TOP_RIGHT });
        };
        if (!platform) {
            return toast.error('Select Platform', { position: toast.POSITION.TOP_RIGHT });
        };
        if (!salePerson) {
            return toast.error('Select Project Category', { position: toast.POSITION.TOP_RIGHT });
        };

        const data = {
            email: email,
            name: name,
            phone: phone,
            project_title: title,
            paid_amount: paidAm,
            total_amount: total,
            platform: platform,
            category_id: salePerson
        };
        dispatch(startLoading());
        await dispatch(UpdateCustomerAPI(profileId, data, token, toggleClose));
        dispatch(stopLoading());
    }

    const selectPlat = (e) => {
        e.preventDefault();
        setPlatform(e.target.value);
    };

    const changeCat = (e) => {
        e.preventDefault();
        setSalePerson(e.target.value);
    };

    useEffect(() => {
        getSingleProfile();
    }, []);

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <Modal show={editUserModal} onHide={toggleClose} centered>
            <Modal.Header onHide={toggleClose} closeButton>
                <Modal.Title as="h4">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    label={'Name'}
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    containerClass={'mb-3'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormInput
                    label={'Email'}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    containerClass={'mb-3'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                    label={'Project Title'}
                    type="text"
                    name="company"
                    placeholder="Enter Project Title"
                    containerClass={'mb-3'}
                    value={title}
                    onChange={(e => setTitle(e.target.value))}
                />

                <FormInput
                    label={'Paid Amount'}
                    type="number"
                    name="paid"
                    placeholder="Enter Paid Amount"
                    containerClass={'mb-3'}
                    value={paidAm}
                    onChange={e => setPaidAm(e.target.value)}
                />

                <FormInput
                    label={'Total'}
                    type="number"
                    name="total"
                    placeholder="Enter Total Amount"
                    containerClass={'mb-3'}
                    value={total}
                    onChange={e => setTotal(e.target.value)}
                />

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Platform</Form.Label>
                    <Form.Select onChange={(e) => selectPlat(e)}>
                        <option>Choose...</option>
                        {plat.map(val => {
                            return (
                                <option key={val.id}>{val.title}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Project Category</Form.Label>
                    <Form.Select
                        onChange={(e) => changeCat(e)}
                    >
                        <option>Choose...</option>
                        {category.map(val => {
                            return (
                                <option key={val.id} value={val.id}>{val.title}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                <FormInput
                    label={'Phone #'}
                    type="text"
                    name="phone"
                    placeholder="Enter Phone #"
                    containerClass={'mb-3'}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <Button variant="dark" className="waves-effect waves-light me-1" type="submit" onClick={() => update()}>
                    Update
                </Button>
                <Button variant="danger" className="waves-effect waves-light" onClick={toggleClose}>
                    Cancel
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default CustomerEditModal