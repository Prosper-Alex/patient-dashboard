import { useEffect, useMemo, useState } from "react";
import { fetchAllPatients } from "../services/api";
import {
  formatDateLabel,
  mapChartData,
  mapPatientList,
} from "../utils/helpers";
import respiratoryIcon from "../assets/icons/respiratory.svg";
import temperatureIcon from "../assets/icons/temperature.svg";
import heartIcon from "../assets/icons/heartbmp.svg";

function usePatientData(selectedPatientIndex = 0) {
  const [allPatients, setAllPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const patientResults = await fetchAllPatients();

        if (!mounted) {
          return;
        }

        setAllPatients(patientResults ?? []);
        setPatients(mapPatientList(patientResults ?? []));
        if (!patientResults?.length) {
          setError("No patients available in API response.");
        }
      } catch {
        if (mounted) {
          setError("Unable to load patient dashboard data right now.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedPatient = useMemo(
    () => allPatients?.[selectedPatientIndex] ?? null,
    [allPatients, selectedPatientIndex]
  );

  const mappedData = useMemo(() => {
    if (!selectedPatient) {
      return null;
    }

    const latestDiagnosis = selectedPatient.diagnosis_history?.[0];

    return {
      profile: {
        name: selectedPatient.name,
        profileImage: selectedPatient.profile_picture,
        dateOfBirth: formatDateLabel(selectedPatient.date_of_birth),
        gender: selectedPatient.gender,
        phoneNumber: selectedPatient.phone_number,
        emergencyContact: selectedPatient.emergency_contact,
        insuranceType: selectedPatient.insurance_type,
      },
      chartData: mapChartData(selectedPatient.diagnosis_history ?? []),
      bpSummary: {
        systolic: latestDiagnosis?.blood_pressure?.systolic?.value ?? "N/A",
        systolicLevel:
          latestDiagnosis?.blood_pressure?.systolic?.levels ?? "Unknown",
        diastolic: latestDiagnosis?.blood_pressure?.diastolic?.value ?? "N/A",
        diastolicLevel:
          latestDiagnosis?.blood_pressure?.diastolic?.levels ?? "Unknown",
      },
      vitals: [
        {
          id: "respiratory-rate",
          title: "Respiratory Rate",
          value: latestDiagnosis?.respiratory_rate?.value ?? "N/A",
          unit: "bpm",
          status: latestDiagnosis?.respiratory_rate?.levels ?? "Unknown",
          iconPath: respiratoryIcon,
          tone: "bg-sky-50",
        },
        {
          id: "temperature",
          title: "Temperature",
          value: latestDiagnosis?.temperature?.value ?? "N/A",
          unit: "deg F",
          status: latestDiagnosis?.temperature?.levels ?? "Unknown",
          iconPath: temperatureIcon,
          tone: "bg-rose-50",
        },
        {
          id: "heart-rate",
          title: "Heart Rate",
          value: latestDiagnosis?.heart_rate?.value ?? "N/A",
          unit: "bpm",
          status: latestDiagnosis?.heart_rate?.levels ?? "Unknown",
          iconPath: heartIcon,
          tone: "bg-violet-50",
        },
      ],
      diagnosticList: selectedPatient.diagnostic_list ?? [],
      labResults: selectedPatient.lab_results ?? [],
    };
  }, [selectedPatient]);

  return {
    patients,
    selectedPatientName: selectedPatient?.name ?? "",
    loading,
    error,
    dashboardData: mappedData,
  };
}

export default usePatientData;
