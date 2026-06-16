import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  description?: string;
  footer?: ReactNode;
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function SectionCard({ title, description, action, footer, className, children }: SectionCardProps) {
  return (
    <Card className={cn('rounded-3xl border-slate-200 shadow-sm', className)}>
      <CardHeader className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
          {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
        </div>
        {action ? <div className="mt-4 sm:mt-0">{action}</div> : null}
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
      {footer ? <div className="border-t border-slate-100 p-6">{footer}</div> : null}
    </Card>
  );
}
