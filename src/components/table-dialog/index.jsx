import "./index.scss"
import { ElButton, ElDialog, ElInput } from "element-plus";
import { createVNode, defineComponent, reactive, render } from "vue";
import { ElTable } from "element-plus";
import deepcopy from "deepcopy";
import { ElTableColumn } from "element-plus";

const TableDialogComponent = defineComponent({
  name: "TableDialogComponent",
  props: {
    option: {
      type: Object
    }
  },
  setup(props,ctx) {
    const state = reactive({
      option: props.option,
      isShow: false,
      editData: []
    })
    const updateOption = (option) => {
      state.option = option
      state.editData = deepcopy(option.data)
    }
    const showTableDialog = () => {
      state.isShow = true
    }
    const hideTableDialog = () => {
      state.isShow = false
    }
    ctx.expose({
      updateOption,
      showTableDialog,
      hideTableDialog
    })
    const onCancel = () => {
      hideTableDialog()
    }
    const conConfirm = () => {
      state.option.onConfirm && state.option.onConfirm(state.editData)
      hideTableDialog()
    }
    const add = () => {
      state.editData.push({})
    }
    const del = (index) => {
      state.editData = state.editData.slice(index,1)
    }
    const reset = () => {
      
    }
    return () => {
      return <ElDialog v-model={state.isShow} title={state.option.title}>
        {{
            default: () => <div>
              <ElButton onClick={add}>添加</ElButton>
              <ElButton onClick={reset}>重置</ElButton>
              <ElTable
                data={state.editData}
              >
                <ElTableColumn type="index"></ElTableColumn>
                {
                  state.option.config.table.options.map((item,index) => {
                    return <ElTableColumn label={item.label}>
                      {{
                          default: ({row}) => <ElInput v-model={row[item.field]}></ElInput>
                      }}
                    </ElTableColumn>
                  })
                }
                <ElTableColumn label="操作">
                  <ElButton type="danger" onClick={del()}>删除</ElButton>
                </ElTableColumn>
              </ElTable>
            </div>,
            footer: () => <div>
              <ElButton onClick={onCancel}>取消</ElButton>
              <ElButton onClick={conConfirm} type="primary">确定</ElButton>
            </div>
        }}
      </ElDialog>
    }
  }
})
let vnode
export function $tableDialog$(option) {
  if(!vnode) {
    const el = document.createElement("div")
    vnode = createVNode(TableDialogComponent,{option})
    render(vnode,el)
    document.body.appendChild(el)
  }
  const exposed = vnode.component.exposed
  exposed.updateOption(option)
  return exposed
}