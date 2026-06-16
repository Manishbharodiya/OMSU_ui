'use client';

import { useMemo, useState } from 'react';
import { Search, Filter, BarChart3, Users, CheckCircle2, XCircle, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/common/page-header';
import { MetricCard } from '@/components/common/metric-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockLeads = [
  { leadId: 'L-101', consumerName: 'Sunita Devi', community: 'OBC', projectType: 'Residential', capacity: '15 kW', status: 'Pending' },
  { leadId: 'L-102', consumerName: 'Aditya Sharma', community: 'SC', projectType: 'Commercial', capacity: '45 kW', status: 'Approved' },
  { leadId: 'L-103', consumerName: 'Meera Deshmukh', community: 'ST', projectType: 'Residential', capacity: '10 kW', status: 'Rejected' },
  { leadId: 'L-104', consumerName: 'Karthik Raja', community: 'OBC', projectType: 'Industrial', capacity: '80 kW', status: 'Pending' },
  { leadId: 'L-105', consumerName: 'Nisha Patel', community: 'Others', projectType: 'Residential', capacity: '12 kW', status: 'Approved' },
  { leadId: 'L-106', consumerName: 'Vikram Singh', community: 'SC', projectType: 'Commercial', capacity: '35 kW', status: 'Pending' },
  { leadId: 'L-107', consumerName: 'Priya Nair', community: 'OBC', projectType: 'Industrial', capacity: '95 kW', status: 'Approved' },
  { leadId: 'L-108', consumerName: 'Anil Mehta', community: 'ST', projectType: 'Residential', capacity: '8 kW', status: 'Rejected' },
  { leadId: 'L-109', consumerName: 'Manish Bharodiya', community: 'SC', projectType: 'Commercial', capacity: '28 kW', status: 'Pending' },
  { leadId: 'L-110', consumerName: 'Sunita Gupta', community: 'Others', projectType: 'Industrial', capacity: '70 kW', status: 'Approved' },
  { leadId: 'L-111', consumerName: 'Amit Joshi', community: 'OBC', projectType: 'Residential', capacity: '20 kW', status: 'Pending' },
  { leadId: 'L-112', consumerName: 'Naveen Kumar', community: 'SC', projectType: 'Commercial', capacity: '30 kW', status: 'Rejected' },
];

const statusOptions = ['All', 'Pending', 'Approved', 'Rejected'] as const;

function getStatusVariant(status: string) {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'destructive';
    default:
      return 'secondary';
  }
}

export default function AdminDashboardPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof statusOptions[number]>('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesSearch = [lead.leadId, lead.consumerName, lead.community, lead.projectType]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const pageLeads = filteredLeads.slice((page - 1) * pageSize, page * pageSize);

  const metrics = {
    total: mockLeads.length,
    pending: mockLeads.filter((item) => item.status === 'Pending').length,
    approved: mockLeads.filter((item) => item.status === 'Approved').length,
    rejected: mockLeads.filter((item) => item.status === 'Rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Admin Console</p>
                <p className="text-xs text-slate-500">Manage leads and review performance.</p>
              </div>
            </div>
            <nav className="space-y-2">
              {[
                { label: 'Overview', active: true },
                { label: 'Leads', active: false },
                { label: 'Reports', active: false },
                { label: 'Settings', active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    item.active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.active ? <CheckCircle2 className="h-4 w-4" /> : null}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="space-y-6">
          <PageHeader
          title="Lead Operations"
          description="Manage OMSU leads, filter the queue, and review administrative metrics in one place."
          tag="Admin"
          actions={
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search leads"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value as typeof statusOptions[number]);
                    setPage(1);
                  }}
                  className="min-w-[120px] bg-transparent text-sm text-slate-900 outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
        />

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Total Leads"
              value={metrics.total.toString()}
              description="Current lead volume"
              icon={<Users className="h-5 w-5" />}
              badgeLabel="Updated"
              badgeVariant="outline"
            />
            <MetricCard
              title="Pending"
              value={metrics.pending.toString()}
              description="Awaiting review"
              icon={<Clock className="h-5 w-5" />}
              badgeLabel="Pending"
              badgeVariant="secondary"
            />
            <MetricCard
              title="Approved"
              value={metrics.approved.toString()}
              description="Ready for execution"
              icon={<CheckCircle2 className="h-5 w-5" />}
              badgeLabel="Approved"
              badgeVariant="success"
            />
            <MetricCard
              title="Rejected"
              value={metrics.rejected.toString()}
              description="Requires follow-up"
              icon={<XCircle className="h-5 w-5" />}
              badgeLabel="Rejected"
              badgeVariant="destructive"
            />
          </div>

          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900">Lead Table</CardTitle>
                  <CardDescription className="text-sm text-slate-500">Filter, search and page through the lead queue.</CardDescription>
                </div>
                <div className="text-sm text-slate-500">{filteredLeads.length} results</div>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="min-w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead ID</TableHead>
                    <TableHead>Consumer Name</TableHead>
                    <TableHead>Community</TableHead>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageLeads.map((lead) => (
                    <TableRow key={lead.leadId}>
                      <TableCell className="font-medium text-slate-900">{lead.leadId}</TableCell>
                      <TableCell>{lead.consumerName}</TableCell>
                      <TableCell>{lead.community}</TableCell>
                      <TableCell>{lead.projectType}</TableCell>
                      <TableCell>{lead.capacity}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pageLeads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-6 text-center text-sm text-slate-500">
                        No leads match the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500">Page {page} of {pageCount}</div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === pageCount}
                    onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
