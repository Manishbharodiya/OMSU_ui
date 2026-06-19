"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, FileText, MapPin, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/common/page-header';
/* eslint-disable jsx-a11y/alt-text */

const defaultReviewData = {
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
  // Site dimensions & structure
  numberOfFloors: '3',
  floorHeightM: '3.2',
  lengthNS: '20',
  lengthEW: '15',
  // Obstructions (enter numeric value: no. of floors)
  obstructionNorth: '0',
  obstructionSouth: '1',
  obstructionEast: '0',
  obstructionWest: '0',
  inverterLocationFloor: 'Rooftop',
  earthingLocation: 'north-east',
  structureLocationImage: 'structure-location.jpg',
  clientMeterLocation: { floor: 'Ground', direction: 'East' },
  acCableRouting: 'internal',
  earthingCableRouting: 'external',
  images360: [
    { id: 1, name: 'rooftop-360-view-1.jpg', size: '2.4 MB' },
    { id: 2, name: 'rooftop-360-view-2.jpg', size: '2.6 MB' },
    { id: 3, name: 'entrance-360-view.jpg', size: '2.2 MB' },
  ],
  videos: [
    { id: 1, name: 'site-walkthrough.mp4', duration: '2:34', size: '45.8 MB' },
    { id: 2, name: 'roof-condition-video.mp4', duration: '1:58', size: '38.2 MB' },
  ],
};

export default function LeadReviewPage() {
  const [reviewData, setReviewData] = useState(defaultReviewData);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('leadData');
      if (s) {
        const parsed = JSON.parse(s);
        // merge with defaults
        setReviewData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

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

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Site Details</CardTitle>
            <CardDescription className="text-sm text-slate-500">Building dimensions and structure information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4 grid grid-cols-2 gap-3">
              <div>
                <p className="font-medium text-slate-900">No. of Floors</p>
                <p>{reviewData.numberOfFloors}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Floor Height</p>
                <p>{reviewData.floorHeightM} m</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Length (N–S)</p>
                <p>{reviewData.lengthNS} m</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Length (E–W)</p>
                <p>{reviewData.lengthEW} m</p>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Obstructions (no. of floors)</p>
              <div className="mt-2 grid grid-cols-4 gap-2 text-center text-sm">
                <div className="rounded-lg bg-white p-2 border">N<br/><span className="font-semibold">{reviewData.obstructionNorth}</span></div>
                <div className="rounded-lg bg-white p-2 border">S<br/><span className="font-semibold">{reviewData.obstructionSouth}</span></div>
                <div className="rounded-lg bg-white p-2 border">E<br/><span className="font-semibold">{reviewData.obstructionEast}</span></div>
                <div className="rounded-lg bg-white p-2 border">W<br/><span className="font-semibold">{reviewData.obstructionWest}</span></div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Inverter Location</p>
              <p>{reviewData.inverterLocationFloor}</p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Structure Image</p>
                <p className="text-xs text-slate-500">{reviewData.structureLocationImage}</p>
              </div>
              <Badge variant="secondary" className="text-xs">Uploaded</Badge>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Client Meter Location</p>
              <p>{reviewData.clientMeterLocation.floor} • {reviewData.clientMeterLocation.direction}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Cabling &amp; Earthing</CardTitle>
            <CardDescription className="text-sm text-slate-500">Routing and earthing details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">AC Cable Routing</p>
              <p className="capitalize">{reviewData.acCableRouting}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Earthing Cable Routing</p>
              <p className="capitalize">{reviewData.earthingCableRouting}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Earthing Location</p>
              <p className="capitalize">{reviewData.earthingLocation}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Image className="h-5 w-5 text-blue-600" aria-hidden="true" />
              360° Images
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">Uploaded 360-degree panoramic images of the site.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reviewData.images360.length > 0 ? (
              <div className="space-y-2">
                {(reviewData.images360 || []).map((image: { id?: number; name: string; size?: string }) => (
                  <div key={image.id} className="rounded-lg bg-slate-50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                        <Image className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{image.name}</p>
                        <p className="text-xs text-slate-500">{image.size}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Uploaded</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 p-8 text-center">
                <Image className="h-8 w-8 text-slate-400 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm text-slate-500">No 360° images uploaded</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Video className="h-5 w-5 text-red-600" aria-hidden="true" />
              Videos
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">Uploaded video documentation of the site.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reviewData.videos.length > 0 ? (
              <div className="space-y-2">
                {(reviewData.videos || []).map((video: { id?: number; name: string; duration?: string; size?: string }) => (
                  <div key={video.id} className="rounded-lg bg-slate-50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-red-100 flex items-center justify-center">
                        <Video className="h-5 w-5 text-red-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{video.name}</p>
                        <p className="text-xs text-slate-500">{video.duration} • {video.size}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Uploaded</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 p-8 text-center">
                <Video className="h-8 w-8 text-slate-400 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm text-slate-500">No videos uploaded</p>
              </div>
            )}
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
