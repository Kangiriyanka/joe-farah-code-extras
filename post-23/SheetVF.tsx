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
  const containerRef = useRef<HTMLDivElement>(null);
  const [sheet, setSheet] = useState<Sheet>( 
     {
       x: 10,
       y: 10,
       w: 150,
       h: 75,
       color: "#3384ed",
       opacity: 1
     }
   )

   const dragData = useRef<DragData | null>(null);

  
   const handleMouseDown = (e: MouseEvent) => {

    e.preventDefault()
    if (!containerRef.current) return;

  

      dragData.current = {
  
      startMouseX: e.clientX,
      startMouseY: e.clientY
    };

    setIsDragging(true)


    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
   


   }

   const handleMouseMove = (e: MouseEvent) => {
    // We defined <DragData | null>, so we make sure it's not null before we access it.
    // We also need to check if the container ref because we declared in the type that it could be null.
    if (dragData.current && containerRef.current ) {

      

      const { startMouseX, startMouseY } = dragData.current;
      const rect = containerRef.current.getBoundingClientRect();

      const rawX = sheet.x + e.clientX - startMouseX 
      const rawY = sheet.y + e.clientY - startMouseY 
      const clampedX = Math.max(0, Math.min(rawX, rect.width - sheet.w));
      const clampedY = Math.max(0, Math.min(rawY, rect.height - sheet.h))
      
      setSheet( prev => ({
      
    

      ...prev,
      x: clampedX,
      y: clampedY
      }))
      
  }

  

   
        
    }

   const handleMouseUp = () => {
    dragData.current = null;
    setIsDragging(false)
    
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
    
    


   return (

     <div 
     ref={containerRef}
     class="outer-container flex flex-col justify-between relative h-50 border-1 "> 
   

     <div 

       className="sheet"
       onMouseDown = {(e) => handleMouseDown(e)}
       style = {{
        // Relative only works if there's nothing before the element
         position: "absolute",
         left: sheet.x,
         top: sheet.y,
         width: sheet.w,
         height: sheet.h,
         background: sheet.color, 
         opacity: sheet.opacity,
         userSelect: "none",
         zIndex: 1,
         cursor: isDragging  ? "grabbing" : "grab",
         
         
       }}

     
     >  
    
     </div>

      <p style={{fontSize: "24px"}} className="relative  z-2 mt-auto   text-center">
        Hover over the <span className="text-[#3384ed]">blue text</span> to <span className="text-[#3384ed]">hide </span>it
      </p>

   
     </div>

   )

}
