import { Back, Close, CopyDocument, Delete, Edit, Expand, Fold, Right, View } from "@element-plus/icons-vue"
import deepcopy from "deepcopy"
import { ElButton, ElIcon, ElInput } from "element-plus"
import { $dialog$ } from "../components/dialog"
import { DropdownItem } from "../components/dropdown"

function createEditorConfig() {
  const componentList = []
  const componentMap = {}
  const toolbarList = []
  const dropdownMenuList = []
  return {
    componentList,
    componentMap,
    toolbarList,
    dropdownMenuList,
    registerComponent: (component) => {
      componentList.push(component)
      componentMap[component.key] = component
    },
    registerToolbar: (toolbar) => {
      toolbarList.push(toolbar)
    },
    registerDropdownMenu: (dropdownMenu) => {
      dropdownMenuList.push(dropdownMenu)
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


registerConfig.registerDropdownMenu(({command}) => {
  return <DropdownItem onClick={() => {
    command.commands.deleteComponent()
  }}>
    <Delete></Delete>
    <span>删除</span>
  </DropdownItem>
})
registerConfig.registerDropdownMenu(({command}) => {
  return <DropdownItem onClick={() => {
    command.commands.placeTop()
  }}>
    <CopyDocument></CopyDocument>
    <span>置顶</span>
  </DropdownItem>
})
registerConfig.registerDropdownMenu(({command}) => {
  return <DropdownItem onClick={() => {
    command.commands.placeBottom()
  }}>
    <CopyDocument></CopyDocument>
    <span>置底</span>
  </DropdownItem>
})
registerConfig.registerDropdownMenu(({block,command}) => {
  return <DropdownItem onClick={() => {
    const dialog = $dialog$({
      title: "查看",
      preview: true,
      content: deepcopy(block)
    })
    dialog.showDialog()
  }}>
    <View></View>
    <span>查看</span>
  </DropdownItem>
})
