import { useEffect, useRef, useState } from 'react';
import { startReactiveMarquee } from '../hooks/useScrollExperience';

function Lines({ lines }) {
  return lines.map((l, i) => {
    const text = typeof l === 'string' ? l : l.text;
    const accent = typeof l === 'object' && l.accent;
    return (
      <span className={'line' + (accent ? ' accent' : '')} key={i}>
        {text}
      </span>
    );
  });
}

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function Brand({ gym }) {
  if (gym.logo) return <img src={gym.logo.src} alt={gym.name} className="nav__logoimg" />;
  return (
    <>
      <span className="brand-mark" aria-hidden="true" />
      <span>{gym.name}</span>
    </>
  );
}

function VoltNav({ gym }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const close = () => setOpen(false);
  return (
    <header className={'nav' + (stuck ? ' is-stuck' : '')}>
      <a className="nav__brand" href="#top"><Brand gym={gym} /></a>
      <nav className="nav__links" aria-label="Principal">
        <a href="#programas" onClick={close}>Disciplinas</a>
        <a href="#planes" onClick={close}>Planes</a>
        <a href="#horarios" onClick={close}>Horarios</a>
        <a href="#contacto" onClick={close}>Contacto</a>
      </nav>
      <a href="#unete" className="btn btn--solid nav__cta">Únete hoy</a>
      <button
        className="nav__burger"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span />
      </button>
    </header>
  );
}

function Marquee({ words }) {
  const trackRef = useRef(null);
  useEffect(() => startReactiveMarquee(trackRef.current), []);
  const loop = [...words, '•', ...words, '•', ...words, '•', ...words, '•'];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        {loop.map((w, i) => (
          <span key={i}>{w === '•' ? '•' : w}</span>
        ))}
      </div>
    </div>
  );
}

