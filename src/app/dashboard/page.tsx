import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  PlusCircle,
  RefreshCw,
  Users,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/common/page-header';
import { MetricCard } from '@/components/common/metric-card';

const DASHBOARD_STATS = [
  {
    title: 'Total Leads',
    value: '248',
    description: 'All active and historical lead records',
    icon: Users,
    badge: { label: 'Updated', variant: 'outline' },
  },
  {
    title: 'Pending Leads',
    value: '58',
    description: 'Leads awaiting follow-up',
    icon: Clock,
    badge: { label: 'In progress', variant: 'secondary' },
  },
  {
    title: 'Approved Leads',
    value: '146',
    description: 'Approved for proposal or installation',
    icon: CheckCircle2,
    badge: { label: 'On track', variant: 'success' },
  },
  {
    title: 'Rejected Leads',
    value: '44',
    description: 'Leads that were declined or lost',
    icon: XCircle,
    badge: { label: 'Closed', variant: 'destructive' },
  },
];

const QUICK_ACTIONS = [
  {
    name: 'Add Lead',
    href: '/leads/new',
    icon: PlusCircle,
    description: 'Capture a new lead quickly',
  },
  {
    name: 'Lead History',
    href: '/leads',
    icon: ArrowRight,
    description: 'Review lead progress and status',
  },
  {
    name: 'Sync Data',
    href: '/dashboard',
    icon: RefreshCw,
    description: 'Refresh the latest records',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="OMSU Lead Operations Dashboard"
        description="Monitor lead volumes, track approvals, and act fast with ready quick actions for your field team."
        tag="Dashboard"
        actions={
          <div className="flex flex-wrap gap-3">
            <Link href="/leads/new">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm gap-2">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            </Link>
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              View Lead History
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <MetricCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={<Icon className="h-5 w-5" />}
              badgeLabel={stat.badge.label}
              badgeVariant={stat.badge.variant}
            />
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="shadow-sm border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
          <CardHeader className="space-y-4 p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-200">
              Field Operations
            </div>
            <div className="space-y-3">
              <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
                Act now on high-priority leads
              </CardTitle>
              <CardDescription className="max-w-xl text-sm text-slate-300">
                Add new leads, review recent lead history, or sync the latest data from the mobile force — all from one dashboard view.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="space-y-2 rounded-3xl bg-white/10 p-4 border border-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">This week</p>
              <p className="text-3xl font-black text-white">+18%</p>
              <p className="text-sm text-slate-300">Lead capture improved over the prior week.</p>
            </div>
            <div className="space-y-2 rounded-3xl bg-white/10 p-4 border border-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Approval rate</p>
              <p className="text-3xl font-black text-white">72%</p>
              <p className="text-sm text-slate-300">Current approved lead ratio in the pipeline.</p>
            </div>
          </CardContent>
          <div className="flex flex-col gap-4 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Primary action</p>
              <p className="text-xs text-slate-400">Start by capturing the next high-value lead.</p>
            </div>
            <Link href="/leads/new" className="w-full sm:w-auto">
              <Button className="w-full bg-white text-slate-950 hover:bg-slate-100 font-semibold">
                Add Lead
              </Button>
            </Link>
          </div>
        </Card>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-950">Quick Actions</h2>
                <p className="text-sm text-slate-500">Shortcuts for your most used workflows.</p>
              </div>
              <Badge variant="outline">Fast</Badge>
            </div>
            <div className="mt-6 space-y-3">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">{action.name}</p>
                        <p className="text-sm text-slate-500">{action.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </div>

          <Card className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">Lead Health</CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Summary of how the funnel is performing this week.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Follow-up completed</span>
                  <span className="font-semibold text-slate-900">82%</span>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Survey-ready leads</span>
                  <span className="font-semibold text-slate-900">34</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
