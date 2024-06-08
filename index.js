import { getDistance, getIntersection, isPointInside } from "./utils.js";

const sin30 = Math.sin(Math.PI / 6);
const cos30 = Math.cos(Math.PI / 6);

/**
 * Create a Maxwell Triangle
 */
class MaxwellTriangle {
  constructor(size) {
    this.size = size;
    this.halfEdgeSize = size / 2;

    this.medianHeight = size * Math.sin(Math.PI / 3);
    // CCW: top -> left -> right
    this.vertices = [
      [size / 2, size - this.medianHeight],
      [0, size],
      [size, size],
    ];
    this.center = [
      (this.vertices[0][0] + this.vertices[1][0] + this.vertices[2][0]) / 3,
      (this.vertices[0][1] + this.vertices[1][1] + this.vertices[2][1]) / 3,
    ];
    this.centerToEdgeSize = this.size - this.center[1];

    const midEdgeY = size - (size / 2) * Math.sin(Math.PI / 3);

    this.mids = [
      [size - this.halfEdgeSize / 2, midEdgeY], // top <-> right
      [this.halfEdgeSize / 2, midEdgeY], // top <-> left
      [this.halfEdgeSize, this.size], // left <-> right
    ];

    this.areas = [
      [this.vertices[0], this.mids[0], this.center, this.mids[1]],
      [this.vertices[1], this.mids[1], this.center, this.mids[2]],
      [this.vertices[2], this.mids[2], this.center, this.mids[0]],
    ];
  }

  /**
   * Get a [r, g, b] value at x/y position in the given size
   * @param {number} x
   * @param {number} y
   * @returns {number[]}
   */
  getValue(x, y) {
    const point = [x, y];
    const currentArea = this.areas.findIndex((area) =>
      isPointInside(area, point),
    );

    if (currentArea === -1) return null;

    const [v0, v1, v2] = this.vertices;

    let lineU, lineU0, lineV, lineV0;

    if (currentArea === 0) {
      lineU = [v1, this.center, this.mids[1]];
      lineU0 = [v1, v0, this.mids[0]];
      lineV = [v2, this.center, this.mids[0]];
      lineV0 = [v2, v0, this.mids[1]];
    } else if (currentArea === 1) {
      lineU = [v2, this.center, this.mids[2]];
      lineU0 = [v2, v1, this.mids[1]];
      lineV = [v0, this.center, this.mids[1]];
      lineV0 = [v0, v1, this.mids[2]];
    } else if (currentArea === 2) {
      lineU = [v0, this.center, this.mids[0]];
      lineU0 = [v0, v2, this.mids[2]];
      lineV = [v1, this.center, this.mids[2]];
      lineV0 = [v1, v2, this.mids[0]];
    }

    lineU = getIntersection(point, ...lineU);
    lineU0 = getIntersection(point, ...lineU0);
    lineV = getIntersection(point, ...lineV);
    lineV0 = getIntersection(point, ...lineV0);

    const value = [];

    value[currentArea] = 1;
    value[(currentArea + 1) % 3] =
      getDistance(...point, ...lineU0) / getDistance(...lineU, ...lineU0);
    value[(currentArea + 2) % 3] =
      getDistance(...point, ...lineV0) / getDistance(...lineV, ...lineV0);

    return value;
  }

  /**
   * Get a x/y position from r, g, b values
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {number[]}
   */
  getPoint(r, g, b) {
    const components = [r, g, b];
    const m = Math.max(...components);
    const maxComponent = components.findIndex((c) => c === m);

    const [v0, v1, v2] = this.vertices;
    const [cx, cy] = this.center;

    const u = 1 - components[(maxComponent + 1) % 3];
    const distUA = this.halfEdgeSize * (1 - u);
    const distUB = this.centerToEdgeSize * u;

    const v = 1 - components[(maxComponent + 2) % 3];
    const distVA = this.halfEdgeSize * (1 - v);
    const distVB = this.centerToEdgeSize * v;

    let p1, p2, p3, p4;

    if (maxComponent === 0) {
      p1 = [v0[0] - distUA * sin30, v0[1] + distUA * cos30];
      p2 = [cx + distUB * cos30, cy - distUB * sin30];
      p3 = [v0[0] + distVA * sin30, v0[1] + distVA * cos30];
      p4 = [cx - distVB * cos30, cy - distVB * sin30];
    } else if (maxComponent === 1) {
      p1 = [v1[0] + distVA * sin30, v1[1] - distVA * cos30];
      p2 = [cx, cy + distVB];

      const dist = this.size * components[(maxComponent + 1) % 3];
      p3 = [v1[0] + dist * sin30, v1[1]];
      p4 = [cx - distUB * cos30, cy - distUB * sin30];
    } else if (maxComponent === 2) {
      p1 = [v2[0] - distVA, v2[1]];
      p2 = [cx + distVB * cos30, cy - distVB * sin30];
      p3 = [v2[0] - distUA * sin30, v2[1] - distUA * cos30];
      p4 = [cx, cy + distUB];
    }

    return getIntersection(p1, p2, p3, p4);
  }
}

export default MaxwellTriangle;
