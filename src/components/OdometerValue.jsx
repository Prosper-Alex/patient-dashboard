import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";

function toNumeric(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/,/g, ""));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function OdometerValue({ value, className = "" }) {
  const numericValue = toNumeric(value);

  if (numericValue === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      <Odometer
        value={numericValue}
        duration={700}
        format={Number.isInteger(numericValue) ? "(,ddd)" : "(,ddd).dd"}
      />
    </span>
  );
}

export default OdometerValue;
