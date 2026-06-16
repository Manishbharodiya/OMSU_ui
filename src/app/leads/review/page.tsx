import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/common/page-header';

const reviewData = {
  consumerName: 'Sunita Devi',
  mobileNumber: '9876543210',
  consumerNumber: 'C-123456789',
  address: 'House No. 12, Main Road',
  village: 'Mirasol',
  district: 'Pune',
  state: 'Maharashtra',
  pincode: '411045',
  communityCategory: 'OBC',
  projectType: 'Residential',
  capacityKw: '15',
  southSideObstruction: 'Tree',
  electricityBill: 'monthly-bill-june.pdf',
  location: 'Plot 8B, Sector 14, Nagar Nagar',
};

export default function LeadReviewPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Confirm lead details before submission"
        description="Review the collected information and submit the lead intake once all details are complete."
        tag="Review"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline">Ready to submit</Badge>
            <Badge variant="secondary">Review stage</Badge>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Consumer Details</CardTitle>
            <CardDescription className="text-sm text-slate-500">Summary of consumer contact and location.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">{reviewData.consumerName}</p>
              <p>{reviewData.mobileNumber}</p>
              <p>{reviewData.consumerNumber}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Address</p>
              <p>{reviewData.address}</p>
              <p>{reviewData.village}, {reviewData.district}</p>
              <p>{reviewData.state} — {reviewData.pincode}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Project Summary</CardTitle>
            <CardDescription className="text-sm text-slate-500">Technical and obstruction details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Community Category</p>
              <p>{reviewData.communityCategory}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Project Type</p>
              <p>{reviewData.projectType}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">System Capacity</p>
              <p>{reviewData.capacityKw} kW</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">South Obstruction</p>
              <p>{reviewData.southSideObstruction}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Bill & Location</CardTitle>
            <CardDescription className="text-sm text-slate-500">Uploaded file and estimated project site.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-slate-900">Electricity Bill</p>
                  <p>{reviewData.electricityBill}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">Location</p>
                  <p>{reviewData.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="shadow-sm border-slate-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Lead Assessment</CardTitle>
            <CardDescription className="text-sm text-slate-500">A quick checklist before submission.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Identity Verified', value: 'Yes' },
              { label: 'Bill Uploaded', value: 'Yes' },
              { label: 'Site Ready', value: 'Yes' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="mt-2 text-slate-600">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Submission Ready</CardTitle>
            <CardDescription className="text-sm text-slate-500">Final step after review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Review complete</p>
              <p>All required fields have been captured for the lead.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Submit with confidence</p>
              <p>The lead will be routed to the field operations queue.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link href="/leads/new" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Edit
          </Button>
        </Link>
        <Link href="/success" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2">
            Submit
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
