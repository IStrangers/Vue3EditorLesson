import "./index.scss"
import { defineComponent, computed, provide, ref } from "vue" 
import EditorBlock from "../editor-block"
import deepcopy from "deepcopy"
import { useMenuDragger } from "./use-menu-dragger"
import { useFocus } from "./use-focus"
import { useBlockDragger } from "./use-block-Dragger"

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
  emits: [
    "update:modelValue"
  ],
  setup(props,ctx) {

    const config = props.config
    provide("config",config)

    const data = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit("update:modelValue",deepcopy(newValue))
      }
    })

    const containerStyles = computed(() => ({
      width: data.value.container.width,
      height: data.value.container.height
    }))

    const containerRef = ref(null)
    const { dragstart,dragend } = useMenuDragger(containerRef,data)
    const { focusData,lastSelectBlock,blockMousedown,containerMousedown } = useFocus(data,(event) => {
      mousedown(event)
    })
    const { markline,mousedown } = useBlockDragger(data,focusData,lastSelectBlock)

    return () => 
      <div class="editor">
        <div class="editor-left">
          {
            config.componentList.map(component => (
              <div 
                class="left-item"
                draggable
                onDragstart={event => dragstart(event,component)}
                onDragend={event => dragend(event)}
              >
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
            <div 
              ref={containerRef} 
              class="canvas-content" 
              style={containerStyles.value}
              onMousedown={event => containerMousedown(event)}
            >
              {
                data.value.blocks.map((block,index) => (
                  <EditorBlock 
                    class={block.focus ? "block-focus" : ''}
                    block={block}
                    onMousedown={event => blockMousedown(event,block,index)}
                  ></EditorBlock>
                ))
              }
              {
                markline.x !== null && <div class="line-x" style={{left: `${markline.x}px`}}></div>
              }
              {
                markline.y !== null && <div class="line-y" style={{top: `${markline.y}px`}}></div>
              }
            </div>
          </div>
        </div>
      </div>
  }
})