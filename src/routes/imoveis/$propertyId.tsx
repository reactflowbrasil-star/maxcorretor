import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, MapPin, Gavel, Image as ImageIcon } from "lucide-react";
import { propertyContactUrl, propertyListings } from "@/lib/property-listings";

export const Route = createFileRoute("/imoveis/$propertyId")({
  component: PropertyDetails,
});

function PropertyDetails() {
  const { propertyId } = Route.useParams();
  const property = propertyListings.find((listing) => listing.id === propertyId);
  const [activePhoto, setActivePhoto] = useState(0);

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 py-20">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-black">Imóvel não encontrado</h1>
          <p className="mt-3 text-muted-foreground">Esse anúncio pode ter sido removido ou o endereço está incorreto.</p>
          <a href="/#imoveis" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-red px-6 py-3 font-bold text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar para os imóveis
          </a>
        </div>
      </main>
    );
  }

  const selectedPhoto = property.photos[activePhoto] ?? property.photos[0];
  const contactUrl = propertyContactUrl(property.title);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-ink px-5 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/#imoveis" className="inline-flex items-center gap-2 font-semibold text-ink-foreground transition hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Todos os imóveis
          </a>
          <span className="text-sm font-bold text-ink-foreground">MAX Corretor</span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">Página demonstrativa</span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {property.location}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
          <section aria-label="Galeria de fotos do imóvel" className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-ink">
              {selectedPhoto ? (
                <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="aspect-[4/3] w-full object-cover md:aspect-[16/10]" />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center text-ink-foreground"><ImageIcon className="h-12 w-12" /></div>
              )}
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-3 py-1.5 text-sm font-semibold text-ink-foreground backdrop-blur">
                {selectedPhoto?.room ?? "Fotos"} · {activePhoto + 1} de {property.photos.length}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {property.photos.map((photo, index) => (
                <button
                  key={`${photo.room}-${index}`}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Ver foto: ${photo.room}`}
                  aria-pressed={activePhoto === index}
                  className={`overflow-hidden rounded-xl border-2 transition ${activePhoto === index ? "border-primary" : "border-transparent opacity-75 hover:opacity-100"}`}
                >
                  <img src={photo.src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <span className="sr-only">{photo.room}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Fotos ilustrativas; as imagens reais de cada imóvel serão incluídas no anúncio.</p>
          </section>

          <aside>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-primary">{property.category}</p>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">{property.title}</h1>
            <p className="mt-4 flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {property.location}</p>

            <div className="mt-7 rounded-2xl border border-primary/20 bg-accent/50 p-5">
              <p className="flex items-center gap-2 font-bold"><Gavel className="h-5 w-5 text-primary" /> Informações do leilão</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Valor mínimo, edital, datas e condições devem ser confirmados para cada oportunidade ativa.</p>
            </div>

            <h2 className="mt-8 text-xl font-bold">Sobre este anúncio</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{property.description}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{property.summary}</p>

            <a href={contactUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-red px-6 py-4 font-display font-bold text-primary-foreground shadow-red transition hover:-translate-y-0.5 hover:brightness-110">
              Consultar este imóvel <ArrowUpRight className="h-5 w-5" />
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">Fale com o Max para receber dados reais, edital e disponibilidade.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
