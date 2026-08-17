export interface BlogSection {
  heading: string
  content: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: 'Digital Transformation' | 'Revenue Growth' | 'Strategy & Operations'
  excerpt: string
  readingTime: number
  tldr: string
  sections: BlogSection[]
  faq: FAQ[]
  cta: string
}

export const categories = [
  'Digital Transformation',
  'Revenue Growth',
  'Strategy & Operations',
] as const

export const posts: BlogPost[] = [
  {
    slug: 'b2b-website-conversion-rate-not-design-problem',
    title: 'Your B2B Website Has a 1.7% Conversion Rate. That\'s Not a Design Problem.',
    date: '2026-08-14',
    category: 'Revenue Growth',
    excerpt: 'Most B2B websites convert at 1-2% not because they look bad, but because they\'re built for browsing instead of buying. The fix is conversion architecture, not a redesign.',
    readingTime: 5,
    tldr: 'Most B2B websites underperform because they\'re structured around products and services rather than the decision your buyer is actually making. Redesigning the visual layer won\'t fix a 1.7% conversion rate — restructuring the page around buyer intent will. I took a B2B equipment supplier from 1.72% to 4.29% conversion, adding £90K/month in revenue, without changing the brand or the product pages.',
    sections: [
      {
        heading: 'The 1.7% conversion rate is normal — and that\'s the problem',
        content: [
          'If your B2B website converts between 1% and 2%, you\'re about average. And average, in this context, means you\'re leaving serious money on the table.',
          'I see this constantly with B2B manufacturers and equipment suppliers across Suffolk. The website looks professional. The products are clearly listed. There\'s a contact form somewhere. And nobody fills it in.',
          'The instinct is to blame the design — commission a rebrand, modernise the visuals, add some animation. I\'ve watched businesses spend £30-50K on redesigns that moved the conversion needle precisely zero points. Because the problem was never how it looked.',
        ],
      },
      {
        heading: 'The real issue: your site is built for browsing, not buying',
        content: [
          'Most B2B websites are structured like product catalogues. Here\'s what we sell. Here\'s some features. Here\'s a generic contact form at the bottom.',
          'This structure ignores how B2B buyers actually make decisions. A procurement manager searching for "commercial coffee machines Suffolk" isn\'t browsing — they have a specific problem, a timeline, and a budget. They need to know three things in the first 10 seconds: Can you solve my problem? Have you done it before? What happens if I contact you?',
          'When your page doesn\'t answer those questions immediately, they bounce. Not because your site is ugly — because it\'s not structured around their decision.',
        ],
      },
      {
        heading: 'What conversion architecture actually looks like',
        content: [
          'Conversion architecture is a structural discipline, not a visual one. It\'s about what goes where and why — positioned against the buyer\'s decision sequence, not your internal org chart.',
          'Above the fold: a value proposition that matches the search intent that brought them here. Not your company slogan. Not "Welcome to our website." The specific thing they were looking for when they typed that query.',
          'Below that: proof. Not a logo carousel — specific numbers. "67% of our B2B customers now order online." "Onboarding takes 1 week, not 4." Numbers that answer the unspoken question: have you actually done this?',
          'At each decision point in the scroll: a CTA matched to their readiness. Early on, that\'s "See how it works" — not "Get a quote." At the bottom, after they\'ve seen the proof, then you ask for the commitment.',
          'The form itself: progressive disclosure. Show 2 fields first, expand when they engage. I tested this against a standard 6-field form — conversion increased 34% from that single change.',
        ],
      },
      {
        heading: 'The numbers: 1.72% to 4.29% at a B2B equipment supplier',
        content: [
          'I applied this approach for a B2B coffee equipment supplier in Ipswich. Their website was generating decent traffic — 13,000+ visits/month — but converting at 1.72%.',
          'We didn\'t redesign the brand. We restructured the landing pages around buyer intent: matched the headline to the highest-traffic search term, added specific proof points above the fold, and rebuilt the form with progressive disclosure.',
          'Result: conversion went to 4.29% — a 2.5x improvement. That translated to an additional £90K per month in attributable revenue. No additional ad spend. No new traffic. Just better conversion of what was already coming.',
          'One page, optimised properly, generated £300K in six months. That\'s not a design outcome — it\'s an architectural one.',
        ],
      },
      {
        heading: 'What to do about it',
        content: [
          'If your B2B site is converting under 2%, don\'t start with a redesign. Start with three questions:',
          'First: what\'s the primary search term driving traffic to your most important page? Does your headline match that intent? If the page says "Welcome to [Company Name]" and the searcher typed "industrial equipment supplier Suffolk," you\'ve already lost them.',
          'Second: where\'s the proof? Not testimonials buried on a separate page — specific numbers visible within the first scroll. If you don\'t have numbers, that\'s a bigger problem than your website.',
          'Third: what\'s the first CTA and where is it? If a visitor has to scroll past 2,000 words of company history before they can take action, you\'re filtering out everyone with a real budget and a real timeline.',
          'Fix those three things before you spend a penny on design.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is a good conversion rate for a B2B website?',
        answer: 'The average B2B website converts at 1-2%. A well-optimised B2B landing page should convert at 3-5%. Top-performing pages with strong intent matching and conversion architecture can reach 4-6%. The key variable is not traffic volume — it\'s how well the page structure matches buyer intent.',
      },
      {
        question: 'Should I redesign my B2B website to improve conversions?',
        answer: 'Usually not. A visual redesign addresses how a site looks, not how it\'s structured. Most B2B conversion problems are architectural: wrong headline for the traffic source, proof points buried or missing, CTAs positioned too late. Fix the structure first. If conversions improve to 3%+, then consider whether the visual layer needs updating.',
      },
      {
        question: 'What is conversion architecture?',
        answer: 'Conversion architecture is the practice of structuring a web page around the buyer\'s decision sequence rather than the company\'s internal organisation. It places intent-matched value propositions above the fold, proof points at each decision stage, and CTAs calibrated to the visitor\'s readiness level. It\'s a structural discipline, not a visual one.',
      },
    ],
    cta: 'If your B2B website is converting under 2% and you want to fix the structure rather than just the surface, get in touch.',
  },
  {
    slug: 'ai-wont-fix-b2b-operations',
    title: 'AI Won\'t Fix Your B2B Operations. Here\'s What Will.',
    date: '2026-08-07',
    category: 'Digital Transformation',
    excerpt: 'B2B businesses are being sold AI tools when what they need is connected systems and clean processes. AI is powerful — but it\'s a layer, not a foundation.',
    readingTime: 5,
    tldr: 'Before you spend money on AI tools, ask whether your CRM, ERP, and operational systems actually talk to each other. Most B2B manufacturers I work with have data siloed across spreadsheets, email chains, and disconnected software. AI amplifies whatever you feed it — if you feed it messy data across broken processes, you get faster mess. Fix the integration layer and the process layer first. Then AI becomes genuinely powerful.',
    sections: [
      {
        heading: 'Every B2B business is being told they need AI. Most of them don\'t — yet.',
        content: [
          'I\'ve had three conversations this month with B2B manufacturers in Suffolk asking about "implementing AI." When I ask what specifically they want AI to do, the answers are vague: "automate things," "be more efficient," "everyone else is doing it."',
          'These are businesses where sales quotes take 20 minutes because the pricing lives in a spreadsheet that isn\'t connected to the CRM. Where customer onboarding takes 4 weeks because data gets entered manually into 3 separate systems. Where the marketing team can\'t tell you which leads became customers because the website analytics and the ERP exist in different universes.',
          'AI is not the answer to any of those problems. Integration is.',
        ],
      },
      {
        heading: 'AI is a layer, not a foundation',
        content: [
          'Think of your technology stack like a building. Your CRM, ERP, website, and operational tools are the structure. The data flowing between them is the plumbing. AI is the interior design.',
          'If the plumbing doesn\'t work — if data isn\'t flowing between systems, if processes require manual re-entry, if your customer data lives in 4 different places with 4 different versions — then AI just makes the mess faster. You\'ll get AI-powered reports based on garbage data. AI-generated quotes that pull from the wrong price list. Automated workflows that automate a broken process.',
          'I\'ve seen this play out repeatedly. A B2B business buys an AI-powered CRM tool, discovers it can\'t connect to their ERP, and ends up with two more disconnected systems instead of one.',
        ],
      },
      {
        heading: 'What actually fixes B2B operations',
        content: [
          'At one B2B supplier, sales reps were spending 20 minutes creating each quote because they had to manually look up pricing across multiple systems, check stock availability by emailing the warehouse, and format everything in a Word template.',
          'The fix wasn\'t AI. It was a multi-API integration tool that connected the pricing database, stock system, and CRM into a single quoting interface. Quote creation went from 20 minutes to 4 — an 80% reduction. No machine learning. No AI. Just connected systems.',
          'At the same business, customer onboarding took 4 weeks and cost £512 per customer. We mapped the process: 47 steps across 4 teams, with data being entered manually into 3 different systems. The fix was API integrations between CRM, ERP, and scheduling, plus automated approval workflows. Onboarding dropped to 1 week, cost dropped to £196.',
          'These are the unsexy problems that eat B2B businesses alive. And they\'re all solvable without AI.',
        ],
      },
      {
        heading: 'When AI actually makes sense for B2B',
        content: [
          'Once your systems are connected and your data is clean, AI becomes genuinely powerful:',
          'Demand forecasting based on historical order data — but only if that order data is complete and in one place. Lead scoring based on website behaviour and CRM interactions — but only if your analytics and CRM are integrated. Automated content generation for product descriptions — but only if your product data is structured and accurate.',
          'The pattern is always the same: AI amplifies the quality of your underlying systems. Good data in connected systems + AI = competitive advantage. Bad data in disconnected systems + AI = expensive chaos.',
          'If you\'re a B2B manufacturer thinking about AI, here\'s a simple diagnostic: can you currently pull a single report that shows you which marketing channel generated which leads, which leads became customers, and what those customers\' lifetime value is? If the answer is no, you have an integration problem, not an AI opportunity.',
        ],
      },
      {
        heading: 'The order of operations',
        content: [
          'For any B2B business that wants to be "AI-ready," here\'s the actual sequence:',
          'First: connect your systems. CRM talks to ERP talks to website analytics. One customer record, one source of truth. This alone will improve operational efficiency by 30-50%.',
          'Second: clean your processes. Map every manual handoff, every duplicate data entry, every "we\'ve always done it that way" step. Eliminate or automate the ones that don\'t add value.',
          'Third: build the measurement layer. You can\'t optimise what you can\'t measure. Set up attribution, reporting, and dashboards before you invest in optimisation tools.',
          'Fourth: now add AI. With connected systems, clean processes, and reliable data, AI tools can deliver real value. Predictive analytics, intelligent automation, and genuine efficiency gains.',
          'Skip to step four and you\'re building on sand.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should a B2B manufacturing business invest in AI?',
        answer: 'Yes, but only after the foundational systems are in place. Most B2B manufacturers benefit more from connecting their existing CRM, ERP, and operational tools via API integrations than from adding AI capabilities. Once data flows cleanly between systems, AI tools for demand forecasting, lead scoring, and process automation become genuinely valuable.',
      },
      {
        question: 'What is the biggest technology problem for B2B businesses?',
        answer: 'Disconnected systems. Most B2B businesses have customer data in their CRM, order data in their ERP, and website analytics in a separate tool — with no integration between them. This forces manual data entry, creates inconsistent records, and makes it impossible to measure which activities drive revenue. Solving this integration problem typically delivers 30-50% operational efficiency improvement before any AI or automation investment.',
      },
      {
        question: 'How do I know if my business is ready for AI?',
        answer: 'A simple test: can you pull a single report that shows which marketing channel generated a lead, whether that lead became a customer, and what their lifetime value is? If you can, your systems are connected enough for AI to add value. If you can\'t, invest in system integration and data infrastructure first.',
      },
    ],
    cta: 'If you\'re a B2B business in Suffolk wondering whether you need AI or better systems, let\'s have an honest conversation about which one will actually move the needle.',
  },
  {
    slug: 'cut-b2b-onboarding-4-weeks-to-1',
    title: 'How We Cut B2B Customer Onboarding From 4 Weeks to 1',
    date: '2026-07-28',
    category: 'Digital Transformation',
    excerpt: 'A B2B equipment supplier\'s onboarding process had 47 steps, 4 teams, and cost £512 per customer. We mapped it, cut it, connected the systems, and brought it down to 1 week and £196.',
    readingTime: 6,
    tldr: 'Customer onboarding at a B2B equipment supplier was taking 4 weeks and costing £512 per customer. The process had accumulated 47 steps across 4 teams, most of which existed because systems weren\'t connected. By mapping the entire flow, eliminating duplicate data entry via API integrations, and building automated approval workflows, we reduced onboarding to 1 week and £196 per customer. The hardest part wasn\'t the technology — it was convincing team leads that their manual processes weren\'t adding the value they thought.',
    sections: [
      {
        heading: 'The £512 onboarding problem',
        content: [
          'When I started mapping the customer onboarding process at a B2B coffee equipment supplier, I expected to find maybe 15-20 steps. I found 47.',
          'Forty-seven discrete actions across four teams to get a new customer from "yes, we want your product" to "the machine is installed and working." Four weeks, minimum. Cost per customer: £512 — a number that included staff time, manual processing, rework, and the hidden cost of delayed revenue recognition.',
          'For a business onboarding 50 customers a month, this was manageable. At 200+ per month, it was breaking.',
        ],
      },
      {
        heading: 'Why B2B onboarding gets this bad',
        content: [
          'Nobody designs a 47-step process on purpose. It accumulates. A new compliance requirement adds 3 steps. A system change means data has to be re-entered somewhere. A team lead adds a manual check because of one bad experience 3 years ago.',
          'The result, at this particular business, was customer data being entered manually into 3 separate systems — CRM, ERP, and a scheduling tool. Each entry created a chance for errors, and errors created rework, and rework created delays. A single typo in a postcode could add 3 days.',
          'Approval routing was the other bottleneck. Standard orders sat in a manager\'s inbox for an average of 6 days waiting for sign-off. Not because they needed careful review — because they were buried in a queue of other things.',
        ],
      },
      {
        heading: 'Step one: map everything, time everything',
        content: [
          'Before fixing anything, we documented every single step in the process. Who does it, how long it takes, what system it touches, and — critically — what value it adds for the customer.',
          'That last question was the leverage point. Of the 47 steps, 18 existed purely because systems weren\'t integrated. Another 11 were manual checks that duplicated automated validations. Only 18 steps actually added value that the customer would notice or care about.',
          'When you show a team lead that 60% of their process is compensating for broken systems rather than serving customers, the conversation changes.',
        ],
      },
      {
        heading: 'The fix: connect the systems, automate the approvals',
        content: [
          'The technical solution was straightforward. API integrations between CRM, ERP, and the scheduling tool eliminated duplicate data entry entirely. A customer record entered once in the CRM propagated automatically to every other system.',
          'Automated approval workflows replaced the email-based sign-off process. Standard orders — which accounted for 85% of volume — were approved automatically based on predefined rules. Only exceptions required human review. Approval time went from 6 days to same-day.',
          'We also built a real-time onboarding dashboard showing every customer\'s progress through the pipeline. This was initially a management tool, but it changed behaviour across all four teams. When a bottleneck was visible to everyone, it got fixed without anyone having to escalate it.',
        ],
      },
      {
        heading: 'The hardest part: politics, not technology',
        content: [
          'Building the integrations took 6 weeks. Getting four team leads to agree that their manual processes weren\'t adding value took considerably longer.',
          'Process transformation is 70% politics and 30% technology. Every manual step has a person who believes it\'s essential, usually because they built it in response to a specific problem. Telling them "your 15-minute daily check is now automated" doesn\'t feel like efficiency — it feels like their expertise being devalued.',
          'The approach that worked: frame it in commercial terms, not efficiency terms. "This process costs £512 per customer. At 200 customers per month, that\'s over £100K/month in onboarding costs. We can halve it." That\'s a language that gets heard at board level, and board-level support makes team-level resistance manageable.',
        ],
      },
      {
        heading: 'Results: 75% faster, 62% cheaper',
        content: [
          'Onboarding dropped from 4 weeks to 1 week. Cost per customer dropped from £512 to £196 — a 62% reduction. Process steps went from 47 to 18.',
          'But the numbers don\'t capture the second-order effects. Faster onboarding meant faster revenue recognition. Fewer errors meant fewer customer complaints in the first 30 days. And the onboarding dashboard became the template for visibility across other operational processes.',
          'The cost-per-customer metric (£512→£196) was the number that got board attention and budget approval for the next phase of digital transformation work. If you want to fund further improvements, always frame the first win in terms the board speaks.',
        ],
      },
    ],
    faq: [
      {
        question: 'How long should B2B customer onboarding take?',
        answer: 'For most B2B product/service businesses, customer onboarding should take 5-7 working days. If it takes longer than 2 weeks, it\'s likely that disconnected systems, manual data entry, or approval bottlenecks are adding unnecessary time. Mapping the process step-by-step and identifying which steps add customer value versus compensating for system gaps is the first step to reducing it.',
      },
      {
        question: 'What is the biggest cause of slow B2B onboarding?',
        answer: 'Disconnected systems requiring duplicate data entry, and manual approval workflows that queue rather than route. In a typical 40+ step onboarding process, 50-60% of steps exist because systems don\'t talk to each other, not because the customer needs them. API integrations and automated approval rules can eliminate most of this overhead.',
      },
      {
        question: 'How do you calculate the cost of customer onboarding?',
        answer: 'Add up the staff time (at fully loaded cost per hour) spent on every step of the process, plus rework costs from errors, plus the opportunity cost of delayed revenue recognition. For a B2B business with a 4-week onboarding process handling 200 customers/month, the fully loaded cost is typically £300-600 per customer — a substantial line item that\'s rarely tracked or optimised.',
      },
    ],
    cta: 'If your onboarding process has accumulated complexity and you want to map it, cut it, and connect the systems — let\'s talk.',
  },
  {
    slug: 'stop-hiring-agencies-build-revenue-system',
    title: 'Stop Hiring Marketing Agencies. Build a Revenue System.',
    date: '2026-07-14',
    category: 'Strategy & Operations',
    excerpt: 'Most B2B businesses hire agencies because they think they can\'t build in-house capability. I scaled digital revenue from £600K to £2.2M with an internal team on less than 2% budget.',
    readingTime: 5,
    tldr: 'B2B businesses outsource marketing because it feels lower-risk than building internal capability. But agencies have structural incentives that conflict with your commercial outcomes: they report on activity, not revenue; they optimise for their retainer, not your ROI; and they never build your internal capability because their business model depends on you staying dependent. I scaled a B2B equipment supplier\'s digital revenue from £600K to £2.2M by building an internal team of 10 on less than 2% of company revenue — and every system, process, and relationship stayed in the business when I moved on.',
    sections: [
      {
        heading: 'The agency dependency trap',
        content: [
          'Here\'s a pattern I see repeatedly with B2B manufacturers in Suffolk: business hires an agency for "digital marketing." Agency runs some Google Ads, posts on social media, maybe builds a landing page. Monthly report arrives full of impressions, clicks, and reach.',
          'Six months later, the business can\'t tell you whether any of those clicks became customers. The agency can\'t either — because they don\'t have access to the CRM, the ERP, or any system that tracks what happens after someone fills in a form.',
          'This isn\'t because agencies are incompetent. It\'s because their business model doesn\'t incentivise them to solve your actual problem. They get paid for activity. You need revenue.',
        ],
      },
      {
        heading: 'Why agencies can\'t build your revenue system',
        content: [
          'A revenue system — not a marketing function, a revenue system — requires three things agencies structurally can\'t provide:',
          'First: deep integration with your operations. The agency doesn\'t know that your best customers come from the Design & Build sector, that your average deal takes 6 weeks to close, or that consumables have a 3× higher margin than equipment. Your revenue system needs to be built on that knowledge.',
          'Second: long-term capability building. An agency that builds your internal capability is an agency that eliminates its own retainer. The incentive runs exactly backward.',
          'Third: end-to-end accountability. An agency owns the top of the funnel. Nobody owns the connection between "we got a lead" and "that lead became a customer worth £5,500 over their lifetime." That gap is where B2B revenue gets lost.',
        ],
      },
      {
        heading: '£600K to £2.2M: building the revenue system',
        content: [
          'When I joined a B2B coffee equipment supplier as their first digital hire, digital revenue was £600K with no team, no strategy, and no systems. Over four years, I built an internal revenue system that produced £2.2M — a 3.7× increase on less than 2% of company revenue as budget.',
          'The first thing I built wasn\'t a campaign. It was the measurement layer. Analytics connected to CRM connected to ERP. We could track a website visit through to a signed contract and attribute actual revenue to the channel that produced it.',
          'That measurement layer changed everything. When you can say "SEO generated £400K in attributable revenue last quarter at a cost of £15K," you stop arguing for budget. The numbers do it for you.',
          'Then I built the team. One person at a time, hiring for commercial instinct over marketing credentials. Content, design, digital marketing, web development — each hire was justified by a specific revenue gap they would close.',
        ],
      },
      {
        heading: 'What a revenue system looks like',
        content: [
          'A revenue system is not a marketing department. It\'s a connected set of tools, processes, and people that turns digital activity into measurable commercial outcomes:',
          'Acquisition: SEO, PPC, social — but managed against revenue targets, not traffic targets. When I ran PPC, the metric was CPA vs customer lifetime value (£90 CPA against £5,500 LTV — a 61:1 return), not click volume.',
          'Conversion: landing pages, forms, and website UX optimised through continuous A/B testing. Not one-off redesigns — a permanent programme of marginal improvement.',
          'Measurement: full-funnel attribution from first touch to closed revenue. Weekly reporting on pipeline and revenue, not monthly reports on impressions.',
          'Operations: CRM automation, lead scoring, and sales enablement. Marketing and sales using the same data, the same definitions, and the same targets.',
          'This system doesn\'t depend on any single person or agency. When I moved into a transformation role, the team and systems I\'d built continued generating revenue without missing a quarter.',
        ],
      },
      {
        heading: 'When agencies do make sense',
        content: [
          'I\'m not anti-agency universally. Agencies make sense for three things: specialist skills you need temporarily (a rebrand, a website build, a specific technical implementation), surge capacity for a defined project, or a domain where you genuinely can\'t build internal expertise.',
          'But your core revenue system — the thing that generates leads, converts them to customers, and measures the connection between marketing spend and commercial outcome — that has to live inside your business. Outsourcing it is outsourcing your understanding of how your own growth works.',
          'If your agency is the only entity that understands your marketing data, you don\'t have a marketing strategy. You have a dependency.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should a B2B business use a marketing agency or build in-house?',
        answer: 'For core revenue-generating activities — SEO, CRO, paid media, and CRM management — building internal capability almost always outperforms agency outsourcing in B2B. In-house teams have deeper operational knowledge, direct CRM access for full-funnel attribution, and incentives aligned to revenue rather than activity. Agencies are best used for specialist temporary projects (rebrands, builds) rather than ongoing revenue generation.',
      },
      {
        question: 'How much should a B2B business spend on marketing?',
        answer: 'B2B businesses typically spend 2-5% of revenue on marketing. However, the more important metric is ROAS (return on ad spend) or revenue attributable to marketing investment. A well-built internal revenue system can generate 10-60× returns on marketing spend. The key is measuring actual revenue attribution, not marketing activity metrics like impressions or click volume.',
      },
      {
        question: 'What is a B2B revenue system?',
        answer: 'A B2B revenue system is an integrated set of tools, processes, and people that connects digital acquisition (SEO, PPC, social) through conversion (optimised landing pages, CRO) to closed revenue (CRM, sales enablement), with full attribution measurement at every stage. Unlike traditional marketing, a revenue system is accountable to commercial outcomes — actual customer revenue — not activity metrics.',
      },
    ],
    cta: 'If you\'re spending £3-5K/month on an agency and can\'t tell me what revenue it generates, let\'s talk about building something that actually works.',
  },
  {
    slug: 'landing-page-generated-300k-six-months',
    title: 'The Landing Page That Generated £300K in Six Months',
    date: '2026-07-07',
    category: 'Revenue Growth',
    excerpt: 'One landing page, optimised for one keyword, generated £300K in revenue for a B2B supplier — while I was working on it one day per week. Here\'s the methodology.',
    readingTime: 5,
    tldr: 'I built a single landing page for a B2B equipment supplier, optimised it for the industry\'s highest-volume keyword, and generated £300K in revenue in 6 months — working on it one day per week. The approach was not complicated: match the page headline to search intent, add specific proof points above the fold, use progressive form disclosure, and run systematic A/B tests. SEO drove the traffic (720→13,320/month). CRO converted it (1.24%→4.21%). The compound effect of both, applied to one page, outperformed campaigns with 10× the budget.',
    sections: [
      {
        heading: 'One page. One day per week. £300K.',
        content: [
          'Early in my time at a B2B equipment supplier in Ipswich, I had exactly one day per week to spend on digital. No team, no budget, no tools beyond WordPress and Google Analytics.',
          'So I focused everything on one page. The landing page for the industry\'s highest-volume search term. If I could rank #1 and convert at a rate that justified the traffic, one page would outperform any campaign I could run with zero budget.',
          'Six months later, that page had generated 30+ customers per month and £300K in attributable revenue. Here\'s what I did and why it worked.',
        ],
      },
      {
        heading: 'Step 1: Find the one keyword that matters',
        content: [
          'Every industry has one keyword that captures the most commercial intent. Not the highest volume — the highest intent. For this business, it was the term that procurement managers typed when they were actively looking for a supplier, not just researching the category.',
          'I identified this through a combination of search volume data and the business\'s own sales intelligence. The sales team knew which enquiries converted best. I worked backwards from those conversations to find the keyword that started them.',
          'Everything else — the page, the content, the optimisation — was built to serve that single keyword. Not 50 keywords. Not a content hub. One term, one page, total focus.',
        ],
      },
      {
        heading: 'Step 2: Earn the #1 ranking',
        content: [
          'The page was ranking nowhere when I started — page 3 or 4. Traffic to it was 720/month, mostly from branded searches.',
          'The SEO work was methodical, not magical. Technical foundations: page speed, mobile responsiveness, structured data. Content depth: the page needed to be the most useful, specific, and complete answer to the searcher\'s query. Authority: internal linking from the rest of the site, plus selective outreach for industry mentions.',
          'Within 6 months, the page ranked #1 for the target term. Traffic grew from 720 to 13,320/month. But traffic is a vanity metric. The question was whether that traffic would convert.',
        ],
      },
      {
        heading: 'Step 3: Convert the traffic with CRO',
        content: [
          'When the traffic started arriving, the page was converting at 1.24%. Decent for a B2B page, but there was room to move.',
          'I ran a systematic A/B testing programme — one test at a time, each running to statistical significance before the next started. The tests, in order of impact:',
          'Headline match to search intent. The original headline was the company tagline. I changed it to directly mirror the search query. Conversion impact: +28%. This single change was the highest-leverage test in the entire programme.',
          'Progressive form disclosure. Instead of showing all 6 form fields at once, I showed 2 (name and email) and expanded the rest after the first interaction. Conversion impact: +34%. The psychology is simple: two fields feels easy; six feels like work.',
          'Proof points above the fold. Added three specific metrics — customer count, average delivery time, and a satisfaction score — visible without scrolling. Conversion impact: +19%.',
          'The compound effect of these tests took conversion from 1.24% to 4.21%.',
        ],
      },
      {
        heading: 'Why SEO and CRO are one discipline, not two',
        content: [
          'This result only worked because SEO and CRO were treated as two halves of the same system. The SEO work drove 13,320 visitors/month to a page that converted at 4.21%, producing 30+ qualified leads per month.',
          'If I\'d only done SEO: 13,320 visitors × 1.24% conversion = 165 leads/month. If I\'d only done CRO on the original 720 visitors: 720 × 4.21% = 30 leads/month.',
          'By doing both: 13,320 × 4.21% = 560 leads/month. The compound effect is not additive — it\'s multiplicative. Traffic × conversion × lead quality. Optimise all three and the results are nonlinear.',
          'This is why I get frustrated when businesses hire an "SEO agency" and a separate "CRO consultant." They\'re optimising two halves of the same equation independently, which guarantees they\'ll miss the compound effect.',
        ],
      },
      {
        heading: 'What this means for B2B businesses',
        content: [
          'You probably don\'t need 50 landing pages. You need 3-5 pages that are genuinely excellent — matched to the specific keywords where your best customers start their buying journey, with conversion architecture that turns traffic into enquiries.',
          'If you\'re a B2B business in Suffolk generating under 10 enquiries per month from your website, the problem is almost certainly that your highest-value page isn\'t ranking, isn\'t converting, or both. Fix that one page before building anything else.',
        ],
      },
    ],
    faq: [
      {
        question: 'How much revenue can a single landing page generate?',
        answer: 'A well-optimised B2B landing page targeting a high-intent keyword can generate significant revenue. In one case, a single landing page for a B2B equipment supplier generated £300K in revenue over 6 months by ranking #1 for the industry\'s top keyword (13,320 monthly visitors) and converting at 4.21%. The key factors are keyword intent quality, search ranking, and systematic conversion optimisation.',
      },
      {
        question: 'What is progressive form disclosure?',
        answer: 'Progressive form disclosure is a CRO technique where a form initially shows only 2-3 fields and reveals additional fields after the user begins interacting. This reduces perceived effort and increases form completion rates. In B2B testing, progressive disclosure increased form conversion by 34% compared to showing all fields simultaneously.',
      },
      {
        question: 'Should SEO and CRO be separate strategies?',
        answer: 'No. SEO and CRO should be treated as two halves of the same revenue equation: traffic × conversion rate = leads. Optimising them independently misses the compound effect. A page that ranks #1 but converts at 1% leaves money on the table; a page that converts at 5% but has no traffic generates nothing. The multiplicative impact of optimising both together produces nonlinear results.',
      },
    ],
    cta: 'If you have one key landing page that should be generating leads and isn\'t, let\'s diagnose whether it\'s a traffic problem, a conversion problem, or both.',
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const index = posts.findIndex(p => p.slug === slug)
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(p => p.category === category)
}
