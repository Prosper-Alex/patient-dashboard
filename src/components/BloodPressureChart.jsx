import { getBloodPressureStatus } from '../utils/helpers'

function BloodPressureChart({ readings }) {
  return (
    <article className="card chart-card">
      <h3>Blood Pressure Trend</h3>
      <div className="chart-columns">
        {readings.map((reading) => (
          <div key={reading.day} className="chart-column">
            <div className="bars">
              <span style={{ height: `${reading.systolic / 2}%` }} title={`Systolic ${reading.systolic}`} />
              <span className="diastolic" style={{ height: `${reading.diastolic / 2}%` }} title={`Diastolic ${reading.diastolic}`} />
            </div>
            <small>{reading.day}</small>
          </div>
        ))}
      </div>
      <p className="bp-status">Status: {getBloodPressureStatus(readings.at(-1))}</p>
    </article>
  )
}

export default BloodPressureChart
