# Editing resume content

All resume text and links live in **[`src/content/resume.json`](../src/content/resume.json)**. The TypeScript types in [`src/content/types.ts`](../src/content/types.ts) describe the shape; `npm run build` will fail if the JSON does not match those fields.

## Conventions

- **Plain text only** for titles, summaries, and descriptions (no Markdown or HTML in JSON strings).
- **Dates** are free-form strings (e.g. `Dec 2017`, `2012`, `Present`).
- **Optional fields** can be omitted or set to empty string where noted below.

## Top-level sections

### `basics`

| Field       | Required | Description |
|------------|----------|-------------|
| `name`     | yes      | Your full name (shown in the hero). |
| `title`    | yes      | Professional headline. |
| `location` | yes      | City, region, or country as you want it displayed. |
| `photoSrc` | no       | Path to a photo **under the site root**, e.g. `/images/headshot.jpg`. Place the file in [`public/images/`](../public/images/). If omitted or the file fails to load, initials are shown. |

### `contact`

| Field      | Required | Description |
|-----------|----------|-------------|
| `email`   | no       | Shown as a `mailto:` link when non-empty (header card, footer, Contact page). |
| `phone`   | no       | Shown in the footer **Call** column and on the Contact page when non-empty. |
| `linkedin`| no       | Full URL to your LinkedIn profile. |
| `github`  | no       | URL to your GitHub profile or site. |

Empty strings hide that row.

### `summary`

Single paragraph string for the summary card.

### `experience`

Array of jobs, most recent first. Each item:

| Field         | Required | Description |
|--------------|----------|-------------|
| `role`       | yes      | Job title. |
| `company`    | yes      | Employer name. |
| `companyUrl` | no       | Link for the company name. |
| `location`   | yes      | Where you worked. |
| `start` / `end` | yes   | Date range. |
| `highlights` | no       | Array of bullet strings; omit or use `[]` for none. |

### `education`

Array of degrees. Each item:

| Field        | Required | Description |
|-------------|----------|-------------|
| `degree`    | yes      | Degree and field of study. |
| `school`    | yes      | Institution name. |
| `schoolUrl` | no       | Link for the school name. |
| `location`  | yes      | Campus or city. |
| `start` / `end` | yes  | Years. |
| `details`   | no       | Honors, GPA line, etc. |

### `skills`

Array of short strings; each becomes a tag in the **Skills** section.

### `projects`

Array of projects. Each item:

| Field         | Required | Description |
|--------------|----------|-------------|
| `name`       | yes      | Project title. |
| `description`| yes      | One or two sentences. |
| `githubUrl`  | yes      | Primary link (GitHub repo or other project page). The UI labels it **Repository** when the host is `github.com`, otherwise **Link**. |
| `demoUrl`    | no       | Optional second link (demo, article, docs). |

## Example snippet

```json
{
  "basics": {
    "name": "Jane Doe",
    "title": "Software Engineer",
    "location": "Seattle, WA",
    "photoSrc": "/images/headshot.jpg"
  },
  "contact": {
    "email": "jane@example.com",
    "linkedin": "https://www.linkedin.com/in/janedoe",
    "github": "https://github.com/janedoe"
  },
  "summary": "One paragraph about your focus and strengths.",
  "experience": [],
  "education": [],
  "skills": ["TypeScript", "React"],
  "projects": [
    {
      "name": "My App",
      "description": "What it does.",
      "githubUrl": "https://github.com/janedoe/my-app"
    }
  ]
}
```

After editing, run `npm run build` locally to confirm there are no type or JSON issues.
