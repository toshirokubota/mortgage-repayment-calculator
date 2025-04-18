import { useState } from 'react'
import { Link } from 'react-router-dom'
//import './App.css'

export default function CalculationResult({mortgage}) {

    // Formatting the number as British currency
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });
//   const formattedValue = formatter.format(1234567.89); // £1,234,567.89
//   console.log(formattedValue);

    function EmptyCard() {
        return(
            <>
                <img src="/assets/images/illustration-empty.svg" alt="no result yet"/>
                <h2 className='font-HeaderS font-white'>
                    Results shown here
                </h2>
                <p className='font-bodyM font-slate-300'>
                    Complete the form and click “calculate repayments” to see what 
                your monthly repayments would be.
                </p>
            </>
        )
    }
    function CalculationResultCard({mortgage}) {
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
                    {formatter.format(mortgage.monthlyPayment)}
                </p>
                <hr/>
                <h3 className='font-bodyM font-slate-300'>Total you'll repay over the term</h3>
                <p  className='font-headerS font-white'> 
                    {formatter.format(mortgage.totalPayment)}
                </p>
            </div>
        </>
        );
    }

    return (
        <div className='result-area'>
            {
                mortgage.total > 0 ? 
                <CalculationResultCard mortgage={mortgage} /> 
                :
                <EmptyCard />
            }
        </div>
    );
}
