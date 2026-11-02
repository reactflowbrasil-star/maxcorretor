import { describe, expect, it } from "vitest";
import { validatedSection } from "@/lib/public-business";
import mcp from "@/lib/mcp";

describe("Agent access boundaries", () => {
  it("allows the approved public tools without account authentication", () => {
    expect(mcp.auth).toBeUndefined();
    expect(mcp.tools.map((tool) => tool.name).sort()).toEqual(["get_contact", "list_services"]);
    expect(mcp.tools.every((tool) => tool.annotations?.readOnlyHint === true)).toBe(true);
  });
  it("limits browser navigation to existing page sections", () => {
    expect(validatedSection("servicos")).toBe("servicos");
    expect(validatedSection("contato")).toBe("contato");
    expect(() => validatedSection("https://outside.example")).toThrow();
    expect(() => validatedSection(null)).toThrow();
  });
});