import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

/* ------------------------------
   Generic small badge
--------------------------------*/
export const Badge = ({ children, color = "bg-green-100 text-green-800" }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}
  >
    {children}
  </span>
);

/* ------------------------------
   Progress bar
--------------------------------*/
export const Bar = ({ value, color = "bg-indigo-900" }) => {
  const pct = Math.min(Math.max(value, 0), 100);
  return (
    <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
      <div className={`h-2 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
};

/* ------------------------------
   InputField wrapper
--------------------------------*/
export function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        inputMode="decimal"
        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

/* ------------------------------
   Row: % comparison + diff badge
--------------------------------*/
export function Row({ label, value, target }) {
  const diff = Math.round(value - target);
  const color =
    diff > 3
      ? "bg-red-100 text-red-800"
      : diff < -3
      ? "bg-amber-100 text-amber-800"
      : "bg-green-100 text-green-800";

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <div className="font-medium text-slate-800">{label}</div>
        <div className="flex items-center gap-2">
          <span className="text-slate-700">{value.toFixed(1)}%</span>
          <Badge color={color}>{diff > 0 ? `+${diff}%` : `${diff}%`}</Badge>
        </div>
      </div>
      <Bar value={value} />
      <div className="text-xs text-slate-500 mt-1">
        Target: {target.toFixed(0)}%
      </div>
    </div>
  );
}

/* ------------------------------
   Simple Card
--------------------------------*/
export function Card({ title, value, note }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 bg-white">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{note}</div>
    </div>
  );
}

/* ------------------------------
   Simple Doughnut Chart
   Needs / Wants / Savings / Investments
--------------------------------*/
export function DoughnutChartSimple({ numbers }) {
  const data = {
    labels: ["Needs", "Wants", "Savings", "Investments"],
    datasets: [
      {
        data: [
          numbers.needs,
          numbers.w,
          numbers.leftover > 0 ? numbers.leftover : 0,
          numbers.inv,
        ],
        backgroundColor: [
          "#059669", // green
          "#3B82F6", // blue
          "#F59E0B", // amber
          "#10B981", // emerald
        ],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="max-w-xs mx-auto">
      <Doughnut data={data} />
    </div>
  );
}

/* ------------------------------
   Advanced Doughnut Chart
   Detailed breakdown:
   Housing, Transport, Food, Utilities, Debt, Insurance, Wants, Investments, Savings-leftover
--------------------------------*/
export function DoughnutChartAdvanced({ numbers }) {
  const savingsLeftover = numbers.leftover > 0 ? numbers.leftover : 0;

  const data = {
    labels: [
      "Housing",
      "Transport",
      "Food",
      "Utilities",
      "Debt",
      "Insurance",
      "Wants",
      "Investments",
      "Savings Leftover",
    ],
    datasets: [
      {
        data: [
          numbers.h,
          numbers.t,
          numbers.f,
          numbers.u,
          numbers.d,
          numbers.ins,
          numbers.w,
          numbers.inv,
          savingsLeftover,
        ],
        backgroundColor: [
          "#F87171", // red
          "#60A5FA", // blue
          "#34D399", // green
          "#A78BFA", // purple
          "#FCD34D", // yellow
          "#6EE7B7", // mint
          "#F472B6", // pink
          "#10B981", // emerald
          "#F59E0B", // amber
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-xs mx-auto">
      <Doughnut data={data} />
    </div>
  );
}
