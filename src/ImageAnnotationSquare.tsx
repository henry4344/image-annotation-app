import { useEffect, useRef, useState } from "react";

interface SquarePoint {
  startX: number;
  startY: number;
}

interface Square {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function ImageAnnotationSquare() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [squareStart, setSquareStart] = useState<SquarePoint>();
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (canvas && image) {
      canvas.width = image.width;
      canvas.height = image.height;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw each rectangle in the list
      squares.forEach((square) => {
        context.strokeRect(square.x, square.y, square.height, square.width);
      });
    }
  }, [squares]);

  const startSquare = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing == true) return;
    const { offsetX, offsetY } = e.nativeEvent;

    setSquareStart({ startX: offsetX, startY: offsetY });
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (!squareStart) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas?.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    squares.forEach((square) => {
      context.strokeRect(square.x, square.y, square.height, square.width);
    });

    const { offsetX, offsetY } = e.nativeEvent;
    const { startX, startY } = squareStart;

    const width = offsetY - startY;
    const height = offsetX - startX;

    context.strokeRect(startX, startY, height, width);
  };

  const endSquare = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing == false) return;

    setIsDrawing(false);
    if (!squareStart) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const { startX, startY } = squareStart;

    const width = offsetY - startY;
    const height = offsetX - startX;

    setSquares((prevState) => [
      ...prevState,
      { x: startX, y: startY, width, height },
    ]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas?.getContext("2d");

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      setSquares([]);
    }
  };

  const undo = () => {
    if (squares.length == 0) return;

    const undoSquare = squares.slice(0, -1);
    setSquares(undoSquare);
  };

  return (
    <div className="image-annotation">
      <div className="container">
        <img ref={imageRef} src="./airport.jpg" alt="Airport" />
        <canvas
          ref={canvasRef}
          onMouseDown={startSquare}
          onMouseMove={draw}
          onMouseUp={endSquare}
          onMouseOut={endSquare}
        />
      </div>
      <div className="buttons">
        <button className="undo" onClick={undo}>
          Undo
        </button>
        <button onClick={clearCanvas}>Clear</button>
      </div>
    </div>
  );
}
