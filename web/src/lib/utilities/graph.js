// parse the steps object into an array of chains
export function getChains (steps) {
  const stepGraph = [], available = {}
  for (const a in steps) available[a] = 1
  function getChain (currStep) {
    let chain = []
    while (currStep) {
      if (!available[currStep]) break
      chain.push(currStep)
      delete available[currStep]
      currStep = steps[currStep].next
    }
    return chain
  }
  stepGraph.push(getChain('start'))
  while (Object.keys(available).length) {
    let maxStep, maxCot = -1
    for (const a in available) {
      const visited = {}
      let currStep = a, cot = 0
      while (currStep) {
        if (visited[currStep] || !available[currStep]) break
        cot++
        visited[currStep] = 1
        currStep = steps[currStep].next
      }
      if (cot > maxCot) {
        maxStep = a
        maxCot = cot
      }
    }
    stepGraph.push(getChain(maxStep))
  }
  return stepGraph
}