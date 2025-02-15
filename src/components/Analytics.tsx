
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock data - in a real app, this would come from your task completion history
  const data = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 3 },
    { name: 'Wed', tasks: 5 },
    { name: 'Thu', tasks: 2 },
    { name: 'Fri', tasks: 6 },
    { name: 'Sat', tasks: 2 },
    { name: 'Sun', tasks: 1 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Task Completion Trend</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="#0d9488" 
                strokeWidth={2}
                dot={{ fill: '#0d9488' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
