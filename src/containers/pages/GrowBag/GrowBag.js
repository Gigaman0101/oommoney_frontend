import React, { useContext, useState, useEffect } from 'react'
import MyBag from '../../../components/MyBag/MyBag';
import axios from '../../../config/axios';
import UserContext from '../../../context/UserContext';


function GrowBag() {

    const { growBag, setGrowBag, user } = useContext(UserContext);
    const [historyGrow, setHistoryGrow] = useState();

    const fetchHistory = async () => {
        const res = await axios.get("/transfer/history_grow")
        setHistoryGrow(res.data);
    };

    const fetchBag = async () => {
        const res = await axios.get("/bags/grow");
        setGrowBag(res.data);
    }
    console.log('historyGrow:', historyGrow);
    console.log(growBag);
    console.log(user);

    useEffect(() => {
        fetchHistory();
        fetchBag();
    }, [])

    return (
        <>
            <MyBag growBag={growBag} setGrowBag={setGrowBag} historyGrow={historyGrow} user={user} />
        </>
    )
};

export default GrowBag
