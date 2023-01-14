import { nestPosition } from '../constants';

const distanceFromNest = (positionX: number, positionY: number): number => {
  const distanceInMm = Math.sqrt(
    Math.pow(positionX - nestPosition.x, 2) +
      Math.pow(positionY - nestPosition.y, 2)
  );
  const distanceInM = Math.round(distanceInMm / 100) / 10;
  return distanceInM;
};

export default distanceFromNest;
