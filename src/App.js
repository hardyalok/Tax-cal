import React, { useState } from 'react';
import './App.css';

function App() {
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [netTaxableIncome, setNetTaxableIncome] = useState(0);
  const [tax, setTax] = useState(0);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };

  const handleDeductionsChange = (event) => {
    setDeductions(event.target.value);
  };

  const handleSubmit = () => {
    if (!age || !income || !deductions) {
      setError(true);
      return; 
    }

    setError(false);

    const grossIncome = parseFloat(income) + parseFloat(deductions);
    const taxable = Math.max(0, grossIncome - 800000);

    let taxRate;
    if (age === "<40") {
      taxRate = 0.3;
    } else if (age === "≥ 40 & < 60") {
      taxRate = 0.4;
    } else if (age === "≥ 60") {
      taxRate = 0.1;
    }

    const calculatedTax = taxRate * taxable;

    setNetTaxableIncome(taxable);
    setTax(calculatedTax);
    setModalOpen(true);
  };

  return (
    <div className="App">
      <h1>Tax Calculator</h1>
      <div className="section">
        <label>Age:</label>
        <select className="input" value={age} onChange={handleAgeChange}>
          <option value="<40">{"<40"}</option>
          <option value="≥ 40 & < 60">{"≥ 40 & < 60"}</option>
          <option value="≥ 60">{"≥ 60"}</option>
        </select>
        {error && !age && <span className="error">Age is required</span>}
      </div>
      <div className="section">
        <label>Income:</label>
        <input type="number" className="input" value={income} onChange={handleIncomeChange} />
        {error && !income && <span className="error">Income is required</span>}
      </div>
      <div className="section">
        <label>Deductions:</label>
        <input type="number" className="input" value={deductions} onChange={handleDeductionsChange} />
        {error && !deductions && <span className="error">Deductions are required</span>}
      </div>
      <button className="button" onClick={handleSubmit}>Calculate Tax</button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h2>Tax Calculation Results</h2>
            <p>Taxable Income: {netTaxableIncome} Lakhs</p>
            <p>Tax: {tax} Lakhs</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;