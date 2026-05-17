import React from 'react';
import { DashboardPage, ActivityItem } from './DashboardPage';

export function HRDashboard({ data, feed, onRefresh }: { data: any; feed: ActivityItem[]; onRefresh: () => Promise<void> }) {
  return (
    <div className="hr-module-container space-y-6">
      <DashboardPage data={data} feed={feed} onRefresh={onRefresh} />
    </div>
  );
}
