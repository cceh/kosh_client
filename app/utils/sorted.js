export default function sorted(array) {
  return array.sort((a, b) => a.localeCompare(b));
}
