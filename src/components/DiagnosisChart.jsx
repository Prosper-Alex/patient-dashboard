import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import arrowUpIcon from "../assets/icons/upbold.svg";
import arrowDownIcon from "../assets/icons/downbold.svg";
import OdometerValue from "./OdometerValue";

function getTrendMeta(level = "") {
  const normalized = level.toLowerCase();

  if (normalized.includes("higher")) {
    return {
      iconPath: arrowUpIcon,
      iconAlt: "Trend up",
      color: "text-[#e66fd2]",
    };
  }

  if (normalized.includes("lower")) {
    return {
      iconPath: arrowDownIcon,
      iconAlt: "Trend down",
      color: "text-[#7e6cab]",
    };
  }

  return { iconPath: null, iconAlt: "", color: "text-[#072635]" };
}

function SummaryStat({ label, color, value, level }) {
  const trend = getTrendMeta(level);

  return (
    <div>
      <p className="flex items-center gap-2 text-[14px] font-bold text-[#072635]">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        {label}
      </p>
      <p className="mt-1 text-[30px] leading-none font-extrabold text-[#072635]">
        <OdometerValue value={value} />
      </p>
      <p
        className={`mt-2 inline-flex items-center gap-1 whitespace-nowrap text-sm ${trend.color}`}>
        {trend.iconPath ? (
          <img
            src={trend.iconPath}
            alt={trend.iconAlt}
            className="h-2.5 w-2.5"
          />
        ) : null}
        <span className="text-[#072635]">{level}</span>
      </p>
    </div>
  );
}

function DiagnosisChart({ chartData, bpSummary }) {
  const [range, setRange] = useState("6m");
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRange("6m");
    setIsRangeOpen(false);
  }, [chartData]);
  const filteredData = range === "1m" ? chartData.slice(-1) : chartData;
  const latestPoint = filteredData.at(-1);
  const yValues = filteredData.flatMap((point) => [
    point.systolic,
    point.diastolic,
  ]);
  const minY =
    yValues.length > 0
      ? Math.max(40, Math.floor(Math.min(...yValues) / 10) * 10)
      : 60;
  const maxY =
    yValues.length > 0
      ? Math.min(200, Math.ceil(Math.max(...yValues) / 10) * 10)
      : 180;
  const yStep = Math.max(10, Math.round((maxY - minY) / 6));
  const yAxisTicks = Array.from(
    { length: Math.floor((maxY - minY) / yStep) + 1 },
    (_, index) => minY + index * yStep,
  );
  const summary = bpSummary ?? {
    systolic: latestPoint?.systolic ?? "N/A",
    systolicLevel: latestPoint?.systolicLevel ?? "Unknown",
    diastolic: latestPoint?.diastolic ?? "N/A",
    diastolicLevel: latestPoint?.diastolicLevel ?? "Unknown",
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <h2 className="text-2xl font-extrabold text-[#072635]">
        Diagnosis History
      </h2>

      <div className="mt-4 rounded-xl bg-[#f4f0fe] p-4 md:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[22px] font-bold text-[#072635]">Blood Pressure</p>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRangeOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-[#e6ebef] bg-white px-3 py-1 text-sm text-[#072635] shadow-sm"
              aria-expanded={isRangeOpen}
              aria-haspopup="listbox">
              <span>{range === "1m" ? "Last 1 month" : "Last 6 months"}</span>
              <span aria-hidden="true" className="text-xs">
                ▼
              </span>
            </button>
            {isRangeOpen ? (
              <div
                role="listbox"
                className="absolute right-0 top-[calc(100%+6px)] z-10 w-40 rounded-xl border border-[#e6ebef] bg-white p-1 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                {[
                  { id: "1m", label: "Last 1 month" },
                  { id: "6m", label: "Last 6 months" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    role="option"
                    aria-selected={range === option.id}
                    onClick={() => {
                      setRange(option.id);
                      setIsRangeOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                      range === option.id
                        ? "bg-[#f1f5f9] font-semibold text-[#072635]"
                        : "text-[#4b5563] hover:bg-[#f8fafc]"
                    }`}>
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="h-64 w-full min-w-0 md:flex-1">
            <ResponsiveContainer>
              <LineChart
                data={filteredData}
                margin={{ top: 8, right: 4, left: -18, bottom: 4 }}>
                <CartesianGrid stroke="#ded7f5" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  ticks={yAxisTicks}
                  domain={[minY, maxY]}
                  width={34}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e4def8",
                    boxShadow: "0 8px 24px rgba(20, 20, 43, 0.08)",
                  }}
                  formatter={(value, name) => [value, name]}
                  labelStyle={{ color: "#072635", fontWeight: 700 }}
                />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#e66fd2"
                  strokeWidth={3}
                  name="Systolic"
                  dot={{
                    r: 5,
                    fill: "#e66fd2",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#7e6cab"
                  strokeWidth={3}
                  name="Diastolic"
                  dot={{
                    r: 5,
                    fill: "#7e6cab",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {latestPoint && summary && (
            <div className="md:w-55 md:pl-6 md:border-l md:border-[#ded7f5]">
              <SummaryStat
                label="Systolic"
                color="#e66fd2"
                value={summary.systolic}
                level={summary.systolicLevel}
              />

              <div className="my-4 h-px bg-[#ded7f5]" />

              <SummaryStat
                label="Diastolic"
                color="#7e6cab"
                value={summary.diastolic}
                level={summary.diastolicLevel}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DiagnosisChart;
