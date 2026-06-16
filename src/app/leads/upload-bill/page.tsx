'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  FileText,
  ImageIcon,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/common/page-header';

const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'application/pdf'];

export default function UploadBillPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'uploaded' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return selectedFile.type.startsWith('image/') ? URL.createObjectURL(selectedFile) : null;
  }, [selectedFile]);

  const handleFiles = (files: FileList | null) => {
    setErrorMessage('');
    if (!files?.length) return;
    const file = files[0];
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      setErrorMessage('Only JPG, PNG, and PDF files are accepted.');
      return;
    }
    setSelectedFile(file);
    setUploadStatus('idle');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event.dataTransfer.files);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setErrorMessage('Choose a bill file before uploading.');
      return;
    }
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('uploaded');
    }, 1200);
  };

  const handleNext = () => {
    if (uploadStatus !== 'uploaded') {
      setErrorMessage('Please upload the bill before moving to the next step.');
      return;
    }
    router.push('/leads/location');
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <PageHeader
          title="Upload Consumer Bill"
          description="Submit the consumer's latest electricity bill to complete the intake process."
          tag="Bill Upload"
          actions={
            <Link href="/leads/new">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Form
              </Button>
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              onDragEnter={(event) => event.preventDefault()}
              className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-slate-400 hover:bg-slate-100"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm">
                <Upload className="h-8 w-8" />
              </div>
              <p className="mt-6 text-sm font-semibold text-slate-900">Drag and drop your bill here</p>
              <p className="mt-2 text-sm text-slate-500">Accepted formats: JPG, PNG, PDF</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileText className="h-4 w-4" />
                  Upload File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  className="hidden"
                  onChange={(event) => handleFiles(event.target.files)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-3xl bg-slate-100 text-slate-700">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Camera Upload Placeholder</p>
                  <p className="mt-2 text-sm text-slate-500">Use this area to add a camera capture flow in the future.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Upload status</p>
                  <p className="mt-1 text-sm text-slate-500">Mock upload functionality with preview and file validation.</p>
                </div>
                <Badge variant={uploadStatus === 'uploaded' ? 'success' : uploadStatus === 'error' ? 'destructive' : 'secondary'}>
                  {uploadStatus === 'idle' && 'Ready'}
                  {uploadStatus === 'uploading' && 'Uploading'}
                  {uploadStatus === 'uploaded' && 'Uploaded'}
                  {uploadStatus === 'error' && 'Error'}
                </Badge>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="button" className="gap-2" onClick={handleUpload}>
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
                <Button variant="outline" type="button" onClick={() => setSelectedFile(null)}>
                  Clear
                </Button>
              </div>
              {errorMessage && <p className="mt-4 text-sm text-destructive">{errorMessage}</p>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Preview</p>
                  <p className="mt-1 text-sm text-slate-500">See the uploaded file details before moving ahead.</p>
                </div>
                {selectedFile ? (
                  <Badge variant="outline">{selectedFile.type.split('/')[1].toUpperCase()}</Badge>
                ) : null}
              </div>

              {selectedFile ? (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Uploaded bill preview"
                      unoptimized
                      width={900}
                      height={580}
                      className="h-72 w-full rounded-3xl object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-slate-500">
                      <ImageIcon className="h-6 w-6" />
                      <p className="text-sm font-semibold">PDF file ready to upload</p>
                      <p className="text-sm text-slate-400">{selectedFile.name}</p>
                    </div>
                  )}
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-900">File:</span> {selectedFile.name}</p>
                    <p><span className="font-semibold text-slate-900">Size:</span> {(selectedFile.size / 1024).toFixed(1)} KB</p>
                    <p><span className="font-semibold text-slate-900">Type:</span> {selectedFile.type}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                  <p className="font-semibold text-slate-900">No bill uploaded yet</p>
                  <p className="mt-2 text-sm">Upload a JPG, PNG, or PDF to preview the file here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link href="/leads/new" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto inline-flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button type="button" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
