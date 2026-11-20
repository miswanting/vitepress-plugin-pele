# Diagram gallery

Every diagram below is a plain `mermaid` fence rendered by Pele during the build. The gallery covers every diagram type Pele supports. Open the navbar color-mode toggle: the SVGs follow the palette without being re-rendered.

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

## Requirement diagram

Requirements, elements and the relations between them.

```mermaid
requirementDiagram
  requirement build {
    id: 1
    text: The site builds.
    risk: high
    verifymethod: test
  }
  element pipeline {
    type: simulation
  }
  pipeline - satisfies -> build
```

## C4 context diagram

People, systems and the relationships between them.

```mermaid
C4Context
  title System context
  Person(reader, "Reader")
  System(docs, "Docs site")
  Rel(reader, docs, "Reads")
```

## Sankey diagram

How a quantity flows between nodes.

```mermaid
sankey-beta
  Markdown,Diagram,8
  Diagram,SVG,6
  SVG,Page,6
```

## Block diagram

A grid of labelled blocks.

```mermaid
block-beta
  columns 3
  a["Source"] b["Pele"] c["SVG"]
```

## Packet diagram

The bit layout of a network packet.

```mermaid
packet-beta
  0-15: "Source Port"
  16-31: "Destination Port"
  32-63: "Payload"
```

## Kanban board

Columns of tasks, from todo to done.

```mermaid
kanban
  Todo
    Write docs
  Review
    Fix wording
  Done
    Ship release
```

## Architecture diagram

Services grouped into boundaries.

```mermaid
architecture-beta
  group cloud(cloud)[Cloud]
  service web(server)[Web] in cloud
  service db(database)[Database] in cloud
  service cache(disk)[Cache] in cloud
```

## Radar chart

One or more series over shared axes.

```mermaid
radar-beta
  axis a["Speed"], b["Cost"], c["Quality"]
  curve mermaids { 3, 2, 4 }
  curve pele { 4, 5, 4 }
```

## Treemap

Nested areas sized by value.

```mermaid
treemap
  "Docs"
    "Guide": 8
    "API": 4
  "Code"
    "Plugin": 6
```

## Info

The renderer version, rendered like any other diagram.

```mermaid
info
```

## Agent flow

A flow of agents and the tools they use.

```mermaid
agentflow-beta
  user[User] --> tool[Pele]
  tool --> result[SVG]
```

## Use case diagram

Actors and the use cases they trigger.

```mermaid
usecase-beta
  actor Reader
  Reader --> Gallery
```

## Railroad diagram

A grammar rule drawn as a railroad.

```mermaid
railroad-beta
  request = sequence(terminal("GET"), terminal("/page"));
```

## Tree view

A hierarchy of nodes.

```mermaid
treeView-beta
  root((Docs))
    Guide
    API
```

## Venn diagram

Sets and their overlaps.

```mermaid
venn-beta
  title Sets
  set A
  set B
  union A, B
```

## Cynefin domain

The five Cynefin domains and their orientation.

```mermaid
cynefin-beta
  complicated
  complex
  clear
```

## Wardley map

Evolution against visibility.

```mermaid
wardley-beta
  title Map
  component Web app [0.9, 0.8]
  component Docs [0.7, 0.5]
```

## Swimlane

Steps grouped into lanes.

```mermaid
swimlane-beta
  subgraph Client
    A[Request]
  end
  subgraph Server
    B[Response]
  end
```

## Ishikawa diagram

A cause and effect fishbone.

```mermaid
ishikawa-beta
  Slow build
    Cold cache
    Large assets
```

## Event modeling

Entities and the commands that act on them.

```mermaid
eventmodeling
  entity Order
  timeframe 1 command Order
```

## Literal braces

Vue interpolation syntax inside labels is preserved because the wrapper is compiled with `v-pre`:

```mermaid
flowchart LR
  A["{{ mustache }}"] --> B[Still a label]
```
