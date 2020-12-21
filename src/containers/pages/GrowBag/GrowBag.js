import React, { useContext } from 'react'
import MyBag from '../../../components/MyBag/MyBag';
import UserContext from '../../../context/UserContext';

function GrowBag() {

    const { growBag, setGrowBag } = useContext(UserContext);

    return (
        <>
            <MyBag growBag={growBag} setGrowBag={setGrowBag} />
        </>
    )
};

export default GrowBag
