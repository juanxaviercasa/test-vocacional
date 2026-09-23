/**
 * Requisitos legales y antropométricos oficiales de las 8 escuelas matrices del Perú.
 * Fuente: Prospectos Oficiales de Admisión 2026/2027.
 */

export const INSTITUCIONES_MILITARES = [
  {
    id: "EMCH",
    codigo: "EMCH-OFC",
    nombre: "Escuela Militar de Chorrillos",
    rama: "Ejército del Perú",
    rango: "Oficial",
    tallaMinM: 168,
    tallaMinF: 158,
    edadMin: 15,
    edadMax: 21,
    imcMin: 18.5,
    imcMax: 27.5,
    icon: "⚔️",
    color: "#10B981",
    perfilIdeal: { N: 25, E: 75, O: 50, A: 65, C: 85, know: 15, phys: 17 }
  },
  {
    id: "ETE",
    codigo: "ETE-SUB",
    nombre: "Escuela Técnica del Ejército",
    rama: "Ejército del Perú",
    rango: "Suboficial",
    tallaMinM: 160,
    tallaMinF: 155,
    edadMin: 15,
    edadMax: 23,
    imcMin: 18.5,
    imcMax: 28.0,
    icon: "🛡️",
    color: "#10B981",
    perfilIdeal: { N: 30, E: 60, O: 45, A: 70, C: 80, know: 13, phys: 16 }
  },
  {
    id: "ENP",
    codigo: "ENP-OFC",
    nombre: "Escuela Naval del Perú",
    rama: "Marina de Guerra del Perú",
    rango: "Oficial",
    tallaMinM: 168,
    tallaMinF: 160,
    edadMin: 15,
    edadMax: 21,
    imcMin: 18.5,
    imcMax: 27.0,
    icon: "⚓",
    color: "#00F0FF",
    perfilIdeal: { N: 20, E: 70, O: 65, A: 60, C: 90, know: 16, phys: 16 }
  },
  {
    id: "CITEN",
    codigo: "CITEN-SUB",
    nombre: "Instituto Tecnológico Naval (CITEN)",
    rama: "Marina de Guerra del Perú",
    rango: "Suboficial",
    tallaMinM: 160,
    tallaMinF: 155,
    edadMin: 15,
    edadMax: 23,
    imcMin: 18.5,
    imcMax: 27.5,
    icon: "🚢",
    color: "#00F0FF",
    perfilIdeal: { N: 25, E: 55, O: 55, A: 65, C: 85, know: 14, phys: 15 }
  },
  {
    id: "EOFAP",
    codigo: "EOFAP-OFC",
    nombre: "Escuela de Oficiales FAP",
    rama: "Fuerza Aérea del Perú",
    rango: "Oficial",
    tallaMinM: 168,
    tallaMinF: 158,
    edadMin: 15,
    edadMax: 21,
    imcMin: 18.5,
    imcMax: 26.5,
    requiereVision2020: true,
    excluyeDaltonismo: true,
    tallaSentadoMin: 85,
    tallaSentadoMax: 98,
    icon: "✈️",
    color: "#38BDF8",
    perfilIdeal: { N: 15, E: 65, O: 70, A: 60, C: 95, know: 17, phys: 17 }
  },
  {
    id: "ESOFA",
    codigo: "ESOFA-SUB",
    nombre: "Escuela de Suboficiales FAP",
    rama: "Fuerza Aérea del Perú",
    rango: "Suboficial",
    tallaMinM: 160,
    tallaMinF: 155,
    edadMin: 15,
    edadMax: 23,
    imcMin: 18.5,
    imcMax: 27.5,
    icon: "🚀",
    color: "#38BDF8",
    perfilIdeal: { N: 25, E: 55, O: 60, A: 65, C: 85, know: 14, phys: 15 }
  },
  {
    id: "EO-PNP",
    codigo: "EO-PNP-OFC",
    nombre: "Escuela de Oficiales PNP",
    rama: "Policía Nacional del Perú",
    rango: "Oficial",
    tallaMinM: 167,
    tallaMinF: 159,
    edadMin: 15,
    edadMax: 22,
    imcMin: 18.5,
    imcMax: 27.5,
    icon: "👮",
    color: "#F59E0B",
    perfilIdeal: { N: 25, E: 80, O: 50, A: 75, C: 85, know: 15, phys: 16 }
  },
  {
    id: "EESTP",
    codigo: "EESTP-SUB",
    nombre: "Escuela Técnica Superior PNP",
    rama: "Policía Nacional del Perú",
    rango: "Suboficial",
    tallaMinM: 164,
    tallaMinF: 158,
    edadMin: 15,
    edadMax: 24,
    imcMin: 18.5,
    imcMax: 28.0,
    icon: "🚔",
    color: "#F59E0B",
    perfilIdeal: { N: 30, E: 75, O: 45, A: 75, C: 80, know: 13, phys: 16 }
  }
];

export function evaluateLegalCandidate(cand) {
  const h_m = cand.talla_cm > 3 ? cand.talla_cm / 100 : cand.talla_cm;
  const imc = h_m > 0 ? parseFloat((cand.peso_kg / (h_m * h_m)).toFixed(1)) : 22.0;

  const results = INSTITUCIONES_MILITARES.map(esc => {
    const minTalla = cand.sexo === "M" ? esc.tallaMinM : esc.tallaMinF;
    const aptaTalla = cand.talla_cm >= minTalla;
    const aptaEdad = cand.edad >= esc.edadMin && cand.edad <= esc.edadMax;
    const aptaCivil = cand.estado_civil === "soltero" && !cand.tiene_hijos;
    const aptaLegal = !cand.tiene_antecedentes && !cand.tiene_tatuajes && cand.secundaria_completa;
    
    let aptaMedica = true;
    let observacion = "";

    if (esc.id === "EOFAP") {
      if (cand.daltonismo) {
        aptaMedica = false;
        observacion = "Daltonismo incompatible con aviación militar";
      } else if (!cand.agudeza_visual_20_20) {
        observacion = "Apto solo especialidades terrestres / No piloto";
      }
      if (cand.talla_sentado_cm < 85 || cand.talla_sentado_cm > 98) {
        observacion = `Talla sentado (${cand.talla_sentado_cm}cm) fuera del estándar de cabina (85-98cm)`;
      }
    }

    const esApto = aptaTalla && aptaEdad && aptaCivil && aptaLegal && aptaMedica;
    let motivo = "";
    if (!aptaTalla) motivo = `Talla mín: ${minTalla}cm (Actual: ${cand.talla_cm}cm)`;
    else if (!aptaEdad) motivo = `Edad reglamentaria: ${esc.edadMin}-${esc.edadMax} años`;
    else if (!aptaCivil) motivo = "Exige ser soltero(a) sin dependientes";
    else if (cand.tiene_antecedentes) motivo = "Registro de antecedentes policiales/penales";
    else if (cand.tiene_tatuajes) motivo = "Tatuajes visibles con uniforme de verano";
    else if (!cand.secundaria_completa) motivo = "Secundaria incompleta";
    else if (!aptaMedica) motivo = observacion;

    return {
      escuela: esc,
      esApto,
      motivo,
      observacion,
      minTalla
    };
  });

  const totalAptas = results.filter(r => r.esApto).length;
  return {
    imc,
    results,
    totalAptas,
    totalEscuelas: INSTITUCIONES_MILITARES.length
  };
}
