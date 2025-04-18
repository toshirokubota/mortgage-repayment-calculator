import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default function MortgageForm({ mortgage, setMortgage }) {

    const isCurrency = (n) => {
        // Check if the input is a positive number and at most 2 digits under decimal point. 
        if (!n || !n.trim()) return false; // undefined or empty

        n = Number(n);
        if (isNaN(n) || n < 0 || (n * 100) - Math.floor(n * 100) != 0) {
            return false;
        } else {
            return true;
        }
    }

    const isNaturalNumber = (n) => {
        // Check if the input is a positive integer 
        if (!n || !n.trim()) return false; // undefined or empty

        n = Number(n);
        if (isNaN(n) || !Number.isInteger(n) || n <= 0) {
            return false;
        }
        return true;
    }

    const isPercentage = (n) => {
        // Check if the input is a positive number 
        if (!n || !n.trim()) return false; // undefined or empty

        n = Number(n);
        if (isNaN(n) || n < 0) {
            return false;
        }
        return true;
    }

    function calculateMonthlyPayment(total, apr, year, repayment) {
        if (repayment) {
            const rate = apr / (12 * 100);
            const num_pays = year * 12;
            const Z = Math.pow(1.0 + rate, num_pays);
            return total * rate * Z / (Z - 1);
        } else {
            const rate = apr / (12 * 100);
            return total * rate;
        }
    }

    function calculateMortgage(formData) {
        // event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        // const data = Object.fromEntries(formData);
        // console.log(data)
        const amount = formData.get('amount');
        const term = formData.get('term');
        const rate = formData.get('rate');
        const type = formData.get('mortgageType');
        console.log(amount, term, rate, type);

        // const newMortgage = {
        //     total: parseFloat(data.amount),
        //     apr: parseFloat(data.rate),
        //     year: parseInt(data.term),
        //     repayment: data.mortgageType === 'repayment'
        // };
        // newMortgage.monthlyPayment = calculateMonthlyPayment(
        //     newMortgage.total, newMortgage.apr, newMortgage.year, newMortgage.repayment);
        // newMortgage.totalPayment = newMortgage.monthlyPayment * newMortgage.year * 12;
        // console.log(newMortgage);
        // setMortgage(newMortgage);

        // event.currentTarget.reset();
    }

    return (
        <div className="input-area">
            <header>
                <h1 className='font-headerS font-slate-900'>Mortgage Calculator</h1>
                <button className='clear-all font-bodyM font-slate-700'>Clear All</button>
            </header>
            <form action={calculateMortgage} className='mortgage-form'>
                <label>
                    <span className='font-bodyM font-slate-700'>Mortgage Amount</span>
                    <div className='input-wrapper input-amount'>
                        <span className='font-bodyL font-slate-700'>{"\u00A3"}</span>
                        <input type='text' name='amount' />
                    </div>
                </label>
                <label>
                    <span className='font-bodyM font-slate-700'>Mortgage Term</span>
                    <div className='input-wrapper input-term'>
                        <input type='text' name='term' />
                        <span className='font-bodyL font-slate-700'>years</span>
                    </div>
                </label>
                <label>
                    <span className='font-bodyM font-slate-700'>Interest Rate</span>
                    <div className='input-wrapper input-rate'>
                        <input type='text' name='rate' />
                        <span className='font-bodyL font-slate-700'>%</span>
                    </div>
                </label>
                <fieldset>
                    <legend className='font-bodyM font-slate-700'>Mortgage Type</legend>
                    <label>
                        <input type="radio" name="mortgageType" value="repayment"
                            className='font-bodyL font-slate-900' />
                        <span className='font-bodyL font-slate-900'>Repayment</span>
                    </label>
                    <label>
                        <input type="radio" name="mortgageType" value="interest-only"
                            className='font-bodyL font-slate-900' />
                        <span className='font-bodyL font-slate-900'>Interest only</span>
                    </label>
                </fieldset>

                <button className='font-bodyL font-slate-900'>
                    <div className='flex align-center justify-center'>
                        <img src='/assets/images/icon-calculator.svg' alt='calculator icon' />
                        <span>Calculate Repayments</span>
                    </div>
                </button>
            </form>
        </div>

    );
}
