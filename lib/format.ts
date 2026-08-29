export function formatArea(value: number) {
  return `${new Intl.NumberFormat("en-IN").format(value)} sq ft`;
}
