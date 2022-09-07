import { Back, Close, CopyDocument, Delete, Edit, Expand, Fold, Right, View } from "@element-plus/icons-vue"
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
registerConfig.registerToolbar({
  label: "导出",
  render: () => {
    return <ElIcon>
      <Expand></Expand>
    </ElIcon>
  },
  commandName: "export",
})
registerConfig.registerToolbar({
  label: "导入",
  render: () => {
    return <ElIcon>
      <Fold></Fold>
    </ElIcon>
  },
  commandName: "import",
})
registerConfig.registerToolbar({
  label: "置顶",
  render: () => {
    return <ElIcon>
     <CopyDocument></CopyDocument>
    </ElIcon>
  },
  commandName: "placeTop",
})
registerConfig.registerToolbar({
  label: "置底",
  render: () => {
    return <ElIcon>
     <CopyDocument></CopyDocument>
    </ElIcon>
  },
  commandName: "placeBottom",
})
registerConfig.registerToolbar({
  label: "删除",
  render: () => {
    return <ElIcon>
     <Delete></Delete>
    </ElIcon>
  },
  commandName: "deleteComponent",
})
registerConfig.registerToolbar(({previewRef,focusUse}) => {
  return {
    label: previewRef.value ? "编辑" : "预览",
    render: () => {
      return <ElIcon>
      {
        previewRef.value ? <Edit></Edit> : <View></View>
      }
      </ElIcon>
    },
    handler() {
      previewRef.value = !previewRef.value
      focusUse.clearBlockFocus()
    },
  }
})
registerConfig.registerToolbar({
  label: "关闭",
  render: () => {
    return <ElIcon>
      <Close></Close>
    </ElIcon>
  },
  handler() {
    
  },
})