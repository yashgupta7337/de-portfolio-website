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
  { value: 90, suffix: "%+", label: "Query latency reduced" },
  { value: 40, suffix: "%", label: "AWS Aurora cost cut" },
  { value: 300, suffix: "GB", label: "Migrated, zero downtime" },
  { value: 35, suffix: "%", label: "Lakehouse cost reduction" },
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
  blurb: string;
  location: string;
  date: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Data Engineer I",
    company: "Connect and Heal",
    blurb:
      "Healthcare technology company focused on digital solutions to improve patient engagement and management.",
    location: "Bangalore, India",
    date: "Jun 2024 — Present",
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
    blurb:
      "A tech startup focused on enhancing retail & shopping experiences through data-driven insights.",
    location: "Gurugram, India",
    date: "May 2022 — Aug 2022",
    points: [
      "Enhanced data crawling & parsing to efficiently extract product information from multiple sources — a 10% improvement in speed and performance.",
      "Applied Python web crawling to automate data collection, improving efficiency and scalability by reducing Docker image size by 20%.",
      "Assisted in deploying containerized data pipelines using Docker & Kubernetes, improving the scalability of data ingestion workflows.",
    ],
  },
  {
    role: "Summer Research Intern",
    company: "National University of Singapore",
    blurb:
      "A leading research university specializing in innovation and advanced technology.",
    location: "Singapore",
    date: "Jun 2022",
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
    items: [
      { name: "Airflow (MWAA)", logo: "airflow" },
      { name: "Dagster", logo: "dagster" },
      { name: "dbt", logo: "dbt" },
    ],
  },
  {
    icon: "🛠️",
    title: "DevOps & Tools",
    items: [
      { name: "Docker", logo: "docker" },
      { name: "Jenkins", logo: "jenkins" },
      { name: "Git", logo: "git" },
      { name: "Claude", logo: "claude" },
    ],
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
};

export const interests = [
  {
    icon: "📈",
    title: "FinTech & Markets",
    body: "Market microstructure and trading infrastructure.",
  },
  {
    icon: "🏊",
    title: "Swimming",
    body: "Early-morning laps — my no-notifications reset button.",
  },
  {
    icon: "♟️",
    title: "Chess",
    body: "Endgame-obsessed; I over-study openings and still blunder.",
  },
  {
    icon: "🎮",
    title: "Gaming",
    body: "Strategy sims to co-op shooters, streamed to nobody.",
  },
  {
    icon: "🎧",
    title: "Discord, basically my OS",
    body: "Voice channels, listening parties, and a second-brain server.",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#interests", label: "Interests" },
  { href: "#contact", label: "Contact" },
];
