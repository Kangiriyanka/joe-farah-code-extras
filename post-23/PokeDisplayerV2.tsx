import {useState, useEffect} from "preact/hooks"
import RangePicker from "./RangePicker"

interface PokeProps {
    folder_name: string
}

export default function PokeDisplayerV2( {folder_name}: PokeProps) {

    const [pokemonImages, setPokemonImages] = useState<string[]>([]);
    const [startIndex, setStartIndex] = useState<number>(1);
    const [endIndex, setEndIndex] = useState<number>(1);


    useEffect(() => {
    const loadPokemonImages = async () => {
        const res = await fetch(`/${folder_name}/manifest.json`);
        const data = await res.json();

        const imgs = Array.from(
        { length: data.parts },
        (_, i) => `/${folder_name}/p${i + 1}.jpg`
        );

        setPokemonImages(imgs);
        setEndIndex(data.parts);
    };

    loadPokemonImages();
    }, [folder_name]);


    const visibleImages = pokemonImages.slice(startIndex-1, endIndex)
    return (

        
        <div>

            <RangePicker 
                startIndex= {startIndex}
                endIndex = {endIndex}
                totalItems = {pokemonImages.length}
                onStartSelect = {setStartIndex}
                onEndSelect= {setEndIndex}
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