
import { distanceBetween } from "./index";
export default function calculateDistances(positionArr, entryCorners) { 
    return positionArr.reduce((accumulator, corner, index) => {
              return accumulator + distanceBetween(entryCorners[index], corner);
            }, 0)
  }