import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import MortgageForm from './components/MortgageForm'
import CalculationResult from './components/CalculationResult'

function App() {
  const [payment, setPayment] = useState({
    monthlyPayment: 0,
    totalPayment: 0
  });

  return (
    <main>
      <MortgageForm payment={payment} setPayment={setPayment}/>
      <CalculationResult payment={payment} />
    </main>
  )
}

export default App
