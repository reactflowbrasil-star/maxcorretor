export type PropertyPhoto = {
  src: string;
  alt: string;
  room: string;
};

export type PropertyListing = {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  location: string;
  photos: PropertyPhoto[];
};

const illustrativePhotos: PropertyPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    alt: "Sala de estar contemporânea, imagem ilustrativa",
    room: "Sala",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    alt: "Ambiente interno de imóvel, imagem ilustrativa",
    room: "Ambiente interno",
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    alt: "Quarto decorado, imagem ilustrativa",
    room: "Quarto",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    alt: "Cozinha de imóvel, imagem ilustrativa",
    room: "Cozinha",
  },
];

export const propertyListings: PropertyListing[] = [
  {
    id: "apartamento-exemplo",
    title: "Apartamento — exemplo de anúncio",
    category: "Apartamento",
    summary: "Veja como será apresentada uma oportunidade de apartamento.",
    description:
      "Esta é uma página demonstrativa. As informações do imóvel, edital, ocupação, valores e prazos devem ser confirmadas com o Max antes de qualquer lance.",
    location: "Localização a confirmar",
    photos: illustrativePhotos,
  },
  {
    id: "casa-exemplo",
    title: "Casa — exemplo de anúncio",
    category: "Casa",
    summary: "Conheça o formato da página de uma oportunidade residencial.",
    description:
      "Esta é uma página demonstrativa. As informações do imóvel, edital, ocupação, valores e prazos devem ser confirmadas com o Max antes de qualquer lance.",
    location: "Localização a confirmar",
    photos: illustrativePhotos,
  },
  {
    id: "investimento-exemplo",
    title: "Imóvel para investimento — exemplo",
    category: "Investimento",
    summary: "Consulte oportunidades para investimento após confirmar os anúncios ativos.",
    description:
      "Esta é uma página demonstrativa. As informações do imóvel, edital, ocupação, valores e prazos devem ser confirmadas com o Max antes de qualquer lance.",
    location: "Localização a confirmar",
    photos: illustrativePhotos,
  },
];

export function propertyContactUrl(title: string) {
  const message = `Olá, Max! Tenho interesse no imóvel “${title}”. Pode me enviar os dados e o link do edital?`;
  return `https://wa.me/5583988828706?text=${encodeURIComponent(message)}`;
}
