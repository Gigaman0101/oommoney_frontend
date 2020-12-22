import axios from '../../../config/axios';
import React, { useContext, useEffect, useState } from 'react'
import MyBag from '../../../components/MyBag/MyBag';
import UserContext from '../../../context/UserContext';

function MoneyBag() {

    const { bag, setBag, user } = useContext(UserContext);
    const [history, setHistory] = useState();

    const fetchHistory = async () => {
        const res = await axios.get("/transfer/history_money")
        setHistory(res.data);
    };

    const fetchBag = async () => {
        const res = await axios.get("/bags/money");
        setBag(res.data);
    }
    console.log(history);
    console.log(user);

    useEffect(() => {
        fetchHistory();
        fetchBag();
    }, [])

    return (
        <>
            <MyBag bag={bag} setBag={setBag} history={history} user={user} />
        </>
    )
}

export default MoneyBag
