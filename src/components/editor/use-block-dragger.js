
export function useBlockDragger(focusData) {
  let dragState
  const mousedown = (event) => {
    dragState = {
      startX: event.clientX,
      startY: event.clientY,
      startPos: focusData.value.focus.map(({top,left}) => ({top,left}))
    }
    document.addEventListener("mousemove",mousemove)
    document.addEventListener("mouseup",mouseup)
  }
  const mousemove = (event) => {
    const { clientX,clientY } = event
    const durX = clientX - dragState.startX
    const durY = clientY - dragState.startY
    focusData.value.focus.map((block,index) => {
      block.top = `${parseFloat(dragState.startPos[index].top) + durY}px`
      block.left = `${parseFloat(dragState.startPos[index].left) + durX}px`
    })
  }
  const mouseup = (event) => {
    document.removeEventListener("mousemove",mousemove)
    document.removeEventListener("mouseup",mouseup)
  }

  return {
    mousedown,
  }
}