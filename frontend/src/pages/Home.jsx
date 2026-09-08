import { ArrowRight, Cpu, HardDrive, Laptop, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import GitHubStars from '../components/site/GitHubStars'
import { toolGroups } from '../content/tools'

const Home = () => {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1>A PDF engine for Go, self-hosted APIs, and the browser.</h1>
          <p className="home-lede">Generate PDFs from JSON templates, merge, split, compress, fill forms, and redact. Embed the pure Go library directly, run the REST API container in your cluster, or use client-side WebAssembly tools right in the browser.</p>
          <div className="home-actions">
            <Link className="button button-primary" to="/editor">Open the editor <ArrowRight aria-hidden="true" size={17} /></Link>
            <Link className="button button-secondary" to="/viewer">Preview a template</Link>
            <GitHubStars className="button button-secondary" />
          </div>
        </div>
      </section>

      <section className="home-distribution" aria-labelledby="distribution-title">
        <h2 id="distribution-title">Distribution modes</h2>
        <div className="distribution-grid">
          <article className="distribution-card">
            <Cpu aria-hidden="true" size={22} strokeWidth={1.7} />
            <h3>Go PDF library</h3>
            <p className="distribution-pkg">pkg/gopdflib</p>
            <p>Embed directly in your Go services. Generates PDF/A-4 and PDF/UA-2 files in memory with zero external dependencies. No Ghostscript, no headless browser.</p>
          </article>
          <article className="distribution-card">
            <HardDrive aria-hidden="true" size={22} strokeWidth={1.7} />
            <h3>PDF Suite service</h3>
            <p className="distribution-pkg">cmd/gopdfsuit &amp; Docker</p>
            <p>Deploy as a self-hosted HTTP microservice on :8080 or call from Python via pypdfsuit. Uses pooled Sonic JSON decoding for high-throughput batch pipelines.</p>
          </article>
          <article className="distribution-card">
            <Laptop aria-hidden="true" size={22} strokeWidth={1.7} />
            <h3>Browser WebAssembly</h3>
            <p className="distribution-pkg">WebAssembly client</p>
            <p>Run compression, viewer rendering, and form operations locally inside your browser tab. Files stay on your machine. Server upload happens only on explicit consent.</p>
          </article>
        </div>
      </section>

      <section className="tool-catalogue" aria-labelledby="tool-catalogue-title">
        <div className="section-heading-row">
          <div>
            <h2 id="tool-catalogue-title">Tools and workspaces</h2>
          </div>
          <Link className="text-link" to="/comparison">See verified proof <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
        {toolGroups.map((group) => (
          <section className="tool-group" key={group.title} aria-labelledby={`${group.title}-tools`}>
            <h3 id={`${group.title}-tools`}>{group.title}</h3>
            <div className="tool-card-grid">
              {group.items.map(({ to, label, description, icon: Icon }) => (
                <Link className="tool-card" key={`${to}-${label}`} to={to}>
                  <Icon aria-hidden="true" size={22} strokeWidth={1.7} />
                  <span>{label}</span>
                  <p>{description}</p>
                  <ArrowRight aria-hidden="true" className="tool-card-arrow" size={17} />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="proof-callout" aria-labelledby="proof-title">
        <ShieldCheck aria-hidden="true" size={26} strokeWidth={1.6} />
        <div>
          <h2 id="proof-title">Benchmarks and execution boundaries.</h2>
          <p>Review throughput benchmarks, template caching data, and execution boundaries.</p>
        </div>
        <div className="proof-actions">
          <Link className="button button-secondary" to="/comparison">See proof</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
