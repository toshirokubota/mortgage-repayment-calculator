import { useState } from 'react'
// import { Link } from 'react-router-dom'
import icon_calculator from "../../public/assets/images/icon-calculator.svg"
import '../App.css'
import { isEmpty, isCurrency, isPositive, isNaturalNumber } from '../Utils.jsx';

export default function MortgageForm({ payment, setPayment }) {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [apr, setApr] = useState('');
    const [mortgageType, setMortgageType] = useState('');
    const [errorAmount, setErrorAmount] = useState('none');
    const [errorApr, setErrorApr] = useState('none');
    const [errorTerm, setErrorTerm] = useState('none');
    const [errorType, setErrorType] = useState('none');

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

    function validateAmount(amount) {
        if(isEmpty(amount)) {
            setErrorAmount('This field is required');
        } else if(!isCurrency(amount)) {
            setErrorAmount('Provide a valid currency value');
        } else {
            setErrorAmount('none');
        }
    }

    function validateAPR(apr) {
        if(isEmpty(apr)) {
            setErrorApr('This field is required');
        } else if(!isPositive(apr)) {
            setErrorApr('Provide a valid percentage value');
        } else {
            setErrorApr('none');
        }
    }
    function validateTerm(term) {
        if(isEmpty(term)) {
            setErrorTerm('This field is required');
        } else if(!isNaturalNumber(term)) {
            setErrorTerm('Provide the number of years');
        } else {
            setErrorTerm('none');
        }
    } 
    function validateMortgageType(type) {
        if(type === '') {
            setErrorType('This field is required');
        } else {
            setErrorType('none');
        }
    } 
    function isValid(str) {
        return str === 'none';
    }
       
    function handleSubmit(event) {
        event.preventDefault();
        
        validateAmount(amount);
        validateAPR(apr);
        validateTerm(term);
        validateMortgageType(mortgageType);
        if(isValid(errorAmount) && isValid(errorTerm) && isValid(errorApr) && isValid(errorType)) {
            console.log(amount, term, apr, mortgageType);
            const monthlyPayment = calculateMonthlyPayment(amount, apr, term, mortgageType);
            const totalPayment = monthlyPayment * term * 12;
            console.log(monthlyPayment, totalPayment);
            setPayment({monthlyPayment, totalPayment});
        }
    }

    function clearForm() {
        setAmount('');
        setApr('');
        setTerm('');
        setMortgageType('');
        setErrorAmount('none');
        setErrorApr('none');
        setErrorTerm('none');
        setErrorType('none');
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
                <label className={errorAmount === 'none' ? '': 'invalid'}>
                    <span className='font-bodyM font-slate-700'>Mortgage Amount</span>
                    <div className='input-wrapper input-amount'>
                        <span className='font-bodyL font-slate-700'>{"\u00A3"}</span>
                        <input type='text' name='amount' value={amount}
                            onChange={e => {setAmount(e.target.value); setErrorAmount('none');}} />
                    </div>
                    <p className='font-bodyS font-red'>
                        {errorAmount !== 'none' && errorAmount}
                    </p>
                </label>
                <div className='input-subcontainer'>
                    <label className={errorTerm === 'none' ? '': 'invalid'}>
                        <span className='font-bodyM font-slate-700'>Mortgage Term</span>
                        <div className='input-wrapper input-term'>
                            <input type='text' name='term' value={term}
                                onChange={e => {setTerm(e.target.value); setErrorTerm('none')}}/>
                            <span className='font-bodyL font-slate-700'>years</span>
                        </div>
                        <p className='font-bodyS font-red'>
                            {errorTerm !== 'none' && errorTerm}
                        </p>
                    </label>
                    <label className={errorApr === 'none' ? '': 'invalid'}>
                        <span className='font-bodyM font-slate-700'>Interest Rate</span>
                        <div className='input-wrapper input-rate'>
                            <input type='text' name='rate'  value={apr} 
                                onChange={e => {setApr(e.target.value); setErrorApr('none')}}/>
                            <span className='font-bodyL font-slate-700'>%</span>
                        </div>
                        <p className='font-bodyS font-red'>
                            {errorApr !== 'none' && errorApr}
                        </p>
                    </label>
                </div>
                <fieldset>
                    <legend className='font-bodyM font-slate-700'>Mortgage Type</legend>
                    <label className={mortgageType=='repayment' ? 'checked': ''}>
                        <input type="radio" name="mortgageType" value="repayment"
                            className='font-bodyL font-slate-900'
                            onChange={e => {setMortgageType(e.target.value); setErrorType('none');}}
                            checked={mortgageType=='repayment'}/>
                            <span class="custom-radio"></span>
                        <span className='font-bodyL font-slate-900'>Repayment</span>
                    </label>
                    <label className={mortgageType=='interest-only' ? 'checked': ''}>
                        <input type="radio" name="mortgageType" value="interest-only"
                            className='font-bodyL font-slate-900'   
                            onChange={e => {setMortgageType(e.target.value); setErrorType('none');}}
                            checked={mortgageType=='interest-only'}/>
                            <span class="custom-radio"></span>
                        <span className='font-bodyL font-slate-900'>Interest only</span>
                    </label>
                    <p className='font-bodyS font-red'>
                        {errorType !== 'none' && errorType}
                    </p>

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
