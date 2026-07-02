import {useState, useEffect} from "preact/hooks"


interface PokeProps {
    folder_name: string
}

export default function PokeDisplayerV1( {folder_name}: PokeProps) {

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


    return (

        <div>
            
            <p className="text-center"> We have fetched {pokemonImages.length} pokémon images from our public/pokemon folder with URLs:</p>
            <ul> 
           
                {pokemonImages.map(url => {
                    return  (
                        <li className="my-1 ">
                        {url}
                        </li>
                    )
                    
                })}
            </ul>
        </div>
    )

}