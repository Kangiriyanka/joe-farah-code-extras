import {useState, useEffect} from "preact/hooks"
import BubblePicker from "./BubblePicker"

interface PokeProps {
    folder_name: string
}

export default function PokeDisplayerV3( {folder_name}: PokeProps) {

    const [pokemonImages, setPokemonImages] = useState<string[]>([]);
    const [idxSet, setIdxSet] = useState<Set<number>>(new Set());


    useEffect(() => {
    const loadPokemonImages = async () => {
        const res = await fetch(`/${folder_name}/manifest.json`);
        const data = await res.json();

        const imgs = Array.from(
        { length: data.parts },
        (_, i) => `/${folder_name}/p${i + 1}.jpg`
        );

        setPokemonImages(imgs);
  
    };

    loadPokemonImages();
    }, [folder_name]);

    const handleSetChanges = (idx: number) => {

        setIdxSet(prev => {
         const next = new Set(prev)
        if (next.has(idx)) {
            next.delete(idx)
        }
        
        else {
            next.add(idx)
        }

        return next
        })
        


    }

    const visibleImages = pokemonImages.filter((_, i) => idxSet.has(i));

    
    return (

        
        <div>

            <BubblePicker 
              
                totalItems = {pokemonImages.length}
                idxSet ={idxSet}
                onButtonClick = {handleSetChanges}
                
             />

              <div className="grid grid-cols-3 post-img-container my-2 ">
            
                {visibleImages.map((src, i) => (
                <div className="my-2 mx-1 pkmn-container "> 
                <img

                    key={i}
                    src={src}
                    alt={`Pokémon image ${i}`}

                />
                </div>

            ))}

            
            
        </div> 
        </div>
    )

}