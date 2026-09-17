# ponien-kung.github.io

Personal site for Po-Nien Kung. One hand-written `index.html` — no build step, no
framework, no dependencies beyond a Google Fonts stylesheet.

```
index.html          the whole page: markup, styles, behaviour
content/
  papers.json       publication list
  news.json         the "Recent" panel
  Po_Nien_Kung_CV.pdf
img/                portrait, favicon, and the four thesis figures
bibtex/             .txt citations linked from older papers
```

Nothing else: no build step, no dependencies, no framework. The Bootstrap 3 tree,
`custom.css` and `render_content_js/` that drove the previous version were removed once
this page replaced it — they are in git history if ever needed.

## Previewing

The page fetches its JSON, so it must be served over http rather than opened from
disk. Apache is already configured on this machine with `DocumentRoot
/Users/billkung/Sites`, so the site is live at:

**http://localhost/ponien-kung/**

Any static server works as an alternative — `python3 -m http.server` from the repo
root, then <http://localhost:8000/>.

## Updating content

Adding an entry to one of the two JSON files is the whole update workflow; the HTML
never changes. Both files sort themselves, so a new entry can be pasted anywhere in
the array.

### A news entry

```json
{ "date": "2026-11", "text": "Started at <a href=\"https://example.com\">Somewhere</a>." }
```

`date` is `"YYYY-MM"`. The displayed month ("November 2026") and the `<time>`
attribute are both derived from it, so they cannot drift apart. `text` accepts inline
HTML.

Only the newest five render (`NEWS_SHOWN` in `index.html`), so old entries can be left
in the file forever — they just fall off the bottom.

### A paper entry

```json
{
  "id": "pub-shortname",
  "selected": true,
  "year": 2027,
  "title": "Full Paper Title",
  "authors": "<b>P.-N. Kung</b>, A. Coauthor, N. Peng",
  "venue": "ACL 2027",
  "note": "Spotlight",
  "links": { "Paper": "https://…", "Code": "https://…" }
}
```

| Field | Notes |
|---|---|
| `year` | The list sorts by it, so paste anywhere. Order *within* a year is file order — put the one you care about first. |
| `authors` | Wrap your own name in `<b>…</b>`. Mark equal contribution with `*`. |
| `selected` | `true` puts it under the **Selected** tab. Omit for list-only. |
| `note` | Optional distinction, shown as a small outlined badge beside the venue: `"Spotlight"`, `"Oral"`, `"Best Paper"`. |
| `id` | The anchor a thesis reference links to. Only needed if a tab cites it. |
| `links` | Optional. **Omit a link rather than pointing it at `"#"`** — a dead link reads worse than no link. |

## Figures

Each thesis tab carries one figure:

| Tab | File | Paper |
|---|---|---|
| 01 Diagnose | `img/DoModelFollows.jpg` | Do Models Really Learn to Follow Instructions? |
| 02 Constrain | `img/ctrl-g-teaser.gif` | Ctrl-G |
| 03 Learn | `img/ctrl-r-teaser.gif` | Ctrl-R |
| 04 Scale | `img/LEAP.png` | LEAP |

They are different shapes — square, 4:3, 16:9 — so every figure is drawn into the same
4:3 box with `object-fit: contain`. That keeps all four panels exactly the same height,
which matters because the tabs swap in place. Replacing one needs no CSS change; give
the `<img>` the real `width` and `height` attributes so the box is reserved while it
loads.

Two further things hold the panels level, worth knowing before editing the copy:
a caption must wrap to **two lines** (roughly 105–130 characters), and the body
paragraphs are tuned to land on the same number of lines rather than the same word
count. Measure the rendered height after an edit rather than trusting word counts.

## Venues to double-check

Google Scholar lists several papers by arXiv ID only, so these venues were inferred and
should be confirmed:

| Paper | Listed as | Confidence |
|---|---|---|
| Ctrl-G | NeurIPS 2024 | inferred — check whether it was a Spotlight |
| Improving Event Definition Following | ACL 2024 | inferred |
| GenEARL | arXiv:2404.04763 | may have a venue by now |
| LLM-REVal | arXiv:2510.12367 | may have a venue by now |
| LEAP | arXiv:2606.03303 | may have a venue by now |

Author lists use initials, because Scholar only exposes abbreviated names — paste the
full lists from your own BibTeX if you prefer them spelled out.

Google Scholar also has a 1994 optics paper ("Rapid prototyping of multilevel
diffractive optical elements") merged into the profile by mistake. It is excluded here,
and worth removing from Scholar too.
