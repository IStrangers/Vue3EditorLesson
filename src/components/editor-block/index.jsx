import "./index.scss"
import { defineComponent, computed, inject, ref, onMounted} from "vue" 

export default defineComponent({
  name: "BlockComponent",
  props: {
    block: {
      type: Object,
      require: true
    }
  },
  setup(props) {

    const config = inject("config")
    const blockRef = ref(null)
    const blockStyle = computed(() => ({
      top: props.block.top,
      left: props.block.left,
      zIndex: props.block.zIndex
    }))

    onMounted(() => {
      const { offsetWidth,offsetHeight } = blockRef.value
      if(props.block.alignCenter) {
        props.block.top = `${parseFloat(props.block.top) - offsetHeight / 2}px`
        props.block.left = `${parseFloat(props.block.left) - offsetWidth / 2}px`
        props.block.alignCenter = false
      }
      props.block.width = `${offsetWidth}px`
      props.block.height = `${offsetHeight}px`
    })

    return () => {
      const component = config.componentMap[props.block.key]
      const RenderComponent = component.render()
      return <div ref={blockRef} class="editor-block" style={blockStyle.value}>
        {
          RenderComponent
        }
      </div>
    }
  }
})