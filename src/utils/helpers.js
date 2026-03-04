export function getAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return age
}

export function formatDateLabel(dateString) {
  if (!dateString) {
    return 'N/A'
  }

  const parsed = new Date(dateString)
  if (Number.isNaN(parsed.getTime())) {
    return dateString
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function mapChartData(diagnosisHistory) {
  return diagnosisHistory
    .slice(0, 6)
    .reverse()
    .map((entry) => ({
      month: `${entry.month.slice(0, 3)} ${entry.year}`,
      systolic: entry.blood_pressure?.systolic?.value ?? 0,
      systolicLevel: entry.blood_pressure?.systolic?.levels ?? 'Unknown',
      diastolic: entry.blood_pressure?.diastolic?.value ?? 0,
      diastolicLevel: entry.blood_pressure?.diastolic?.levels ?? 'Unknown',
    }))
}

export function mapPatientList(patients) {
  return patients.map((patient) => ({
    id: `${patient.name}-${patient.date_of_birth}`,
    name: patient.name,
    gender: patient.gender,
    age: patient.age ?? getAge(patient.date_of_birth),
    profileImage: patient.profile_picture,
  }))
}
