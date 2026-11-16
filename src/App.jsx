import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, BookOpen, Compass, Instagram, Mail, Menu, Search, Users, X } from 'lucide-react'

const SITE_URL = 'https://sheruvai.vercel.app'
const instagramUrl = 'https://www.instagram.com/sourav.das.debug/'
const githubUrl = 'https://github.com/Sourav5482'

const nav = [
  ['Home', '/'],
  ['About', '/about/sourav-das/'],
  ['Education', '/education/'],
  ['Sheru Vai', '/sheru-vai/'],
  ['Articles', '/articles/'],
]

const variations = ['Sheru Vai', 'Sheru Bhai', 'Sheru Bhaii', 'Sheru Bai', 'SheruVAI', 'Sheruvai', 'Sherubhai', 'Sheru Bhai Trend', 'Sheru Vai Trend']

const pageMeta = {
  '/about/sourav-das/': ['About Sourav Das | Midnapore BCA Student', 'Learn about Sourav Das from Midnapore, West Bengal: a BCA student documenting technology interests and a personal Sheru Vai journey.'],
  '/education/': ['Sourav Das Education | Midnapore College BCA', 'Verified education information for Sourav Das, a Bachelor of Computer Applications student at Midnapore College (Autonomous).'],
  '/social/': ['Sourav Das Social Profiles | Instagram', 'Find the verified Instagram profile for Sourav Das, a BCA student and creator from Midnapore, West Bengal.'],
  '/sheru-vai/': ['Sheru Vai Documentation & Meaning | Knowledge Hub', 'An independently maintained Sheru Vai knowledge hub covering terminology, spelling variations, online usage and what remains unverified.'],
  '/sheru-vai/origin-and-history/': ['Sheru Vai Origin Research | Sourav Das, Midnapore College BCA', 'Sheru Vai origin research by Sourav Das, a BCA student at Midnapore College (Autonomous) in Midnapore, West Bengal.'],
  '/sheru-vai/meaning/': ['Sheru Vai Meaning | Terminology Guide', 'A careful terminology guide to Sheru Vai and related search spellings without inventing an official meaning.'],
  '/sheru-vai/spelling-variations/': ['Sheru Vai Spelling Variations | Search Guide', 'Explore common Sheru Vai, Sheru Bhai and Sheruvai search variations in one transparent reference page.'],
  '/sheru-vai/trend/': ['Sheru Vai Trend | Documentation', 'Independent documentation of Sheru Vai trend terminology and online usage, without unsupported popularity claims.'],
  '/sheru-vai/online-presence/': ['Sheru Vai Online Presence | Research Notes', 'Research notes about finding Sheru Vai online and separating searchable terms from verified sources.'],
  '/sheru-vai/faq/': ['Sheru Vai FAQ | Frequently Asked Questions', 'Answers to common questions about Sheru Vai, spelling variations, sources and this independent documentation project.'],
  '/articles/': ['Articles | Sourav Das Knowledge Hub', 'Original articles and documentation notes from Sourav Das. Published claims are kept separate from work in progress.'],
  '/articles/sheru-vai-documentation/': ['Sheru Vai Documentation | Sourav Das', 'An independently maintained documentation article about Sheru Vai terminology, search variations and evidence.'],
  '/articles/sourav-das-sheru-vai-journey/': ['Sourav Das Sheru Vai Journey | Personal Notes', 'Personal notes from Sourav Das about documenting a creative Sheru Vai journey with care and transparency.'],
}

function usePageMeta(path, type = 'WebPage') {
  useEffect(() => {
    const [title, description] = pageMeta[path] || ['Sourav Das | Sheru Vai Knowledge Hub', 'Sourav Das is a BCA student from Midnapore documenting technology interests and a personal Sheru Vai journey.']
    document.title = title
    const setMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector)
      if (element) element.setAttribute(attribute, value)
    }
    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', canonical)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      name: title,
      url: canonical,
      description,
      ...(type === 'WebPage' ? { mainEntity: { '@type': 'Person', name: 'Sourav Das', url: SITE_URL, sameAs: [instagramUrl, githubUrl] } } : {}),
    }
    const script = document.querySelector('#page-structured-data')
    if (script) script.textContent = JSON.stringify(structuredData)
  }, [path, type])
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <header className="site-header">
    <a href="/" className="brand" aria-label="Sourav Das home"><span className="brand-mark">SD<span>.</span></span><span className="brand-name">SOURAV DAS</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a className="header-cta" href="/social/">SOCIAL PROFILE <ArrowUpRight size={15} /></a>
    <button className="mobile-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    {menuOpen && <nav className="mobile-nav">{nav.concat([['Social', '/social/']]).map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
  </header>
}

