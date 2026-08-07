const url = "https://pokeapi.co/api/v2/pokemon/gengar";

async function getPost() {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);

    } catch (error) {
        console.error("Error Detect", error );
    }
}


getPost();