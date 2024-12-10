function check(
  imageWidth: number,
  imageHeight: number,
  image: string[],
  patternWidth: number,
  patternHeight: number,
  pattern: string[],
) {
  for (let offsetX = 0; offsetX <= imageWidth - patternWidth; offsetX++) {
    for (let offsetY = 0; offsetY <= imageHeight - patternHeight; offsetY++) {
      let found = true;

      patternLoop: for (let col = 0; col < patternWidth; col++) {
        for (let row = 0; row < patternHeight; row++) {
          if (pattern[row][col] !== image[offsetY + row][offsetX + col]) {
            found = false;
            break patternLoop;
          }
        }
      }

      if (found) {
        return [offsetX, offsetY];
      }
    }
  }

  return [-1, -1];
}

function checkAlt(
  imageWidth: number,
  imageHeight: number,
  image: string[],
  patternWidth: number,
  patternHeight: number,
  pattern: string[],
) {
  for (let row = 0; row < imageHeight; row++) {
    const patternIndex = image[row].indexOf(pattern[0]);

    if (patternIndex > -1) {
      const found = pattern.every(
        (patternRow, patternRowIndex) =>
          image[row + patternRowIndex].indexOf(patternRow) === patternIndex,
      );

      if (found) {
        return [patternIndex, row];
      }
    }
  }

  return [-1, -1];
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('check()', () => {
    it('should return the pattern position', () => {
      const image = ['01', '12'];
      const pattern = ['2'];

      const patternPos = check(2, 2, image, 1, 1, pattern);

      expect(patternPos).toEqual([1, 1]);
    });

    it('should return the pattern position with the smallest [x, y]', () => {
      const image = ['0110', '0100', '1100'];
      const pattern = ['11'];

      const patternPos = check(4, 3, image, 2, 1, pattern);

      expect(patternPos).toEqual([0, 2]);
    });
  });

  describe('checkAlt()', () => {
    it('should return the pattern position', () => {
      const image = ['01', '12'];
      const pattern = ['2'];

      const patternPos = checkAlt(2, 2, image, 1, 1, pattern);

      expect(patternPos).toEqual([1, 1]);
    });

    it('should return the pattern position with the smallest [x, y]', () => {
      const image = ['0110', '0100', '1100'];
      const pattern = ['11'];

      const patternPos = checkAlt(4, 3, image, 2, 1, pattern);

      expect(patternPos).toEqual([0, 2]);
    });
  });
}
