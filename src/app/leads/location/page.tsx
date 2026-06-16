import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LocationPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Location Confirmation</p>
          <h1 className="text-3xl font-extrabold text-slate-950">Bill Upload Complete</h1>
          <p className="text-sm text-slate-500">The bill has been uploaded successfully. Confirm the lead location details next.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-700">
          <p className="text-base font-semibold">Location page placeholder created.</p>
          <p className="text-sm text-slate-500">Use this route to collect the project location coordinates or address validation step.</p>
        </div>

        <Link href="/leads/upload-bill">
          <Button variant="outline" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Upload
          </Button>
        </Link>
      </div>
    </div>
  );
}
