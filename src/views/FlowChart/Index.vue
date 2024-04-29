<script setup>
import FlowGraph from '@/views/FlowChart/Graph/index.js'

defineOptions({name: 'FlowChart'})

const tools = (graph) => {
  graph.on('node:click', ({cell, node}) => {
  });
  graph.on('node:dblclick', ({cell, node, e}) => {
  })
}
const inInit = () => {
  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth,
      height: document.body.offsetHeight - 1,
    };
  };

  nextTick(() => {
    const graph = FlowGraph.init();

    // init window hook
    window.__x6_instances__ = []
    window.__x6_instances__.push(graph)

    tools(graph)
    const resizeFn = () => {
      const {width, height} = getContainerSize();
      graph.resize(width, height);
    };
    resizeFn();
    window.addEventListener("resize", resizeFn);
    return () => {
      window.removeEventListener("resize", resizeFn);
    };
  });
}

onMounted(() => {
  inInit()
})
</script>

<template>
  <div class="flow-chart">
    <div class="container" id="container">
      <div id="graph-stencil"></div>
      <div id="graph-container"></div>
      <div id="graph-minimap" class="minimap"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./style/index.scss";

.flow-chart {
  width: 100%;
  height: 100%;
}
</style>
