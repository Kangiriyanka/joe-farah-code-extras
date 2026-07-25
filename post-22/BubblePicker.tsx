
interface BubblePickerProps {

  
  totalItems: number;
  idxSet: Set<number>
  onButtonClick: (idx:number) => void;
  
}

// We're also passing the idxSet to the child to add an active class to the tapped buttons.
export default function BubblePicker({totalItems, idxSet, onButtonClick}: BubblePickerProps) {

  
    return (
    <div className="bubble-picker">
      

        {Array.from({length:totalItems}).map((_,i) => (

            <button 
            onClick = {(e) => onButtonClick(i)}
            className={idxSet.has(i) ? "pkmn-active pkmn-button" : "pkmn-button"}  key={i}>{i+1}</button>
        ))}       
       
    </div>
    )
}

