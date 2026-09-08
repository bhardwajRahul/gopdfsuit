import { Braces, Cpu, FileOutput, HardDrive, Laptop, Wrench, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const benchmarks = [
  {
    value: '6,611 ops/s',
    label: 'Cached compliant peak',
    detail: 'Zerodha statement generation with template caching, full PDF/A-4, PDF/UA-2 tagging, and ECDSA P-256 signing across mixed trade tiers.',
    target: 'bench-gopdflib-zerodha',
  },
  {
    value: '2,000 - 3,000 ops/s',
    label: 'Uncached baseline',
    detail: 'Cold generation without template caching. Runs full parse, font setup, and rendering on every document.',
    target: 'baseline uncached',
  },
  {
    value: '37,853 ops/s',
    label: 'Cached raw peak',
    detail: 'Template cached generation without compliance tagging or cryptographic signing overhead.',
    target: 'bench-gopdflib-zerodha-nocomply',
  },
  {
    value: '7,515 req/s',
    label: 'HTTP REST throughput',
    detail: 'HTTP API throughput via Gin server using pooled Sonic JSON deserializers, measured with contract note payloads.',
    target: 'bench-k6-retail',
  },
]

const deliveryModes = [
  {
    title: 'Go PDF library',
    pkg: 'pkg/gopdflib',
    icon: Cpu,
    env: 'In-process native Go',
    latency: 'Sub-millisecond (0ms network)',
    dataBoundary: 'Application memory only. Zero network calls.',
    notes: 'Direct struct access for high-volume backend generation. Zero third-party runtime binaries.',
  },
  {
    title: 'PDF Suite service',
    pkg: 'cmd/gopdfsuit & Docker',
    icon: HardDrive,
    env: 'Linux container or binary (:8080)',
    latency: 'Sub-10ms generation + network',
    dataBoundary: 'Private VPC or cluster. No external SaaS calls.',
    notes: 'REST API endpoints for microservices, plus native Python bindings via pypdfsuit.',
  },
  {
    title: 'Browser WebAssembly',
    pkg: 'WebAssembly client',
    icon: Laptop,
    env: 'Browser tab (V8 / JavaScript runtime)',
    latency: 'Client-side processing',
    dataBoundary: 'Local machine only. Server upload requires explicit consent.',
    notes: 'Runs compression, viewer rendering, and form inspection right in the browser without uploading files.',
  },
]

const workflows = [
  {
    title: 'Start with a template',
    icon: Braces,
    copy: 'Use the editor to visually assemble a template. Use the viewer when you have JSON and want to inspect the generated PDF.',
    links: [
      { to: '/editor', label: 'Open the editor' },
      { to: '/viewer', label: 'Preview JSON' },
    ],
  },
  {
    title: 'Work with an existing PDF',
    icon: Wrench,
    copy: 'Merge, split, compress, fill forms, or redact. Each tool runs locally when supported and keeps options beside the output.',
    links: [
      { to: '/merge', label: 'Merge PDFs' },
      { to: '/split', label: 'Split a PDF' },
      { to: '/compress', label: 'Compress a PDF' },
      { to: '/filler', label: 'Fill a form' },
      { to: '/redact', label: 'Redact content' },
    ],
  },
  {
    title: 'Start with HTML',
    icon: FileOutput,
    copy: 'Convert HTML documents or live URLs into PDF or PNG/JPG images using GoWK without running a browser.',
    links: [
      { to: '/htmltopdf', label: 'HTML to PDF' },
      { to: '/htmltoimage', label: 'HTML to image' },
    ],
  },
]

export default function Comparison() {
  return (
    <div className="proof-page">
      <header>
        <h1>Benchmarks and execution boundaries.</h1>
        <p>Measured throughput numbers, template caching details, and execution boundaries for GoPdfSuit.</p>
      </header>

      <section className="proof-section" aria-labelledby="benchmarks-heading">
        <div className="section-heading-row">
          <div>
            <h2 id="benchmarks-heading">Measured throughput</h2>
            <p className="proof-section-lede">Numbers from dated test runs on Intel i7-13700HX, Go 1.26.4 (best of 5 runs). Peak numbers reflect template caching enabled (uncached baseline is around 2,000 to 3,000 ops/s), evaluated across contract note and trade statement payloads.</p>
          </div>
          <Zap aria-hidden="true" className="proof-accent-icon" size={28} />
        </div>
        <div className="proof-grid-4">
          {benchmarks.map(({ value, label, detail, target }) => (
            <article className="proof-stat-card" key={label}>
              <div className="proof-stat-value">{value}</div>
              <div className="proof-stat-label">{label}</div>
              <p className="proof-stat-desc">{detail}</p>
              <code className="proof-stat-target">{target}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section" aria-labelledby="delivery-heading">
        <h2 id="delivery-heading">Execution boundaries and data isolation</h2>
        <p className="proof-section-lede">GoPdfSuit provides three distribution options so you choose where your documents are processed.</p>
        <div className="proof-grid-3">
          {deliveryModes.map(({ title, pkg, icon: Icon, env, latency, dataBoundary, notes }) => (
            <article className="proof-card" key={title}>
              <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
              <h3>{title}</h3>
              <div className="distribution-pkg">{pkg}</div>
              <dl className="proof-dl">
                <dt>Environment</dt>
                <dd>{env}</dd>
                <dt>Latency</dt>
                <dd>{latency}</dd>
                <dt>Data boundary</dt>
                <dd>{dataBoundary}</dd>
              </dl>
              <p>{notes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section" aria-labelledby="workflows-heading">
        <h2 id="workflows-heading">Workspaces and workflows</h2>
        <p className="proof-section-lede">Direct paths to document authoring, conversion, and modification workspaces.</p>
        <div className="workflow-map">
          {workflows.map(({ title, copy, icon: Icon, links }) => (
            <article className="workflow-card" key={title}>
              <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
              <h3>{title}</h3>
              <p>{copy}</p>
              <ul>
                {links.map(({ to, label }) => <li key={to}><Link to={to}>{label}</Link></li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
