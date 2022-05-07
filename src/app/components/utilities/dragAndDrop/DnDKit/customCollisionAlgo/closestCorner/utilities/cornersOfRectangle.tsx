export default function cornersOfRectangle(
    rect: any,
    left = rect.offsetLeft,
    top = rect.offsetTop
  ) {
    return [
      {
        x: left,
        y: top,
      },
      {
        x: left + rect.width,
        y: top,
      },
      {
        x: left,
        y: top + rect.height,
      },
      {
        x: left + rect.width,
        y: top + rect.height,
      },
    ];
  }
  