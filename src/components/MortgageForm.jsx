import { useState } from 'react'
// import { Link } from 'react-router-dom'
import icon_calculator from "../../public/assets/images/icon-calculator.svg"
import '../App.css'

export default function MortgageForm({ payment, setPayment }) {
    const [amount, setAmount] = useState(0);
    const [term, setTerm] = useState(0);
    const [apr, setApr] = useState(0);
    const [mortgageType, setMortgageType] = useState(null);

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

    function handleSubmit(event) {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        // const data = Object.fromEntries(formData);
        // console.log(data)
        // const amount = formData.get('amount');
        // const term = formData.get('term');
        // const rate = formData.get('rate');
        // const type = formData.get('mortgageType');

        // const newMortgage = {
        //     total: parseFloat(amount),
        //     apr: parseFloat(rate),
        //     year: parseInt(term),
        //     repayment: type === 'repayment'
        // };

        console.log(amount, term, apr, mortgageType);
        const monthlyPayment = calculateMonthlyPayment(amount, apr, term, mortgageType);
        const totalPayment = monthlyPayment * term * 12;
        console.log(monthlyPayment, totalPayment);
        setPayment({monthlyPayment, totalPayment});

        // event.currentTarget.reset();
    }

    function clearForm() {
        setAmount(0);
        setApr(0);
        setTerm(0);
        setMortgageType('');
        setPayment({monthlyPayment: 0, totalPayment: 0});
    }

    return (
        <div className="input-area">
            <header>
                <h1 className='font-headerS font-slate-900'>Mortgage Calculator</h1>
                <button onClick={clearForm}
                className='clear-all font-bodyM font-slate-700'>Clear All</button>
            </header>
            <form onSubmit={handleSubmit} className='mortgage-form'>
                <label>
                    <span className='font-bodyM font-slate-700'>Mortgage Amount</span>
                    <div className='input-wrapper input-amount'>
                        <span className='font-bodyL font-slate-700'>{"\u00A3"}</span>
                        <input type='text' name='amount' value={amount}
                            onChange={e => setAmount(e.target.value)} />
                    </div>
                </label>
                <div className='input-subcontainer flex flex-column'>
                    <label>
                        <span className='font-bodyM font-slate-700'>Mortgage Term</span>
                        <div className='input-wrapper input-term'>
                            <input type='text' name='term' value={term}
                                onChange={e => setTerm(e.target.value)}/>
                            <span className='font-bodyL font-slate-700'>years</span>
                        </div>
                    </label>
                    <label>
                        <span className='font-bodyM font-slate-700'>Interest Rate</span>
                        <div className='input-wrapper input-rate'>
                            <input type='text' name='rate'  value={apr} 
                                onChange={e => setApr(e.target.value)}/>
                            <span className='font-bodyL font-slate-700'>%</span>
                        </div>
                    </label>
                </div>
                <fieldset>
                    <legend className='font-bodyM font-slate-700'>Mortgage Type</legend>
                    <label className={mortgageType=='repayment' ? 'checked': ''}>
                        <input type="radio" name="mortgageType" value="repayment"
                            className='font-bodyL font-slate-900'
                            onChange={e => setMortgageType(e.target.value)}
                            checked={mortgageType=='repayment'}/>
                        <span className='font-bodyL font-slate-900'>Repayment</span>
                    </label>
                    <label className={mortgageType=='interest-only' ? 'checked': ''}>
                        <input type="radio" name="mortgageType" value="interest-only"
                            className='font-bodyL font-slate-900'   
                            onChange={e => setMortgageType(e.target.value)}
                            checked={mortgageType=='interest-only'}/>
                        <span className='font-bodyL font-slate-900'>Interest only</span>
                    </label>
                </fieldset>

                <button className='font-bodyL font-slate-900'>
                    <div className='flex align-center justify-evenly'>
                        <img src={icon_calculator} alt='calculator icon' />
                        <span>Calculate Repayments</span>
                    </div>
                </button>
            </form>
        </div>

    );
}
