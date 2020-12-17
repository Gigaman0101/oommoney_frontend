import React from 'react';
import { Modal } from 'antd';
import LoginForm from './LoginForm';

function LoginModal(props) {

    const { showLoginForm, setShowLoginForm } = props;

    const handleCancel = e => {
        console.log(e)
        setShowLoginForm(false);
    };

    return (
        <>
            <Modal
                // title="Basic Modal"
                visible={showLoginForm}
                onCancel={handleCancel}
                footer={null}
            >
                <LoginForm />
            </Modal>
        </>
    )
}

export default LoginModal
