import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Menu from 'lucide-react/dist/esm/icons/menu';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Search from 'lucide-react/dist/esm/icons/search';
import X from 'lucide-react/dist/esm/icons/x';

type Course = {
  id: string;
  title: string;
  category: string;
  professor: string;
  schedule: string;
  startMonth: string;
  duration: string;
  description: string;
  objectives: string[];
  requirements: string[];
  image: string;
};

type Room = {
  id: string;
  name: string;
  person: string;
  years: string;
  description: string;
  fullDescription: string;
  achievements: string[];
  image: string;
};

const courses: Course[] = [
  {
    id: 'gestion-cultural',
    title: 'Gestión Cultural',
    category: 'Gestión',
    professor: 'Silvana Viana',
    schedule: 'Jueves y viernes',
    startMonth: 'Marzo',
    duration: '6 meses',
    description: 'Programa declarado de interés municipal. Formación integral en planificación, producción y evaluación de proyectos culturales.',
    objectives: ['Desarrollar competencias para la gestión de instituciones culturales', 'Planificar y ejecutar proyectos culturales de manera autónoma', 'Conocer el marco legal y normativo del sector cultural'],
    requirements: ['Mayores de 18 años', 'Secundaria completa'],
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80',
  },
  {
    id: 'historia-arte',
    title: 'Historia del Arte',
    category: 'Arte',
    professor: 'Carlos Brunetto',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '4 meses',
    description: 'Recorrido por los principales movimientos artísticos desde el Renacimiento hasta la actualidad.',
    objectives: ['Comprender la evolución histórica del arte occidental', 'Analizar críticamente obras de diferentes períodos', 'Desarrollar vocabulario especializado del arte'],
    requirements: ['Interés en cultura y arte'],
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1200&q=80',
  },
  {
    id: 'formacion-audiovisual',
    title: 'Formación Audiovisual',
    category: 'Cine',
    professor: 'Gabriel Diaz',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '6 meses',
    description: 'Taller intensivo de guion cinematográfico. Aprende a escribir historias para el cine.',
    objectives: ['Dominar técnicas de escritura de guion', 'Desarrollar estructuras narrativas para cine', 'Crear personajes memorables y diálogos efectivos'],
    requirements: ['Mayores de 18 años', 'Afición por el cine'],
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80',
  },
  {
    id: 'fotografia',
    title: 'Fotografía',
    category: 'Arte',
    professor: 'Yisel Espinosa',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '3 meses',
    description: 'Módulos de introducción, fotografía de calle, arquitectura, autorretrato y fotografía documental.',
    objectives: ['Dominar fundamentos técnicos de la fotografía', 'Desarrollar un estilo personal', 'Crear un portafolio profesional'],
    requirements: ['Cámara fotográfica o celular'],
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80',
  },
  {
    id: 'literatura-filosofia',
    title: 'Literatura-Filosofía',
    category: 'Humanidades',
    professor: 'Alicia Alonso',
    schedule: 'Consultar horarios',
    startMonth: 'Abril',
    duration: '4 meses',
    description: 'Sendas de las letras místicas. Un viaje por la literatura espiritual y contemplativa.',
    objectives: ['Explorar grandes obras de la literatura mística', 'Reflexionar sobre la dimensión espiritual del ser humano', 'Desarrollar pensamiento crítico y contemplación'],
    requirements: ['Interés por la lectura y la reflexión'],
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&q=80',
  },
  {
    id: 'creacion-literaria',
    title: 'Creación Literaria',
    category: 'Literatura',
    professor: 'Nelson Guerra',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '6 meses',
    description: 'Taller de escritura creativa para desarrollar una voz propia como escritor.',
    objectives: ['Desarrollar técnicas de escritura creativa', 'Explorar diferentes géneros literarios', 'Construir un proyecto editorial personal'],
    requirements: ['Pasión por la escritura'],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
  },
  {
    id: 'siente-crea',
    title: 'Siente y Crea',
    category: 'Bienestar',
    professor: 'Carolina Rodríguez',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '3 meses',
    description: 'Teatro y yoga para adultos mayores. Un espacio de expresión, bienestar y encuentro.',
    objectives: ['Fomentar expresión corporal y emocional', 'Promover bienestar físico y mental', 'Crear un espacio de socialización y creatividad'],
    requirements: ['Adultos mayores de 60 años'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80',
  },
  {
    id: 'teatro',
    title: 'Teatro',
    category: 'Artes Escénicas',
    professor: 'Pablo Dive',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '4 meses',
    description: 'Taller de actuación para principiantes y avanzados.',
    objectives: ['Desarrollar técnicas de interpretación escénica', 'Mejorar expresión corporal y vocal', 'Montar una obra de teatro al final del curso'],
    requirements: ['Mayores de 16 años'],
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&q=80',
  },
  {
    id: 'etiqueta-protocolo',
    title: 'Etiqueta y Protocolo',
    category: 'Desarrollo Personal',
    professor: 'Nora Porro',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '2 meses',
    description: 'Protocolo social, empresarial y ceremonial. Relaciones públicas efectivas.',
    objectives: ['Dominar normas de protocolo social', 'Desarrollar habilidades de relación pública', 'Preparar eventos profesionales exitosos'],
    requirements: ['Mayores de 18 años'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
  },
  {
    id: 'tango',
    title: 'Taller de Tango',
    category: 'Danza',
    professor: 'Isabel Rivas Yaniero',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '3 meses',
    description: 'Aprende el tango argentino-uruguayo, patrimonio cultural de la humanidad.',
    objectives: ['Dominar pasos básicos del tango', 'Comprender la historia y cultura del tango', 'Desarrollar expresión corporal y musicalidad'],
    requirements: ['Sin requisitos previos'],
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80',
  },
  {
    id: 'tecnologia',
    title: 'Tecnología sin Miedo',
    category: 'Tecnología',
    professor: 'Equipo Docente',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '2 meses',
    description: 'Celular e inteligencia artificial para adultos mayores de 50 años.',
    objectives: ['Perder el miedo a la tecnología', 'Usar el celular de manera segura y efectiva', 'Introducirse al mundo de la IA de forma práctica'],
    requirements: ['Mayores de 50 años'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
  },
  {
    id: 'marketing-digital',
    title: 'Analista en Marketing Digital',
    category: 'Negocios',
    professor: 'Equipo Docente',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '6 meses',
    description: 'Formación completa en marketing digital, redes sociales y estrategias online.',
    objectives: ['Dominar herramientas del marketing digital', 'Crear estrategias de contenido efectivas', 'Analizar métricas y optimizar campañas'],
    requirements: ['Mayores de 18 años'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  },
  {
    id: 'dibujo-pintura',
    title: 'Dibujo y Pintura',
    category: 'Arte',
    professor: 'Ángel Caballero, César Ureta, David Castellucci',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '4 meses',
    description: 'Talleres de técnicas artísticas con profesores especializados.',
    objectives: ['Desarrollar habilidades técnicas del dibujo', 'Explorar diferentes técnicas de pintura', 'Construir un portafolio artístico personal'],
    requirements: ['Sin requisitos previos'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
  },
  {
    id: 'literatura-llaves',
    title: 'Literatura - Taller "Las llaves"',
    category: 'Literatura',
    professor: 'Malva Bengua',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '4 meses',
    description: 'Taller literario especializado para explorar las puertas de la escritura.',
    objectives: ['Abrir las puertas de la creatividad literaria', 'Desarrollar un estilo propio', 'Crear una comunidad de lectores y escritores'],
    requirements: ['Interés en la literatura'],
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80',
  },
  {
    id: 'historia-reciente',
    title: 'Historia Reciente del Uruguay',
    category: 'Historia',
    professor: 'Santiago Tricánico',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '3 meses',
    description: 'Análisis de los procesos históricos que configuraron el Uruguay contemporáneo.',
    objectives: ['Comprender la evolución política y social del Uruguay', 'Analizar críticamente la historia reciente', 'Relacionar pasado y presente'],
    requirements: ['Interés en historia'],
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&q=80',
  },
  {
    id: 'presencia-nazi',
    title: 'Presencia Nazi en el Río de la Plata',
    category: 'Historia',
    professor: 'Santiago Tricánico',
    schedule: 'Consultar horarios',
    startMonth: 'Marzo',
    duration: '2 meses',
    description: 'Estudio histórico del período 1933-1960 y la influencia nazi en la región.',
    objectives: ['Investigar presencia de fugitivos nazis', 'Analizar el contexto histórico del Río de la Plata', 'Comprender implicaciones políticas y sociales'],
    requirements: ['Mayores de 18 años'],
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80',
  },
];

const rooms: Room[] = [
  {
    id: 'rodo',
    name: 'Sala Rodó',
    person: 'José Enrique Rodó',
    years: '1871-1917',
    description: 'Escritor y político, autor de Ariel.',
    fullDescription: 'José Enrique Rodó fue uno de los grandes escritores y pensadores uruguayos. Su obra Ariel es una de las referencias del pensamiento latinoamericano y mantiene vigencia como defensa de la cultura, la democracia y los valores humanistas.',
    achievements: ['Autor de Ariel, obra fundacional del pensamiento latinoamericano', 'Defensor de la educación y la cultura', 'Precursor del modernismo literario en Hispanoamérica'],
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80',
  },
  {
    id: 'rusconi',
    name: 'Sala Rusconi',
    person: 'Alberto Rusconi',
    years: '1920-1990',
    description: 'Autor de ensayos. Presidente del Ateneo entre 1969 y 1972.',
    fullDescription: 'Alberto Rusconi fue un destacado intelectual uruguayo. Como presidente del Ateneo de Montevideo contribuyó al desarrollo cultural de la institución y a la defensa de la libertad de expresión.',
    achievements: ['Presidente del Ateneo durante 1969-1972', 'Autor de ensayos sobre cultura y sociedad', 'Defensor de la libertad de expresión'],
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80',
  },
  {
    id: 'cortina',
    name: 'Sala Laura Cortina',
    person: 'Laura Cortinas',
    years: '1881-1969',
    description: 'Escritora y dramaturga. Dirigió Acción Femenina por la Victoria.',
    fullDescription: 'Laura Cortinas fue una escritora y dramaturga uruguaya de enorme relevancia. Su nombre acompaña una sala dedicada a la participación cultural de las mujeres y a las voces que ampliaron el campo intelectual del país.',
    achievements: ['Pionera en espacios de liderazgo cultural', 'Escritora y dramaturga reconocida', 'Promotora de participación social y cultural'],
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80',
  },
  {
    id: 'fabini',
    name: 'Sala Fabini',
    person: 'Santiago Fabini',
    years: '1895-1972',
    description: 'Violinista de la Sociedad Beethoven.',
    fullDescription: 'Santiago Fabini fue un violinista uruguayo vinculado a la Sociedad Beethoven. La sala celebra la dimensión musical del Ateneo y su vínculo histórico con la formación artística.',
    achievements: ['Violinista de la Sociedad Beethoven', 'Promotor de la música clásica en Uruguay', 'Figura vinculada a la formación musical'],
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=80',
  },
  {
    id: 'vaz-ferreira',
    name: 'Sala Carlos Vaz Ferreira',
    person: 'Carlos Vaz Ferreira',
    years: '1872-1958',
    description: 'Filósofo, abogado y escritor.',
    fullDescription: 'Carlos Vaz Ferreira es uno de los filósofos más importantes de América Latina. Profesor, jurista y ensayista, dejó una marca profunda en la cultura uruguaya por su pensamiento crítico y su rigor intelectual.',
    achievements: ['Autor de Lógica viva y Moral para intelectuales', 'Profesor de la Facultad de Derecho', 'Referencia central del pensamiento uruguayo'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80',
  },
  {
    id: 'giordano',
    name: 'Sala Luis Giordano',
    person: 'Luis Giordano',
    years: '1900-1978',
    description: 'Escritor. Presidente del Ateneo en 1962 y 1963.',
    fullDescription: 'Luis Giordano fue escritor y presidente del Ateneo en dos períodos. Su gestión acompañó procesos de modernización institucional y apertura a nuevas corrientes culturales.',
    achievements: ['Presidente del Ateneo en 1962 y 1963', 'Autor de obra narrativa', 'Promotor del diálogo cultural'],
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80',
  },
];

const historyImages = [
  '/HISTORIA/imgi_3_6340307504_ae4bbae73d_o.jpg',
  '/HISTORIA/imgi_8_Antigua-1.jpg',
  '/HISTORIA/imgi_6_Ateneo-Montevideo-1.jpg',
  '/HISTORIA/imgi_9_20222846424_58494a331d_o.jpg',
  '/HISTORIA/imgi_10_7453965434_90c6750d88_o.jpg',
  '/HISTORIA/imgi_13_Ateneo-Asamblea-General-Ordinaria-2024-768x617.jpg',
];

const navItems = [
  { label: 'Visita', to: '/visita' },
  { label: 'Cursos', to: '/cursos' },
  { label: 'Salas', to: '/salas' },
  { label: 'Historia', to: '/historia' },
  { label: 'Contacto', to: '/contacto' },
];

const aboutItems = [
  { label: 'Estatutos', to: '/estatutos' },
  { label: 'Directivos', to: '/directivos' },
  { label: 'Presidentes', to: '/presidentes' },
];

const whatsappHref = 'https://wa.me/59893727310?text=Hola%2C%20quiero%20consultar%20por%20cursos%20del%20Ateneo%20de%20Montevideo.';
const siteUrl = 'https://ateneodemontevideo.uy';

const defaultSeo = {
  title: 'Ateneo de Montevideo | Cursos, Historia y Cultura en Uruguay',
  description: 'Ateneo de Montevideo, institución cultural fundada en 1886 en Plaza Cagancha. Cursos, talleres, salas, historia, estatutos y actividades culturales en Uruguay.',
};

const routeSeo: Record<string, { title: string; description: string }> = {
  '/': defaultSeo,
  '/cursos': {
    title: 'Cursos y Talleres 2026 | Ateneo de Montevideo',
    description: 'Programación académica del Ateneo de Montevideo: cursos de arte, historia, literatura, fotografía, teatro, tango, tecnología y gestión cultural.',
  },
  '/salas': {
    title: 'Salas del Ateneo de Montevideo | Espacios Culturales',
    description: 'Conocé las salas del Ateneo de Montevideo, sus nombres, figuras históricas y espacios disponibles para actividades culturales.',
  },
  '/historia': {
    title: 'Historia del Ateneo de Montevideo | Desde 1886',
    description: 'Historia institucional del Ateneo de Montevideo: cultura, educación, libre discusión y más de 150 años de vida cultural en Uruguay.',
  },
  '/estatutos': {
    title: 'Estatutos | Ateneo de Montevideo',
    description: 'Estatutos institucionales del Ateneo de Montevideo, organizados por capítulos, secciones y artículos.',
  },
  '/directivos': {
    title: 'Directivos | Ateneo de Montevideo',
    description: 'Información institucional de la Junta Directiva del Ateneo de Montevideo.',
  },
  '/presidentes': {
    title: 'Presidentes | Ateneo de Montevideo',
    description: 'Listado y recorrido institucional por presidentes del Ateneo de Montevideo.',
  },
  '/contacto': {
    title: 'Contacto | Ateneo de Montevideo en Plaza Cagancha',
    description: 'Contactá al Ateneo de Montevideo: dirección, teléfonos, email y horarios de atención en Plaza Cagancha 1157.',
  },
  '/visita': {
    title: 'Visita el Ateneo de Montevideo | Plaza Cagancha 1157',
    description: 'Información para visitar el Ateneo de Montevideo, consultar horarios, cursos, salas y actividades culturales.',
  },
};

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
}

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(property ? 'property' : 'name', name);
    document.head.appendChild(tag);
  }

  tag.content = content;
}

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const course = courses.find((item) => pathname === `/cursos/${item.id}`);
    const room = rooms.find((item) => pathname === `/salas/${item.id}`);
    const seo = course
      ? {
          title: `${course.title} | Curso en Ateneo de Montevideo`,
          description: `${course.description} Docente: ${course.professor}. Consultá horarios e inscripción en el Ateneo de Montevideo.`,
        }
      : room
        ? {
            title: `${room.name} | Ateneo de Montevideo`,
            description: `${room.description} Conocé el legado de ${room.person} y los espacios culturales del Ateneo de Montevideo.`,
          }
        : routeSeo[pathname] ?? defaultSeo;
    const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname}`;
    const canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.createElement('link');

    document.title = seo.title;
    setMeta('description', seo.description);
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:url', canonical, true);
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);

    canonicalTag.rel = 'canonical';
    canonicalTag.href = canonical;
    if (!canonicalTag.parentElement) {
      document.head.appendChild(canonicalTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness'],
      name: 'Ateneo de Montevideo',
      url: siteUrl,
      logo: `${siteUrl}/ateneo%20logo.jpg`,
      image: `${siteUrl}/IMAGEN%20PRINCIPAL.png`,
      foundingDate: '1886-07-03',
      description: defaultSeo.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plaza Cagancha 1157',
        addressLocality: 'Montevideo',
        addressCountry: 'UY',
      },
      telephone: ['+59829000987', '+59829080835'],
      email: 'ateneo@ateneodemontevideo.uy',
      sameAs: ['https://ateneodemontevideo.uy/'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Cursos y talleres del Ateneo de Montevideo',
        itemListElement: courses.slice(0, 8).map((item) => ({
          '@type': 'Course',
          name: item.title,
          description: item.description,
          provider: {
            '@type': 'Organization',
            name: 'Ateneo de Montevideo',
            sameAs: siteUrl,
          },
        })),
      },
    };
    const scriptId = 'structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);
  }, [location.pathname]);

  return null;
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <Link to="/" className="brand-lockup" aria-label="Ateneo de Montevideo">
        <img src="/ateneo logo.jpg" alt="Ateneo de Montevideo" />
      </Link>
      <nav className="primary-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
        <div className="nav-dropdown">
          <button type="button">Sobre el Ateneo</button>
          <div className="nav-dropdown-menu">
            {aboutItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <button className="icon-button mobile-toggle" type="button" onClick={() => setIsOpen(true)} aria-label="Abrir menú">
        <Menu size={20} />
      </button>
      {isOpen && (
        <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menú">
          <button className="icon-button close-button" type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar menú">
            <X size={20} />
          </button>
          <Link to="/" onClick={() => setIsOpen(false)} className="mobile-brand">Ateneo de Montevideo</Link>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)}>
              {item.label}
              <ArrowRight size={18} />
            </NavLink>
          ))}
          <div className="mobile-menu-group">Sobre el Ateneo</div>
          {aboutItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)}>
              {item.label}
              <ArrowRight size={18} />
            </NavLink>
          ))}
        </div>
      )}
    </header>
    </>
  );
}

function MuseumButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="museum-button">
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="section-title">
      <div>
        {eyebrow && <p>{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <img src="/IMAGEN PRINCIPAL.png" alt="Fachada del Ateneo de Montevideo en Plaza Cagancha" width="2730" height="1568" />
      <div className="hero-caption">
        <p>Programación 2026</p>
        <h1>Ateneo de Montevideo</h1>
        <span>Arte, pensamiento y formación en el centro de la ciudad.</span>
      </div>
    </section>
  );
}

function HomePage() {
  const featuredCourses = courses.slice(0, 3);
  const featuredRooms = rooms.slice(0, 3);

  return (
    <>
      <Hero />
      <NoticeBar />
      <main id="contenido">
        <section className="content-band">
          <SectionTitle eyebrow="Cursos y talleres" title="Programación abierta" action={<MuseumButton to="/cursos">Ver todos los cursos</MuseumButton>} />
          <div className="editorial-grid">
            <p className="lead-copy">Una oferta educativa organizada por áreas, docentes y recorridos. Cada curso ahora tiene su propia página con programa, requisitos e inscripción.</p>
            <div className="feature-row">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} compact />
              ))}
            </div>
          </div>
        </section>

        <section className="split-feature">
          <div>
            <SectionTitle eyebrow="Salas" title="Espacios con nombre propio" action={<MuseumButton to="/salas">Explorar salas</MuseumButton>} />
            <p>Las salas del Ateneo se presentan como capítulos de una colección permanente: figuras, legado, uso del espacio y memoria institucional.</p>
          </div>
          <div className="room-strip">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>

        <section className="black-program">
          <div>
            <p>Historia</p>
            <h2>Más de 150 años de cultura, educación y libre discusión.</h2>
          </div>
          <MuseumButton to="/historia">Leer historia</MuseumButton>
        </section>

        <HistoryHomeFeature />
        <VisitPreview />
        <HomeVideo />
      </main>
    </>
  );
}

function HistoryHomeFeature() {
  return (
    <section className="history-home">
      <div className="history-home-copy">
        <SectionTitle eyebrow="Memoria institucional" title="Libertad, civilización y progreso" action={<MuseumButton to="/historia">Ver galería</MuseumButton>} />
        <p>Fundado el 5 de setiembre de 1868, el Ateneo de Montevideo acompaña desde hace más de 150 años la cultura, la educación y la libre discusión de ideas en Uruguay.</p>
      </div>
      <div className="history-gallery compact-gallery">
        {historyImages.slice(0, 4).map((image, index) => (
          <img key={image} src={image} alt={`Archivo histórico del Ateneo de Montevideo ${index + 1}`} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

function HomeVideo() {
  return (
    <section className="video-section">
      <div className="video-copy">
        <img src="/ateneo logo con fecha 150 años.jpg" alt="Ateneo de Montevideo 150 años" />
        <div>
          <p>Archivo audiovisual</p>
          <h2>150 años del Ateneo</h2>
        </div>
      </div>
      <a className="video-frame video-cover" href="https://www.youtube.com/watch?v=hUkBTJSizF8" target="_blank" rel="noreferrer" aria-label="Ver video del Ateneo de Montevideo en YouTube">
        <img src="https://i.ytimg.com/vi/hUkBTJSizF8/maxresdefault.jpg" alt="Video del Ateneo de Montevideo" />
        <span>Ver video</span>
      </a>
    </section>
  );
}

function NoticeBar() {
  return (
    <div className="notice-bar">
      <span>Inscripciones abiertas para cursos 2026.</span>
      <Link to="/contacto">Consultá horarios, cupos y modalidades</Link>
    </div>
  );
}

function CourseCard({ course, compact = false }: { course: Course; compact?: boolean }) {
  return (
    <article className={compact ? 'course-card compact' : 'course-card'}>
      <Link to={`/cursos/${course.id}`} aria-label={`Ver curso ${course.title}`}>
        <img src={course.image} alt="" loading="lazy" />
        <div>
          <p>{course.category}</p>
          <h3>{course.title}</h3>
          <span>{course.professor}</span>
          {!compact && <small>{course.description}</small>}
        </div>
      </Link>
    </article>
  );
}

function CoursesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const categories = useMemo(() => ['Todos', ...Array.from(new Set(courses.map((course) => course.category)))], []);
  const filteredCourses = courses.filter((course) => {
    const matchesCategory = category === 'Todos' || course.category === category;
    const haystack = `${course.title} ${course.professor} ${course.category}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  });

  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Cursos" title="Programación académica 2026" text="La oferta deja de vivir escondida en una landing: cada curso tiene una página propia, con objetivos, requisitos y datos de inscripción." />
      <section className="filters">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por curso, docente o área" />
        </label>
        <div className="filter-pills" aria-label="Filtrar por categoría">
          {categories.map((item) => (
            <button key={item} type="button" className={item === category ? 'active' : ''} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>
      <section className="course-list">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </main>
  );
}

function CourseDetailPage() {
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <main id="contenido" className="detail-page">
      <section className="detail-hero">
        <img src={course.image} alt={`Imagen del curso ${course.title}`} />
        <div>
          <Link to="/cursos" className="back-link">Cursos</Link>
          <p>{course.category}</p>
          <h1>{course.title}</h1>
          <span>{course.description}</span>
        </div>
      </section>
      <section className="detail-layout">
        <aside className="fact-panel">
          <p><Calendar size={17} /> Inicio: {course.startMonth}</p>
          <p><Clock size={17} /> Duración: {course.duration}</p>
          <p>Docente: {course.professor}</p>
          <p>Horario: {course.schedule}</p>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="solid-button">Consultar por WhatsApp</a>
        </aside>
        <div className="detail-copy">
          <h2>Objetivos</h2>
          <ul>{course.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
          <h2>Requisitos</h2>
          <ul>{course.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
          <CourseInquiry courseTitle={course.title} />
        </div>
      </section>
    </main>
  );
}

function CourseInquiry({ courseTitle }: { courseTitle: string }) {
  return (
    <section className="course-inquiry" aria-labelledby="course-inquiry-title">
      <div>
        <p>Preinscripción</p>
        <h2 id="course-inquiry-title">Formulario listo para activar</h2>
        <span>Por ahora queda como consulta rápida por WhatsApp. Los campos están preparados para conectarse luego a email, CRM o una base de datos.</span>
      </div>
      <form>
        <label>
          Nombre
          <input name="name" type="text" placeholder="Ej.: Ana Pérez…" autoComplete="name" disabled />
        </label>
        <label>
          Email o teléfono
          <input name="contact" type="tel" inputMode="tel" placeholder="Ej.: 093 000 000…" autoComplete="tel" disabled />
        </label>
        <label>
          Curso
          <input name="course" type="text" value={courseTitle} autoComplete="off" disabled readOnly />
        </label>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="solid-button">Consultar por WhatsApp</a>
      </form>
    </section>
  );
}

function RoomCard({ room }: { room: Room }) {
  return (
    <article className="room-card">
      <Link to={`/salas/${room.id}`}>
        <img src={room.image} alt="" loading="lazy" />
        <div>
          <p>{room.years}</p>
          <h3>{room.name}</h3>
          <span>{room.person}</span>
        </div>
      </Link>
    </article>
  );
}

function RoomsPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Salas" title="Una colección de espacios" text="Cada sala se trabaja como una pieza de navegación propia, con contexto histórico y una lectura clara del legado que representa." />
      <section className="room-grid">
        {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
      </section>
    </main>
  );
}

function RoomDetailPage() {
  const { roomId } = useParams();
  const room = rooms.find((item) => item.id === roomId);

  if (!room) {
    return <NotFoundPage />;
  }

  return (
    <main id="contenido" className="detail-page">
      <section className="detail-hero room-detail">
        <img src={room.image} alt={`Imagen de ${room.name}`} />
        <div>
          <Link to="/salas" className="back-link">Salas</Link>
          <p>{room.years}</p>
          <h1>{room.name}</h1>
          <span>{room.description}</span>
        </div>
      </section>
      <section className="detail-layout">
        <aside className="fact-panel">
          <p>Figura: {room.person}</p>
          <p>Periodo: {room.years}</p>
          <Link to="/contacto" className="solid-button">Consultar disponibilidad</Link>
        </aside>
        <div className="detail-copy">
          <h2>Sobre la sala</h2>
          <p>{room.fullDescription}</p>
          <h2>Legado</h2>
          <ul>{room.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
        </div>
      </section>
    </main>
  );
}

function HistoryPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Historia" title="Un instituto cultural con vocación pública" text="El Ateneo de Montevideo nace como espacio de formación, intercambio intelectual y difusión cultural." />
      <section className="history-gallery">
        {historyImages.map((image, index) => (
          <img key={image} src={image} alt={`Archivo histórico del Ateneo de Montevideo ${index + 1}`} loading="lazy" />
        ))}
      </section>
      <section className="history-layout">
        <div>
          <h2>Desde 1868</h2>
          <PublicText source="/HISTORIA/HISTORIA.txt" fallback="No se pudo cargar la historia institucional." />
        </div>
        <blockquote>
          “Los centros culturales y literarios de un pueblo son los focos de donde emanan los principios que deben gobernarlos.”
          <cite>Prudencio Vázquez y Vega</cite>
        </blockquote>
      </section>
    </main>
  );
}

