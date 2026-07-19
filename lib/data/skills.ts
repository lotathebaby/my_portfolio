// Add new skills by appending strings to the relevant category's `items`
// array. `status: "planned"` renders a skill in a muted/outlined style so
// it's clear it's on the roadmap rather than already in production use.

export interface Skill {
  name: string;
  status?: "active" | "planned";
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "data-engineering",
    title: "Data Engineering",
    description: "Building the pipelines and models data is built on.",
    items: [
      { name: "SQL" },
      { name: "Python" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Data Modeling" },
      { name: "Data Warehousing" },
      { name: "ETL" },
      { name: "Database Design" },
      { name: "Data Cleaning" },
      { name: "Data Transformation" },
      { name: "Airflow", status: "planned" },
      { name: "dbt", status: "planned" },
      { name: "Docker", status: "planned" },
      { name: "Spark", status: "planned" },
      { name: "Azure", status: "planned" },
      { name: "AWS", status: "planned" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Turning modeled data into decisions.",
    items: [
      { name: "Excel" },
      { name: "Tableau" },
      { name: "Power BI" },
      { name: "Data Visualization" },
      { name: "Business Intelligence" },
      { name: "Dashboard Development" },
      { name: "Exploratory Data Analysis" },
      { name: "Statistical Analysis" },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    description: "Languages used day to day.",
    items: [
      { name: "Python" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "TypeScript" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "The rest of the toolchain.",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Linux" },
    ],
  },
];
