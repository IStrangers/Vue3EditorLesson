import "./index.scss"
import { defineComponent, computed, provide, ref } from "vue" 
import EditorBlock from "../editor-block"
import deepcopy from "deepcopy"
import { useMenuDragger } from "./use-menu-dragger"
import { useFocus } from "./use-focus"
import { useBlockDragger } from "./use-block-Dragger"
import { useCommand } from "./use-command"
import { ElButton } from "element-plus"
import { $dropdown$ } from "../dropdown"
import EditorOperator from "../editor-operator"

export default defineComponent({
  name: "Editor",
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

    const previewRef = ref(false)
    const editorRef = ref(true)
    provide("config",props.config)

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
    const focusUse = useFocus(data,(event) => {
      mousedown(event)
    })
    const { focusData,lastSelectBlock,blockMousedown,containerMousedown } = focusUse
    const { markline,mousedown } = useBlockDragger(containerRef,focusData,lastSelectBlock)
    const command = useCommand(data,focusData)
    
    const onContextMenuBlock = (event,block) => {
      event.preventDefault()
      const dropdown = $dropdown$({
        el: event.target,
        render: () => {
          return props.config.dropdownMenuList.map(dropdownMenu => dropdownMenu({block,command}))
        }
      })
      dropdown.showDropdown()
    }

    return () => 
      !previewRef.value ?
      (
        <div class="editor">
          <div class="editor-left">
            {
              props.config.componentList.map(component => (
                <div 
                  class="component-item"
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
            {
              props.config.toolbarList.map(toolbar => {
                if(typeof toolbar === "function") {
                  toolbar = toolbar({editorRef,previewRef,focusUse})
                }
                const RenderToolbar = toolbar.render()
                return <div class="toolbar-item" onClick={toolbar.handler ? toolbar.handler : command.commands[toolbar.commandName]}>
                  {RenderToolbar}
                  <span>{toolbar.label}</span>
                </div>
              })
            }
          </div>
          <div class="editor-right">
            <EditorOperator block={lastSelectBlock.value} data={data.value}></EditorOperator>
          </div>
          <div class="editor-container">
            <div class="container-canvas">
              <div 
                ref={containerRef} 
                class="canvas-content" 
                style={containerStyles.value}
                onMousedown={event => containerMousedown(event)}
                onContextmenu={event => event.preventDefault()}
              >
                {
                  data.value.blocks.map((block,index) => {
                    return <EditorBlock 
                      class={block.focus ? "block-focus" : ''}
                      class={previewRef.value ? "block-preview" : ''}
                      block={block}
                      onMousedown={event => blockMousedown(event,block,index)}
                      onContextmenu={event => onContextMenuBlock(event,block)}
                    ></EditorBlock>
                  })
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
      )
      :
      (
        <div class="container-canvas-preview">
          <div 
            ref={containerRef} 
            class="canvas-content"
            style={containerStyles.value}
          >
            {
              data.value.blocks.map((block,index) => {
                return <EditorBlock 
                  class={previewRef.value ? "block-preview" : ''}
                  block={block}
                ></EditorBlock>
              })
            }
          </div>
          <div class="footer">
            <ElButton type="primary" onClick={() => previewRef.value=false}>返回</ElButton>
          </div>
        </div>
      )
  }
})