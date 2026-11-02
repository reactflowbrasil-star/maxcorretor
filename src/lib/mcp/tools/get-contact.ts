import { defineTool } from "@lovable.dev/mcp-js";
import { contactSummary } from "../../public-business";

export default defineTool({
  name: "get_contact",
  title: "Contato do MAX Corretor",
  description: "Consulta o WhatsApp, Instagram e localização públicos do MAX Corretor, sem enviar mensagens.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({ content: [{ type: "text", text: contactSummary() }] }),
});