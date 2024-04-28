import { Graph, Shape } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Export } from '@antv/x6-plugin-export'

import './shape.js'

export default class FlowGraph {
  constructor(options) {
  }

  static graph = Graph
  static #stencil = Stencil

  // #region 初始化画布
  static init() {
    this.graph = new Graph({
      container: document.getElementById('graph-container'),
      background: { color: '#F2F7FA' },
      grid: true,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3
      },
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8
          }
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20,
          snap: true
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8
                }
              }
            },
            zIndex: 0
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        }
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF'
            }
          }
        },
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 3,
            attrs: {
              strokeWidth: 3,
              stroke: '#5F95FF'
            }
          }
        }
      }
    })
    this.#initPlugin()
    this.#initStencil()
    this.#initShape()
    this.#initEvent()
    this.#initKeyboard()

    return this.graph
  }

  static #initPlugin() {
    const { graph } = this
    // #region 使用插件
    graph
      .use(new Transform({
        resizing: true,
        rotating: true
      }))
      .use(new Selection({
        rubberband: true,
        showNodeSelectionBox: true
      }))
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History())
      .use(new MiniMap({
        container: document.getElementById('graph-minimap'),
        width: 200,
        height: 160,
        padding: 10
      }))
      .use(new Export())
  }

  // #region 初始化 stencil
  static #initStencil() {
    this.#stencil = new Stencil({
      title: '流程图',
      target: this.graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      collapsable: true,
      groups: [
        {
          title: '基础流程图',
          name: 'group1'
        }
        // {
        //   title: '系统设计图',
        //   name: 'group2',
        //   graphHeight: 250,
        //   layoutOptions: {
        //     rowHeight: 70
        //   }
        // }
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55
      }
    })
    document.getElementById('graph-stencil').appendChild(this.#stencil.container)
  }

  static #initShape() {
    const { graph } = this
    const r1 = graph.createNode({
      shape: 'custom-rect',
      label: '开始',
      attrs: {
        body: {
          rx: 20,
          ry: 26
        }
      }
    })
    const r2 = graph.createNode({
      shape: 'custom-rect',
      label: '过程'
    })
    const r3 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6
        }
      },
      label: '可选过程'
    })
    const r4 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20'
        }
      },
      label: '决策'
    })
    const r5 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20'
        }
      },
      label: '数据'
    })
    const r6 = graph.createNode({
      shape: 'custom-circle',
      label: '连接'
    })
    this.#stencil.load([r1, r2, r3, r4, r5, r6], 'group1')
  }

  // #region 快捷键与事件
  static #initKeyboard() {
    const { graph } = this
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })

// undo redo
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo()
      }
      return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo()
      }
      return false
    })

// select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes()
      if (nodes) {
        graph.select(nodes)
      }
    })

// delete
    graph.bindKey(['backspace', 'delete'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })

// zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
      const zoom = graph.zoom()
      if (zoom < 1.5) {
        graph.zoom(0.1)
      }
    })
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
      const zoom = graph.zoom()
      if (zoom > 0.5) {
        graph.zoom(-0.1)
      }
    })

  }

  // 控制连接桩显示/隐藏
  static #initEvent() {
    const { graph } = this
    // 控制连接桩显示/隐藏
    const showPorts = (ports, show) => {
      for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    }
    graph.on('node:mouseenter', () => {
      const container = document.getElementById('graph-container')
      const ports = container.querySelectorAll(
        '.x6-port-body'
      )
      showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
      const container = document.getElementById('graph-container')
      const ports = container.querySelectorAll(
        '.x6-port-body'
      )
      showPorts(ports, false)
    })
  }
}
