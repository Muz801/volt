const u = (id, w = 1200) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const volt = {
  slug: 'volt',
  name: 'VOLT',
  location: 'Centro',
  tagline: 'Performance Gym',
  currency: '$',
  theme: { accent: '#D7FF1E', accentInk: '#0A0A0A', bg: '#0B0B0C' },
  hero: {
    eyebrow: 'Performance Gym · Estación 01',
    titleLines: ['ENTRENA', 'COMO UN', { text: 'ATLETA.', accent: true }],
    sub: 'Fuerza, movilidad y coaching de élite en un solo espacio. Sin excusas, solo progreso medible.',
    image: u('photo-1534438327276-14e5300c3a48', 1920),
    ctaPrimary: 'Empieza gratis 7 días',
    ctaSecondary: 'Ver programas'
  },
  marquee: ['FUERZA', 'HIIT', 'MOVILIDAD', 'HYROX', 'BOXEO', 'RECOVERY'],
  stats: [
    { num: 12, label: 'Disciplinas' },
    { num: 48, label: 'Clases / semana' },
    { num: 20, suffix: '+', label: 'Coaches certificados' },
    { num: 3200, suffix: '+', label: 'Atletas activos' }
  ],
  programs: [
    { title: 'Strength Lab', desc: 'Hipertrofia y fuerza máxima con programación por bloques.', tag: '45–60 min · Todos los niveles', image: u('photo-1517836357463-d25dfeac3438') },
    { title: 'HIIT Engine', desc: 'Acondicionamiento metabólico de alta intensidad por intervalos.', tag: '30 min · Intermedio', image: u('photo-1599058917212-d750089bc07e') },
    { title: 'Hyrox Prep', desc: 'Entrenamiento funcional de competición: corre, empuja, arrastra.', tag: '60 min · Avanzado', image: u('photo-1549060279-7e168fcee0c2') },
    { title: 'Boxing', desc: 'Técnica, footwork y rounds de saco para potencia y cardio.', tag: '45 min · Todos los niveles', image: u('photo-1591117207239-788bf8de6c3b') },
    { title: 'Mobility & Recovery', desc: 'Mobility flow, foam rolling y respiración para regenerar.', tag: '40 min · Todos los niveles', image: u('photo-1518611012118-696072aa579a') }
  ],
  manifesto: [
    'No', 'vendemos', 'máquinas.', 'Construimos', 'atletas', 'con',
    'disciplina,', 'datos', 'y', { text: 'comunidad.', accent: true }
  ],
  plans: [
    { name: 'Flex', price: 29, period: '/mes', features: ['Acceso a sala de pesas', 'App de seguimiento', '2 clases / semana', 'Sin permanencia'] },
    { name: 'Pro', price: 59, period: '/mes', featured: true, features: ['Acceso ilimitado 24/7', 'Todas las clases', 'Plan personalizado', '1 sesión coach / mes', 'Recovery zone'] },
    { name: 'Elite', price: 99, period: '/mes', features: ['Todo lo de Pro', 'Coaching 1:1 semanal', 'Test de composición corporal', 'Nutrición personalizada'] }
  ],
  coaches: [
    { name: 'María Solís', role: 'Strength & Conditioning', image: u('photo-1594381898411-846e7d193883', 900) },
    { name: 'Diego Ramírez', role: 'Hyrox & Funcional', image: u('photo-1567013127542-490d757e51fc', 900) },
    { name: 'Ana Torres', role: 'HIIT & Movilidad', image: u('photo-1571019613454-1cb2f99b2d8b', 900) },
    { name: 'Luis Mena', role: 'Boxeo', image: u('photo-1583454110551-21f2fa2afe61', 900) }
  ],
  schedule: {
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    rows: [
      { time: '06:00', classes: ['Strength', 'HIIT', 'Strength', 'HIIT', 'Strength'] },
      { time: '09:00', classes: ['Mobility', 'Boxeo', 'Mobility', 'Boxeo', 'Recovery'] },
      { time: '18:00', classes: ['HIIT', 'Hyrox', 'HIIT', 'Hyrox', 'HIIT'] },
      { time: '20:00', classes: ['Boxeo', 'Strength', 'Boxeo', 'Strength', 'Open Gym'] }
    ]
  },
  cta: {
    titleLines: ['TU MEJOR', { text: 'VERSIÓN', accent: true }, 'EMPIEZA HOY.'],
    sub: '7 días gratis. Sin tarjeta. Sin compromiso.',
    image: u('photo-1581009146145-b5ef050c2e1e', 1920)
  },
  cover: u('photo-1534438327276-14e5300c3a48')
};