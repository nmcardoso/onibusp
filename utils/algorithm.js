export const invertObject = obj => Object.fromEntries(
  Object.entries(obj).map(a => a.reverse())
)