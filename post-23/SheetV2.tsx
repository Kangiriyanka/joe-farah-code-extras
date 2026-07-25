// Unbound dragging
import {useState, useRef} from "preact/hooks";

interface Sheet {    
  x: number;         
  y: number;        
  w: number;      
  h: number;       
  color: string;  
  opacity: number;   
}

interface DragData {
  startMouseX: number;
  startMouseY: number;
}

export default function SheetV2() {

  const [isDragging, setIsDragging] = useState(false);
  const [disableHighlight, setDisableHighlight] = useState(false)

  const [sheet, setSheet] = useState<Sheet>( 
    {
      x: 0,
      y: 0,
      w: 250,
      h: 150,
      color: "#3384ed",
      opacity: 1
    }
  );

  const dragData = useRef<DragData | null>(null);

  const handleMouseDown = (e: MouseEvent) => {

    {disableHighlight ? e.preventDefault() : ""}

    dragData.current = {
      startMouseX: e.clientX,
      startMouseY: e.clientY
    };

    setIsDragging(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    // We defined <DragData | null>, so we make sure it's not null before we access it.
    if (dragData.current) {

      const { startMouseX, startMouseY } = dragData.current;

      setSheet(prev => ({

        // The sheet's position moves by the delta of the mouse 
        ...prev,
        x: sheet.x + (e.clientX - startMouseX),
        y: sheet.y + (e.clientY - startMouseY)

      }));
    }
  };

  const handleMouseUp = () => {
    dragData.current = null;
    setIsDragging(false);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (

    <div className="relative">

      <div className="flex items-center justify-between border-b-1 border-dashed mb-10 p-2">
        Toggling this button prevents any highlights on the text below.

        <button  
          className="cursor-pointer hover:bg-gray-200 transition-colors border-1 p-0.5 rounded-md"
          style={{background: disableHighlight ? "#3384ed87" : ""}}
          onClick={() => setDisableHighlight(prev => !prev)}
        >
          Disable highlighting
        </button>
      </div>

      <div 

        className="sheet"

        // camelCase due to JSX syntax, normally onmousedown
        onMouseDown={(e) => handleMouseDown(e)}

        style={{
          position: "relative",
          left: sheet.x,
          top: sheet.y,
          width: sheet.w,
          height: sheet.h,
          background: sheet.color, 
          opacity: sheet.opacity,
          userSelect: "none",
          zIndex: 1,
          cursor: isDragging ? "grabbing" : "grab",
        }}

      >

      </div>

      <p style={{fontSize: "24px"}} className="relative mt-5 z-2 text-center">
        Hover over the <span className="text-[#3384ed]">blue text</span> to <span className="text-[#3384ed]">hide </span>it
      </p>

    </div>

  );
}