function PublicText({ source, fallback }: { source: string; fallback: string }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch(source)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo');
        }
        return response.text();
      })
      .then((text) => {
        if (isMounted) {
          setContent(text);
        }
      })
      .catch(() => {
        if (isMounted) {
          setContent(fallback);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fallback, source]);

  return (
    <div className="text-document">
      {(content || 'Cargando...').split(/\r?\n\s*\r?\n/).filter(Boolean).map((paragraph, index) => (
        <p key={`${source}-${index}`}>{paragraph.trim()}</p>
      ))}
    </div>
  );
}

function TextDocumentPage({ eyebrow, title, text, source, fallback }: { eyebrow: string; title: string; text: string; source: string; fallback: string }) {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow={eyebrow} title={title} text={text} />
      <section className="document-page">
        <PublicText source={source} fallback={fallback} />
      </section>
    </main>
  );
}

function StatutesText() {
  const [content, setContent] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch('/ESTATUTOS.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo');
        }
        return response.text();
      })
      .then((text) => {
        if (isMounted) {
          setContent(text);
        }
      })
      .catch(() => {
        if (isMounted) {
          setContent('No se pudo cargar el documento de estatutos.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const blocks = useMemo(() => {
    const normalized = (content || 'Cargando...')
      .replace(/\r\n/g, '\n')
      .replace(/\n(?=\S)/g, ' ')
      .replace(/\s+(CAPITULO\s+[IVXLCDM]+)\s+/g, '\n$1 ')
      .replace(/\s+(SECCION\s+[IVXLCDM]+)\s+/g, '\n$1 ')
      .replace(/\s+(Artículo\s+\d+:)\s+/g, '\n$1 ')
      .replace(/\s+(Ateneo de Montevideo Plaza)/g, '\n$1')
      .split('\n')
      .map((block) => block.trim())
      .filter(Boolean);

    return normalized[0] === 'Estatutos' ? normalized.slice(1) : normalized;
  }, [content]);

  return (
    <div className="statutes-document">
      {blocks.map((block, index) => {
        if (block.startsWith('CAPITULO')) {
          const [chapter, ...rest] = block.split(' ');
          const chapterNumber = rest.shift();
          return (
            <section className="statute-chapter" key={`${chapter}-${chapterNumber}-${index}`}>
              <h2>{chapter} {chapterNumber}</h2>
              {rest.length > 0 && <p className="chapter-subtitle">{rest.join(' ')}</p>}
            </section>
          );
        }

        if (block.startsWith('SECCION')) {
          return <h3 key={`section-${index}`}>{block}</h3>;
        }

        const articleMatch = block.match(/^(Artículo\s+\d+:)\s*(.*)$/);

        if (articleMatch) {
          return (
            <p key={`article-${index}`}>
              <strong>{articleMatch[1]}</strong> {articleMatch[2]}
            </p>
          );
        }

        return <p key={`statute-${index}`}>{block}</p>;
      })}
    </div>
  );
}

function StatutesPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Sobre el Ateneo" title="Estatutos" text="Documento institucional del Ateneo de Montevideo, organizado por capítulos, secciones y artículos." />
      <section className="document-page statutes-page">
        <StatutesText />
      </section>
    </main>
  );
}

function DirectivosPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Sobre el Ateneo" title="Directivos" text="Información institucional de la Junta Directiva del Ateneo de Montevideo." />
      <section className="document-page">
        <p>La información de directivos quedará disponible en esta sección cuando el archivo institucional sea actualizado.</p>
      </section>
    </main>
  );
}

function PresidentesPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Sobre el Ateneo" title="Presidentes" text="Recorrido por las presidencias que acompañaron la vida institucional del Ateneo." />
      <section className="document-page">
        <p>Sección preparada para incorporar el listado histórico de presidentes del Ateneo de Montevideo.</p>
      </section>
    </main>
  );
}

function VisitPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Visita" title="Ven a visitarnos" text="Información práctica para llegar al Ateneo, consultar horarios y planificar una visita o actividad." />
      <VisitPreview />
    </main>
  );
}

function ContactPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="Contacto" title="Hablemos de cursos, salas y actividades" text="Podés escribirnos o acercarte a Plaza Cagancha para consultar inscripciones, agenda y disponibilidad de espacios." />
      <section className="contact-grid">
        <div className="contact-card">
          <MapPin size={20} />
          <h2>Dirección</h2>
          <p>Plaza Cagancha 1157, Montevideo, Uruguay</p>
        </div>
        <div className="contact-card">
          <Phone size={20} />
          <h2>Teléfonos</h2>
          <p>2900 09 87 · 2908 08 35<br />Secretaría: 093 727 310</p>
        </div>
        <div className="contact-card">
          <Mail size={20} />
          <h2>Email</h2>
          <p>ateneo@ateneodemontevideo.uy<br />ateneodemontevideo58@gmail.com</p>
        </div>
      </section>
    </main>
  );
}

