function Header({ patientName }) {
  return (
    <header className="header">
      <div>
        <h2>Patient Dashboard</h2>
        <p>Monitoring {patientName}</p>
      </div>
      <button type="button">New Report</button>
    </header>
  )
}

export default Header
