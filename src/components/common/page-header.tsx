import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  tag?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, tag, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm', className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
            {tag ? <Badge variant="secondary">{tag}</Badge> : null}
            <span>OMSU</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">{description}</p>
          </div>
        </div>
        {actions ? <div className="flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div> : null}
      </div>
    </div>
  );
}
