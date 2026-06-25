export const profile = {
  name: "Yash Gupta",
  role: "Data Engineer",
  location: "Bangalore, India",
  email: "yashgupta1470@gmail.com",
  phone: "+91 99901 81300",
  phoneHref: "+919990181300",
  linkedin: "https://www.linkedin.com/in/yashgupta7337",
  github: "https://github.com/yashgupta7337",
  resume: "YashGupta_Resume.pdf",
  summary:
    "I independently own and scale data platforms in fast-paced, lean environments — leading critical migrations and architectural shifts that cut query latency by 90%+ and infrastructure cost by 35–40%. I specialize in cost-efficient, reliable pipelines and real-time systems.",
  heroLead: "ClickHouse · Spark · Airflow · AWS · dbt",
};

export const impactStats = [
  {
    value: 90,
    suffix: "%",
    label: "Query latency reduced",
    from: "60s",
    to: "5s",
    before: 1,
    after: 0.1,
    dir: "down" as const,
  },
  {
    value: 40,
    suffix: "%",
    label: "AWS Aurora cost cut",
    from: "100%",
    to: "60%",
    before: 1,
    after: 0.6,
    dir: "down" as const,
  },
  {
    value: 300,
    suffix: "GB",
    label: "Migrated, zero downtime",
    from: "0",
    to: "300GB",
    before: 0.04,
    after: 1,
    dir: "up" as const,
    live: true as const,
  },
  {
    value: 35,
    suffix: "%",
    label: "Lakehouse cost reduction",
    from: "100%",
    to: "65%",
    before: 1,
    after: 0.65,
    dir: "down" as const,
  },
];

export const aboutCards = [
  {
    icon: "⚙️",
    title: "Platform migrations",
    body: "Moved a cloud-native lakehouse to ClickHouse and 300GB from DocumentDB to Aurora Postgres — structured, zero-downtime, no cost increase.",
  },
  {
    icon: "📉",
    title: "Cost engineering",
    body: "Consolidated databases and re-architected the medallion lakehouse to drive 35–40% cost reductions across production and lower environments.",
  },
  {
    icon: "📡",
    title: "Real-time & reliability",
    body: "Built real-time monitoring dashboards with automated alerting for proactive issue detection and higher data reliability.",
  },
];

export type Experience = {
  role: string;
  company: string;
  monogram: string;
  logo?: string;
  accent: "emerald" | "violet" | "blue";
  blurb: string;
  location: string;
  date: string;
  metrics?: { value: number; suffix: string; label: string }[];
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Data Engineer I",
    company: "Connect and Heal",
    monogram: "C&H",
    logo: "/logos/cnh.png",
    accent: "emerald",
    blurb:
      "Healthcare technology company focused on digital solutions to improve patient engagement and management.",
    location: "Bangalore, India",
    date: "Jun 2024 — Present",
    metrics: [
      { value: 12, suffix: "×", label: "faster queries" },
      { value: 40, suffix: "%", label: "cost cut" },
      { value: 300, suffix: "GB", label: "migrated" },
    ],
    points: [
      "Migrated the data platform from a cloud-native lakehouse to ClickHouse, optimizing warehouse design and cutting query SLA from 60+s to ~5s on average.",
      "Consolidated and migrated databases, reducing AWS Aurora Postgres costs across production and lower environments by 40%.",
      "Designed scalable workflows with S3, MWAA, Glue, DMS, Hudi, Spark & EMR in a medallion architecture — driving a 35% lakehouse cost reduction.",
      "Led a 300GB migration from DocumentDB to Aurora Postgres — unstructured → structured, zero downtime, no cost increase.",
      "Designed real-time monitoring dashboards with automated alerting for proactive issue detection and improved data reliability.",
      "Led PoCs across RisingWave, Redshift, Dagster, dbt & Olake to evaluate streaming, orchestration and transformation trade-offs, influencing platform architecture decisions.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "MagicPin",
    monogram: "MP",
    logo: "/logos/magicpin.png",
    accent: "violet",
    blurb:
      "A tech startup focused on enhancing retail & shopping experiences through data-driven insights.",
    location: "Gurugram, India",
    date: "May 2022 — Aug 2022",
    metrics: [
      { value: 10, suffix: "%", label: "faster crawl" },
      { value: 20, suffix: "%", label: "smaller images" },
    ],
    points: [
      "Enhanced data crawling & parsing to efficiently extract product information from multiple sources — a 10% improvement in speed and performance.",
      "Applied Python web crawling to automate data collection, improving efficiency and scalability by reducing Docker image size by 20%.",
      "Assisted in deploying containerized data pipelines using Docker & Kubernetes, improving the scalability of data ingestion workflows.",
    ],
  },
  {
    role: "Summer Research Intern",
    company: "National University of Singapore",
    monogram: "NUS",
    logo: "/logos/nus.png",
    accent: "blue",
    blurb:
      "A leading research university specializing in innovation and advanced technology.",
    location: "Singapore",
    date: "Jun 2022",
    metrics: [{ value: 2, suffix: "nd", label: "place · innovation" }],
    points: [
      "Improved AI model performance through optimization and experimental evaluation, in collaboration with NUS and Hewlett Packard Enterprise.",
      "Group research project: designed an AI-powered fashion design system using Neural Style Transfer (NST) and Generative Adversarial Networks (GANs).",
    ],
  },
];

