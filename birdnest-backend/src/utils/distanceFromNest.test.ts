import distanceFromNest from './distanceFromNest';

describe('distanceFromNest', () => {
  it('should calculate and round the distance correctly in meters', () => {
    const result = distanceFromNest(200000, 150000);
    expect(result).toBe(111.8);
  });

  it('should handle positions outside the area correctly', () => {
    const result = distanceFromNest(-10000, 900000);
    expect(result).toBe(700.1);
  });

  it("should handle the nest's position correctly", () => {
    const result = distanceFromNest(250000, 250000);
    expect(result).toBe(0);
  });
});

export default 0;
