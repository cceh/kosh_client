export default function flatten(object) {
  return [...new Set(object.flat())];
}
