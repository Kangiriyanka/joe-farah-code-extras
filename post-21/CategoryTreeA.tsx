import categorydata from "./categorydata.json";
import {useState} from "preact/hooks";


interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  children: Category[];
}

interface CategoryTreeProps {
  
}


interface TreeNodeProps {
  cat: Category;
  depth: number;
  backgroundToggle: boolean;
}

const clr_map: Record<number, string> = {

  0: "#3384ed",
  1: "#308f4d",
  2: "#ea6565",

};



function TreeNode( {cat, depth, backgroundToggle}: TreeNodeProps) {

 const [isOpen, setIsOpen] = useState(false)
 const hasChildren = cat.children.length > 0;
 const borderColor = clr_map[depth % Object.keys(clr_map).length];

  return (
    <div 
    className=" w-[100%]"
       style= {backgroundToggle? { background: borderColor}: ""} 
    >
     <span className="text-xs"> TreeNode </span>
    {/* CATEGORY INFORMATION */}
    <button 
    onClick = {() => setIsOpen(prev => !prev)} 
    className= {`cursor-pointer bg-zinc-100 relative border-2  rounded-md w-[100%] text-black p-2 hover:bg-gray-400 transition-colors`}
    style = {{borderColor: borderColor}}>
        <p> {cat.name} </p>

        {/* ID LABEL */}
        <div className="flex absolute -right-1 -top-2  text-sm  bg-zinc-100 text-black border-1  w-4 m-05 h-4 items-center justify-center  rounded-full"> 
          {cat.id} 
        
        </div>
    </button>

  

    {/* CHILDREN TREE NODES  */}
    {hasChildren && isOpen  && ( 
      // DISPLAY CHILDREN SIDE BY SIDE

      <div 
      className="flex gap-2 mt-2"
    >
      
      {cat.children.map(child => (
        
        <TreeNode 
          key= {child.id}
          cat = {child}
          depth = {depth + 1}
          backgroundToggle = {backgroundToggle}
          />
     
      ))}
      </div>
    )}
   
    </div>
  )
}




export default function CategoryTreeA() {

   const [isBackgroundToggled, setIsBackgroundToggled] = useState(false)

  return (
    
    <div>
    <div className="flex justify-between">
    <span className=" text-md my-1"> Flexbox Category Tree </span>
    <button  className= " mb-2 cursor-pointer hover:bg-gray-400 transition-colors border-1  p-1 rounded-md" onClick = {() => setIsBackgroundToggled(prev => !prev)}> Tree Visual Aid</button>
    </div>
    <div style= {isBackgroundToggled ?  {background: clr_map[0]}: "" } className="category-tree-main-container flex gap-2">
   
      {categorydata.map(cat => (
        <TreeNode
          key={cat.id}
          cat={cat}
          depth = {0}
          backgroundToggle = {isBackgroundToggled}
       
        />

      ))}

    </div>
    </div>


  );

}