import React, { useCallback, useRef, useState } from 'react'


export default function Follow() {
  // 캔버스 참조 설정
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 그리기 상태 관리
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  // 브러시 색상 관리
  const [brushColor, setBrushColor] = useState<string>('#000');
  // 브러시 모양 관리
  const [brushShape, setBrushShape] = useState<CanvasLineCap>('round');
  // 브러시 사이즈 관리
  const [brushSize, setBrushSize] = useState<number>(5);
  // 모드 관리
  const [drawingMode, setDrawingMode] = useState<boolean>(true);

  //! 함수 정의
  // 그리기 시작할 때 함수
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY} = e.nativeEvent;
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  }, []);

  // 마우스 움직일 때 함수
  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const {offsetX, offsetY} = e.nativeEvent;
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      context.lineTo(offsetX, offsetY);
      context.strokeStyle = drawingMode ? brushColor : '#fff';
      context.lineWidth = brushSize;
      context.lineCap = brushShape;
      context.stroke();
    }
  }, [isDrawing, brushColor, brushShape, brushSize, drawingMode]);

  // 멈출 때 함수
  const stopDrawing = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      context.closePath();
      setIsDrawing(false);
    }
  }, []);

  // 그림 저장 함수
  const saveDrawing = useCallback(() => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');

      link.href = image;
      link.download = 'drawing.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  //***** 전체 지우기 모드 *****\\
  const fullErase = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }, []);
  //# clearRect는 HTML5 캔버스에서 특정 영역을 지우는 메서드다.
  //& 이 메서드는 지정된 사각형 영역을 지우고, 그 영역을 완전히 투명하게 만든다.
  //& 이때 x, y는 지울 사각형의 시작 좌표(즉, 여기선 왼쪽 위 모서리)
  //& width, height는 사각형의 너비와 높이
  //& 여기선 context.canvas.(width, height)이기에 캔버스의 전체 너비와 높이이다.

  return (
    <>
    {/* 캔버스 설정 */}
      <canvas 
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={800}
        height={600}
      />

    {/* 브러시 색상 */}
      <input 
        type="color"
        value={brushColor}
        onChange={(e) => setBrushColor(e.target.value)} 
      />

    {/* 브러시 크기 */}
      <input 
        type="range"
        min={1}
        max={10}
        value={brushSize}
        onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} 
      />

    {/* 브러시 모양 */}
      <select
        value={brushShape}
        onChange={(e) => setBrushShape(e.target.value as CanvasLineCap)}
      >
        <option value="round">round</option>
        <option value="squar">squar</option>
      </select>

    {/* 모드 토글 */}
      <button
        onClick={() => setDrawingMode(!drawingMode)}
      >
        {drawingMode ? 'erase' : 'draw'}
      </button>

    {/* 그림 저장 */}
      <button
        onClick={saveDrawing}
      >
        그림 저장
      </button>

    {/*********  전체 지우기 *********/}
      <button
        onClick={fullErase}
      >
        전체 지우기
      </button>
    </>
  )
}
