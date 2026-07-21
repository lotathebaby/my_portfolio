// ---------------------------------------------------------------------------
// PROJECT DATA
// This is the single source of truth for every project on the site. Add a
// new project by pushing an object onto the `projects` array below — the
// projects browser, industry tabs, filters, and case study pages all read
// from this file. Nothing else needs to change.
//
// `industries` and the `type` union control which tabs/filters render, so
// adding a new industry is a one-line change (see below).
// ---------------------------------------------------------------------------

export type ProjectType = "Analytics" | "Engineering";

export type Industry =
  | "Healthcare"
  | "Technology"
  | "Supply Chain"
  | "Telecommunications";

// Add a new industry here and it will automatically appear as a tab on
// /projects (with a "coming soon" placeholder until a project references it).
export const industries: Industry[] = [
  "Healthcare",
  "Technology",
  "Supply Chain",
  "Telecommunications",
];

export interface CaseStudySection {
  heading: string;
  body: string[]; // one paragraph per array entry
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  industry: Industry;
  type: ProjectType;
  description: string; // short card description
  businessProblem: string;
  technologies: string[];
  skills: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  status?: "published" | "planned";
  images?: ProjectImage[]; 
  caseStudy: {
    overview: string;
    objectives: string[];
    dataset: string;
    architectureNote: string; // description of the architecture diagram
    dataModel?: string;
    pipeline?: string;
    implementation: string[];
    analysis?: string[];
    challenges: string[];
    lessonsLearned: string[];
    futureImprovements: string[];
  };
}

