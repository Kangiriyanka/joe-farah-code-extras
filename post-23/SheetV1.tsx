// x and y are the positions from the top left corner
// w and h are the width and height
import {useState} from "preact/hooks";

interface Sheet {    
  x: number;         
  y: number;        
  w: number;      
  h: number;       
  color: string;  
  opacity: number;   
}


export default function Sheet() {

   const [sheet, setSheet] = useState<Sheet>( 
     {
       x: 0,
       y:0,
       w: 250,
       h: 100,
       color: "#3384ed",
       opacity: 1
     }
   )
    

   return (
    
     <div 
       className="sheet mx-auto"
      //  Styles are obtained from the sheet object
       style = {{
         left: sheet.x,
         top: sheet.y,
         width: sheet.w,
         height: sheet.h,
         background: sheet.color, 
         opacity: sheet.opacity,
       }}
     >
       <p className="text-lg text-center">
         Sheet
       </p>
     </div>
  

   )

}
