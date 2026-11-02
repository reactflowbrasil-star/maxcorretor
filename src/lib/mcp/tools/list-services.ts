import { defineTool } from "@lovable.dev/mcp-js";
import { servicesSummary } from "../../public-business";

export default defineTool({
  name: "list_services",
  title: "Serviços do MAX Corretor",
  description: "Consulta os serviços públicos de assessoria para imóveis de leilão apresentados na página do MAX Corretor.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({ content: [{ type: "text", text: servicesSummary() }] }),
});