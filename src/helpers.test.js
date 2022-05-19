import {
  generateColor,
  generateSquares,
  isElement,
  getCoords,
} from './helpers';

describe('generateColor function', () => {
  it('Should return a string with prefix #', () => {
    const color = generateColor();
    expect(color).not.toBeNull();
    expect(typeof color).toBe('string');
    expect(color.indexOf('#')).toBe(0);
  });
});

describe('generateSquares function', () => {
  describe('validation', () => {
    it('Should throw error "rowNumber is invalid !" if rowNumber is null !', () => {
      expect(() => generateSquares(null)).toThrowError(
        'rowNumber is invalid !'
      );
    });
    it('Should throw error "rowNumber is invalid !" if rowNumber is undefined !', () => {
      expect(() => generateSquares(undefined)).toThrowError(
        'rowNumber is invalid !'
      );
    });
    it('Should throw error "rowNumber is invalid !" if rowNumber is string !', () => {
      expect(() => generateSquares('abc')).toThrowError(
        'rowNumber is invalid !'
      );
    });
    it('Should throw error "rowNumber is invalid !" if rowNumber is lower than 1 !', () => {
      expect(() => generateSquares(0)).toThrowError('rowNumber is invalid !');
    });
    it('Should throw error "colNumber is invalid !" if colNumber is null !', () => {
      expect(() => generateSquares(1, null)).toThrowError(
        'colNumber is invalid !'
      );
    });
    it('Should throw error "colNumber is invalid !" if colNumber is undefined !', () => {
      expect(() => generateSquares(1, undefined)).toThrowError(
        'colNumber is invalid !'
      );
    });
    it('Should throw error "colNumber is invalid !" if colNumber is string !', () => {
      expect(() => generateSquares(1, 'abc')).toThrowError(
        'colNumber is invalid !'
      );
    });
    it('Should throw error "colNumber is invalid !" if colNumber is lower than 1 !', () => {
      expect(() => generateSquares(1, 0)).toThrowError(
        'colNumber is invalid !'
      );
    });
  });

  describe('function', () => {
    it('Should generate correct number of element', () => {
      const rowNumber = 4;
      const colNumber = 5;
      const result = generateSquares(4, 5);

      expect(
        result.reduce((rs, items) => {
          rs += items.length;
          return rs;
        }, 0)
      ).toBe(rowNumber * colNumber);
    });
    it('Make sure all square item has correct structure', () => {
      const result = generateSquares(3, 2);

      expect(
        result.every((items) => {
          return items.every((square) => square && square.id && square.color);
        })
      ).toBeTruthy();
    });
  });
});

describe('isElement function', () => {
  it('Should return false if input param is not an Element', () => {
    expect(isElement()).toBeFalsy();
    expect(isElement(2)).toBeFalsy();
    expect(isElement('')).toBeFalsy();
    expect(isElement('a')).toBeFalsy();
    expect(isElement([])).toBeFalsy();
    expect(isElement([1, 2])).toBeFalsy();
    expect(isElement({})).toBeFalsy();
    expect(isElement({ name: 'Khang' })).toBeFalsy();
  });

  it('Should return true if input param is an Element or Document', () => {
    const divElement = document.createElement('div');

    expect(isElement(divElement)).toBeTruthy();
  });
});

describe('getCoords function', () => {
  it('Should return the parameter value if it is not an Element or Document', () => {
    expect(getCoords()).toBeUndefined();
    expect(getCoords(2)).toBe(2);
    expect(getCoords('')).toBe('');
    expect(getCoords('a')).toBe('a');
    expect(getCoords([])).toStrictEqual([]);
    expect(getCoords([1, 2])).toStrictEqual([1, 2]);
    expect(getCoords({})).toStrictEqual({});
    expect(getCoords({ name: 'Khang' })).toStrictEqual({ name: 'Khang' });
  });

  it('Should return coordinate object if value of parameter is valid !', () => {
    const divElement = document.createElement('div');

    expect(getCoords(divElement)).toHaveProperty('x');
    expect(getCoords(divElement)).toHaveProperty('y');
  });
});
