import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Shopping", value: 725 },
  { name: "Home", value: 2350 },
  { name: "Others", value: 710 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

import { subMonths, format } from "date-fns";

const lineData = Array.from({ length: 6 }).map((_, index) => {
  const date = subMonths(new Date(), 5 - index); // Get the last 6 months up to the current month
  return {
    date: format(date, "MMM yyyy"), // Format as "Jan 2024"
    savings: Math.floor(Math.random() * (5000 - 1000) + 1000), // Random savings between $1000 - $5000
  };
});

console.log(lineData); // Check output in console

export default function StatComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-lg rounded-lg">
      {/* Pie Chart */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="savings" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