export const skills = [
  {
    icon: "🧮",
    title: "Data Processing & Platforms",
    use: "Modeling warehouses and crunching billions of rows.",
    items: [
      { name: "Spark", logo: "spark" },
      { name: "SQL", logo: "sql" },
      { name: "Python", logo: "python" },
      { name: "ClickHouse", logo: "clickhouse" },
      { name: "Hudi", logo: "hudi" },
      { name: "Iceberg", logo: "iceberg" },
    ],
  },
  {
    icon: "☁️",
    title: "Cloud & Storage",
    use: "The AWS backbone every pipeline runs on.",
    items: [
      { name: "S3", logo: "s3" },
      { name: "EMR", logo: "emr" },
      { name: "Glue", logo: "glue" },
      { name: "Lambda", logo: "lambda" },
      { name: "RDS", logo: "rds" },
      { name: "DynamoDB", logo: "dynamodb" },
      { name: "Athena", logo: "athena" },
      { name: "DMS", logo: "dms" },
      { name: "IAM", logo: "iam" },
      { name: "EC2", logo: "ec2" },
      { name: "ECS", logo: "ecs" },
      { name: "ECR", logo: "ecr" },
      { name: "DocumentDB", logo: "documentdb" },
      { name: "Aurora Postgres", logo: "aurora" },
    ],
  },
  {
    icon: "🪄",
    title: "Orchestration & Transformation",
    use: "Scheduling, lineage, and clean transforms.",
    items: [
      { name: "Airflow (MWAA)", logo: "airflow" },
      { name: "Dagster", logo: "dagster" },
      { name: "dbt", logo: "dbt" },
    ],
  },
  {
    icon: "🛠️",
    title: "DevOps & Tools",
    use: "Shipping, automating, and pairing with AI.",
    items: [
      { name: "Docker", logo: "docker" },
      { name: "Jenkins", logo: "jenkins" },
      { name: "Git", logo: "git" },
      { name: "Claude", logo: "claude" },
    ],
  },
  {
    icon: "🧪",
    title: "Explored · PoC",
    use: "Evaluated in proofs-of-concept and spikes.",
    items: [
      { name: "Redshift", logo: "redshift" },
      { name: "RisingWave", logo: "risingwave" },
      { name: "OLake", logo: "olake.png" },
      { name: "PeerDB", logo: "peerdb.png" },
    ],
  },
];

