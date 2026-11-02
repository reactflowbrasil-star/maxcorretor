import { useEffect, useState } from "react";
import { Gavel, Star, Quote, X, ChevronDown, Home, TrendingDown, Users, Award } from "lucide-react";

const ALERTS = [
  { name: "Carlos M.", place: "Manaíra", what: "Apartamento 3 quartos", saving: "38%" },
  { name: "Juliana S.", place: "Bessa", what: "Casa duplex", saving: "42%" },
  { name: "Roberto A.", place: "Cabo Branco", what: "Apartamento vista mar", saving: "31%" },
  { name: "Fernanda L.", place: "Bancários", what: "Casa térrea", saving: "45%" },
  { name: "Marcos T.", place: "Tambaú", what: "Flat mobiliado", saving: "35%" },
  { name: "Patrícia R.", place: "Altiplano", what: "Apartamento 2 quartos", saving: "40%" },
];

export function AuctionAlerts() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    let t: ReturnType<typeof setTimeout>;
    const cycle = (idx: number, first: boolean) => {
      t = setTimeout(() => {
        setI(idx);
        setShow(true);
        t = setTimeout(() => {
          setShow(false);
          cycle((idx + 1) % ALERTS.length, false);
        }, 5000);
      }, first ? 4000 : 6000 + Math.random() * 6000);
    };
    cycle(0, true);
    return () => clearTimeout(t);
  }, [closed]);

  const a = ALERTS[i];
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-4 z-50 w-[calc(100%-2rem)] max-w-sm transition-all duration-500 md:bottom-6 ${
        show && !closed ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-ink p-4 text-ink-foreground shadow-red">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-red text-primary-foreground">
          <Gavel className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-ping rounded-full bg-primary" />
        </span>
        <div className="min-w-0 flex-1 text-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Arrematado agora</p>
          <p className="mt-1"><strong>{a.name}</strong> arrematou {a.what} em <strong>{a.place}</strong></p>
          <p className="mt-1 text-ink-foreground/60">{a.saving} abaixo do valor de mercado</p>
        </div>
        <button aria-label="Fechar alertas" onClick={() => setClosed(true)} className="text-ink-foreground/50 hover:text-ink-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const stats = [
  { icon: Home, value: "+150", label: "Imóveis arrematados" },
  { icon: TrendingDown, value: "até 50%", label: "Abaixo do mercado" },
  { icon: Users, value: "+300", label: "Clientes atendidos" },
  { icon: Award, value: "100%", label: "Assessoria completa" },
];

export function Results() {
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-foreground/10 bg-ink-soft p-6 text-center">
            <s.icon className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-4 text-3xl font-black text-ink-foreground md:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-ink-foreground/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Ana Paula Ferreira", role: "Comprou apto em Manaíra", text: "Nunca imaginei comprar em leilão. O Max explicou cada detalhe do edital e paguei quase 40% a menos." },
  { name: "Ricardo Nóbrega", role: "Investidor", text: "Já arrematei três imóveis com a assessoria da MAX. Análise de risco impecável e atendimento rápido." },
  { name: "Luciana e Pedro", role: "Primeira casa própria", text: "Conseguimos financiar pela Caixa com todo o suporte. Hoje temos nossa casa no Bessa!" },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="mx-auto max-w-7xl px-5 py-24">
      <div className="text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Depoimentos</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">Quem comprou com a MAX recomenda</h2>
        <div className="mt-4 flex items-center justify-center gap-1 text-primary">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          <span className="ml-2 text-sm text-muted-foreground">5,0 de avaliação dos clientes</span>
        </div>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="relative rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-red">
            <Quote className="h-8 w-8 text-primary" />
            <blockquote className="mt-4 text-muted-foreground">“{t.text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-red font-bold text-primary-foreground">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-bold">{t.name}</span>
                <span className="text-sm text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  { q: "É seguro comprar imóvel em leilão?", a: "Sim, desde que haja análise prévia do edital, da matrícula e das dívidas. É exatamente isso que fazemos antes de qualquer lance." },
  { q: "Posso financiar um imóvel de leilão?", a: "Muitos imóveis da Caixa e de bancos aceitam financiamento e uso do FGTS. Verificamos as condições de cada edital." },
  { q: "E se o imóvel estiver ocupado?", a: "Avaliamos a situação de ocupação e orientamos sobre os caminhos para desocupação, judicial ou amigável." },
  { q: "Quanto custa a assessoria?", a: "Fale com o Max pelo WhatsApp para receber uma proposta de acordo com o imóvel e o tipo de leilão." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 pb-24">
      <div className="text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Dúvidas</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">Perguntas frequentes</h2>
      </div>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="rounded-2xl border border-border bg-card">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold">
              {f.q}
              <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
