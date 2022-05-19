export const generateColor = () => {
  const colorStr = Math.random().toString(16);
  return `#${colorStr.substring(colorStr.length, colorStr.length - 6)}`;
};

export const generateSquares = (rowNumber, colNumber) => {
  if (!rowNumber || isNaN(parseInt(rowNumber)) || parseInt(rowNumber) <= 0) {
    throw new Error('rowNumber is invalid !');
  }
  if (!colNumber || isNaN(parseInt(colNumber)) || parseInt(colNumber) <= 0) {
    throw new Error('colNumber is invalid !');
  }
  rowNumber = parseInt(rowNumber);
  colNumber = parseInt(colNumber);
  const newRows = [];
  for (let i = 0; i < rowNumber; i++) {
    const rowItems = [];
    for (let j = 0; j < colNumber; j++) {
      const squareId = `${i}#${j}`;
      rowItems.push({
        id: squareId,
        color: generateColor(),
      });
    }
    newRows.push(rowItems);
  }
  return newRows;
};

export const isElement = (obj) => {
  if (typeof obj !== 'object') {
    return false;
  }
  let prototypeStr, prototype;
  do {
    prototype = Object.getPrototypeOf(obj);
    // to work in iframe
    prototypeStr = Object.prototype.toString.call(prototype);
    // '[object Document]' is used to detect document
    if (prototypeStr === '[object Element]') {
      return true;
    }
    obj = prototype;
    // null is the terminal of object
  } while (prototype !== null);
  return false;
};

const _getElementClientCenter = (element) => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getCoords = (charlie) =>
  isElement(charlie) ? _getElementClientCenter(charlie) : charlie;
