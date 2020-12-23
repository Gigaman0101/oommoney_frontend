import React, { useContext, useState, useEffect } from 'react';
import MyBag from '../../../components/MyBag/MyBag';
import UserContext from '../../../context/UserContext';
import axios from '../../../config/axios';

function FunBag() {

    const { funBag, setFunBag, user } = useContext(UserContext);
    const [historyFun, setHistoryFun] = useState();
console.log(funBag)
    const fetchHistory = async () => {
        const res = await axios.get("/transfer/history_fun")
        setHistoryFun(res.data);
    };

    // const fetchBag = async () => {
    //     const res = await axios.get("/bags/fun");
    //     setFunBag(res.data);
    // }
    console.log('historyFun:', historyFun);
    console.log(funBag);
    console.log(user);

    useEffect(() => {
        fetchHistory();
        // fetchBag();
    }, [])

    return (
        <>
            <MyBag funBag={funBag} setFunBag={setFunBag} historyFun={historyFun} user={user} />
        </>
    )
}

export default FunBag
