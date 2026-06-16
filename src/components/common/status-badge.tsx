import { Badge } from '@/components/ui/badge';
import type { ReactNode } from 'react';

export type StatusBadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

const variantMap: Record<StatusBadgeVariant, { variant: 'success' | 'secondary' | 'destructive' | 'outline' | 'default'; title?: string }> = {
  success: { variant: 'success' },
  warning: { variant: 'secondary' },
  danger: { variant: 'destructive' },
  neutral: { variant: 'outline' },
  info: { variant: 'default' },
};

interface StatusBadgeProps {
  label: string;
  variant?: StatusBadgeVariant;
  icon?: ReactNode;
  className?: string;
}

export function StatusBadge({ label, variant = 'neutral', icon, className }: StatusBadgeProps) {
  return (
    <Badge variant={variantMap[variant].variant} className={className}>
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
    </Badge>
  );
}
