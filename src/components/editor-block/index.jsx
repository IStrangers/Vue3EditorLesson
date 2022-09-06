import "./index.scss"
import { defineComponent,computed, inject } from "vue" 

export default defineComponent({
  props: {
    block: {
      type: Object,
      require: true
    }
  },
  setup(props) {

    const config = inject("config")

    const blockStyle = computed(() => ({
      top: props.block.top,
      left: props.block.left,
      zIndex: props.block.zIndex
    }))

    return () => {
      const component = config.componentMap[props.block.key]
      const RenderComponent = component.render()
      return <div class="editor-block" style={blockStyle.value}>
        {
          RenderComponent
        }
      </div>
    }
  }
})