import { distanceBetween } from "./index";
export default function calculateDistances(
  positionArr: any,
  entryCorners: any
) {
  return positionArr.reduce((accumulator: any, corner: any, index: number) => {
    return accumulator + distanceBetween(entryCorners[index], corner);
  }, 0);
}
