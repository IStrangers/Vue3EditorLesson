import "./index.scss"
import { defineComponent, computed, provide } from "vue" 
import EditorBlock from "../editor-block"

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
    config: {
      type: Object,
      require: true
    }
  },
  setup(props) {

    const config = props.config
    provide("config",config)

    const data = computed({
      get() {
        return props.modelValue
      }
    })

    const containerStyles = computed(() => ({
      width: data.value.container.width,
      height: data.value.container.height
    }))


    return () => 
      <div class="editor">
        <div class="editor-left">
          {
            config.componentList.map(component => (
              <div class="left-item">
                <span>{component.label}</span>
                <div>{component.preview()}</div>
              </div>
            ))
          }
        </div>
        <div class="editor-top">

        </div>
        <div class="editor-right">

        </div>
        <div class="editor-container">
          <div class="container-canvas">
            <div class="canvas-content" style={containerStyles.value}>
              {
                data.value.blocks.map(block => (
                  <EditorBlock block={block}></EditorBlock>
                ))
              }
            </div>
          </div>
        </div>
      </div>
  }
})