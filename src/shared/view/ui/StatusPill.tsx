import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const statusPillVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        connected: 'bg-green-500/10 text-green-500',
        disconnected: 'bg-gray-500/10 text-gray-400',
        error: 'bg-red-500/10 text-red-500',
        warning: 'bg-yellow-500/10 text-yellow-500',
        processing: 'bg-blue-500/10 text-blue-500',
        idle: 'bg-gray-500/10 text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'idle',
    },
  }
);

type StatusPillProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusPillVariants> & {
    dot?: boolean;
  };

function StatusPill({ className, variant, dot = true, children, ...props }: StatusPillProps) {
  return (
    <span className={cn(statusPillVariants({ variant }), className)} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export { StatusPill, statusPillVariants };
