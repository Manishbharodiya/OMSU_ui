import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  const referenceNumber = 'OMSU-2026-00124';
  const submissionDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/30">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Submission Complete</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Lead submitted successfully</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-500">
                The lead has been successfully recorded and forwarded to the field operations team. Keep a copy of the reference number for tracking.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Reference Number</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">{referenceNumber}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Submission Date</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">{submissionDate}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">What happens next</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>• Operations will validate the lead and schedule the site visit.</li>
                  <li>• Status updates will be available in the lead directory.</li>
                  <li>• Keep the reference number handy for support.</li>
                </ul>
              </div>
              <div className="grid gap-3">
                <Link href="/leads/new">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2">
                    Add Another Lead
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100">
                    Go To Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
