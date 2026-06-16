'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/page-header';
import { SectionCard } from '@/components/common/section-card';
import { FormField } from '@/components/common/form-field';
import { FormSelect } from '@/components/common/form-select';
import { LoadingState, ErrorState } from '@/components/common/state-messages';

const communityOptions = ['SC', 'ST', 'OBC', 'Others'];
const projectTypes = ['Residential', 'Commercial', 'Industrial'];
const obstructionOptions = ['No Obstruction', 'Tree', 'Building', 'Water Tank', 'Other'];

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
};

type FormState = typeof initialState;
type FormErrors = Partial<Record<keyof FormState, string>>;

export default function NewLeadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [draftSaved, setDraftSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      router.push('/leads/upload-bill');
    } catch {
      setSubmitError('Unable to proceed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Consumer Details Form"
        description="Complete the lead intake form with consumer, community, and project details before continuing to the bill upload step."
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
        <LoadingState
          title="Submitting lead"
          description="Saving data and preparing your next step."
        />
      ) : null}

      <form onSubmit={handleNext} className="space-y-6">
        <SectionCard title="Section 1: Consumer Information" description="Collect the consumer contact and location details for field intake.">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Consumer Name" htmlFor="consumerName" error={errors.consumerName}>
              <Input
                id="consumerName"
                value={formData.consumerName}
                onChange={(event) => handleChange('consumerName', event.target.value)}
                placeholder="Sunita Devi"
              />
            </FormField>
            <FormField label="Mobile Number" htmlFor="mobileNumber" error={errors.mobileNumber} hint="10 digits only">
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(event) => handleChange('mobileNumber', event.target.value)}
                placeholder="9876543210"
              />
            </FormField>
            <FormField label="Consumer Number" htmlFor="consumerNumber" error={errors.consumerNumber}>
              <Input
                id="consumerNumber"
                value={formData.consumerNumber}
                onChange={(event) => handleChange('consumerNumber', event.target.value)}
                placeholder="C-123456789"
              />
            </FormField>
            <FormField label="Address" htmlFor="address" error={errors.address}>
              <Input
                id="address"
                value={formData.address}
                onChange={(event) => handleChange('address', event.target.value)}
                placeholder="House No. 12, Main Road"
              />
            </FormField>
            <FormField label="Village" htmlFor="village" error={errors.village}>
              <Input
                id="village"
                value={formData.village}
                onChange={(event) => handleChange('village', event.target.value)}
                placeholder="Mirasol"
              />
            </FormField>
            <FormField label="District" htmlFor="district" error={errors.district}>
              <Input
                id="district"
                value={formData.district}
                onChange={(event) => handleChange('district', event.target.value)}
                placeholder="Pune"
              />
            </FormField>
            <FormField label="State" htmlFor="state" error={errors.state}>
              <Input
                id="state"
                value={formData.state}
                onChange={(event) => handleChange('state', event.target.value)}
                placeholder="Maharashtra"
              />
            </FormField>
            <FormField label="Pincode" htmlFor="pincode" error={errors.pincode}>
              <Input
                id="pincode"
                type="number"
                value={formData.pincode}
                onChange={(event) => handleChange('pincode', event.target.value)}
                placeholder="411045"
              />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Section 2: Community Category" description="Select the consumer's socio-economic classification.">
          <div className="grid gap-4 max-w-md">
            <FormSelect
              label="Community Category"
              htmlFor="communityCategory"
              value={formData.communityCategory}
              onChange={(value) => handleChange('communityCategory', value)}
              options={communityOptions.map((option) => ({ value: option, label: option }))}
            />
          </div>
        </SectionCard>

        <SectionCard title="Section 3: Project Information" description="Capture the system type and planned generation capacity.">
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
                      onChange={(event) => handleChange('projectType', event.target.value)}
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
                onChange={(event) => handleChange('capacityKw', event.target.value)}
              />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Section 4: South Side Obstruction" description="Select any obstruction on the south-facing roof side.">
          <div className="max-w-md">
            <FormSelect
              label="Obstruction Type"
              htmlFor="southSideObstruction"
              value={formData.southSideObstruction}
              onChange={(value) => handleChange('southSideObstruction', value)}
              options={obstructionOptions.map((option) => ({ value: option, label: option }))}
            />
          </div>
        </SectionCard>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            {isSubmitting ? 'Saving...' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
