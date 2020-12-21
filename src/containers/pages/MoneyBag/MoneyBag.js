import React, { useContext } from 'react'
import MyBag from '../../../components/MyBag/MyBag';
import UserContext from '../../../context/UserContext';

function MoneyBag() {

    const { bag, setBag } = useContext(UserContext)

    return (
        <>
            <MyBag bag={bag} setBag={setBag} />
        </>
    )
}

export default MoneyBag
