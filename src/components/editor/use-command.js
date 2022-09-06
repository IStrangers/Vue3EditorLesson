import deepcopy from "deepcopy"
import { onUnmounted } from "vue"
import { events } from "./events"

export function useCommand(data) {

  const state = {
    current: -1,
    queue: [],
    commands: {},
    commandArray: [],
    destroyArray: [],
  }

  const registry = (command) => {
    const { commandArray,commands,queue } = state
    commandArray.push(command)
    commands[command.name] = () => {
      const { redo,undo } = command.execute()
      redo()
      if(!command.pushQueue) {
        return
      }
      if(queue.length > 0) {
        queue.slice(0,state.current + 1)
      }
      queue.push({ redo,undo });
      state.current++
    }
  }

  registry({
    name: "redo",
    keyboard: "ctrl+y",
    execute() {
      return {
        redo() {
          const { current,queue } = state
          const operation = queue[current + 1]
          if(!operation) return
          operation.redo && operation.redo()
          state.current++
        }
      }
    }
  })
  registry({
    name: "undo",
    keyboard: "ctrl+z",
    execute() {
      return {
        redo() {
          const { current,queue } = state
          if(current === -1) return
          const operation = queue[current]
          if(!operation) return
          operation.undo && operation.undo()
          state.current--
        }
      }
    }
  })
  registry({
    name: "componentDrag",
    pushQueue: true,
    init() {
      this.before = null
      const start = () => this.before = deepcopy(data.value.blocks)
      const end = () => state.commands.componentDrag()
      events.on("componentDragStart",start)
      events.on("componentDragEnd",end)
      return () => {
        events.off("componentDragStart",start)
        events.off("componentDragEnd",end)
      }
    },
    execute() {
      const before = this.before
      const after = data.value.blocks
      return {
        redo() {
          data.value = { ...data.value,blocks: after }
        },
        undo() {
          data.value = { ...data.value,blocks: before }
        }
      }
    }
  })

  const keyboardEvent = (() => {
    const keyCodes = {
      89: "y",
      90: "z"
    }
    const onKeyDow = (event) => {
      const { ctrlKey,keyCode } = event
      const keyStringArray = []
      if(ctrlKey) keyStringArray.push("ctrl")
      keyStringArray.push(keyCodes[keyCode])
      const keyString = keyStringArray.join("+")
      state.commandArray.forEach(({keyboard,name}) => {
        if(!keyboard) return
        if(keyboard === keyString) {
          state.commands[name]()
          event.preventDefault()
        }
      })
    }
    return () => {
      window.addEventListener("keydown",onKeyDow)
      return () => {
        window.removeEventListener("keydown",onKeyDow)
      }
    }
  })()
  state.destroyArray.push(keyboardEvent())
  state.commandArray.forEach(command => command.init && state.destroyArray.push(command.init()))
  
  onUnmounted(() => {
    state.destroyArray.forEach(fn => fn && fn())
  })
  return state
}