export const caseStudies = [
  {
    tag: "Platform migration",
    accent: "cyan" as const,
    title: "Cloud lakehouse → ClickHouse",
    problem:
      "Analytical queries were taking 60+ seconds, throttling dashboards and every downstream consumer.",
    approach:
      "Re-modeled the warehouse on ClickHouse — table engines, sort keys and materialized rollups tuned for the access patterns that actually mattered.",
    metric: { from: "60s", to: "5s", label: "avg query SLA", delta: "12× faster" },
    stack: ["ClickHouse", "Spark", "EMR", "S3"],
  },
  {
    tag: "Zero-downtime migration",
    accent: "emerald" as const,
    title: "300GB DocumentDB → Aurora",
    problem:
      "Unstructured documents in DocumentDB blocked relational analytics and carried rising cost.",
    approach:
      "Modeled the documents into a relational schema and moved 300GB via DMS with CDC — a live cutover with no downtime and no cost increase.",
    metric: { from: "NoSQL", to: "SQL", label: "300GB migrated", delta: "0 downtime" },
    stack: ["DMS", "Aurora", "DocumentDB", "Python"],
  },
  {
    tag: "Cost engineering",
    accent: "violet" as const,
    title: "Medallion lakehouse re-architecture",
    problem:
      "Aurora and lakehouse spend was climbing across production and lower environments.",
    approach:
      "Consolidated databases and re-architected the bronze → silver → gold lakehouse with S3, Glue, Hudi, Spark & MWAA.",
    metric: { from: "100%", to: "60%", label: "infra spend", delta: "−35–40%" },
    stack: ["Hudi", "Glue", "Airflow", "S3"],
  },
];

export const projects = [
  {
    title: "Stock Market Data Pipeline",
    body: "End-to-end pipeline on Apache Airflow + Docker to ingest, process & store daily stock data. Dockerized Spark transforms, stored in MinIO (S3-compatible) & PostgreSQL, visualized in Metabase.",
    tags: ["Airflow", "Docker", "Spark", "MinIO", "PostgreSQL", "Metabase"],
    flow: ["Airflow", "Spark", "MinIO", "Metabase"],
    kind: "pipeline" as const,
    github: "https://github.com/yashgupta7337/stock_market_airflow",
  },
  {
    title: "AI-Generated Fashion Design",
    body: "AI design system using Neural Style Transfer & GANs to blend artistic styles into unique patterns — reducing iteration time from hours to seconds. Secured 2nd place at NUS for innovation.",
    tags: ["Python", "NST", "GANs", "Deep Learning"],
    flow: ["style", "content", "design"],
    kind: "gan" as const,
    github: "https://github.com/yashgupta7337/Fashion-NST-GAN",
  },
];

export const education = {
  degree: "B.Tech in Computer Science Engineering",
  school: "Shiv Nadar University",
  location: "India",
  date: "Aug 2020 — May 2024",
  logo: "/logos/snu.png",
};

export const interests: {
  icon: string;
  logo?: string;
  title: string;
  body: string;
}[] = [
  {
    icon: "📈",
    logo: "/logos/sp500.svg",
    title: "FinTech & Markets",
    body: "Market microstructure and trading infrastructure.",
  },
  {
    icon: "🏊",
    title: "Swimming",
    body: "Early-morning laps — my no-notifications reset button.",
  },
  {
    icon: "⚽",
    logo: "/logos/premierleague.svg",
    title: "Football",
    body: "A fresh Premier League convert — still picking my club.",
  },
  {
    icon: "♟️",
    logo: "/logos/chesscom.svg",
    title: "Chess",
    body: "Endgame-obsessed; I over-study openings and still blunder.",
  },
  {
    icon: "🎮",
    logo: "/logos/steam.svg",
    title: "Gaming",
    body: "Strategy sims to co-op shooters, streamed to nobody.",
  },
  {
    icon: "🎧",
    logo: "/logos/discord.svg",
    title: "Discord, basically my OS",
    body: "Voice channels, listening parties, and a second-brain server.",
  },
];

export const upcoming = [
  {
    icon: "✍️",
    title: "Blog & writing",
    body: "Deep dives on ClickHouse tuning, cost engineering, and zero-downtime lakehouse migrations.",
  },
  {
    icon: "🔍",
    title: "Project case studies",
    body: "Architecture diagrams, the trade-offs I weighed, and the metrics behind each build.",
  },
  {
    icon: "🧪",
    title: "Experiments & PoCs",
    body: "Field notes from RisingWave, Dagster, dbt & Olake — streaming and orchestration evaluations.",
  },
  {
    icon: "chart",
    title: "Live demos",
    body: "Interactive walkthroughs of real-time monitoring and data-quality pipelines.",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#architecture", label: "Architecture" },
  { href: "#skills", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
