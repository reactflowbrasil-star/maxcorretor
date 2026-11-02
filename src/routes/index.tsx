import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Gavel,
  FileSearch,
  FileCheck2,
  Landmark,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Instagram,
  ArrowRight,
  Menu,
  X,
  Check,
  KeyRound,
} from "lucide-react";
import logo from "@/assets/max-corretor-logo.png.asset.json";
import hero from "@/assets/hero-joao-pessoa.jpg";
import { AuctionAlerts, Results, Testimonials, Faq } from "@/components/extra-sections";
import { useWebMCP } from "use-webmcp-tool";
import { runWebMCPTool } from "@/lib/webmcp-telemetry";
import { WHATSAPP, INSTAGRAM, publicServices, servicesSummary, contactSummary, pageSections, validatedSection } from "@/lib/public-business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAX Corretor | Imóveis de leilão em João Pessoa" },
      {
        name: "description",
        content:
          "Imóveis de leilão sem complicação: arrematação, documentação, análise de riscos, regularização e financiamento em João Pessoa.",
      },
      { property: "og:title", content: "MAX Corretor | Imóveis de leilão em João Pessoa" },
      {
        property: "og:description",
        content: "Compre imóveis de leilão com segurança e assessoria completa do início às chaves.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#contato", label: "Contato" },
];

const serviceIcons = [Gavel, FileSearch, ShieldCheck, FileCheck2, Landmark, KeyRound];
const services = publicServices.map((service, index) => ({ ...service, icon: serviceIcons[index] ?? Gavel }));

const steps = [
  { n: "01", title: "Conversa inicial", text: "Entendemos seu objetivo: morar, investir ou revender." },
  { n: "02", title: "Seleção e análise", text: "Buscamos oportunidades e analisamos edital, documentos e riscos." },
  { n: "03", title: "Arrematação", text: "Planejamos o lance e acompanhamos o leilão com você." },
  { n: "04", title: "Regularização", text: "Resolvemos a burocracia até o imóvel estar no seu nome." },
];

