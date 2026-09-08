## Summary

Clarify public landing and proof page copy to distinguish between the Go PDF library, PDF Suite server, and client-side WebAssembly implementation. Update the proof page benchmarks to note template caching, and remove the unused two-image screens option from navigation and routes.

---

## Motivation / context

- The prior hero copy ("PDF tools that run in your browser") was ambiguous because GoPdfSuit provides three distinct delivery models: the pure Go library, the self-hosted REST API suite, and in-browser WebAssembly.
- The Proof page had no verifiable throughput benchmarks and generic placeholder text.
- The Screens page only contained two screenshots and added unnecessary navigation clutter.

---

## Changes

### Frontend copy and architecture transparency

- **`Home.jsx`**: Update hero headline to "A PDF engine for Go, self-hosted APIs, and the browser." Update lede to explain Go library, REST API suite, and in-browser WASM. Add a three-card distribution section detailing `pkg/gopdflib`, `cmd/gopdfsuit & Docker`, and WebAssembly client.
- **`Comparison.jsx`**: Update page title to "Benchmarks and execution boundaries." Clarify that peak throughput numbers reflect template caching enabled, with uncached baseline around 2,000 to 3,000 ops/s. Detail execution boundaries and data isolation per delivery mode.
- **`index.css`**: Add styles and responsive grid breakpoints for the distribution and proof sections.

### Navigation and routes

- **`SiteHeader.jsx`**: Remove the "Screens" nav link.
- **`Home.jsx`**: Remove the "Screens" action button from the bottom callout.
- **`Comparison.jsx`**: Remove screenshot links from workflow cards.
- **`App.jsx`**: Remove lazy loading of Screenshots and redirect `/screenshots` to `/comparison`.
- **`docs/`**: Rebuild static site bundle via Vite.

---

## Impact

| Area | Impact |
|------|--------|
| **Performance** | Neutral. Only client-side presentation and routing changed. |
| **Memory** | Neutral. |
| **Behavior / correctness** | Unambiguous framing for library, server, and WASM tiers. Clean redirect for `/screenshots`. |
| **API (`/api/v1/*`) / UI** | Updated home and proof pages; removed screens link from header. Workspaces and editors untouched. |
| **Dependencies** | None. |
| **Binary size / build time** | Neutral. `npm run build` succeeds in 2.85s. |
| **PDF compliance (PDF/A-4, PDF/UA-2)** | Unchanged. Core PDF generation logic untouched. |

---

## Breaking changes / migration

| Item | Migration |
|------|-----------|
| None | `/screenshots` route redirects to `/comparison`. |

---

## Test plan

- [x] `make lint` plus `go vet` (zero ESLint warnings in `frontend/`)
- [x] `npm run build` in `frontend` (`docs/` updated cleanly)
- [x] `go test ./pkg/...` passes

### Commands

```sh
make fmt && make lint
cd frontend && npm run build
go test ./pkg/...
```

---

## Related issues

- Relates to #28

---

## PR metadata checklist (author)

- [x] Self-assigned (`--assignee @me`)
- [x] Labels applied
- [x] Related issues filled
- [x] Filled body saved under `plans/PR/pr-website-updates.md`

---

## Reviewer checklist

- [ ] Behavior matches summary and test plan
- [ ] No unrelated changes in diff
- [ ] No secrets or unneeded files committed
