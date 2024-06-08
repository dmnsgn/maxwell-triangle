export const getDistance = (x, y, centerX, centerY) =>
  Math.sqrt((centerX - x) ** 2 + (centerY - y) ** 2);

export function getIntersection(p1, p2, p3, p4) {
  const dy1 = p2[1] - p1[1];
  const dy2 = p4[1] - p3[1];
  const dx1 = p2[0] - p1[0];
  const dx2 = p4[0] - p3[0];

  if (dx1 == 0) return [p1[0], p3[1]];
  const ix =
    ((p3[1] - p1[1]) * dx1 * dx2 + dy1 * dx2 * p1[0] - dy2 * dx1 * p3[0]) /
    (dy1 * dx2 - dy2 * dx1);
  return [ix, p1[1] + (dy1 / dx1) * (ix - p1[0])];
}

// http://paulbourke.net/geometry/polygonmesh/#insidepoly
export const angle2D = (x1, y1, x2, y2) => {
  let dtheta, theta1, theta2;

  theta1 = Math.atan2(y1, x1);
  theta2 = Math.atan2(y2, x2);
  dtheta = theta2 - theta1;
  while (dtheta > Math.PI) dtheta -= Math.PI * 2;
  while (dtheta < -Math.PI) dtheta += Math.PI * 2;

  return dtheta;
};

export const isPointInside = (polygon, p) => {
  let angle = 0;

  for (let i = 0; i < polygon.length; i++) {
    angle += angle2D(
      polygon[i][0] - p[0],
      polygon[i][1] - p[1],
      polygon[(i + 1) % polygon.length][0] - p[0],
      polygon[(i + 1) % polygon.length][1] - p[1],
    );
  }

  return !(Math.abs(angle) < Math.PI);
};
