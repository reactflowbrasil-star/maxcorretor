export const WHATSAPP = "https://wa.me/5583988828706?text=Ol%C3%A1%2C%20Max!%20Quero%20saber%20sobre%20im%C3%B3veis%20de%20leil%C3%A3o.";
export const INSTAGRAM = "https://instagram.com/maxcorretorpb";

export const publicServices = [
  { title: "Arrematação", text: "Acompanhamos você em cada lance, do edital ao auto de arrematação." },
  { title: "Documentação", text: "Análise completa de matrícula, débitos e pendências do imóvel." },
  { title: "Análise de riscos", text: "Avaliamos ocupação, dívidas e riscos jurídicos antes de você investir." },
  { title: "Regularização", text: "Cuidamos do registro, imissão na posse e transferência." },
  { title: "Financiamento", text: "Orientação para financiar seu imóvel de leilão com segurança." },
  { title: "Até as chaves", text: "Assessoria completa até você estar com o imóvel em mãos." },
];

export function servicesSummary() {
  return publicServices.map(({ title, text }) => `${title}: ${text}`).join("\n");
}

export function contactSummary() {
  return `MAX Corretor — João Pessoa · PB\nWhatsApp: (83) 98882-8706\n${WHATSAPP}\nInstagram: ${INSTAGRAM}`;
}

export const pageSections = ["topo", "imoveis", "servicos", "como-funciona", "vantagens", "depoimentos", "faq", "contato"] as const;

export function validatedSection(value: unknown) {
  const section = pageSections.find((section) => section === value);
  if (!section) throw new Error("Seção inválida; escolha topo, imoveis, servicos, como-funciona, vantagens, depoimentos, faq ou contato.");
  return section;
}
