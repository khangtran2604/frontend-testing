import React, { useState, useEffect, useRef } from 'react';
import { generateSquares } from './helpers';

const App = () => {
  const underSquareRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const setUnderSquare = (e) => {
    underSquareRef.current = e.target;
  };

  const onDragEnd = (e) => {
    const [underRowIndex, underColIndex] = underSquareRef.current
      .getAttribute('data-testid')
      .split('#');
    const [elementRowIndex, elementColIndex] = e.target
      .getAttribute('data-testid')
      .split('#');

    const underSquare = {
      id: `${underRowIndex}#${underColIndex}`,
      color: rows[elementRowIndex][elementColIndex].color,
    };
    const elementSquare = {
      id: `${elementRowIndex}#${elementColIndex}`,
      color: rows[underRowIndex][underColIndex].color,
    };
    rows[underRowIndex][underColIndex] = underSquare;
    rows[elementRowIndex][elementColIndex] = elementSquare;

    setRows(() => [...rows]);
  };

  useEffect(() => {
    const newRows = generateSquares(8, 8);
    setRows(newRows);
    document.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}
      data-testid='boardContainer'
    >
      {rows.length === 0 ? (
        <div>Something went wrong !</div>
      ) : (
        rows.map((rowItems, ind) => {
          return (
            <div
              key={ind}
              style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}
            >
              {rowItems.map(({ id, color }) => {
                return (
                  <div
                    className='squareElement'
                    key={id}
                    style={{
                      background: color,
                      width: 80,
                      height: 80,
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                    draggable
                    onDragEnter={setUnderSquare}
                    onDragEnd={onDragEnd}
                    data-testid={id}
                    id={id.replace('#', '_')}
                  />
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

export default App;
