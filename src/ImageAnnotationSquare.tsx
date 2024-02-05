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
  const [square, setSquare] = useState<Square>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (canvas && image) {
      canvas.width = image.width;
      canvas.height = image.height;
    }
  }, []);

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

    const { offsetX, offsetY } = e.nativeEvent;
    const { startX, startY } = squareStart;

    const width = offsetY - startY;
    const height = offsetX - startX;

    context.strokeRect(startX, startY, height, width);
  };

  const endSquare = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing == false) return;
    if (!squareStart) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const { startX, startY } = squareStart;

    const width = startY - offsetY;
    const height = startX - offsetX;

    setSquare({ x: startX, y: startY, width, height });
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas?.getContext("2d");

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
    }
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
        <button onClick={clearCanvas}>Clear Annotation</button>
      </div>
    </div>
  );
}
