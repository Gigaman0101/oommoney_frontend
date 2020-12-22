import { Button, Col, Row } from 'antd';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import LocalStorageService from '../../services/LocalStorageService';

function Navbar(props) {

    const { setRole, role } = useContext(UserContext);
    const history = useHistory();

    const onLogout = async () => {
        LocalStorageService.removeToken();
        setRole("GUEST");
        history.push("/");
    };

    const onMoney = () => {
        history.push("/money");
    }

    const ontransfer = () => {
        history.push("/transfer");
    }

    return (
        <Row justify="space-between" align="middle" style={{ padding: "0 100px", backgroundColor: "pink", height: "10vh" }}>
            <Col>
                <div style={{ fontSize: "2.5rem", color: "plum" }}>
                    <Link to="/" style={{ color: "tomato" }}>OOM money</Link>
                </div>
            </Col>
            <Col style={{ fontSize: "20px" }}>
                {role === "USER" ? <button onClick={onMoney} style={{ marginRight: "5px" }}>Home</button> : null}
                {role === "USER" ? <button onClick={ontransfer} style={{ marginRight: "5px" }}>โอนเงิน</button> : null}
                {role === "USER" ? <button onClick={onLogout} style={{ marginRight: "5px" }}>Logout</button>
                    : <button onClick={props.showModal}>Login</button>}
            </Col>

        </Row>
    )
}

export default Navbar