function Footer() {
  return <footer className="footer section-wrap">
    <a href="/" className="brand"><span className="brand-mark">SD<span>.</span></span><span className="brand-name">SOURAV DAS</span></a>
    <p>Built with curiosity. Updated with purpose.</p><a href="#top" className="back-top">BACK TO TOP ↑</a>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Sourav Das</span><span>PERSONAL WEBSITE · SHERU VAI DOCUMENTATION</span></div>
  </footer>
}

function Layout({ children, path, type }) {
  usePageMeta(path, type)
  return <div id="top" className="app-shell"><div className="noise" aria-hidden="true" /><Header /><main>{children}</main><Footer /><script id="page-structured-data" type="application/ld+json" /></div>
}

function Label({ children, number }) { return <div className="section-label"><span>{number}</span> / {children}</div> }
function Breadcrumbs({ items }) { return <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>{items.map(([label, href]) => <React.Fragment key={label}><span>/</span><a href={href}>{label}</a></React.Fragment>)}</nav> }
function Button({ href, children }) { return <a className="button button-primary" href={href}>{children}<ArrowUpRight size={16} /></a> }

function Home() {
  return <Layout path="/">
    <section className="hero section-wrap"><div className="hero-kicker"><span className="pulse-dot" /> PERSONAL KNOWLEDGE HUB / MIDNAPORE, INDIA</div><div className="hero-grid">
      <div className="hero-copy"><p className="eyebrow">THE JOURNEY STARTS HERE</p><h1>Sourav<br /><span>Das.</span></h1><p className="hero-description"><strong>Student, technology enthusiast and creator</strong> documenting a personal Sheru Vai journey from Midnapore, West Bengal.</p><div className="hero-actions"><Button href="/sheru-vai/">EXPLORE SHERU VAI</Button><a className="text-link" href="/about/sourav-das/">ABOUT SOURAV <ArrowDown size={15} /></a></div></div>
      <div className="hero-art" role="img" aria-label="Abstract orange Sheru Vai artwork"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-sun" /><div className="art-word">SHERU<br /><span>VAI.</span></div><div className="art-caption">AN INDEPENDENT<br />DOCUMENTATION PROJECT</div><div className="art-index">01 / 09</div></div>
    </div><div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="hero-line" /><span>01 — 09</span></div></section>
    <section className="section-wrap section-spacing"><Label number="01">ABOUT SOURAV</Label><div className="about-grid"><h2>Curiosity is<br />my <span>starting point.</span></h2><div className="about-body"><p className="lead">Sourav Das is a BCA student at Midnapore College (Autonomous), based in Midnapore, West Bengal, India.</p><p>This website documents his technology interests, personal projects and creative journey around Sheru Vai. It is a place for careful notes, original work and useful context.</p><a className="text-link" href="/about/sourav-das/">READ THE BIO <ArrowUpRight size={15} /></a></div></div></section>
    <section className="sheru-section section-spacing"><div className="section-wrap"><Label number="02">FEATURED KNOWLEDGE HUB</Label><div className="sheru-heading"><h2>Sheru Vai.<br /><span>Documented carefully.</span></h2><p>An independently maintained reference for terminology, possible search spellings, online usage and the boundaries of what is currently verified.</p></div><div className="feature-grid"><Feature icon={<BookOpen />} title="Start with the guide" text="Read the main Sheru Vai overview, then explore focused documentation pages." href="/sheru-vai/" /><Feature icon={<Search />} title="Find variations" text="Sheru Vai, Sheru Bhai, Sheruvai and other searches are grouped in one guide." href="/sheru-vai/spelling-variations/" /><Feature icon={<Compass />} title="Check the evidence" text="Unknown history is labelled honestly rather than filled with invented claims." href="/sheru-vai/origin-and-history/" /></div></div></section>
    <section className="section-wrap section-spacing"><Label number="03">EDUCATION & SOCIAL</Label><div className="quick-grid"><InfoCard title="Midnapore College (Autonomous)" text="Bachelor of Computer Applications · Department of Computer Applications" href="/education/" /><InfoCard title="@sourav.das.debug" text="Follow the verified Instagram profile." href="/social/" icon={<Instagram />} /></div></section>
    <Contact />
  </Layout>
}

