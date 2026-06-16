import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  badgeLabel: string;
  badgeVariant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'ghost' | 'link';
}

export function MetricCard({ title, value, description, icon, badgeLabel, badgeVariant = 'outline' }: MetricCardProps) {
  return (
    <Card className="group shadow-sm border-slate-200/70 hover:shadow-md transition-shadow">
      <CardHeader className="flex items-start justify-between gap-4 pb-2">
        <div className="space-y-2">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-slate-950">{value}</span>
            <Badge variant={badgeVariant}>{badgeLabel}</Badge>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-slate-700 shadow-sm">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}