// ---------------------------------------------------------------------------
// EXAMPLE PROJECTS
// These are realistic placeholders that demonstrate the intended depth and
// structure. Replace the content with your own work, or duplicate an object
// as a starting template for a new project.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "healthcare-operations-patient-flow",
    title: "Healthcare Operations: Patient Flow & Wait Time Analysis",
    industry: "Healthcare",
    type: "Analytics",
    description:
      "An analysis of 12,000 hospital records across multiple facilities, tracing how staffing pressure and ER crowding drive wait times, patient satisfaction, and readmissions.",
    businessProblem:
      "Hospital operational data was scattered across incompatible systems and full of inconsistencies including mismatched department names, invalid ages, and broken date logic: making it impossible to see patient flow, staffing pressure, or financial performance clearly without a full cleanup first.",
    technologies: ["Excel", "SQL", "MySQL", "Tableau"],
    skills: ["Data Cleaning", "Exploratory Data Analysis", "Dashboard Development", "Statistical Analysis"],
    github: "https://github.com/lotathebaby/healthcare-operations-patient-flow",
    demo: "https://public.tableau.com/views/HealthcareOperationsAnalyticsDashboard_17788386504530/Dashboard2",
    featured: true,
    images: [
      {
        src: "/projects/healthcare-operations-patient-flow/dashboard-executive.png",
        alt: "Executive overview dashboard showing hospital admissions and volume KPIs",
        caption: "Executive overview — volume, admissions, seasonality.",
      },
    ],
    caseStudy: {
      overview:
        "A multi-facility hospital operations dataset including admissions, staffing, wait times, satisfaction scores, and financials, cleaned and modeled to surface the operational drivers behind patient wait times and readmissions, then delivered as a three-part Tableau dashboard suite.",
      objectives: [
        "Standardize a messy, multi-source dataset (56 fields, 12,000 records) into something analysis-ready",
        "Identify which departments and facilities carry the heaviest patient volume and wait-time burden",
        "Quantify the relationship between staffing levels, ER crowding, and patient satisfaction",
        "Surface the biggest drivers of readmissions and unpaid revenue",
      ],
      dataset:
        "12,000 hospital operational records spanning multiple Canadian facilities and departments, covering admission/discharge timestamps, demographics, staffing levels, ER crowding, satisfaction scores, procedure costs, insurance status, and readmission flags.",
      architectureNote:
        "Raw multi-source export → Excel cleaning and validation → MySQL staging and transformation → Tableau dashboard suite.",
      implementation: [
        "Built a department lookup table and used XLOOKUP in Excel to collapse inconsistent department names, abbreviations, and capitalization into a single standardized set.",
        "Flagged invalid ages (negative values, ages over 150) with conditional logic and produced a cleaned age column rather than silently overwriting the originals.",
        "Standardized gender entries into four consistent categories from a mix of abbreviations and inconsistent casing.",
        "Normalized admission and discharge dates into a single format and added a validity flag to catch impossible records, discharges logged before admissions, admissions dated in the future, which caught 1,531 invalid rows.",
        "Loaded the cleaned data into MySQL as text initially to preserve raw values, then used CAST(), STR_TO_DATE(), and TIMESTAMPDIFF() to convert fields into proper analytical types.",
        "Engineered new fields in SQL, admission hour, season, actual length of stay, to support time-based analysis that the raw data didn't support directly.",
        "Built a three-dashboard Tableau suite: an executive overview (volume, admissions, seasonality), an operations/experience view (wait times, staffing, crowding, complaints), and a financial/safety view (revenue, readmissions, infections, insurance behavior).",
      ],
      analysis: [
        "One facility and two departments (Cardiology, Obstetrics/Gynecology) accounted for a disproportionate share of total patient volume, with December as the peak admissions month and 6am, noon, and 6pm as recurring volume spikes.",
        "Departments with the most severe staffing shortfalls also had the longest average wait times, and critical ER crowding levels compounded the effect, with overnight and early-morning patients waiting longest of all.",
        "Patients who filed complaints had close to double the average wait time of those who didn't, pointing to wait time as a leading driver of dissatisfaction rather than just a side effect of it.",
        "Type 2 diabetes was the leading cause of readmission, concentrated among elderly patients; Cardiology led department revenue, chest pain led per-treatment revenue, and uninsured patients accounted for the most unpaid bills.",
      ],
      challenges: [
        "Department names, gender values, and dates were each recorded inconsistently across source systems, so each field needed its own standardization pass rather than a single blanket cleanup.",
        "Nearly 13% of date records were invalid (future admissions, discharge-before-admission), which meant building an explicit validity flag rather than assuming the timestamps could be trusted as-is.",
      ],
      lessonsLearned: [
        "Cleaning and validating the data took as much effort as the analysis itself, and skipping that step would have quietly corrupted every downstream metric.",
        "A dashboard is only as convincing as the operational story behind it; splitting the suite into executive, operations, and financial views made each audience's questions easier to answer than one dashboard trying to do everything.",
      ],
      futureImprovements: [
        "Move the Excel cleaning steps into SQL or a scripted pipeline so the process is repeatable and version-controlled instead of manual.",
        "Add a predictive model for readmission risk using the engineered length-of-stay and demographic fields.",
      ],
    },
  },
  {
    slug: "telecom-call-center-performance",
    title: "Telecom Call Center Performance & Churn Analysis",
    industry: "Telecommunications",
    type: "Analytics",
    featured: true,
    description:
      "An analysis of 5,000 call center interactions revealing how wait times and unresolved issues drive customer churn.",
    businessProblem:
      "The call center was fielding high call volumes with long wait times and a low resolution rate, and leadership didn't have a clear read on which departments were underperforming or how that connected to customer churn.",
    technologies: ["Excel", "Tableau", "SQL"],
    skills: ["Exploratory Data Analysis", "Business Intelligence", "Dashboard Development", "Statistical Analysis"],
    github: "",
    demo: "https://public.tableau.com/shared/MXCXSKQ7J",
    images: [
      {
        src: "/projects/telecom-call-center-performance/dashboard-overview.png",
        alt: "Tableau dashboard showing call center volume, wait time, resolution rate, and churn KPIs",
        caption: "Call center KPI dashboard — volume, wait time, resolution rate, churn.",
      },
    ],
    caseStudy: {
      overview:
        "A call-center operations dataset covering ~2,000 customers and 80 agents was analyzed to connect wait times and resolution outcomes to churn, then delivered as a Tableau dashboard with clear operational recommendations.",
      objectives: [
        "Quantify call volume, wait time, and resolution rate by department",
        "Identify which factors most strongly predict customer churn",
        "Translate findings into concrete staffing and contract-strategy recommendations",
      ],
      dataset:
        "5,000 call records across ~2,000 customers and 80 agents (Jan 2024–Jun 2025), covering call purpose, wait time, resolution status, customer segment, contract type, and conversion/churn outcomes.",
      architectureNote:
        "Raw CSV export → Excel validation, wait-time binning, and pivot summarization → Tableau dashboard.",
      implementation: [
        "Ran validation checks for missing values, duplicates, and inconsistent category labels before analysis, confirming the dataset was largely clean going in.",
        "Grouped raw wait times into operational bins (0–10, 11–30 … 241–500 minutes) to make patterns easier to read in the dashboard.",
        "Built pivot tables in Excel to pre-aggregate key metrics before importing into Tableau, keeping the dashboard responsive.",
        "Designed the dashboard around four KPIs — total calls, average wait time, resolution rate, churn rate, as the entry point into deeper department-level views.",
      ],
      analysis: [
        "Technical Support carried the highest call volume and the highest number of unresolved cases, with 606 customers alone waiting 1–2 hours for that department, the clearest single bottleneck in the system.",
        "Average wait time across all calls was about 79 minutes, and resolution rate sat at roughly 64%, indicating the queue and troubleshooting process were both under strain.",
        "Churn ran highest among month-to-month customers and lowest among 2-year contract holders, suggesting monthly plans function as low-commitment trials rather than a stable base.",
        "Residential customers drove the bulk of call volume and experienced longer waits than business customers, pointing to a resourcing mismatch relative to demand.",
      ],
      challenges: [
        "Because the dataset was synthetic but designed to mirror real messiness, it still required a full validation pass rather than assuming clean data, checking category consistency and realistic value ranges before trusting any metric built on top of it.",
        "Wait times spanned a very wide range (0–500 minutes), which needed binning before it could be visualized meaningfully rather than as a noisy scatter.",
      ],
      lessonsLearned: [
        "A small set of KPIs (volume, wait time, resolution, churn) framed the whole analysis better than diving straight into granular charts, leading with them made the department-level findings easier to interpret.",
        "Tying an operational metric (wait time, resolution rate) directly to a business outcome (churn) made the recommendations far more actionable than reporting the metrics in isolation.",
      ],
      futureImprovements: [
        "Layer in agent-level performance data to distinguish staffing shortfalls from individual training gaps.",
        "Build a churn-risk score combining wait time, resolution outcome, and contract type to flag at-risk customers proactively.",
      ],
    },
  },
  {
    slug: "hospital-patient-flow-sql",
    title: "Healthcare Patient Flow & Operational Efficiency Analysis",
    industry: "Healthcare",
    type: "Analytics",
    description:
      "A SQL-only analysis of 9,199 patient admissions examining department workload, wait times, and satisfaction to find operational bottlenecks.",
    businessProblem:
      "Hospital leadership needed to know which departments were overloaded and how wait times were affecting patient satisfaction, using only the raw admissions data and SQL, with no BI tool in the loop.",
    technologies: ["MySQL", "SQL"],
    skills: ["Data Cleaning", "Statistical Analysis", "Exploratory Data Analysis"],
    github: "https://github.com/lotathebaby/hospital-patient-flow-analysis",
    demo: "",
    featured: true, 
    images: [
      {
        src: "/projects/healthcare-cost-length-of-stay/dashboard-overview.png",
        alt: "Dashboard showing hospital cost and length of stay by condition and age group",
        caption: "Cost and length-of-stay breakdown by condition.",
      },
    ],
    caseStudy: {
      overview:
        "An admissions dataset of ~9,199 patient visits, cleaned and analyzed entirely in SQL, including window functions for ranking, to trace how department workload and wait times shape patient satisfaction and to identify peak-demand periods.",
      objectives: [
        "Identify which departments carry the heaviest referral load",
        "Quantify how wait time affects satisfaction scores",
        "Find peak admission hours to inform staffing",
        "Check whether demographic factors correlate with wait time or satisfaction",
      ],
      dataset:
        "9,199 patient admission records with fields for admission date/time, demographics, department referral, admission flag, wait time, and satisfaction score.",
      architectureNote:
        "Raw CSV → SQL data cleaning script → staged exploration, demographic, operational, time-based, and patient-experience queries → window-function ranking for final insights.",
      implementation: [
        "Cleaned invalid gender entries and inconsistent date formats, and built a dedicated cleaned-date column rather than overwriting the original for traceability.",
        "Structured the analysis as six sequential SQL stages, exploration, demographic, operational, time-based, patient-experience, and window-function ranking, each in its own script for readability and reuse.",
        "Used window functions to rank departments and admission hours by volume and satisfaction rather than relying on manual sorting.",
      ],
      analysis: [
        "Most visits (2,731) resolved without a specialist referral; among those that needed one, General Practice and Orthopedics took the largest share.",
        "Satisfaction dropped sharply as wait time increased, average scores fell from about 1.58 at ~10 minutes to 1.28 by ~30 minutes, suggesting even moderate delays matter more than expected.",
        "Admissions peaked at 23:00, 07:00, and 13:00, a mix of late-night and early-morning demand that a daytime-only staffing model would miss entirely.",
        "Renal reported the lowest average satisfaction score (1.22) of any department, with General Practice and Orthopedics also trailing, flagging those as priorities for workflow review.",
      ],
      challenges: [
        "The raw gender field contained corrupted entries (e.g. malformed values from encoding issues) that needed explicit detection and correction rather than a simple standardization pass.",
        "Wait time's effect on satisfaction wasn't linear across the full range, so the analysis had to look at specific thresholds (10/20/30 minutes) rather than a single overall correlation.",
      ],
      lessonsLearned: [
        "Structuring SQL analysis into clearly separated, numbered scripts (cleaning → exploration → demographic → operational → time → experience) made the project easy to audit and reuse, even without a BI layer on top.",
        "Window functions turned what would have been several manual sorts and re-queries into single, reusable ranking queries.",
      ],
      futureImprovements: [
        "Build an interactive dashboard in Tableau or Power BI on top of the existing SQL views.",
        "Extend into a predictive model for expected wait time by department and hour.",
        "Bring in staffing-level data to test whether the peak-hour findings translate into a concrete scheduling recommendation.",
      ],
    },
  },
  {
    slug: "healthcare-data-warehouse",
    title: "Healthcare Data Warehouse",
    industry: "Healthcare",
    type: "Engineering",
    description:
      "A dimensional data warehouse consolidating admissions, billing, and clinical systems into a single analytics-ready schema.",
    businessProblem:
      "Analysts were pulling from three disconnected source systems by hand for every report, with no shared definition of a patient encounter.",
    technologies: ["PostgreSQL", "Python", "SQL", "Data Modeling"],
    skills: ["Data Warehousing", "Database Design", "ETL"],
    github: "https://github.com/yourhandle/healthcare-data-warehouse",
    demo: "",
    status: "planned",
    featured: true,
    caseStudy: {
      overview:
        "A dimensional warehouse built to give every downstream report the same definition of an encounter, department, and payer — replacing three inconsistent source extracts with one modeled schema.",
      objectives: [
        "Establish a single conformed definition of a patient encounter across systems",
        "Support both finance and clinical reporting from the same warehouse",
        "Make the schema easy to extend as new source systems are added",
      ],
      dataset:
        "Nightly extracts from an admissions system, a billing system, and a clinical scheduling system.",
      architectureNote:
        "Source extracts land in a raw schema, are validated and typed in a staging schema, then loaded into a Kimball-style star schema in a production schema — three-layer separation of raw, staging, and marts.",
      dataModel:
        "A conformed encounter dimension shared by two fact tables (billing facts and clinical facts), so both teams report against the same grain and definitions.",
      pipeline:
        "A Python-orchestrated batch pipeline runs nightly: extract source tables to raw, validate and standardize types in staging, then upsert into the star schema using surrogate keys.",
      implementation: [
        "Modeled a conformed encounter dimension so billing and clinical facts could share a single definition of 'encounter' instead of each system's own.",
        "Wrote idempotent load scripts using upserts keyed on surrogate keys, so a failed nightly run can be safely re-run without duplicating data.",
        "Added data quality checks (row counts, null checks, referential integrity) that halt the pipeline and alert rather than loading bad data silently.",
      ],
      challenges: [
        "The three source systems used different keys for the same patient, requiring a matching step before a conformed dimension was possible.",
        "Historical data needed slowly changing dimension handling for department reassignments, which the initial schema didn't account for.",
      ],
      lessonsLearned: [
        "Investing in a raw/staging/marts separation early made it far easier to debug data quality issues, since bad data could be traced back to a specific layer.",
        "Building quality checks as blocking steps, not after-the-fact audits, caught issues before they reached reports.",
      ],
      futureImprovements: [
        "Move orchestration from a cron-scheduled script to Airflow for better observability and retry handling.",
        "Add dbt on top of the staging layer for testing and lineage documentation.",
      ],
    },
  },
  {
    slug: "healthcare-etl-pipeline",
    title: "ETL Pipeline for Clinical Extracts",
    industry: "Healthcare",
    type: "Engineering",
    description:
      "A resilient, incrementally-loading ETL pipeline that feeds the healthcare data warehouse from three upstream systems.",
    businessProblem:
      "The warehouse needed a reliable, auditable way to ingest daily extracts without manual intervention or silent data loss.",
    technologies: ["Python", "SQL", "PostgreSQL"],
    skills: ["ETL", "Data Transformation", "Database Design"],
    github: "https://github.com/yourhandle/healthcare-etl-pipeline",
    demo: "",
    status: "planned",
    caseStudy: {
      overview:
        "The extract-transform-load layer feeding the healthcare data warehouse, built for reliability and auditability over raw throughput.",
      objectives: [
        "Load daily extracts incrementally rather than full-refreshing multi-year tables",
        "Make every load auditable: what ran, when, how many rows, any rejects",
        "Fail loudly and safely rather than loading partial or malformed data",
      ],
      dataset:
        "Daily CSV and flat-file extracts from three upstream operational systems.",
      architectureNote:
        "A Python job scheduled nightly: extract → validate schema → transform → load, with a metadata table logging every run and a dead-letter table capturing rejected rows.",
      pipeline:
        "Each run is logged with row counts in, rows loaded, rows rejected, and duration, so a failed or partial load is visible immediately rather than discovered downstream.",
      implementation: [
        "Built schema validation as a hard gate before transformation, rejecting any file that doesn't match the expected column set rather than attempting to coerce it.",
        "Implemented incremental loading keyed on a watermark column, so only new or changed rows are processed each run.",
        "Added a dead-letter table for rows that fail validation, so bad records are captured and reviewable instead of silently dropped.",
      ],
      challenges: [
        "One upstream system occasionally delivered late or duplicate files, which required building idempotency into the load step so re-processing a file wouldn't double-count rows.",
      ],
      lessonsLearned: [
        "Treating schema validation as a blocking step rather than a warning caught several upstream format changes before they corrupted the warehouse.",
      ],
      futureImprovements: [
        "Move scheduling to Airflow to get retry logic and dependency graphs for free.",
        "Add alerting to Slack/email on failed or anomalous runs.",
      ],
    },
  },
  {
    slug: "product-analytics-dashboard",
    title: "Product Usage Analytics Dashboard",
    industry: "Technology",
    type: "Analytics",
    description:
      "A dashboard tracking feature adoption and retention cohorts for a B2B SaaS product.",
    businessProblem:
      "Product managers had event data in a warehouse but no consistent way to answer 'is this feature being used, and by whom.'",
    technologies: ["SQL", "Python", "Tableau"],
    skills: ["Data Visualization", "Exploratory Data Analysis", "Statistical Analysis"],
    github: "https://github.com/yourhandle/product-analytics-dashboard",
    demo: "",
    status: "planned",
    featured: true,
    caseStudy: {
      overview:
        "A cohort-based analytics dashboard giving product managers a self-service view of feature adoption and retention, built directly on the event warehouse.",
      objectives: [
        "Define and standardize what counts as 'activation' and 'retention' across features",
        "Let PMs self-serve adoption questions without a data request",
      ],
      dataset:
        "Product event stream (~40M events) stored in a warehouse, joined against an accounts and plans table.",
      architectureNote:
        "Event warehouse → SQL views computing cohort and retention metrics → Tableau dashboard.",
      implementation: [
        "Defined a standard activation event and 30/60/90-day retention windows in SQL views, so every team used the same definitions.",
        "Built cohort retention curves segmented by plan tier and signup channel.",
        "Added a feature-adoption funnel view so PMs could see where users dropped off before adopting a new feature.",
      ],
      analysis: [
        "Retention curves diverged sharply by signup channel, with one channel showing meaningfully lower 90-day retention despite similar activation rates — a finding that redirected onboarding investment.",
      ],
      challenges: [
        "Event naming had drifted over time as the product evolved, requiring a mapping layer to unify legacy and current event names before cohorts could be computed consistently.",
      ],
      lessonsLearned: [
        "Getting agreement on a single definition of 'activated user' before building anything saved far more time than iterating on the dashboard itself.",
      ],
      futureImprovements: [
        "Add a self-service cohort builder so PMs can define custom segments without writing SQL.",
      ],
    },
  },
  {
    slug: "event-streaming-pipeline",
    title: "Event Streaming Data Pipeline",
    industry: "Technology",
    type: "Engineering",
    description:
      "A batch-to-streaming migration that reduced event-to-dashboard latency for a product analytics platform.",
    businessProblem:
      "Product analytics ran on a nightly batch job, so teams were always looking at yesterday's data during incident response and launches.",
    technologies: ["Python", "SQL", "PostgreSQL", "Data Modeling"],
    skills: ["ETL", "Data Transformation", "Database Design"],
    github: "https://github.com/yourhandle/event-streaming-pipeline",
    demo: "",
    status: "planned",
    caseStudy: {
      overview:
        "A redesign of the event ingestion pipeline from a nightly batch job to a micro-batch model, cutting event-to-dashboard latency from about a day to under 15 minutes.",
      objectives: [
        "Reduce latency between event generation and dashboard availability",
        "Preserve exactly-once processing guarantees during the migration",
      ],
      dataset: "Application event stream, several million events per day.",
      architectureNote:
        "Events land in a queue, a micro-batch consumer processes them every few minutes into a staging table, and a transformation step upserts into the analytics schema.",
      pipeline:
        "Micro-batch consumer polls the queue on a short interval, deduplicates on event ID, and upserts into staging before the transformation layer promotes it to analytics tables.",
      implementation: [
        "Replaced the nightly full-table transform with an incremental micro-batch model keyed on event timestamp.",
        "Added deduplication on event ID to preserve exactly-once semantics despite at-least-once delivery from the queue.",
        "Instrumented pipeline latency directly so lag became a monitored metric rather than something noticed only when a dashboard looked stale.",
      ],
      challenges: [
        "The existing downstream transformation logic assumed a full daily snapshot, so it had to be rewritten to work incrementally without changing its output.",
      ],
      lessonsLearned: [
        "Migrating incrementally — running old and new pipelines in parallel and diffing outputs — caught several edge cases that would have caused silent discrepancies in production.",
      ],
      futureImprovements: [
        "Move from a polling consumer to a push-based streaming framework for lower latency at higher volume.",
      ],
    },
  },
  {
    slug: "supply-chain-shipment-performance",
    title: "Supply Chain Shipment Performance Analysis",
    industry: "Supply Chain",
    type: "Analytics",
    description:
      "An analysis of 10,000 shipment records connecting delivery, cost, inventory, and customer experience data to find where a logistics operation actually loses time and money.",
    businessProblem:
      "Leadership needed a single view of shipment performance instead of scattered signals, which carriers, routes, and conditions were really driving late deliveries, and whether the operational levers assumed to matter (staffing, driver experience) actually did.",
    technologies: ["Excel", "MySQL", "SQL", "Tableau"],
    skills: ["Data Cleaning", "SQL Querying", "Exploratory Data Analysis", "Business Intelligence", "Dashboard Development"],
    github: "https://github.com/lotathebaby/supply_chain_analysis",
    demo: "https://public.tableau.com/views/Supplychainproject_17845630845070/Dashboard1?%3Alanguage=en-GB&publish=yes&%3Asid=&%3Aredirect=auth&%3Adisplay_count=n&%3Aorigin=viz_share_link",
    featured: true,
    images: [
      {
        src: "/projects/supply-chain-shipment-performance/dashboard-overview.png",
        alt: "Tableau dashboard showing supply chain delivery, profitability, inventory, and customer experience KPIs",
        caption: "Dashboard overview, delivery, profitability, inventory, and customer experience in one view.",
      },
    ],
    caseStudy: {
      overview:
        "A dataset of 10,000 simulated shipment records, spanning delivery timelines, carrier and route data, financials, inventory, and customer experience, cleaned in Excel, analyzed across five themes in MySQL, and delivered as a four-quadrant Tableau dashboard (Delivery, Profitability, Inventory, Customer Experience).",
      objectives: [
        "Evaluate delivery performance across carriers, shipping modes, weather, and traffic conditions",
        "Analyze return and damage patterns by product category and carrier",
        "Compare profitability across shipping modes, carriers, routes, and product categories",
        "Investigate whether warehouse staffing and inventory levels actually predict operational problems",
        "Determine what drives customer satisfaction and complaints",
      ],
      dataset:
        "10,000 shipment records covering order/delivery timelines, carrier and shipping details, origin/destination and distance, product and pricing data, financials (shipping cost, fuel surcharge, profit margin), warehouse/inventory metrics, and customer experience data (satisfaction, complaints, returns).",
      architectureNote:
        "Raw shipment export → Excel cleaning (duplicate columns, blanks, date formats, whitespace, encoding) → MySQL, structured into five analysis themes → Tableau dashboard.",
      implementation: [
        "Removed a duplicate Product_Category column (one had a trailing space in its header) left over from earlier data handling, to avoid conflicting column names downstream.",
        "Checked blank/null values against expectation, e.g. confirming Return_Reason was correctly blank only for non-returned orders, rather than treating all nulls as errors.",
        "Standardized Order_Date, Shipment_Date, and Delivery_Date formats and re-saved the file in UTF-8 before import, after hitting character-encoding errors on the first MySQL load.",
        "Structured the SQL analysis into five themes including Delivery Performance, Returns & Quality, Financial Performance, Warehouse & Inventory, Customer Experience, so each could be investigated as its own focused set of queries rather than one long unfocused script.",
        "Built the Tableau dashboard around the same four themes as the SQL analysis (Delivery, Profitability, Inventory, Customer Experience), with filters for carrier, shipping mode, product category, and supplier alongside always-visible top-line KPIs.",
        "Deliberately excluded analyses that didn't hold up, like certain route-level and monthly-trend views, from the final dashboard rather than including them for the sake of completeness.",
      ],
      analysis: [
        "91.15% of all deliveries were late, but the rate barely varied by carrier or shipping mode (Purolator 91.93%, UPS 90.26%), the real driver was weather and traffic, with heavy traffic and snow/blizzard conditions producing the most late deliveries.",
        "Furniture stood out as a clear outlier for both return rate and damage rate compared to every other product category, while Canada Post carried the highest damaged/lost shipment rate among carriers.",
        "Economy shipping had both the lowest average cost and the highest profit margin, while Same-Day shipping was the most expensive and least profitable; one specific route (New York to Vancouver) ran a negative average profit margin.",
        "Warehouse staffing level and capacity utilization showed no meaningful relationship with processing time or delays, but low inventory stock level was a strong, consistent predictor, nearly every backorder occurred while stock was flagged low.",
        "Late delivery and delivery-attempt count showed no meaningful correlation with customer satisfaction, B2B customers reported the highest satisfaction and Government customers the lowest, independent of delay rates.",
      ],
      challenges: [
        "Character encoding issues surfaced during the MySQL import and had to be resolved by re-saving the source file in UTF-8 before it would load cleanly.",
        "Several operational factors that looked interesting at a glance (driver experience, staffing level, capacity utilization) had to be explicitly tested and ruled out rather than assumed to matter, which shaped which findings made it into the final dashboard.",
      ],
      lessonsLearned: [
        "The most valuable part of the analysis was distinguishing real signals (weather/traffic, furniture returns, low-stock-to-backorder) from plausible-looking factors that didn't actually hold up under scrutiny (staffing, driver experience, delivery attempts vs. satisfaction).",
        "Structuring both the SQL analysis and the dashboard around the same set of themes kept the story consistent from query to visual, instead of the dashboard drifting from what the analysis actually found.",
      ],
      futureImprovements: [
        "Build a monitoring view around the low-stock-to-backorder relationship specifically, since it was the clearest cause-and-effect signal in the dataset.",
        "Investigate the New York–Vancouver route and ProSource Industries supplier relationship in more depth, since both were flagged as cost/performance outliers.",
      ],
    },
  },
  {
    slug: "supply-chain-warehouse",
    title: "Supply Chain Data Warehouse",
    industry: "Supply Chain",
    type: "Engineering",
    description:
      "A warehouse consolidating order, inventory, and logistics data to support forecasting and fulfillment reporting.",
    businessProblem:
      "Order, inventory, and shipping data lived in three separate systems with no shared key, making network-wide fulfillment reporting impossible.",
    technologies: ["PostgreSQL", "SQL", "Python", "Data Modeling"],
    skills: ["Data Warehousing", "Database Design", "ETL"],
    github: "https://github.com/yourhandle/supply-chain-warehouse",
    demo: "",
    status: "planned",
    caseStudy: {
      overview:
        "A warehouse joining order, inventory, and logistics systems around a shared shipment dimension, enabling fulfillment reporting that previously required manually stitching three exports together.",
      objectives: [
        "Create a shared definition of a shipment across order, inventory, and logistics systems",
        "Support both operational reporting and downstream forecasting from the same schema",
      ],
      dataset:
        "Daily extracts from order management, warehouse inventory, and carrier logistics systems.",
      architectureNote:
        "Raw → staging → marts layering, with a conformed shipment dimension joining order, inventory, and logistics fact tables.",
      dataModel:
        "A shipment dimension conformed across three fact tables (orders, inventory movements, carrier events), letting a single query trace an order from placement to delivery.",
      pipeline:
        "Nightly Python-orchestrated batch load with staged validation before promotion to the marts layer.",
      implementation: [
        "Designed a conformed shipment dimension so order, inventory, and logistics facts could be joined without ad hoc key-matching in every report.",
        "Built slowly changing dimension handling for warehouse and carrier reassignments.",
        "Added row-count and referential integrity checks between layers to catch broken joins before they reached reporting.",
      ],
      challenges: [
        "Carrier data used a different shipment identifier than the order system, requiring a cross-reference table maintained as part of the load process.",
      ],
      lessonsLearned: [
        "Designing the conformed dimension before writing any load code prevented a rework that would otherwise have been needed once the second fact table was added.",
      ],
      futureImprovements: [
        "Migrate transformation logic into dbt for documentation and automated testing.",
        "Add carrier SLA tracking as a new fact table using the existing shipment dimension.",
      ],
    },
  },
  {
    slug: "network-outage-analysis",
    title: "Network Outage Root Cause Dashboard",
    industry: "Telecommunications",
    type: "Analytics",
    description:
      "A dashboard correlating outage tickets with network events to speed up root cause identification.",
    businessProblem:
      "Outage tickets and network event logs lived in separate systems, so root cause analysis relied on manually cross-referencing timestamps.",
    technologies: ["SQL", "Python", "Power BI"],
    skills: ["Data Visualization", "Business Intelligence", "Exploratory Data Analysis"],
    github: "https://github.com/yourhandle/network-outage-analysis",
    demo: "",
    status: "planned",
    caseStudy: {
      overview:
        "A dashboard that automatically correlates outage tickets with network event logs by time and location, cutting the manual cross-referencing step out of root cause analysis.",
      objectives: [
        "Automatically surface likely network events behind each outage ticket",
        "Reduce average time-to-root-cause for the network operations team",
      ],
      dataset:
        "Outage ticket history and network event logs, joined on time window and cell site location.",
      architectureNote:
        "SQL join logic matching tickets to candidate events within a time/location window, surfaced in a Power BI dashboard ranked by match confidence.",
      implementation: [
        "Built a time-and-location windowed join to surface candidate network events for each outage ticket rather than requiring an exact timestamp match.",
        "Added a simple confidence score based on time proximity and site distance to rank candidate matches.",
        "Designed the dashboard around the operations team's existing ticket-review workflow rather than introducing a new tool.",
      ],
      challenges: [
        "Timestamps between the ticketing and network event systems were recorded in different time zones without clear labeling, which initially produced false matches until normalized.",
      ],
      lessonsLearned: [
        "A simple ranked-candidate approach was adopted faster than a more complex matching model would have been, since analysts could still apply judgment on the final call.",
      ],
      futureImprovements: [
        "Incorporate a machine learning classifier once enough analyst-confirmed matches have accumulated to train on.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && isPublished(p));
}

export function isPublished(project: Project): boolean {
  return (project.status ?? "published") === "published";
}

export function getProjectsByIndustry(industry: Industry): Project[] {
  return projects.filter((p) => p.industry === industry);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured && isPublished(p));
}
