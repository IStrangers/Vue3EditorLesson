import "./index.scss"
import { defineComponent, inject } from "vue" 
import { ElButton, ElColorPicker, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from "element-plus"

export default defineComponent({
  name: "EditorOperator",
  props: {
    block: {
      type: Object,
      require: true
    },
    data: {
      type: Object
    }
  },
  setup(props,ctx) {
    return () => {
      const config = inject("config")
      let content = []
      if(!props.block) {
        content.push(<>
          <ElFormItem label="容器宽度">
            <ElInput></ElInput>
          </ElFormItem>
          <ElFormItem label="容器高度">
            <ElInput></ElInput>
          </ElFormItem>
        </>)
      } else {
        const component = config.componentMap[props.block.key]
        if(component && component.props) {
          content.push(Object.entries(component.props).map(([propName,propConfig]) => {
            return <ElFormItem label={propConfig.label}>
              {
                {
                  input: () => <ElInput></ElInput>,
                  color: () => <ElColorPicker></ElColorPicker>,
                  select: () => <ElSelect>
                    {
                      propConfig.options.map(opt => {
                        return <ElOption label={opt.label} value={opt.value}></ElOption>
                      })
                    }
                  </ElSelect>
                }[propConfig.type]()
              }
            </ElFormItem>
          }))
        }
      }

      return <div class="editor-operator">
        <ElForm labelPosition="top">
          { content }
          <ElFormItem>
            <ElButton type="primary">保存</ElButton>
            <ElButton>重置</ElButton>
          </ElFormItem>
        </ElForm>
      </div>
    }
  }
})