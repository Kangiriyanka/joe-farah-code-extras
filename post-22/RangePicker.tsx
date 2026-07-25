
interface RangePickerProps {

  startIndex: number;
  endIndex: number;
  totalItems: number;
  onStartSelect: (start: number) => void;
  onEndSelect: (end: number) => void;
}

export default function RangePicker({startIndex,endIndex, totalItems, onStartSelect, onEndSelect}: RangePickerProps) {

  
    return (
    <div className="range-picker">
        <p className="my-1"> The range displayed should be from p{startIndex} to  p{endIndex}</p>

       

        <input
                type="number"
                min={1}
                max={endIndex}
                value={startIndex}
                onChange={(e) => onStartSelect(Number(e.target.value))}
                className=" pkmn-input text-center bg-white  rounded p-2"
            />
        
    

        
        
        <input
                type="number"
                min={startIndex}
                max={totalItems}
                value={endIndex}
                onChange={(e) => onEndSelect(Number(e.target.value))}
                className=" pkmn-input text-center bg-white border border-gray-300  p-2 "
            />
    
      
    </div>
    )


}