export default function VoltLanding({ gym }) {
  const { hero, stats, programs, manifesto, plans, coaches, schedule, hours, info, cta } = gym;
  const cur = gym.currency || '$';
  const waHref = info?.whatsapp ? `https://wa.me/506${info.whatsapp.replace(/\D/g, '')}` : '#unete';
  const gridPrograms = gym.programsLayout === 'grid';

  const blocks = {
    marquee: gym.marquee?.length > 0 && (
      <Marquee key="marquee" words={gym.marquee} />
    ),

    stats: stats?.length > 0 && (
      <section className="stats" id="stats" key="stats" style={{ '--scols': stats.length }}>
        {stats.map((s, i) => (
          <div className="stat" data-reveal data-d={i} key={i}>
            <span className="stat__num" data-count={s.num} data-suffix={s.suffix || ''}>0</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </section>
    ),

    programs: programs?.length > 0 && (
      <section className={'programs' + (gridPrograms ? ' programs--grid' : '')} id="programas" key="programs">
        <div className="programs__intro">
          <p className="eyebrow" data-reveal>Disciplinas</p>
          <h2 className="section-title" data-reveal data-d="1">
            {gridPrograms ? <>Todo lo que <span className="accent">ofrecemos.</span></> : <>Elige tu <span className="accent">batalla.</span></>}
          </h2>
          <p className="section-lead" data-reveal data-d="2">
            {gridPrograms ? `Disciplinas disponibles en ${gym.name}.` : `Lo que ofrecemos en ${gym.name}. Desliza para explorar →`}
          </p>
        </div>
        <div className="hscroll" {...(gridPrograms ? {} : { 'data-hscroll': true })}>
          <div className="hscroll__track" {...(gridPrograms ? {} : { 'data-hscroll-track': true })}>
            {programs.map((p, i) => (
              <article className="pcard" data-reveal={gridPrograms ? true : undefined} data-d={gridPrograms ? Math.min(i, 4) : undefined}
                key={i} style={{ '--img': `url('${p.image}')` }}>
                <div className="pcard__index">{String(i + 1).padStart(2, '0')}</div>
                <div className="pcard__body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="pcard__tag">{p.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),

    manifesto: manifesto?.length > 0 && (
      <section className="manifesto" data-manifesto key="manifesto">
        <div className="manifesto__sticky">
          <p className="manifesto__text">
            {manifesto.map((w, i) => {
              const text = typeof w === 'string' ? w : w.text;
              const accent = typeof w === 'object' && w.accent;
              return (
                <span data-word key={i} data-accent={accent ? 'true' : 'false'}
                  className={accent ? 'accent' : ''}>
                  {text}{' '}
                </span>
              );
            })}
          </p>
        </div>
      </section>
    ),

    plans: plans?.length > 0 && (
      <section className="plans" id="planes" key="plans">
        <div className="plans__head">
          <p className="eyebrow" data-reveal>Membresías</p>
          <h2 className="section-title" data-reveal data-d="1">
            Planes y <span className="accent">precios.</span>
          </h2>
          {gym.enrollment != null && (
            <p className="plans__note" data-reveal data-d="2">
              Matrícula única: <strong>{cur}{fmt(gym.enrollment)}</strong>
            </p>
          )}
        </div>
        <div className="plans__grid">
          {plans.map((p, i) => (
            <article className={'plan' + (p.featured ? ' plan--featured' : '')} data-reveal data-d={Math.min(i, 3)} key={i}>
              {p.featured && <span className="plan__badge">Más popular</span>}
              <h3 className="plan__name">{p.name}</h3>
              <div className="plan__price">
                <span className="plan__cur">{cur}</span>
                <span className="plan__amount">{fmt(p.price)}</span>
                {p.period && <span className="plan__per">{p.period}</span>}
              </div>
              {p.note && <p className="plan__noteline">{p.note}</p>}
              <ul className="plan__feats">
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <a href={waHref} className={'btn ' + (p.featured ? 'btn--solid' : 'btn--ghost')}>
                Elegir {p.name}
              </a>
            </article>
          ))}
        </div>
      </section>
    ),

    coaches: coaches?.length > 0 && (
      <section className="coaches" id="coaches" key="coaches">
        <div className="coaches__head">
          <p className="eyebrow" data-reveal>El equipo</p>
          <h2 className="section-title" data-reveal data-d="1">Coaches que <span className="accent">empujan.</span></h2>
        </div>
        <div className="coaches__grid">
          {coaches.map((c, i) => (
            <figure className="coach" data-reveal data-d={i} key={i}>
              <div className="coach__img" style={{ '--img': `url('${c.image}')` }} />
              <figcaption><strong>{c.name}</strong><span>{c.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
    ),

    schedule: (hours?.length > 0 || schedule) && (
      <section className="schedule" id="horarios" key="schedule">
        <div className="schedule__head">
          <p className="eyebrow" data-reveal>Horarios</p>
          <h2 className="section-title" data-reveal data-d="1">
            {hours ? 'Horarios generales.' : 'Esta semana.'}
          </h2>
        </div>
        {hours?.length > 0 ? (
          <div className="hours" data-reveal data-d="2">
            {hours.map((h, i) => (
              <div className="hours__row" key={i}>
                <span className="hours__label">{h.label}</span>
                <span className="hours__value">{h.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="schedule__grid" data-reveal data-d="2"
            style={{ '--cols': schedule.days.length }}>
            <div className="srow srow--head">
              <span>Hora</span>
              {schedule.days.map((d, i) => <span key={i}>{d}</span>)}
            </div>
            {schedule.rows.map((r, i) => (
              <div className="srow" key={i}>
                <span>{r.time}</span>
                {r.classes.map((c, j) => <span key={j}>{c}</span>)}
              </div>
            ))}
          </div>
        )}
      </section>
    ),

    contact: info && (
      <section className="contact" id="contacto" key="contact">
        <div className="contact__head">
          <p className="eyebrow" data-reveal>Contacto</p>
          <h2 className="section-title" data-reveal data-d="1">Cómo <span className="accent">unirte.</span></h2>
        </div>
        <div className="contact__grid">
          <div className="contact__col" data-reveal>
            <h3>Ubicación</h3>
            {info.address && <p>{info.address}</p>}
            {info.whatsapp && <p><a href={waHref}>WhatsApp {info.whatsapp}</a></p>}
            {info.instagram && <p><a href={`https://instagram.com/${info.instagram}`}>@{info.instagram}</a></p>}
          </div>
          {info.payments?.length > 0 && (
            <div className="contact__col" data-reveal data-d="1">
              <h3>Métodos de pago</h3>
              <ul className="pay">
                {info.payments.map((pm, i) => (
                  <li key={i}><span>{pm.label}</span><strong>{pm.value}</strong></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    ),

    cta: cta && (
      <section className="cta" id="unete" key="cta">
        <div className="cta__media" data-parallax="0.18">
          <img src={cta.image} alt="" />
          <div className="cta__scrim" />
        </div>
        <div className="cta__content">
          <h2 className="cta__title" data-reveal><Lines lines={cta.titleLines} /></h2>
          <p data-reveal data-d="1">{cta.sub}</p>
          {info?.whatsapp ? (
            <div className="cta__actions" data-reveal data-d="2">
              <a className="btn btn--solid" href={waHref}>WhatsApp {info.whatsapp}</a>
            </div>
          ) : (
            <form className="cta__form" data-reveal data-d="2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="tu@email.com" aria-label="Correo electrónico" required />
              <button className="btn btn--solid" type="submit">Reservar prueba</button>
            </form>
          )}
        </div>
      </section>
    )
  };

  const order = gym.layout || ['marquee', 'stats', 'programs', 'manifesto', 'plans', 'coaches', 'schedule', 'contact', 'cta'];

  return (
    <>
      <VoltNav gym={gym} />

      <main id="top">
        <section className="hero">
          <div className="hero__media" data-parallax="0.25">
            <img src={hero.image} alt="" />
            <div className="hero__scrim" />
          </div>
          <div className="hero__content">
            <p className="eyebrow" data-reveal>{hero.eyebrow}</p>
            <h1 className="hero__title"><Lines lines={hero.titleLines} /></h1>
            <p className="hero__sub" data-reveal data-d="3">{hero.sub}</p>
            <div className="hero__actions" data-reveal data-d="4">
              <a href={info?.whatsapp ? waHref : '#unete'} className="btn btn--solid">{hero.ctaPrimary}</a>
              <a href="#programas" className="btn btn--ghost">{hero.ctaSecondary}</a>
            </div>
          </div>
          <a href="#stats" className="hero__scroll" aria-label="Desplázate">
            <span className="hero__scroll-line" />
            <span>SCROLL</span>
          </a>
        </section>

        {order.map((k) => blocks[k] || null)}
      </main>

      <footer className="footer">
        <div className="footer__top">
          <a className="nav__brand" href="#top"><Brand gym={gym} /></a>
          <nav className="footer__links" aria-label="Pie">
            <a href="#programas">Disciplinas</a>
            <a href="#planes">Planes</a>
            <a href="#horarios">Horarios</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {gym.name}{gym.location ? ` · ${gym.location}` : ''}</span>
          <span>Performance Gym</span>
        </div>
      </footer>
    </>
  );
}