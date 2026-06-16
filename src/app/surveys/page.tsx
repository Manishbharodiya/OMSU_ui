'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  ClipboardList,
  Download,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MOCK_SURVEYS, MOCK_LEADS } from '@/lib/mock-data';

export default function SurveysPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Resolve consumer name from lead ID helper
  const getCustomerName = (leadId: string) => {
    const lead = MOCK_LEADS.find((l) => l.id === leadId);
    return lead ? lead.customerName : 'Unknown consumer';
  };

  const filteredSurveys = MOCK_SURVEYS.filter((survey) => {
    const cName = getCustomerName(survey.leadId).toLowerCase();
    return (
      survey.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.leadId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.surveyorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Consumer Surveys History
          </h1>
          <p className="text-sm text-slate-500">
            Review technical feasibility reports and shading analyzes submitted by surveyors.
          </p>
        </div>
        <Link href="/surveys/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm gap-2">
            <ClipboardList className="h-4.5 w-4.5" />
            <span>Conduct Site Survey</span>
          </Button>
        </Link>
      </div>

      {/* Directory Card */}
      <Card className="shadow-sm border-slate-200/60">
        <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by Survey ID, Lead ID, customer, or surveyor..."
                className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary focus-visible:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Showing {filteredSurveys.length} feasibility reports
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">Survey ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Customer (Lead ID)</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">ConnectionType</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Sanctioned Load</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Stability</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Roof Shadowing</TableHead>
                  <TableHead className="font-bold text-slate-700">Coordinates</TableHead>
                  <TableHead className="font-bold text-slate-700">Surveyed By</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Feasibility PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSurveys.length > 0 ? (
                  filteredSurveys.map((survey) => (
                    <TableRow key={survey.id} className="hover:bg-slate-50/30">
                      <TableCell className="font-mono text-xs font-semibold text-slate-600">
                        {survey.id}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="font-semibold text-slate-900 text-sm">
                            {getCustomerName(survey.leadId)}
                          </div>
                          <span className="font-mono text-[10px] text-slate-400">
                            {survey.leadId}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-xs font-semibold capitalize text-slate-700">
                        {survey.connectionType.replace('-', ' ')}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-slate-800 text-sm">
                        {survey.sanctionedLoadKw} kW
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            survey.structuralStability === 'excellent'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                              : survey.structuralStability === 'good'
                              ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50'
                              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50'
                          }
                        >
                          {survey.structuralStability}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {survey.hasShading ? (
                          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
                            Obstacles / Shaded
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                            Shadow Free
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        {survey.coordinates ? (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="font-mono text-[10px]">
                              {survey.coordinates.latitude.toFixed(4)},{' '}
                              {survey.coordinates.longitude.toFixed(4)}
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Not available</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-slate-700">
                        <div className="space-y-0.5">
                          <p className="font-medium">{survey.surveyorName}</p>
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Calendar className="h-2.5 w-2.5" />
                            {new Date(survey.surveyDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-primary hover:bg-amber-50"
                          onClick={() =>
                            alert(
                              `Generating and downloading PDF Report for Survey ${survey.id}...`
                            )
                          }
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download Report</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-slate-400 text-xs">
                      No matching survey records found.
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
