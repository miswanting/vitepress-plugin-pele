# 图表库

下面的每个图表都是普通的 `mermaid` 代码围栏，由 Pele 在构建期渲染。本页覆盖 Pele 支持的全部图表类型。打开导航栏的配色开关看看：SVG 会跟随配色变化，而且不需要重新渲染。

## 流程图

```mermaid
flowchart LR
  A[Markdown] --> B{VitePress}
  B -->|构建| C[(Pele)]
  C --> D[内联 SVG]
```

## 序列图

```mermaid
sequenceDiagram
  participant U as 用户
  participant P as Pele
  U->>P: render(source)
  P-->>U: SVG
```

## 状态图

```mermaid
stateDiagram-v2
  [*] --> 草稿
  草稿 --> 评审
  评审 --> 已发布
  已发布 --> [*]
```

## 类图

```mermaid
classDiagram
  class Renderer {
    +render(source) SVG
  }
  class Plugin
  Plugin --> Renderer
```

## 实体关系图

```mermaid
erDiagram
  DOC ||--o{ DIAGRAM : 包含
  DOC {
    string path
  }
```

## 甘特图

```mermaid
gantt
  title 发布计划
  dateFormat YYYY-MM-DD
  section 构建
  MVP           :a1, 2026-10-01, 10d
  发布          :a2, after a1, 5d
```

## 饼图

```mermaid
pie title 本页图表类型占比
  "流程图" : 45
  "序列图" : 30
  "其他" : 25
```

## 思维导图

```mermaid
mindmap
  root((VitePress))
    构建
      Pele
    主题
      CSS 变量
```

## Git 图

```mermaid
gitGraph
  commit
  branch feature
  commit
  checkout main
  merge feature
```

## 旅程图

```mermaid
journey
  title 编写图表的过程
  section 编写
    添加围栏: 5: 作者
  section 构建
    看到 SVG: 5: 作者
```

## 时间线

```mermaid
timeline
  title Pele 时间线
  2026 : MVP : 正式发布
```

## 四象限图

```mermaid
quadrantChart
  title 投入与影响
  x-axis 低投入 --> 高投入
  y-axis 低影响 --> 高影响
  quadrant-1 去做
  quadrant-2 规划
  quadrant-3 跳过
  quadrant-4 快速见效
  Pele: [0.2, 0.8]
```

## XY 图

```mermaid
xychart-beta
  title "每个图表的构建耗时"
  x-axis [mermaid.js, pele]
  y-axis "ms" 0 --> 500
  bar [420, 12]
```

## 需求图

展示需求、元素以及它们之间的关系。

```mermaid
requirementDiagram
  requirement build {
    id: 1
    text: "站点可以正常构建。"
    risk: high
    verifymethod: test
  }
  element pipeline {
    type: simulation
  }
  pipeline - satisfies -> build
```

## C4 上下文图

展示人员、系统以及它们之间的关系。

```mermaid
C4Context
  title 系统上下文
  Person(reader, "读者")
  System(docs, "文档站点")
  Rel(reader, docs, "阅读")
```

## 桑基图

展示某个量在节点之间如何流动。

```mermaid
sankey-beta
  Markdown,Diagram,8
  Diagram,SVG,6
  SVG,Page,6
```

## 块图

由带标签的方块组成的网格。

```mermaid
block-beta
  columns 3
  a["源码"] b["Pele"] c["SVG"]
```

## 数据包图

网络数据包的比特布局。

```mermaid
packet-beta
  0-15: "源端口"
  16-31: "目标端口"
  32-63: "负载"
```

## 看板

按列排列的任务，从待办到完成。

```mermaid
kanban
  待办
    编写文档
  评审
    打磨措辞
  完成
    发布版本
```

## 架构图

按边界归类的服务。

```mermaid
architecture-beta
  group cloud(cloud)[云端]
  service web(server)[Web] in cloud
  service db(database)[数据库] in cloud
  service cache(disk)[缓存] in cloud
```

## 雷达图

一个或多个数据系列共用一组坐标轴。

```mermaid
radar-beta
  axis a["速度"], b["成本"], c["质量"]
  curve mermaids { 3, 2, 4 }
  curve pele { 4, 5, 4 }
```

## 矩形树图

按数值确定大小的嵌套区域。

```mermaid
treemap
  "文档"
    "指南": 8
    "API": 4
  "代码"
    "插件": 6
```

## 信息图

渲染器版本，和其他图表一样处理。

```mermaid
info
```

## 智能体流程图

智能体以及它们使用的工具构成的流程。

```mermaid
agentflow-beta
  user[用户] --> tool[Pele]
  tool --> result[SVG]
```

## 用例图

参与者以及他们触发的用例。

```mermaid
usecase-beta
  actor Reader
  Reader --> Gallery
```

## 铁路图

用铁路图的形式画出一条语法规则。

```mermaid
railroad-beta
  request = sequence(terminal("GET"), terminal("/page"));
```

## 树视图

节点构成的层级结构。

```mermaid
treeView-beta
  root((文档))
    指南
    API
```

## 韦恩图

集合以及它们的交集。

```mermaid
venn-beta
  title 集合
  set A
  set B
  union A, B
```

## Cynefin 域

Cynefin 的五个域及其取向。

```mermaid
cynefin-beta
  complicated
  complex
  clear
```

## Wardley 图

演进程度与可见性的对照。

```mermaid
wardley-beta
  title 地图
  component Web [0.9, 0.8]
  component Docs [0.7, 0.5]
```

## 泳道图

按泳道归类的步骤。

```mermaid
swimlane-beta
  subgraph 客户端
    A[请求]
  end
  subgraph 服务端
    B[响应]
  end
```

## 鱼骨图

因果关系图。

```mermaid
ishikawa-beta
  构建缓慢
    缓存未命中
    资源体积过大
```

## 事件建模

实体以及作用于它们的命令。

```mermaid
eventmodeling
  entity Order
  timeframe 1 command Order
```

## 字面花括号

因为外层使用了 `v-pre` 编译，标签里的 Vue 插值语法会被原样保留：

```mermaid
flowchart LR
  A["{{ mustache }}"] --> B[依然是普通标签]
```
