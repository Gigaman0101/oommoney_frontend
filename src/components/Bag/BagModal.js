import React, { useContext } from 'react';
import { Modal } from 'antd';
import UserContext from '../../context/UserContext';
import BagForm from './ฺBagForm';

function BagModal(props) {

    const { createGrow, setCreateGrow, createFun, setCreateFun } = useContext(UserContext);
    const { showBagForm, setShowBagForm } = props;

    const handleCancel = e => {
        console.log(e);
        setShowBagForm(false);
    };


    return (
        <>
            <Modal
                visible={showBagForm}
                onCancel={handleCancel}
                footer={null}
            >
                <h1>Hello</h1>
                <BagForm />
            </Modal>
        </>
    )
}

export default BagModal
