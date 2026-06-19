'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Save,
  Image as ImageIcon,
  X,
  Video,
  Upload,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/page-header';
import { SectionCard } from '@/components/common/section-card';
import { FormField } from '@/components/common/form-field';
import { FormSelect } from '@/components/common/form-select';
import { LoadingState, ErrorState } from '@/components/common/state-messages';

/* ─── static option lists ────────────────────────────────────────────────── */
const communityOptions = ['SC', 'ST', 'OBC', 'Others'];
const projectTypes = ['Residential', 'Commercial', 'Industrial'];
const obstructionOptions = ['No Obstruction', 'Tree', 'Building', 'Water Tank', 'Other'];

/* ─── form default values ────────────────────────────────────────────────── */
const initialState = {
  consumerName: '',
  mobileNumber: '',
  consumerNumber: '',
  address: '',
  village: '',
  district: '',
  state: '',
  pincode: '',
  communityCategory: 'SC',
  projectType: 'Residential',
  capacityKw: '',
  southSideObstruction: 'No Obstruction',
  // new site fields
  numberOfFloors: '',
  floorHeightM: '',
  lengthNS: '',
  lengthEW: '',
  obstructionNorth: '',
  obstructionSouth: '',
  obstructionEast: '',
  obstructionWest: '',
  inverterLocationFloor: '',
  earthingLocation: '',
  structureLocationImage: '',
  clientMeterFloor: '',
  clientMeterDirection: '',
  acCableRouting: 'internal',
  earthingCableRouting: 'internal',
};

type FormState = typeof initialState;
type FormErrors = Partial<Record<keyof FormState, string>>;

/* ─── media file helpers ─────────────────────────────────────────────────── */
interface MediaFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function createMediaFile(file: File): MediaFile {
  return {
    id: `${file.name}-${Date.now()}-${Math.random()}`,
    file,
    preview: URL.createObjectURL(file),
    name: file.name,
    size: formatBytes(file.size),
  };
}

/* ─── sub-component: drag-drop zone ─────────────────────────────────────── */
interface DropZoneProps {
  id: string;
  accept: string;
  multiple?: boolean;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  accentColor: string;
  onFiles: (files: File[]) => void;
}

function DropZone({ id, accept, multiple = true, label, sublabel, icon, accentColor, onFiles }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      onFiles(Array.from(files));
    },
    [onFiles],
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      style={{
        borderColor: dragging ? accentColor : undefined,
        background: dragging ? `${accentColor}10` : undefined,
      }}
      className={`group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 px-6 py-10 text-center transition-all hover:border-slate-300 hover:bg-slate-50/60`}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => handle(e.target.files)}
      />
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="mt-0.5 text-xs text-slate-400">{sublabel}</p>
      </div>
      <span
        className="rounded-full px-4 py-1.5 text-xs font-medium text-white transition-opacity"
        style={{ backgroundColor: accentColor }}
      >
        Browse Files
      </span>
    </div>
  );
}

/* ─── sub-component: image thumbnail card ────────────────────────────────── */
function ImageThumb({ item, onRemove, badge }: { item: MediaFile; onRemove: () => void; badge?: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.preview}
        alt={item.name}
        className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {badge && (
        <span className="absolute left-2 top-2 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white shadow">
          {badge}
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
      >
        <X className="h-3 w-3" />
      </button>
      <div className="px-3 py-2">
        <p className="truncate text-xs font-medium text-slate-700">{item.name}</p>
        <p className="text-[10px] text-slate-400">{item.size}</p>
      </div>
    </div>
  );
}

/* ─── sub-component: video card ─────────────────────────────────────────── */
function VideoCard({ item, onRemove }: { item: MediaFile; onRemove: () => void }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* video preview */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-900">
        <video
          src={item.preview}
          className="h-full w-full object-cover opacity-80"
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm">
            <Play className="h-4 w-4 fill-slate-800 text-slate-800" />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
      >
        <X className="h-3 w-3" />
      </button>
      <div className="px-3 py-2">
        <p className="truncate text-xs font-medium text-slate-700">{item.name}</p>
        <p className="text-[10px] text-slate-400">{item.size}</p>
      </div>
    </div>
  );
}

