import { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePlatform, UpdatePlatform } from '../redux/Slices/Platform/platform';
import { DeleteCategory, UpdateCategory } from '../redux/Slices/Category/category';

const ButtonComp = ({ id, title, plat }) => {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(title);

    const { token } = useSelector(
        (state) => ({
            token: state.Auth.token,
        })
    );

    const updateFunc = () => {
        if (plat === 1) {
            const data = {
                title: name,
            };
            dispatch(UpdatePlatform(id, data, token));
        } else {
            const data = {
                title: name
            };
            dispatch(UpdateCategory(id, data, token));
        };
        setEdit(!edit)
    };

    const deleteFunc = () => {
        if (plat === 1) {
            dispatch(DeletePlatform(id, token));
        } else {
            dispatch(DeleteCategory(id, token));
        };
    }

    return (
        <ButtonGroup
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ marginRight: 5, marginBottom: 5 }}
        >
            {!edit ? (
                <>
                    <Button
                        variant="secondary"
                        style={{ width: hovered ? '150px' : 'auto', transition: 'width 0.3s ease-in-out' }}
                    >
                        {title}
                    </Button>
                    {hovered && (
                        <ButtonGroup>
                            <Button variant="warning" onClick={() => setEdit(!edit)}>Edit</Button>
                            <Button variant="danger" onClick={() => deleteFunc()}>Delete</Button>
                        </ButtonGroup>
                    )}
                </>
            ) : (
                <>
                    <FormInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="Name"
                        placeholder="Name"
                        key="desc"
                    />
                    <Button variant="warning" onClick={() => updateFunc()}>Update</Button>
                </>
            )}
        </ButtonGroup>
    )
}

export default ButtonComp;