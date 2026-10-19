# Diagram gallery

Every diagram below is a plain `mermaid` fence rendered by Pele during the build. Open the navbar color-mode toggle: the SVGs follow the palette without being re-rendered.

## Flowchart

```mermaid
flowchart LR
  A[Markdown] --> B{VitePress}
  B -->|build| C[(Pele)]
  C --> D[Inline SVG]
```

## Sequence diagram

```mermaid
sequenceDiagram
  participant U as User
  participant P as Pele
  U->>P: render(source)
  P-->>U: SVG
```

## State diagram

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Review
  Review --> Published
  Published --> [*]
```

## Class diagram

```mermaid
classDiagram
  class Renderer {
    +render(source) SVG
  }
  class Plugin
  Plugin --> Renderer
```

## Entity relationship

```mermaid
erDiagram
  DOC ||--o{ DIAGRAM : contains
  DOC {
    string path
  }
```

## Gantt

```mermaid
gantt
  title Release plan
  dateFormat YYYY-MM-DD
  section Build
  MVP           :a1, 2026-10-01, 10d
  Publish       :a2, after a1, 5d
```

## Pie chart

```mermaid
pie title Diagram types in this gallery
  "Flowchart" : 45
  "Sequence" : 30
  "Other" : 25
```

## Mindmap

```mermaid
mindmap
  root((VitePress))
    Build
      Pele
    Theme
      CSS variables
```

## Git graph

```mermaid
gitGraph
  commit
  branch feature
  commit
  checkout main
  merge feature
```

## Journey

```mermaid
journey
  title Authoring a diagram
  section Write
    Add fence: 5: Author
  section Build
    See SVG: 5: Author
```

## Timeline

```mermaid
timeline
  title Pele timeline
  2026 : MVP : Public release
```

## Quadrant chart

```mermaid
quadrantChart
  title Effort vs impact
  x-axis Low effort --> High effort
  y-axis Low impact --> High impact
  quadrant-1 Do
  quadrant-2 Plan
  quadrant-3 Skip
  quadrant-4 Quick wins
  Pele: [0.2, 0.8]
```

## XY chart

```mermaid
xychart-beta
  title Build time per diagram
  x-axis [mermaid.js, pele]
  y-axis "ms" 0 --> 500
  bar [420, 12]
```

## Literal braces

Vue interpolation syntax inside labels is preserved because the wrapper is compiled with `v-pre`:

```mermaid
flowchart LR
  A["{{ mustache }}"] --> B[Still a label]
```
