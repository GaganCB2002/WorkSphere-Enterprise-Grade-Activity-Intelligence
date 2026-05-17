import React from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { Server, Cpu, HardDrive, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Kubernetes Pods', value: '482', trend: '99.99% healthy', trendType: 'up', icon: '🐳', color: 'blue' },
  { title: 'Avg CPU Utilization', value: '42.8%', trend: 'Optimal load', trendType: 'neutral', icon: '⚡', color: 'emerald' },
  { title: 'Monthly AWS/GCP Cost', value: '$84.2K', trend: 'Within budget', trendType: 'neutral', icon: '💰', color: 'purple' },
  { title: 'Pending CI/CD Builds', value: '3', trend: 'Building', trendType: 'up', icon: '🔄', color: 'amber' },
];

const mockCloudCostData = [
  { service: 'AWS EKS (K8s)', cost: 38.5 },
  { service: 'RDS PostgreSQL', cost: 18.2 },
  { service: 'ElastiCache Redis', cost: 12.4 },
  { service: 'MSK Apache Kafka', cost: 9.8 },
  { service: 'CloudFront CDN', cost: 5.3 },
];

const mockPods = [
  { name: 'auth-service-deployment-78f9c', namespace: 'production', cpu: '34%', memory: '512Mi', status: 'RUNNING', restarts: 0 },
  { name: 'monitoring-service-deployment-42b1', namespace: 'production', cpu: '78%', memory: '1.4Gi', status: 'RUNNING', restarts: 2 },
  { name: 'ai-inference-lstm-deployment-99x', namespace: 'production', cpu: '92%', memory: '4.2Gi', status: 'WARNING', restarts: 5 },
];

export const DevOpsEngineerDashboard: React.FC = () => {
  return (
    <DepartmentView
      title="DevOps & Cloud Infrastructure"
      subtitle="Server Health Telemetry, Kubernetes Pods & AWS Multi-Cloud Cost Audit"
      stats={initialStats}
      onRefresh={() => alert('Refreshing AWS EKS & Prometheus metrics...')}
      quickActions={[
        { label: 'Scale K8s Cluster', icon: <Server className="w-4 h-4" />, action: 'scale', variant: 'primary' },
        { label: 'Cloud Cost Audit', icon: <DollarSign className="w-4 h-4" />, action: 'cost', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'scale') alert('Initiating Kubernetes Horizontal Pod Autoscaler (HPA) override...');
        if (action === 'cost') alert('Generating AWS Cost Explorer & FinOps breakdown report...');
      }}
    >
      {/* Cloud Cost Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Monthly Cloud Infrastructure Cost ($ Thousands)</h3>
          <p className="text-slate-400 text-xs mt-1">Resource expenditure breakdown across AWS production managed services</p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockCloudCostData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="service" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="cost" name="Monthly Cost ($K)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kubernetes Pods Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Kubernetes Pod Status (EKS Production)</h3>
          <p className="text-slate-400 text-xs mt-1">Real-time CPU, memory allocation, and restart count tracking per microservice pod</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Pod Name</th>
                <th className="p-4">Namespace</th>
                <th className="p-4 text-center">CPU Load</th>
                <th className="p-4 text-center">Memory</th>
                <th className="p-4 text-center">Restarts</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {mockPods.map((pod, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-white text-xs">{pod.name}</td>
                  <td className="p-4 text-slate-300 text-xs font-medium">{pod.namespace}</td>
                  <td className="p-4 text-center font-bold text-blue-400 text-xs">{pod.cpu}</td>
                  <td className="p-4 text-center font-bold text-purple-400 text-xs">{pod.memory}</td>
                  <td className="p-4 text-center text-xs font-bold text-slate-400">{pod.restarts}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      pod.status === 'RUNNING' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {pod.status === 'RUNNING' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>{pod.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DepartmentView>
  );
};
