// import { useState } from 'react'
// import { Link } from 'react-router-dom'
//import './App.css'
import empty_illustration from "../../public/assets/images/illustration-empty.svg"

export default function CalculationResult({payment}) {

    // Formatting the number as British currency
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    function EmptyCard() {
        return(
            <div className="empty-card">
                <img src={empty_illustration} alt="no result yet"/>
                <h2 className='font-HeaderS font-white'>
                    Results shown here
                </h2>
                <p className='font-bodyM font-slate-300'>
                    Complete the form and click “calculate repayments” to see what 
                your monthly repayments would be.
                </p>
            </div>
        )
    }
    function CalculationResultCard({payment}) {
        return (
        <>
            <h2 className='font-HeaderS font-white'>Your results</h2>
            <p className='font-bodyM font-slate-300'>
                Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click “calculate repayments” again. 
            </p>
            <div className='result-card'>
                <h3 className='font-bodyM font-slate-300'>Your monthly repayments</h3>
                <p  className='font-headerL font-lime'>
                    {formatter.format(payment.monthlyPayment)}
                </p>
                <hr/>
                <h3 className='font-bodyM font-slate-300'>Total you'll repay over the term</h3>
                <p  className='font-headerS font-white'> 
                    {formatter.format(payment.totalPayment)}
                </p>
            </div>
        </>
        );
    }

    return (
        <div className='result-area'>
            {
                payment.monthlyPayment > 0 ? 
                <CalculationResultCard payment={payment} /> 
                :
                <EmptyCard />
            }
        </div>
    );
}
