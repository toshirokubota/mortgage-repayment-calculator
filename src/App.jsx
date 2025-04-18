import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import MortgageForm from './components/MortgageForm'
import CalculationResult from './components/CalculationResult'

function App() {
  const [mortgage, setMortgage] = useState({
    total: 0, 
    apr: 0, 
    year: 0, 
    repayment: false,
    monthlyPayment: 0,
    totalPayment: 0
  });

  return (
    <main>
      <MortgageForm mortgage={mortgage} setMortgage={setMortgage}/>
      <CalculationResult mortgage={mortgage} />
    </main>
  )
}

export default App
