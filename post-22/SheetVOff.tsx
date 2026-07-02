// DIFFERENT PERSPECTIVE: Removing the offset created from the current point to get our top left corner.

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
  offsetX: number;
  offsetY: number;
}

export default function SheetV2() {

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sheet, setSheet] = useState<Sheet>( 
     {
       x: 20,
       y:10,
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
     const rect = containerRef.current.getBoundingClientRect();


  

      dragData.current = {
  
      offsetX: e.clientX - rect.left-sheet.x,
      offsetY: e.clientY -rect.top - sheet.y
    };

    setIsDragging(true)


    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
   


   }

   const handleMouseMove = (e: MouseEvent) => {
    // We defined <DragData | null>, so we make sure it's not null before we access it.
    // We also need to check if the container ref because we declared in the type that it could be null.
    if (dragData.current && containerRef.current ) {

      

      const { offsetX, offsetY } = dragData.current;
      const rect = containerRef.current.getBoundingClientRect();

      const rawX =  e.clientX - offsetX 
      const rawY = e.clientY - offsetY
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
     class="outer-container relative h-40 border-1 "> 
     <div 

       className="sheet"
       onMouseDown = {(e) => handleMouseDown(e)}
       style = {{
        // Both absolute or relative here because we're only adding distances to the viewport 
         position: "relative",
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

      <p className="relative text-lg z-50 text-center"> Drag across the <span className="text-[#3384ed]">blue text </span> </p>

   
     </div>

   )

}
