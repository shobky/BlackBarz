import React from 'react'

import MonthlyTable from '../../components/monthlyPayments/MonthlyTable'
import Nav from '../../components/nav/Nav'
import './payments.css'

const Payments = () => {


    return (
        <div className='payments'>
            <Nav />
            <div className='payments_container'>
                <header>
                    <h1 className='payments_head'>Payments</h1>
                </header>
                <div className='payment_table_container'>
                    <MonthlyTable />
                </div>
            </div>
        </div>
    )
}

export default Payments