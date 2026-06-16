import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface FormSelectProps {
  label: string;
  htmlFor: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  hint?: string;
  error?: string;
  children?: ReactNode;
}

export function FormSelect({ label, htmlFor, value, onChange, options, hint, error }: FormSelectProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      </div>
      <select
        id={htmlFor}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20',
          error ? 'border-destructive text-destructive focus:border-destructive focus:ring-destructive/30' : 'border-slate-200'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
