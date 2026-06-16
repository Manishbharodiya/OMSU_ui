import { Activity, FileWarning, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

interface LoadingStateProps {
  title?: string;
  description?: string;
  message?: string;
  className?: string;
}

export function LoadingState({
  title,
  description,
  message = 'Loading data...',
  className,
}: LoadingStateProps) {
  return (
    <div className={cn('rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
        <Activity className="h-6 w-6 animate-spin" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title ?? message}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description ?? 'Please wait while we retrieve the latest records.'}</p>
    </div>
  );
}

interface ErrorStateProps {
  title: string;
  description: string;
  retry?: ReactNode;
  className?: string;
}

export function ErrorState({ title, description, retry, className }: ErrorStateProps) {
  return (
    <div className={cn('rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
        <FileWarning className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-rose-700">{description}</p>
      {retry ? <div className="mt-6">{retry}</div> : null}
    </div>
  );
}
