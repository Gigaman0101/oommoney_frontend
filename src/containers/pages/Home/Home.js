import React, { useContext } from 'react'
import LoginModal from '../../../components/Login/LoginModal';
import UserContext from '../../../context/UserContext';
import './Home.css';

function Home() {

    const { showModal, showLoginForm, setShowLoginForm } = useContext(UserContext);

    return (
        <div style={{ backgroundColor: "salmon", height: "90vh", objectFit: "cover" }}>
            <section style={{ backgroundColor: "yellow", display: "flex", justifyContent: "center", height: "60vh", alignItems: "flex-end", }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ fontSize: "7.3vw", color: "pink" }}>OOM money</h1>
                    <button onClick={showModal}>เริ่มต้นใช้งาน</button>
                    <LoginModal showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm} showModal={showModal} />
                </div>
            </section>
        </div>
    )
}

export default Home
