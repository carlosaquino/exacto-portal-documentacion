interface Field {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

interface FieldTableProps {
  fields: Field[];
  title?: string;
}

export default function FieldTable({ fields, title }: FieldTableProps) {
  return (
    <div className="my-4 overflow-x-auto">
      {title && <h4 className="text-sm font-semibold text-slate-300 mb-2">{title}</h4>}
      <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-slate-800/80">
            <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Campo</th>
            <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Tipo</th>
            <th className="text-center px-4 py-2.5 text-slate-400 font-medium">Req</th>
            <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((f) => (
            <tr key={f.name} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-2.5">
                <code className="text-sky-400 text-xs bg-sky-950/30 px-1.5 py-0.5 rounded">{f.name}</code>
              </td>
              <td className="px-4 py-2.5">
                <span className="text-amber-400 text-xs font-mono">{f.type}</span>
              </td>
              <td className="px-4 py-2.5 text-center">
                {f.required === true && <span className="text-emerald-400">&#10003;</span>}
                {f.required === false && <span className="text-slate-600">-</span>}
              </td>
              <td className="px-4 py-2.5 text-slate-400">{f.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
