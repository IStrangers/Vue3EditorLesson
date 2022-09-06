import { computed } from "vue" 

export function useFocus(data,callback) {

  const focusData = computed(() => {
    const focus = []
    const unfocus = []
    data.value.blocks.forEach(block => {
      if(block.focus) {
        focus.push(block)
      } else {
        unfocus.push(block)
      }
    })
    return {
      focus,
      unfocus
    }
  })
  const clearBlockFocus = () => {
    data.value.blocks.forEach(block => block.focus = false)
  }
  const blockMousedown = (event,block) => {
    event.preventDefault()
    event.stopPropagation()
    if(!block.focus) {
      !event.shiftKey && clearBlockFocus()
      block.focus = true
    } else {
      block.focus = false
    }
    callback && callback(event)
  }
  const containerMousedown = () => {
    clearBlockFocus()
  }
  return {
    focusData,
    blockMousedown,
    containerMousedown
  }
}