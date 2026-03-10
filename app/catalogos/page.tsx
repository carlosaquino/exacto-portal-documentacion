export default function CatalogosPage() {
  const catalogos = [
    {
      title: 'Tipos de Documento Electronico',
      items: [
        { code: '1', desc: 'Factura Electronica (FE)' },
        { code: '4', desc: 'Autofactura Electronica (AFE)' },
        { code: '5', desc: 'Nota de Credito Electronica (NCE)' },
        { code: '6', desc: 'Nota de Debito Electronica (NDE)' },
        { code: '7', desc: 'Nota de Remision Electronica (NRE)' },
      ],
    },
    {
      title: 'Condicion de Venta',
      items: [
        { code: 'CONTADO', desc: 'Venta al contado' },
        { code: 'CREDITO', desc: 'Venta a credito (requiere detalleCuotas)' },
      ],
    },
    {
      title: 'Tipo de Operacion',
      items: [
        { code: 'B2B', desc: 'Business to Business' },
        { code: 'B2C', desc: 'Business to Consumer' },
        { code: 'B2G', desc: 'Business to Government' },
        { code: 'B2F', desc: 'Business to Foreign' },
      ],
    },
    {
      title: 'Tipo de Documento del Receptor',
      items: [
        { code: 'RUC', desc: 'Registro Unico de Contribuyentes' },
        { code: 'CI', desc: 'Cedula de Identidad' },
        { code: 'PASAPORTE', desc: 'Pasaporte' },
        { code: 'CE', desc: 'Carnet de Extranjeria' },
      ],
    },
    {
      title: 'Tipo de Pago (tipoPago)',
      items: [
        { code: '1', desc: 'Efectivo' },
        { code: '2', desc: 'Cheque' },
        { code: '3', desc: 'Tarjeta de Credito' },
        { code: '4', desc: 'Tarjeta de Debito' },
        { code: '5', desc: 'Transferencia' },
        { code: '6', desc: 'Giro' },
        { code: '99', desc: 'Otro' },
      ],
    },
    {
      title: 'Afecta IVA (afectaIVA)',
      items: [
        { code: '1', desc: 'Gravado (tasaImpuesto: 5 o 10)' },
        { code: '3', desc: 'Exento (tasaImpuesto: 0)' },
      ],
    },
    {
      title: 'Tasas de IVA',
      items: [
        { code: '0', desc: 'Exento' },
        { code: '5', desc: '5% — IVA reducido' },
        { code: '10', desc: '10% — IVA estandar' },
      ],
    },
    {
      title: 'Unidades de Medida (comunes)',
      items: [
        { code: '77', desc: 'Unidad (UND)' },
        { code: '8', desc: 'Kilogramo (KG)' },
        { code: '18', desc: 'Litro (LT)' },
        { code: '36', desc: 'Metro (MT)' },
        { code: '62', desc: 'Paquete (PQT)' },
        { code: '11', desc: 'Docena (DOC)' },
      ],
    },
    {
      title: 'Tipo de Persona',
      items: [
        { code: 'FISICA', desc: 'Persona fisica' },
        { code: 'JURIDICA', desc: 'Persona juridica (empresa)' },
      ],
    },
    {
      title: 'Tipo de Naturaleza del Receptor',
      items: [
        { code: 'CONTRIBUYENTE', desc: 'Contribuyente registrado en DNIT' },
        { code: 'NO_CONTRIBUYENTE', desc: 'No contribuyente' },
      ],
    },
    {
      title: 'Estados del Documento',
      items: [
        { code: 'APROBADO', desc: 'Documento aprobado por SIFEN' },
        { code: 'RECHAZADO', desc: 'Documento rechazado por SIFEN' },
        { code: 'EN_PROCESO', desc: 'Documento en procesamiento' },
        { code: 'EN_COLA_OFFLINE', desc: 'Encolado para envio cuando SIFEN este disponible' },
        { code: 'CANCELADO', desc: 'Documento cancelado' },
      ],
    },
    {
      title: 'Monedas',
      items: [
        { code: 'PYG', desc: 'Guarani paraguayo (tipoCambio = 1)' },
        { code: 'USD', desc: 'Dolar estadounidense' },
        { code: 'BRL', desc: 'Real brasileno' },
        { code: 'EUR', desc: 'Euro' },
        { code: 'ARS', desc: 'Peso argentino' },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Catalogos</h1>
      <p className="text-slate-400 mb-8">
        Valores validos para los campos codificados del modelo DE y endpoints de EXACTO API.
      </p>

      <div className="space-y-8">
        {catalogos.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-lg font-semibold text-white mb-3">{cat.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-800/80">
                    <th className="text-left px-4 py-2.5 text-slate-400 font-medium w-32">Codigo</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map((item) => (
                    <tr key={item.code} className="border-t border-slate-700/50">
                      <td className="px-4 py-2.5">
                        <code className="text-sky-400 text-xs bg-sky-950/30 px-1.5 py-0.5 rounded">{item.code}</code>
                      </td>
                      <td className="px-4 py-2.5 text-slate-300">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
