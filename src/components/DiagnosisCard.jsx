function DiagnosisCard({ title, value, unit }) {
  return (
    <article className="card stat-card">
      <h3>{title}</h3>
      <p>
        <strong>{value}</strong> {unit}
      </p>
    </article>
  )
}

export default DiagnosisCard
