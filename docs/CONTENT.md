# Editing resume content

All resume text, links, logos, and grouping rules live in **[`src/content/resume.json`](../src/content/resume.json)**. The TypeScript types in [`src/content/types.ts`](../src/content/types.ts) describe the shape; `npm run build` will fail if the JSON does not match those fields, or if image/Markdown paths are missing (`npm run check-content`).

## Conventions

- **Plain text only** for titles, summaries, and descriptions (no HTML in JSON strings). Work highlights may use `[label](https://...)` links; only `https:` URLs are rendered.
- **Dates** are free-form strings (e.g. `Dec 2017`, `2012`, `Present`).
- **Optional fields** can be omitted or set to empty string where noted below.
- **`contentVersion`** is a string (`"1"` today). Bump it if you change the JSON shape so other clients can detect incompatibility.

## Top-level sections

### `basics`

| Field       | Required | Description |
|------------|----------|-------------|
| `name`     | yes      | Full name (hero, nav, photo alt). |
| `title`    | yes      | Professional headline. |
| `location` | yes      | City, region, or country as displayed. |
| `photoSrc` | no       | Path under `public/`, e.g. `/images/headshot.png`. Initials show if omitted or the file fails to load. |

### `contact`

| Field      | Required | Description |
|-----------|----------|-------------|
| `email`   | no       | Shown as a `mailto:` link when non-empty (hero CTA, footer pill). |
| `phone`   | no       | Optional; not rendered in the current UI. |
| `linkedin`| no       | Full `https` URL. Hidden when empty. |
| `github`  | no       | Full `https` URL. Hidden when empty. |

### `summary`

Single paragraph for the hero teaser.

### `about`

Single paragraph for the About body (split into two visual paragraphs in the UI).

### `aboutSection`

| Field     | Required | Description |
|----------|----------|-------------|
| `badge`  | yes      | Overlay on the photo (e.g. current role). |
| `heading`| yes      | About `h2`. |
| `pillars`| yes      | Array of `{ title, body, icon? }` cards. `icon` is `engineering` or `business`. |

### `footer`

| Field            | Required | Description |
|-----------------|----------|-------------|
| `headingPrefix` | yes      | Text before the gradient accent. |
| `headingAccent` | yes      | Gradient phrase. |
| `pitch`         | yes      | Closing paragraph. |

### `experience`

Array of jobs, most recent first. Roles that share `employerId` render on one card.

| Field         | Required | Description |
|--------------|----------|-------------|
| `role`       | yes      | Job title. |
| `company`    | yes      | Employer name as stored on the role. |
| `employerId` | no       | Grouping key (e.g. `meta` for both “Meta (Facebook)” and “Facebook”). Defaults to `company`. |
| `employerLabel` | no    | Card heading. Defaults to `company`. First occurrence in the group wins. |
| `logoSrc`    | no       | Path under `public/` for the card mark. First occurrence wins. |
| `logoWidth`  | no       | Pixel width of the logo image. |
| `fullWidth`  | no       | When true, the card spans the full row on `md+`. |
| `sortOrder`  | no       | Lower numbers first among employer cards. |
| `companyUrl` | no       | `https` link for the employer name. |
| `location`   | yes      | Where you worked. |
| `start` / `end` | yes   | Date range. |
| `highlights` | no       | Bullet strings; omit or use `[]` for none. |
| `employerSummary` | no  | Shown once at the top of the employer card. String or string array (joined with spaces). |

### `education`

| Field        | Required | Description |
|-------------|----------|-------------|
| `degree`    | yes      | Degree and field of study. |
| `school`    | yes      | Institution name. |
| `schoolUrl` | no       | `https` link for the school name. |
| `location`   | yes      | Campus or city. |
| `start` / `end` | yes  | Years. |
| `details`   | no       | Honors, GPA line, etc. |
| `campusPhoto` | no    | Path under `public/`. |
| `objectPosition` | no | CSS `object-position` for the photo. |
| `accent`    | no       | `engineering`, `business`, or `school` (icon). |

### `skills`

Array of short strings; each becomes a chip in the About section. Use `[]` to hide the row.

### `projects`

| Field         | Required | Description |
|--------------|----------|-------------|
| `name`       | yes      | Project title. |
| `description`| yes      | One or two sentences. |
| `githubUrl`  | no       | Primary `https` link. Labeled **GitHub repository** when the host is `github.com`. |
| `demoUrl`    | no       | Optional second `https` link (labeled **View case study**). |
| `imageSrc`   | no       | Path under `public/`. Omit for the default gradient strip. |
| `tags`       | no       | Chip labels on the card. |
| `detailModal`| no       | `{ markdown, title?, openLabel? }`. `markdown` is the slug of `src/content/portfolio/{slug}.md`. |

After editing, run `npm run build` locally to confirm there are no type, JSON, or missing-file issues.