const HERO_PHRASES = ["sem complicação.", "abaixo do mercado.", "com total segurança."];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index] ?? "";
    let delay = deleting ? 35 : 70;

    if (!deleting && text === full) delay = 2000;
    else if (deleting && text === "") delay = 400;

    const t = setTimeout(() => {
      if (!deleting) {
        if (text === full) setDeleting(true);
        else setText(full.slice(0, text.length + 1));
      } else {
        if (text === "") {
          setDeleting(false);
          setIndex((index + 1) % phrases.length);
        } else setText(full.slice(0, text.length - 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases]);

  return text;
}

function Logo({ className = "" }: { className?: string }) {
  return <img src={logo.url} alt="MAX Corretor" className={className} width={1920} height={720} />;
}

function WhatsButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-red px-7 py-4 font-display font-bold text-primary-foreground shadow-red transition hover:-translate-y-0.5 hover:brightness-110 ${className}`}
    >
      {children}
    </a>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const typed = useTypewriter(HERO_PHRASES);

  function navigateSection(value: unknown) {
    const section = validatedSection(value);
    const target = document.getElementById(section);
    if (!target) throw new Error("Esta seção não está disponível na página.");
    setOpen(false);
    window.location.hash = section;
    target.scrollIntoView({ behavior: "instant", block: "start" });
    return `Seção aberta: ${section}.`;
  }

  useWebMCP({
    name: "list_services",
    description: "Consulta os serviços apresentados nesta página do MAX Corretor.",
    annotations: { readOnlyHint: true },
    execute: () => runWebMCPTool("list_services", servicesSummary),
  });
  useWebMCP({
    name: "get_contact",
    description: "Consulta os contatos públicos exibidos nesta página, sem enviar mensagens.",
    annotations: { readOnlyHint: true },
    execute: () => runWebMCPTool("get_contact", contactSummary),
  });
  useWebMCP({
    name: "navigate_section",
    description: "Abre uma seção desta página: serviços, etapas, vantagens, depoimentos, dúvidas ou contato.",
    inputSchema: {
      type: "object",
      properties: { section: { type: "string", enum: [...pageSections], description: "Identificador da seção a abrir." } },
      required: ["section"],
      additionalProperties: false,
    },
    execute: ({ section }: { section: string }) => runWebMCPTool("navigate_section", () => navigateSection(section)),
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-foreground/10 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <a href="#topo"><Logo className="h-12 w-auto md:h-14" /></a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(event) => { event.preventDefault(); navigateSection(n.href.slice(1)); }} className="text-sm font-medium text-ink-foreground/80 transition hover:text-primary">
                {n.label}
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-deep">
              Falar no WhatsApp
            </a>
          </nav>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-ink-foreground md:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-ink-foreground/10 bg-ink px-5 pb-6 md:hidden">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(event) => { event.preventDefault(); navigateSection(n.href.slice(1)); }} className="block py-3 font-medium text-ink-foreground">
                {n.label}
              </a>
            ))}
            <WhatsButton className="mt-3 w-full"><MessageCircle className="h-5 w-5" /> Falar no WhatsApp</WhatsButton>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="topo" className="relative isolate flex min-h-[100svh] items-center bg-ink pt-20 font-hero">
        <img src={hero} alt="Imóveis em João Pessoa" width={1600} height={1008} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-16 text-center">
          <Logo className="mb-10 w-64 md:w-96" />
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-sm font-medium tracking-wide text-ink-foreground">
            <MapPin className="h-4 w-4 text-primary" /> João Pessoa · Paraíba
          </span>
          <h1 className="mt-8 text-4xl font-light leading-[1.15] tracking-tight text-ink-foreground md:text-6xl">
            Imóveis de leilão
            <br />
            <span className="font-medium text-primary">
              {typed}
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] animate-pulse bg-primary" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed tracking-wide text-ink-foreground/75 md:text-xl">
            Arrematação, documentação, análise de riscos, regularização e financiamento. Compre bem abaixo do mercado com quem entende do assunto.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <WhatsButton><MessageCircle className="h-5 w-5" /> Quero uma oportunidade</WhatsButton>
            <a href="#servicos" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-foreground/25 px-7 py-4 font-hero font-bold text-ink-foreground transition hover:border-primary hover:text-primary">
              Ver serviços <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Red strip */}
      <div className="bg-gradient-red">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 text-center text-primary-foreground md:grid-cols-4">
          {[["Leilão", "judicial e extrajudicial"], ["Caixa", "e bancos"], ["100%", "assessoria"], ["JP", "e região"]].map(([a, b]) => (
            <div key={a}>
              <p className="font-display text-3xl font-black">{a}</p>
              <p className="text-sm opacity-85">{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="servicos" className="mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Serviços</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Tudo o que você precisa para arrematar com segurança</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-2xl border bg-card p-8 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-red">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary transition group-hover:bg-gradient-red group-hover:text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section id="como-funciona" className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Como funciona</p>
              <h2 className="mt-3 text-3xl font-black text-ink-foreground md:text-5xl">Do leilão às chaves em 4 passos</h2>
            </div>
            <Logo className="w-48 opacity-90 md:w-64" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-ink-foreground/10 bg-ink-soft p-8">
                <span className="font-display text-5xl font-black text-primary">{s.n}</span>
                <h3 className="mt-4 text-xl font-bold text-ink-foreground">{s.title}</h3>
                <p className="mt-2 text-ink-foreground/65">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="vantagens" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img src={hero} alt="Imóvel em João Pessoa" loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <div className="absolute -bottom-6 -right-2 rounded-2xl bg-ink p-5 shadow-red md:-right-6">
            <Logo className="w-40" />
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Por que a MAX</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Segurança para investir onde poucos sabem</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Leilão pode ser a melhor forma de comprar um imóvel — quando você tem do seu lado quem conhece edital, riscos e burocracia.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Imóveis com valores abaixo do mercado",
              "Análise de riscos antes de qualquer lance",
              "Atendimento próximo e transparente",
              "Apoio na regularização e no financiamento",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-red text-primary-foreground"><Check className="h-4 w-4" /></span>
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Results />
      <Testimonials />
      <Faq />
      <AuctionAlerts />

      {/* CTA */}
      <section id="contato" className="px-5 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-red px-8 py-16 text-center md:py-20">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ink/15" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-ink/15" />
          <div className="relative">
            <h2 className="text-3xl font-black text-primary-foreground md:text-5xl">Seu próximo imóvel pode estar no leilão</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85">Fale agora com o Max e receba oportunidades em João Pessoa.</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display font-bold text-ink-foreground transition hover:-translate-y-0.5">
              <MessageCircle className="h-5 w-5 text-primary" /> (83) 98882-8706
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-14 md:flex-row md:justify-between">
          <Logo className="w-56" />
          <div className="flex flex-col items-center gap-3 text-ink-foreground/70 md:items-end">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> João Pessoa · PB</span>
            <div className="flex gap-3">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-full bg-ink-soft p-3 text-ink-foreground transition hover:bg-primary"><MessageCircle className="h-5 w-5" /></a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-ink-soft p-3 text-ink-foreground transition hover:bg-primary"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <p className="border-t border-ink-foreground/10 py-6 text-center text-sm text-ink-foreground/50">© {new Date().getFullYear()} MAX Corretor. Todos os direitos reservados.</p>
      </footer>

      {/* Floating WhatsApp */}
      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-red text-primary-foreground shadow-red transition hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
