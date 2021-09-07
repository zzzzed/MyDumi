# CommonTree 树组件

<code src="@root/examples/CommonTree.tsx" />

### 属性设置

#### options

| 参数            | 说明              | 类型                 | 默认值  |
| --------------- | ----------------- | -------------------- | ------- |
| gData           | 数据源            | Array                | `[]`    |
| checkable       | 节点前添加 复选框 | boolen               | `false` |
| checkedKeys     | 选中的节点        | Array                | `[]`    |
| draggable       | 是否可拖拽        | boolen               | `false` |
| style           | 设置样式          | `Object`             | `false` |
| content         | 头部传入 DOM      | `React.ReactElement` | `null`  |
| hasExpandedKeys | 展开节点完全受控  | boolean              | `false` |

#### events

| 参数          | 说明             | 类型       | 默认值                                                                                 |
| ------------- | ---------------- | ---------- | -------------------------------------------------------------------------------------- |
| onTreeSelect  | 点击树节点触发   | `Function` | `function(selectedKeys, e:{selected: bool, selectedNodes, node, event})`               |
| onTreeDropEnd | 拖拽结束触发事件 | `Function` | `function(data: treeData)`                                                             |
| checkTreeNode | 点击复选框触发   | `Function` | `function(checkedKeys, e:{checked: bool, checkedNodes, node, event, halfCheckedKeys})` |
