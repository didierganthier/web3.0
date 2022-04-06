import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = () => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async () => {
        try {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1&offset=0&rating=G&lang=en`
            );
            const data = await response.json();
            setGifUrl(data.data.image_url);
        } catch (error) {
            console.log(error);

        }
    }
}