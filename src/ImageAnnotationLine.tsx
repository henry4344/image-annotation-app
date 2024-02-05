import { useEffect, useRef, useState } from "react";

export default function ImageAnnotationLine() {
  //   const [annotations, setAnnotations] = useState<HTMLCanvasElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    console.log(image?.width);
    console.log(image?.height);

    if (canvas && image) {
      canvas.width = image.width;
      canvas.height = image.height;
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");

    context?.beginPath();
    context?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  //   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //     if (!isDrawingRef.current) return;

  //     const canvas = canvasRef.current;
  //     const context = canvas?.getContext("2d");

  //     if (context) {
  //       context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //       context.stroke();
  //     }
  //   };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");

    const { offsetX, offsetY } = e.nativeEvent;
    context?.lineTo(offsetX, offsetY);
    context?.stroke();
  };

  const stopDrawing = () => {
    // isDrawingRef.current = false;
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
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>
      <div className="buttons">
        <button onClick={clearCanvas}>Clear Annotation</button>
      </div>
    </div>
  );
}
