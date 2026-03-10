import clsx from 'clsx';

const colors: Record<string, string> = {
  GET: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30',
  POST: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  PUT: 'bg-amber-600/20 text-amber-400 border-amber-600/30',
  DELETE: 'bg-red-600/20 text-red-400 border-red-600/30',
  PATCH: 'bg-violet-600/20 text-violet-400 border-violet-600/30',
};

interface MethodBadgeProps {
  method: string;
  path?: string;
  className?: string;
}

export default function MethodBadge({ method, path, className }: MethodBadgeProps) {
  const upper = method.toUpperCase();
  return (
    <div className={clsx('flex items-center gap-3 my-3', className)}>
      <span
        className={clsx(
          'px-3 py-1 text-xs font-bold rounded-md border uppercase tracking-wider',
          colors[upper] ?? 'bg-slate-600/20 text-slate-400 border-slate-600/30'
        )}
      >
        {upper}
      </span>
      {path && (
        <code className="text-sm font-mono text-slate-300 bg-slate-800 px-3 py-1 rounded-md">
          {path}
        </code>
      )}
    </div>
  );
}
