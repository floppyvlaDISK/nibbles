export default function removeDuplicatesFrom(anArray: Array<any>) {
  return [...(new Set(anArray))];
}