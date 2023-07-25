import colors from './colors';
import orderBy from "lodash-es/orderBy"
import rgbToHsl from './rgbToHsl';

type TempType = {
  rDiff: number,
  gDiff: number,
  bDiff: number,
  key: string,
  average: number,
  distance: number,
  color: [number, number, number]
}

export default function calculateColorGroup(color: [number, number, number]) {
  // const hydratedColors: TempType[] = Object.keys(colors).map((key) => {
  //   const rDiff = Math.abs(colors[key][0] - color[0]);
  //   const gDiff = Math.abs(colors[key][1] - color[1]);
  //   const bDiff = Math.abs(colors[key][2] - color[2]);

  //   return {
  //     rDiff,
  //     gDiff,
  //     bDiff,
  //     distance: Math.sqrt(Math.pow(rDiff, 2) + Math.pow(gDiff, 2) + Math.pow(bDiff, 2)),
  //     average: (rDiff + gDiff + bDiff) / 3,
  //     key,
  //     color: colors[key],
  //   };
  // });

  // let order: [string, string, string] = ["rDiff", "gDiff", "bDiff"]

  // if (color[0] >= color[1] && color[0] >= color[2]) {
  //   if (color[1] >= color[2]) {
  //     order = ["rDiff", "gDiff", "bDiff"]
  //   } else {
  //     order = ["rDiff", "bDiff", "gDiff"]
  //   }
  // } else if (color[1] >= color[0] && color[1] >= color[2]) {
  //   if (color[0] >= color[2]) {
  //     order = ["gDiff", "rDiff", "bDiff"]
  //   } else {
  //     order = ["gDiff", "bDiff", "rDiff"]
  //   }
  // } else {
  //   if (color[0] >= color[1]) {
  //     order = ["bDiff", "rDiff", "gDiff"]
  //   } else {
  //     order = ["bDiff", "gDiff", "rDiff"]
  //   }
  // }

  // const calculated = orderBy(hydratedColors, ["distance"], ["asc"])

  // return {
  //   color: calculated[0].color,
  //   name: calculated[0].key
  // }

  const colorHsl = rgbToHsl(color[0], color[1], color[2]);

  const hydratedColors = Object.keys(colors).map((key) => {
    const hslClassificationColor = rgbToHsl(colors[key][0], colors[key][1], colors[key][2]);

    const hDiff = Math.abs(hslClassificationColor[0] - colorHsl[0]);
    const sDiff = Math.abs(hslClassificationColor[1] - colorHsl[1]);
    const lDiff = Math.abs(hslClassificationColor[2] - colorHsl[2]);

    return {
      hDiff,
      sDiff,
      lDiff,
      difference: Math.sqrt(Math.pow(hDiff, 2) + Math.pow(sDiff, 2) + Math.pow(lDiff, 2)),
      color: hslClassificationColor,
      key,
    }
  })

  const calculated = orderBy(hydratedColors, ["hDiff", "difference", "sDiff", "lDiff"], ["asc", "asc", "asc", "asc"])

  return {
    color: calculated[0].color,
    name: calculated[0].key
  }
}

