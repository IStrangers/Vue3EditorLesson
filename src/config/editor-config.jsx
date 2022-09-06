import { Back, Right } from "@element-plus/icons-vue"
import { ElButton, ElIcon, ElInput } from "element-plus"

function createEditorConfig() {
  const componentList = []
  const componentMap = {}
  const toolbarList = []
  return {
    componentList,
    componentMap,
    toolbarList,
    registerComponent: (component) => {
      componentList.push(component)
      componentMap[component.key] = component
    },
    registerToolbar: (toolbar) => {
      toolbarList.push(toolbar)
    }
  }
}

export const registerConfig = createEditorConfig()

registerConfig.registerComponent({
  key: "text",
  label: "文本",
  preview: () => {
    return "预览文本"
  },
  render: () => {
    return "渲染文本"
  },
})
registerConfig.registerComponent({
  key: "button",
  label: "按钮",
  preview: () => {
    return <ElButton>
      预览按钮
    </ElButton>
  },
  render: () => {
    return <ElButton>
      渲染按钮
    </ElButton>
  },
})
registerConfig.registerComponent({
  key: "input",
  label: "输入框",
  preview: () => {
    return <ElInput placeholder="预览输入框">

    </ElInput>
  },
  render: () => {
    return <ElInput placeholder="渲染输入框">
      
    </ElInput>
  },
})


registerConfig.registerToolbar({
  label: "撤销",
  render: () => {
    return <ElIcon>
      <Back></Back>
    </ElIcon>
  },
  commandName: "undo",
})
registerConfig.registerToolbar({
  label: "重做",
  render: () => {
    return <ElIcon>
      <Right></Right>
    </ElIcon>
  },
  commandName: "redo",
})