import React, { useContext } from 'react';
import MyBag from '../../../components/MyBag/MyBag';
import UserContext from '../../../context/UserContext';

function FunBag() {

    const { funBag, setFunBag } = useContext(UserContext);

    return (
        <>
            <MyBag funBag={funBag} setFunBag={setFunBag} />
        </>
    )
}

export default FunBag
