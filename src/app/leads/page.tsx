'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Filter,
  Zap,
  Phone,
  Mail,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/page-header';
import { MOCK_LEADS } from '@/lib/mock-data';
import { LeadStatus } from '@/types';

// Helper to render status badges
const getStatusBadge = (status: LeadStatus) => {
  switch (status) {
    case 'new':
      return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">New Lead</Badge>;
    case 'contacted':
      return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">Contacted</Badge>;
    case 'survey-scheduled':
      return <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50">Survey Scheduled</Badge>;
    case 'survey-completed':
      return <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50">Survey Done</Badge>;
    case 'proposal-sent':
      return <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-50">Proposal Sent</Badge>;
    case 'converted':
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Converted</Badge>;
    case 'lost':
      return <Badge variant="destructive">Lost</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter leads based on inputs
  const filteredLeads = MOCK_LEADS.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads Directory"
        description="Field teams can view, search, and assign solar lead surveys while working on-site."
        tag="Leads"
        actions={
          <Link href="/leads/new">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm gap-2">
              <PlusCircle className="h-4.5 w-4.5" />
              <span>Capture New Lead</span>
            </Button>
          </Link>
        }
      />

      {/* Directory Card */}
      <Card className="shadow-sm border-slate-200/60">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by consumer name, lead ID, or address..."
                className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary focus-visible:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-2">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter by Status:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { label: 'All Leads', value: 'all' },
                  { label: 'New', value: 'new' },
                  { label: 'Contacted', value: 'contacted' },
                  { label: 'Survey Scheduled', value: 'survey-scheduled' },
                  { label: 'Survey Done', value: 'survey-completed' },
                  { label: 'Converted', value: 'converted' },
                ].map((btn) => (
                  <Button
                    key={btn.value}
                    variant={statusFilter === btn.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(btn.value)}
                    className={
                      statusFilter === btn.value
                        ? 'bg-secondary text-white font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600 text-xs'
                    }
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 border-t border-slate-100">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">Lead ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Consumer Info</TableHead>
                  <TableHead className="font-bold text-slate-700">Address</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Power Profile</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Roof Details</TableHead>
                  <TableHead className="font-bold text-slate-700">Assigned To</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Status</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-slate-50/30">
                      <TableCell className="font-mono text-xs font-semibold text-slate-500">
                        {lead.id}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-900 text-sm">
                            {lead.customerName}
                          </div>
                          <div className="flex flex-col gap-0.5 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {lead.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-slate-400" />
                              {lead.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-slate-600 text-xs">
                        <div className="flex items-start gap-1">
                          <Home className="h-3 w-3 mt-0.5 shrink-0 text-slate-400" />
                          <span>{lead.address}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-xs font-semibold text-slate-800">
                            ₹{lead.monthlyBill.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Zap className="h-2.5 w-2.5 text-amber-500" />
                            {lead.avgUsageKwh} kWh
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-xs font-semibold text-slate-800">
                            {lead.roofAreaSqFt} sq.ft
                          </span>
                          <span className="text-[10px] text-slate-400 capitalize">
                            {lead.roofType} roof
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-slate-600">
                        {lead.assignedExecutive}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(lead.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.status === 'survey-scheduled' || lead.status === 'new' ? (
                            <Link href={`/surveys/new?leadId=${lead.id}`}>
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold h-8 py-0 shadow-sm"
                              >
                                Survey
                              </Button>
                            </Link>
                          ) : lead.status === 'survey-completed' ? (
                            <Link href="/surveys">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-200 hover:bg-slate-50 text-xs font-semibold h-8 py-0 text-indigo-700"
                              >
                                View Survey
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled
                              className="text-slate-400 text-xs h-8 py-0"
                            >
                              Completed
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-400 text-xs">
                      No leads match your search criteria. Try a different search query or filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