function VisitPreview() {
  return (
    <section className="visit-preview">
      <img src="/ateneo plaza.jpg" alt="Ateneo de Montevideo sobre Plaza Cagancha" width="408" height="306" loading="lazy" />
      <div>
        <SectionTitle eyebrow="Ven a visitarnos" title="Plaza Cagancha 1157" action={<MuseumButton to="/contacto">Ver contacto</MuseumButton>} />
        <p>Lunes a viernes de 14:00 a 20:00. Sábados de 9:00 a 13:00. Consultá por cursos, salas, actividades y programación cultural.</p>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{text}</span>
    </section>
  );
}

function NotFoundPage() {
  return (
    <main id="contenido" className="page-shell">
      <PageHero eyebrow="404" title="Página no encontrada" text="El contenido solicitado no está disponible." />
      <MuseumButton to="/">Volver al inicio</MuseumButton>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <img className="footer-logo" src="/ateneo logo con fecha 150 años.jpg" alt="Ateneo de Montevideo 150 años" />
      <div>
        <p>Plaza Cagancha 1157</p>
        <p>Montevideo, Uruguay</p>
      </div>
      <div>
        <Link to="/cursos">Cursos</Link>
        <Link to="/salas">Salas</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoManager />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:courseId" element={<CourseDetailPage />} />
        <Route path="/salas" element={<RoomsPage />} />
        <Route path="/salas/:roomId" element={<RoomDetailPage />} />
        <Route path="/historia" element={<HistoryPage />} />
        <Route path="/estatutos" element={<StatutesPage />} />
        <Route path="/directivos" element={<DirectivosPage />} />
        <Route path="/presidentes" element={<PresidentesPage />} />
        <Route path="/visita" element={<VisitPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
