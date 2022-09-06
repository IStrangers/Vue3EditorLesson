import "./index.scss"
import { defineComponent, computed, inject, ref, onMounted} from "vue" 

export default defineComponent({
  props: {
    block: {
      type: Object,
      require: true
    }
  },
  setup(props) {

    const config = inject("config")
    const block = props.block
    const blockRef = ref(null)

    const blockStyle = computed(() => ({
      top: block.top,
      left: block.left,
      zIndex: block.zIndex
    }))

    onMounted(() => {
      if(block.alignCenter) {
        const { offsetWidth,offsetHeight } = blockRef.value
        block.top = `${parseFloat(block.top) - offsetHeight / 2}px`
        block.left = `${parseFloat(block.left) - offsetWidth / 2}px`
        block.alignCenter = false
      }
    })

    return () => {
      const component = config.componentMap[block.key]
      const RenderComponent = component.render()
      return <div ref={blockRef} class="editor-block" style={blockStyle.value}>
        {
          RenderComponent
        }
      </div>
    }
  }
})