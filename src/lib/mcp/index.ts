import { defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import getContact from "./tools/get-contact";

export default defineMcp({
  name: "maxcorretor",
  title: "Maxcorretor",
  version: "1.0.0",
  instructions: "Consulte os serviços e canais de contato públicos do MAX Corretor. Não há catálogo de imóveis, dados de clientes ou arrematações verificadas nestas ferramentas. Nenhuma ferramenta envia mensagens ou realiza lances.",
  tools: [listServices, getContact],
});