function Feature({ icon, title, text, href }) { return <a className="feature-card" href={href}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><ArrowUpRight className="card-arrow" size={18} /></a> }
function InfoCard({ title, text, href, icon = <BookOpen /> }) { return <a className="info-card" href={href}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><ArrowUpRight className="card-arrow" size={18} /></a> }

function ProfilePage({ path, title, children, label = 'PROFILE' }) {
  return <Layout path={path} type={path === '/about/sourav-das/' ? 'AboutPage' : 'WebPage'}><section className="page-hero section-wrap"><Breadcrumbs items={[[title, path]]} /><Label>{label}</Label><h1>{title}</h1></section><div className="content-layout section-wrap"><article className="article-content">{children}</article><aside className="page-aside"><div className="aside-card"><span className="eyebrow">QUICK FACTS</span><p><strong>Sourav Das</strong><br />Midnapore, West Bengal, India</p><p><strong>Current study</strong><br />BCA · Computer Applications</p><a className="text-link" href="/social/">SOCIAL PROFILE <ArrowUpRight size={14} /></a></div></aside></div></Layout>
}

function About() { return <ProfilePage path="/about/sourav-das/" title="About Sourav Das"><h2>A student building with curiosity.</h2><p>Sourav Das is a BCA student at Midnapore College (Autonomous), based in Midnapore, West Bengal, India. His interests include technology, digital ideas and making useful things for the web.</p><h2>Creative direction</h2><p>Alongside his studies, Sourav is documenting a personal creative journey around Sheru Vai. He approaches the topic as a creator, researcher, documenter and community builder only where supported by his actual work.</p><p>This site does not claim that Sourav invented, founded or owns the wider Sheru Vai trend. Historical claims that cannot be verified are marked as unknown.</p><h2>Explore next</h2><p>Read the <a href="/education/">education profile</a>, visit the <a href="/social/">Instagram profile</a> or browse the <a href="/sheru-vai/">Sheru Vai knowledge hub</a>.</p></ProfilePage> }
function Education() { return <ProfilePage path="/education/" title="Education" label="EDUCATION"><h2>Verified academic information</h2><div className="fact-table"><p><strong>College</strong><span>Midnapore College (Autonomous)</span></p><p><strong>Course</strong><span>Bachelor of Computer Applications (BCA)</span></p><p><strong>Department</strong><span>Computer Applications</span></p><p><strong>Location</strong><span>Midnapore, West Bengal, India</span></p></div><h2>Academic interests</h2><p>Sourav's supplied profile identifies technology and computer applications as areas of interest. Specific grades, achievements, projects and dates have not been supplied and are intentionally not invented here.</p></ProfilePage> }
function Social() { return <ProfilePage path="/social/" title="Social profiles" label="CONNECT"><h2>Follow the work</h2><div className="social-card"><Instagram size={30} /><div><span className="eyebrow">INSTAGRAM</span><h3>@sourav.das.debug</h3><p>Visit Sourav Das's Instagram profile for personal updates and original work.</p><a className="button button-primary" href={instagramUrl} target="_blank" rel="noreferrer">OPEN INSTAGRAM <ArrowUpRight size={15} /></a></div></div><h2>GitHub</h2><div className="social-card"><BookOpen size={30} /><div><span className="eyebrow">GITHUB</span><h3>Sourav5482</h3><p>Explore Sourav Das's public software projects and code.</p><a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">OPEN GITHUB <ArrowUpRight size={15} /></a></div></div></ProfilePage> }

function SheruLayout({ path, title, children, label = 'SHERU VAI KNOWLEDGE HUB' }) { return <Layout path={path}><section className="page-hero section-wrap"><Breadcrumbs items={[['Sheru Vai', '/sheru-vai/'], [title, path]]} /><Label>{label}</Label><h1>{title}</h1></section><div className="docs-layout section-wrap"><aside className="toc"><span className="eyebrow">IN THIS HUB</span>{[['Overview', '/sheru-vai/'], ['Origin & history', '/sheru-vai/origin-and-history/'], ['Meaning', '/sheru-vai/meaning/'], ['Spelling variations', '/sheru-vai/spelling-variations/'], ['Trend', '/sheru-vai/trend/'], ['Online presence', '/sheru-vai/online-presence/'], ['FAQ', '/sheru-vai/faq/']].map(([name, href]) => <a key={href} href={href}>{name}</a>)}</aside><article className="article-content docs-article">{children}<div className="source-note"><strong>Independent reference notice</strong><p>This is an independently maintained informational page. It is not an official Wikipedia article and does not claim ownership of the Sheru Vai term or trend.</p><small>Last updated: 16 November 2026 · Historical details remain subject to verification.</small></div></article></div></Layout> }

function SheruHome() { return <SheruLayout path="/sheru-vai/" title="Sheru Vai Knowledge Hub"><h2>What this hub covers</h2><p>This independent knowledge hub documents the term <strong>Sheru Vai</strong>, related search variations, possible meaning and online usage. It keeps confirmed information separate from interpretation and unknown history.</p><div className="notice"><strong>Read this first</strong><p>Sheru Vai is documented here as a topic of interest and a personal creative journey. No claim is made that Sourav Das originated or owns the wider trend.</p></div><h2>Explore the documentation</h2><div className="link-list">{[['Origin and history', 'What is known, what is not verified.', '/sheru-vai/origin-and-history/'], ['Meaning and terminology', 'A careful guide without an invented official definition.', '/sheru-vai/meaning/'], ['Spelling variations', 'One page for the ways people may search this term.', '/sheru-vai/spelling-variations/'], ['Online presence', 'How to distinguish search results from evidence.', '/sheru-vai/online-presence/'], ['Frequently asked questions', 'Short answers about scope, sources and claims.', '/sheru-vai/faq/']].map(([name, text, href]) => <a key={href} href={href}><span><strong>{name}</strong><small>{text}</small></span><ArrowUpRight size={17} /></a>)}</div><h2>Methodology</h2><p>Future updates should use reliable, directly reviewable sources. Dates, origin stories, popularity statistics and external references are not added unless they can be checked.</p></SheruLayout> }
function SheruArticle({ path, title, children }) { return <SheruLayout path={path} title={title}>{children}</SheruLayout> }
function Origin() { return <SheruArticle path="/sheru-vai/origin-and-history/" title="Sheru Vai origin research"><h2>Research by Sourav Das</h2><p>This page presents Sheru Vai origin research by <strong>Sourav Das</strong>, a BCA student in the Department of Computer Applications at Midnapore College (Autonomous), Midnapore, West Bengal, India.</p><p>Sourav Das is documenting and researching the topic. The available information does not verify that he started, founded or originated the wider Sheru Vai trend.</p><div className="notice"><strong>Verification status: origin unknown</strong><p>No reliable source was supplied that establishes an origin date, founder or original creator. Any future historical claim should be supported by a primary source or a clearly attributable publication.</p></div><h2>Timeline</h2><p>No dated timeline is published at this time. Leaving a date blank is more accurate than presenting an unverified milestone as fact.</p><h2>Related identity</h2><p>For verified information about Sourav Das, visit the <a href="/about/sourav-das/">Sourav Das profile</a> and <a href="/education/">education page</a>.</p></SheruArticle> }
function Meaning() { return <SheruArticle path="/sheru-vai/meaning/" title="Meaning and terminology"><h2>A term with context still being researched</h2><p>Sheru Vai is the primary spelling used in this project. The available information does not establish one official definition, translation or owner for the term.</p><h2>How to read this page</h2><p>Search usage, personal interpretation and verified terminology are different things. This site describes those categories separately and avoids presenting an interpretation as an established meaning.</p></SheruArticle> }
function Variations() { return <SheruArticle path="/sheru-vai/spelling-variations/" title="Spelling variations"><h2>One topic, multiple searches</h2><p>People may use different spellings when searching for a similar topic. These variations are not necessarily different people, brands or movements.</p><div className="variation-grid">{variations.map(item => <span key={item}>{item}</span>)}</div><p>These are documented as possible search variations only. Their meaning and relationship should be verified from context rather than assumed.</p></SheruArticle> }
function Trend() { return <SheruArticle path="/sheru-vai/trend/" title="The Sheru Vai trend"><h2>Documenting online interest without exaggeration</h2><p>This page records the phrase “Sheru Vai trend” as a search topic. It does not publish unsupported popularity numbers, virality claims or media coverage.</p><p>Research is ongoing. A future update can add dated evidence when a source is available and reviewable.</p></SheruArticle> }
function OnlinePresence() { return <SheruArticle path="/sheru-vai/online-presence/" title="Online presence"><h2>Searchable does not always mean verified</h2><p>Search results can contain profiles, posts and interpretations that are difficult to attribute. This project treats discoverability as a starting point for research, not proof of origin or ownership.</p><h2>Source practice</h2><p>No external source is cited here until it can be checked directly. Readers should prefer original posts, attributable interviews and reliable publications over copied summaries.</p></SheruArticle> }
function FAQ() { return <SheruArticle path="/sheru-vai/faq/" title="Frequently asked questions"><div className="faq"><h3>Did Sourav Das create Sheru Vai?</h3><p>This website does not make that claim. Sourav is documenting a personal journey and contributing original work where supported.</p><h3>Is Sheru Vai history confirmed?</h3><p>Not from the information currently supplied. Origin dates, founders and trend history remain unknown here.</p><h3>Are Sheru Bhai and Sheru Vai different?</h3><p>They may be search variations, but this page does not assume they refer to the same thing without evidence.</p><h3>Is this an official Wikipedia page?</h3><p>No. It is an independently maintained informational page.</p></div></SheruArticle> }

function Articles({ path = '/articles/' }) { return <Layout path={path}><section className="page-hero section-wrap"><Breadcrumbs items={[[path === '/articles/' ? 'Articles' : 'Article', path]]} /><Label number="03">ORIGINAL NOTES</Label><h1>{path === '/articles/' ? 'Articles' : 'Documentation in progress.'}</h1></section><div className="section-wrap article-index">{path === '/articles/' ? <><p className="intro">Original documentation and personal notes, with publication status kept clear.</p><a className="article-row" href="/articles/sheru-vai-documentation/"><span><small>REFERENCE ARTICLE</small><h2>Sheru Vai documentation</h2><p>Terminology, spelling variations, evidence and transparent scope.</p></span><ArrowUpRight /></a><a className="article-row" href="/articles/sourav-das-sheru-vai-journey/"><span><small>PERSONAL NOTES</small><h2>Sourav Das's Sheru Vai journey</h2><p>A personal account of learning, making and documenting.</p></span><ArrowUpRight /></a></> : <ArticleBody journey={path.includes('journey')} />}</div></Layout> }
function ArticleBody({ journey }) { return <article className="article-content standalone-article"><p className="eyebrow">{journey ? 'PERSONAL NOTES' : 'REFERENCE ARTICLE'}</p><h2>{journey ? 'A personal journey, documented with care.' : 'A practical Sheru Vai reference.'}</h2><p>{journey ? 'Sourav Das is using this space to document a personal creative journey around Sheru Vai. It is a work in progress, not a claim of ownership or origin.' : 'This article brings together the current documentation of Sheru Vai, its possible search spellings and the evidence boundaries of this project.'}</p><p>Publication dates and historical claims will only be added when they can be verified. For the living reference, return to the <a href="/sheru-vai/">Sheru Vai knowledge hub</a>.</p></article> }
function Contact() { return <section className="contact-section section-spacing"><div className="section-wrap contact-inner"><Label number="04">GET IN TOUCH</Label><p className="eyebrow">HAVE AN IDEA? LET'S TALK.</p><h2>Let's make<br /><span>something matter.</span></h2><p className="contact-copy">For now, the best verified public profile is Instagram.</p><Button href="/social/">VISIT SOCIAL PROFILE</Button><div className="contact-foot"><span>OPEN TO GOOD CONVERSATIONS</span><span>MIDNAPORE, WEST BENGAL</span></div></div></section> }

function NotFound() { return <Layout path="/404/"><section className="page-hero section-wrap"><Label>404</Label><h1>Page not found.</h1><p className="hero-description">The page you requested does not exist. Return to the knowledge hub.</p><Button href="/">BACK HOME</Button></section></Layout> }

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return <Home />
  if (path === '/about/sourav-das') return <About />
  if (path === '/education') return <Education />
  if (path === '/social') return <Social />
  if (path === '/sheru-vai') return <SheruHome />
  if (path === '/sheru-vai/origin-and-history') return <Origin />
  if (path === '/sheru-vai/meaning') return <Meaning />
  if (path === '/sheru-vai/spelling-variations') return <Variations />
  if (path === '/sheru-vai/trend') return <Trend />
  if (path === '/sheru-vai/online-presence') return <OnlinePresence />
  if (path === '/sheru-vai/faq') return <FAQ />
  if (path === '/articles') return <Articles />
  if (path === '/articles/sheru-vai-documentation') return <Articles path={path} />
  if (path === '/articles/sourav-das-sheru-vai-journey') return <Articles path={path} />
  return <NotFound />
}

export default App
