<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep MCP tools in `src/lib/mcp/`, one tool per file, with SDK-generated transport routes via the TanStack Vite plugin; this preserves the supported transport boundary.
- Share public business content in `src/lib/public-business.ts` between the page and read-only MCP tools so assistants receive the same services and contacts as visitors.
- Register browser-local WebMCP tools in the owning page and wrap execution with the shared telemetry helper; share navigation actions with the visible controls to preserve behavior.
