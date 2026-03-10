import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

type Variant = 'info' | 'warning' | 'success' | 'error';

const styles: Record<Variant, { bg: string; border: string; icon: string; Icon: typeof Info }> = {
  info: { bg: 'bg-sky-950/30', border: 'border-sky-800', icon: 'text-sky-400', Icon: Info },
  warning: { bg: 'bg-amber-950/30', border: 'border-amber-800', icon: 'text-amber-400', Icon: AlertTriangle },
  success: { bg: 'bg-emerald-950/30', border: 'border-emerald-800', icon: 'text-emerald-400', Icon: CheckCircle },
  error: { bg: 'bg-red-950/30', border: 'border-red-800', icon: 'text-red-400', Icon: XCircle },
};

interface AlertBoxProps {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}

export default function AlertBox({ variant = 'info', title, children }: AlertBoxProps) {
  const s = styles[variant];
  const Icon = s.Icon;
  return (
    <div className={clsx('rounded-xl border p-4 my-4 flex gap-3', s.bg, s.border)}>
      <Icon size={20} className={clsx('shrink-0 mt-0.5', s.icon)} />
      <div>
        {title && <p className={clsx('font-semibold mb-1', s.icon)}>{title}</p>}
        <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