/* ─── status badge ───────────────────────────────────────────────────────── */
function UploadBadge({ count, label, color }: { count: number; label: string; color: string }) {
  if (count === 0) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      <CheckCircle2 className="h-3 w-3" />
      {count} {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main page
   ═══════════════════════════════════════════════════════════════════════════ */
export default function NewLeadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [draftSaved, setDraftSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  /* media state */
  const [images360, setImages360] = useState<MediaFile[]>([]);
  const [regularImages, setRegularImages] = useState<MediaFile[]>([]);
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [imageError, setImageError] = useState('');
  const [videoError, setVideoError] = useState('');

  /* ── form helpers ── */
  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!formData.consumerName.trim()) nextErrors.consumerName = 'Consumer name is required';
    if (!formData.mobileNumber.trim()) {
      nextErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.consumerNumber.trim()) nextErrors.consumerNumber = 'Consumer number is required';
    if (!formData.address.trim()) nextErrors.address = 'Address is required';
    if (!formData.village.trim()) nextErrors.village = 'Village is required';
    if (!formData.district.trim()) nextErrors.district = 'District is required';
    if (!formData.state.trim()) nextErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      nextErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      nextErrors.pincode = 'Enter a valid 6-digit pincode';
    }
    if (!formData.capacityKw.trim()) {
      nextErrors.capacityKw = 'Capacity is required';
    } else {
      const capacity = Number(formData.capacityKw);
      if (Number.isNaN(capacity) || capacity < 1 || capacity > 100) {
        nextErrors.capacityKw = 'Enter a value between 1 and 100 kW';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setSubmitError('');
    setTimeout(() => {
      setIsSaving(false);
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3600);
    }, 800);
  };

  const handleNext = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    // For UI-only flow: save all form data + media refs to sessionStorage and navigate
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        numberOfFloors: (formData as any).numberOfFloors || '',
        floorHeightM: (formData as any).floorHeightM || '',
        lengthNS: (formData as any).lengthNS || '',
        lengthEW: (formData as any).lengthEW || '',
        obstructionNorth: (formData as any).obstructionNorth || '',
        obstructionSouth: (formData as any).obstructionSouth || '',
        obstructionEast: (formData as any).obstructionEast || '',
        obstructionWest: (formData as any).obstructionWest || '',
        inverterLocationFloor: (formData as any).inverterLocationFloor || '',
        earthingLocation: (formData as any).earthingLocation || '',
        structureLocationImage: (formData as any).structureLocationImage || '',
        clientMeterLocation: {
          floor: (formData as any).clientMeterFloor || '',
          direction: (formData as any).clientMeterDirection || '',
        },
        acCableRouting: (formData as any).acCableRouting || 'internal',
        earthingCableRouting: (formData as any).earthingCableRouting || 'internal',
        images360: images360.map((i) => ({ name: i.name, size: i.size })),
        regularImages: regularImages.map((i) => ({ name: i.name, size: i.size })),
        videos: videos.map((v) => ({ name: v.name, size: v.size })),
      };

      sessionStorage.setItem('leadData', JSON.stringify(payload));
      // small delay to mimic save
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push('/leads/review');
    } catch (err) {
      setSubmitError('Unable to proceed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── image handlers ── */
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20 MB

  const addImages360 = useCallback((files: File[]) => {
    setImageError('');
    const valid = files.filter((f) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
        setImageError('Only JPG, PNG, or WebP images are allowed.');
        return false;
      }
      if (f.size > MAX_IMAGE_SIZE) {
        setImageError('Each image must be under 20 MB.');
        return false;
      }
      return true;
    });
    setImages360((prev) => [...prev, ...valid.map(createMediaFile)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRegularImages = useCallback((files: File[]) => {
    setImageError('');
    const valid = files.filter((f) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
        setImageError('Only JPG, PNG, or WebP images are allowed.');
        return false;
      }
      if (f.size > MAX_IMAGE_SIZE) {
        setImageError('Each image must be under 20 MB.');
        return false;
      }
      return true;
    });
    setRegularImages((prev) => [...prev, ...valid.map(createMediaFile)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeImage360 = (id: string) => {
    setImages360((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const removeRegularImage = (id: string) => {
    setRegularImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  // structure location image (single)
  const [structureImage, setStructureImage] = useState<MediaFile | null>(null);
  const addStructureImage = useCallback((files: File[]) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
      setImageError('Only JPG, PNG, or WebP images are allowed.');
      return;
    }
    if (f.size > MAX_IMAGE_SIZE) {
      setImageError('Each image must be under 20 MB.');
      return;
    }
    setStructureImage(createMediaFile(f));
    // save file name into formData
    handleChange('structureLocationImage' as keyof FormState, f.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── video handlers ── */
  const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200 MB

  const addVideos = useCallback((files: File[]) => {
    setVideoError('');
    const valid = files.filter((f) => {
      if (!ACCEPTED_VIDEO_TYPES.includes(f.type)) {
        setVideoError('Only MP4, WebM, MOV, or AVI videos are allowed.');
        return false;
      }
      if (f.size > MAX_VIDEO_SIZE) {
        setVideoError('Each video must be under 200 MB.');
        return false;
      }
      return true;
    });
    setVideos((prev) => [...prev, ...valid.map(createMediaFile)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeVideo = (id: string) => {
    setVideos((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  /* ── render ── */
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Consumer Details Form"
        description="Complete the lead intake form with consumer, community, project details, site images and videos before continuing."
        tag="New Lead"
        actions={
          <div className="flex flex-wrap gap-3">
            <Link href="/leads">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Leads
              </Button>
            </Link>
            <Button type="button" variant="secondary" onClick={handleSaveDraft} disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
          </div>
        }
      />

      {submitError ? <ErrorState title="Submission error" description={submitError} /> : null}
      {draftSaved ? <SectionCard title="Draft saved" description="Your consumer intake draft has been saved locally." /> : null}
      {isSubmitting ? (
        <LoadingState title="Submitting lead" description="Saving data and preparing your next step." />
      ) : null}

      <form onSubmit={handleNext} className="space-y-6">
        {/* ── Section 1: Consumer Information ── */}
        <SectionCard
          title="Section 1: Consumer Information"
          description="Collect the consumer contact and location details for field intake."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Consumer Name" htmlFor="consumerName" error={errors.consumerName}>
              <Input
                id="consumerName"
                value={formData.consumerName}
                onChange={(e) => handleChange('consumerName', e.target.value)}
                placeholder="Sunita Devi"
              />
            </FormField>
            <FormField label="Mobile Number" htmlFor="mobileNumber" error={errors.mobileNumber} hint="10 digits only">
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
                placeholder="9876543210"
              />
            </FormField>
            <FormField label="Consumer Number" htmlFor="consumerNumber" error={errors.consumerNumber}>
              <Input
                id="consumerNumber"
                value={formData.consumerNumber}
                onChange={(e) => handleChange('consumerNumber', e.target.value)}
                placeholder="C-123456789"
              />
            </FormField>
            <FormField label="Address" htmlFor="address" error={errors.address}>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="House No. 12, Main Road"
              />
            </FormField>
            <FormField label="Village" htmlFor="village" error={errors.village}>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => handleChange('village', e.target.value)}
                placeholder="Mirasol"
              />
            </FormField>
            <FormField label="District" htmlFor="district" error={errors.district}>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                placeholder="Pune"
              />
            </FormField>
            <FormField label="State" htmlFor="state" error={errors.state}>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="Maharashtra"
              />
            </FormField>
            <FormField label="Pincode" htmlFor="pincode" error={errors.pincode}>
              <Input
                id="pincode"
                type="number"
                value={formData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                placeholder="411045"
              />
            </FormField>
          </div>
        </SectionCard>

        {/* ── Section 2: Community Category ── */}
        <SectionCard
          title="Section 2: Community Category"
          description="Select the consumer's socio-economic classification."
        >
          <div className="grid gap-4 max-w-md">
            <FormSelect
              label="Community Category"
              htmlFor="communityCategory"
              value={formData.communityCategory}
              onChange={(value) => handleChange('communityCategory', value)}
              options={communityOptions.map((o) => ({ value: o, label: o }))}
            />
          </div>
        </SectionCard>

        {/* ── Section 3: Project Information ── */}
        <SectionCard
          title="Section 3: Project Information"
          description="Capture the system type and planned generation capacity."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Project Type" htmlFor="projectType">
              <div className="grid gap-2">
                {projectTypes.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      formData.projectType === option
                        ? 'border-primary bg-primary/10 text-slate-950'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={option}
                      checked={formData.projectType === option}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label="Capacity (kW)" htmlFor="capacityKw" error={errors.capacityKw} hint="1 - 100 kW">
              <Input
                id="capacityKw"
                type="number"
                min={1}
                max={100}
                value={formData.capacityKw}
                placeholder="15"
                onChange={(e) => handleChange('capacityKw', e.target.value)}
              />
            </FormField>
          </div>
        </SectionCard>

        {/* ── Section 4: South Side Obstruction ── */}
        <SectionCard
          title="Section 4: South Side Obstruction"
          description="Select any obstruction on the south-facing roof side."
        >
          <div className="max-w-md">
            <FormSelect
              label="Obstruction Type"
              htmlFor="southSideObstruction"
              value={formData.southSideObstruction}
              onChange={(value) => handleChange('southSideObstruction', value)}
              options={obstructionOptions.map((o) => ({ value: o, label: o }))}
            />
          </div>
        </SectionCard>

        {/* ══════════════════════════════════════════════════════════════════
            Section: Site Details
           ══════════════════════════════════════════════════════════════════ */}
        <SectionCard
          title="Section: Site Details"
          description="Building dimensions, obstructions and inverter/meter locations."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="No. of Floors" htmlFor="numberOfFloors">
              <Input
                id="numberOfFloors"
                value={(formData as any).numberOfFloors}
                onChange={(e) => handleChange('numberOfFloors' as keyof FormState, e.target.value)}
                placeholder="Enter total no of floors of the building"
              />
            </FormField>
            <FormField label="Floor Height (m)" htmlFor="floorHeightM">
              <Input
                id="floorHeightM"
                value={(formData as any).floorHeightM}
                onChange={(e) => handleChange('floorHeightM' as keyof FormState, e.target.value)}
                placeholder="Enter floor height in meters (numeric only)"
              />
            </FormField>
            <FormField label="Length N–S (m)" htmlFor="lengthNS">
              <Input
                id="lengthNS"
                value={(formData as any).lengthNS}
                onChange={(e) => handleChange('lengthNS' as keyof FormState, e.target.value)}
                placeholder="Enter numeric value only"
              />
            </FormField>
            <FormField label="Length E–W (m)" htmlFor="lengthEW">
              <Input
                id="lengthEW"
                value={(formData as any).lengthEW}
                onChange={(e) => handleChange('lengthEW' as keyof FormState, e.target.value)}
                placeholder="Enter numeric value only"
              />
            </FormField>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-slate-900">Obstructions (enter no. of floors)</p>
            <div className="mt-2 grid grid-cols-4 gap-3">
              <FormField label="North" htmlFor="obstructionNorth">
                <Input
                  id="obstructionNorth"
                  value={(formData as any).obstructionNorth}
                  onChange={(e) => handleChange('obstructionNorth' as keyof FormState, e.target.value)}
                  placeholder="Enter numeric value only"
                />
              </FormField>
              <FormField label="South" htmlFor="obstructionSouth">
                <Input
                  id="obstructionSouth"
                  value={(formData as any).obstructionSouth}
                  onChange={(e) => handleChange('obstructionSouth' as keyof FormState, e.target.value)}
                  placeholder="Enter numeric value only"
                />
              </FormField>
              <FormField label="East" htmlFor="obstructionEast">
                <Input
                  id="obstructionEast"
                  value={(formData as any).obstructionEast}
                  onChange={(e) => handleChange('obstructionEast' as keyof FormState, e.target.value)}
                  placeholder="Enter numeric value only"
                />
              </FormField>
              <FormField label="West" htmlFor="obstructionWest">
                <Input
                  id="obstructionWest"
                  value={(formData as any).obstructionWest}
                  onChange={(e) => handleChange('obstructionWest' as keyof FormState, e.target.value)}
                  placeholder="Enter numeric value only"
                />
              </FormField>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FormField label="Inverter Location (floor)" htmlFor="inverterLocationFloor">
              <Input
                id="inverterLocationFloor"
                value={(formData as any).inverterLocationFloor}
                onChange={(e) => handleChange('inverterLocationFloor' as keyof FormState, e.target.value)}
                placeholder="Enter inverter location floor"
              />
            </FormField>
            <FormField label="Earthing Location" htmlFor="earthingLocation">
              <FormSelect
                label="Earthing Location"
                htmlFor="earthingLocation"
                value={(formData as any).earthingLocation}
                onChange={(value) => handleChange('earthingLocation' as keyof FormState, value)}
                options={['east','west','north','south','north east','north west','south east','south west'].map(o => ({ value: o, label: o }))}
              />
            </FormField>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FormField label="Client Meter Floor" htmlFor="clientMeterFloor">
              <Input
                id="clientMeterFloor"
                value={(formData as any).clientMeterFloor}
                onChange={(e) => handleChange('clientMeterFloor' as keyof FormState, e.target.value)}
                placeholder="Floor"
              />
            </FormField>
            <FormField label="Client Meter Direction" htmlFor="clientMeterDirection">
              <Input
                id="clientMeterDirection"
                value={(formData as any).clientMeterDirection}
                onChange={(e) => handleChange('clientMeterDirection' as keyof FormState, e.target.value)}
                placeholder="Direction (e.g., East)"
              />
            </FormField>
          </div>
        </SectionCard>

        {/* New Section: Cabling & Earthing */}
        <SectionCard
          title="Section: Cabling & Earthing"
          description="AC cable routing and earthing cable routing details."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="AC Cable Routing" htmlFor="acCableRouting">
              <FormSelect
                label="AC Cable Routing"
                htmlFor="acCableRouting"
                value={(formData as any).acCableRouting}
                onChange={(value) => handleChange('acCableRouting' as keyof FormState, value)}
                options={[{ value: 'internal', label: 'Internal' }, { value: 'external', label: 'External' }]}
              />
            </FormField>
            <FormField label="Earthing Cable Routing" htmlFor="earthingCableRouting">
              <FormSelect
                label="Earthing Cable Routing"
                htmlFor="earthingCableRouting"
                value={(formData as any).earthingCableRouting}
                onChange={(value) => handleChange('earthingCableRouting' as keyof FormState, value)}
                options={[{ value: 'internal', label: 'Internal' }, { value: 'external', label: 'External' }]}
              />
            </FormField>
          </div>
        </SectionCard>

        {/* ══════════════════════════════════════════════════════════════════
            Section 5: Upload Images (360° + Regular)
           ══════════════════════════════════════════════════════════════════ */}
        <SectionCard
          title="Section 5: Site Images"
          description="Upload 360° panoramic images of the installation site and regular site photos. Supported: JPG, PNG, WebP (max 20 MB each)."
        >
          {imageError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {imageError}
            </div>
          )}

          {/* ── 360° panoramic images ── */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
                <RotateCw className="h-4 w-4 text-violet-600" />
              </div>
              <span className="text-sm font-semibold text-slate-800">360° Panoramic Images</span>
              <UploadBadge count={images360.length} label="uploaded" color="#7c3aed" />
            </div>

            <DropZone
              id="images360"
              accept="image/jpeg,image/png,image/webp"
              multiple
              label="Drag & drop 360° images here"
              sublabel="Equirectangular or spherical panorama • JPG / PNG / WebP • Max 20 MB"
              icon={<RotateCw className="h-7 w-7" />}
              accentColor="#7c3aed"
              onFiles={addImages360}
            />

            {images360.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {images360.map((item) => (
                  <ImageThumb
                    key={item.id}
                    item={item}
                    onRemove={() => removeImage360(item.id)}
                    badge="360°"
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── regular site images ── */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100">
                <ImageIcon className="h-4 w-4 text-sky-600" />
              </div>
              <span className="text-sm font-semibold text-slate-800">Regular Site Photos</span>
              <UploadBadge count={regularImages.length} label="uploaded" color="#0284c7" />
            </div>

            <DropZone
              id="siteImages"
              accept="image/jpeg,image/png,image/webp"
              multiple
              label="Drag & drop site photos here"
              sublabel="Roof, inverter, meter, electrical panel photos • JPG / PNG / WebP • Max 20 MB"
              icon={<ImageIcon className="h-7 w-7" />}
              accentColor="#0284c7"
              onFiles={addRegularImages}
            />

            {regularImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {regularImages.map((item) => (
                  <ImageThumb
                    key={item.id}
                    item={item}
                    onRemove={() => removeRegularImage(item.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* summary strip */}
          {(images360.length > 0 || regularImages.length > 0) && (
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <Upload className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-500">
                <strong className="text-slate-700">{images360.length + regularImages.length}</strong> image
                {images360.length + regularImages.length !== 1 ? 's' : ''} selected
                {images360.length > 0 && (
                  <> &mdash; <strong className="text-violet-600">{images360.length} × 360°</strong></>
                )}
                {regularImages.length > 0 && (
                  <> &mdash; <strong className="text-sky-600">{regularImages.length} × site photos</strong></>
                )}
              </span>
            </div>
          )}

          {/* Structure location image */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100">
                <ImageIcon className="h-4 w-4 text-slate-600" />
              </div>
              <span className="text-sm font-semibold text-slate-800">Structure Location (image)</span>
            </div>
            <DropZone
              id="structureImage"
              accept="image/jpeg,image/png,image/webp"
              multiple={false}
              label="Upload structure location image"
              sublabel="Upload a single image showing structure location"
              icon={<ImageIcon className="h-7 w-7" />}
              accentColor="#64748b"
              onFiles={addStructureImage}
            />
            {structureImage && (
              <div className="mt-3 w-48">
                <ImageThumb item={structureImage} onRemove={() => { setStructureImage(null); handleChange('structureLocationImage' as keyof FormState, ''); }} badge="Structure" />
              </div>
            )}
          </div>

        </SectionCard>

        {/* ══════════════════════════════════════════════════════════════════
            Section 6: Site Videos

        <SectionCard
          title="Section 6: Site Videos"
          description="Upload walkthrough or inspection videos of the installation site. Supported: MP4, WebM, MOV, AVI (max 200 MB each)."
        >
          {videoError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {videoError}
            </div>
          )}

          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
              <Video className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Site Walkthrough Videos</span>
            <UploadBadge count={videos.length} label="uploaded" color="#059669" />
          </div>

          <DropZone
            id="siteVideos"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            multiple
            label="Drag & drop videos here"
            sublabel="Site walkthrough, roof survey, meter inspection • MP4 / WebM / MOV / AVI • Max 200 MB"
            icon={<Video className="h-7 w-7" />}
            accentColor="#059669"
            onFiles={addVideos}
          />

          {videos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {videos.map((item) => (
                <VideoCard key={item.id} item={item} onRemove={() => removeVideo(item.id)} />
              ))}
            </div>
          )}

          {videos.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <Video className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-500">
                <strong className="text-slate-700">{videos.length}</strong> video
                {videos.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}
        </SectionCard>

        {/* ── submit row ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? 'Saving...' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
