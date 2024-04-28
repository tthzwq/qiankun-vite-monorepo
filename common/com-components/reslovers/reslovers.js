const directives = new Set()

function ComComponentsResolver() {
  return [
    {
      type: 'component',
      resolve: async (name) => {
        if (!name.match(/^Com[A-Z]/)) return
        return {
          name,
          from: "com-components"
        }
      }
    },
    {
      type: 'directive',
      resolve: async (name) => {
        if (!name.match(/^Com[A-Z]/)) return
        if (!directives.has(name)) return
        return {
          name,
          from: "com-components"
        }
      }
    }
  ]
}

module.exports = {
  ComComponentsResolver
}