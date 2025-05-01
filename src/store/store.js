export const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: []
        },
        actions: {
            getCharacters: async () => {
                try {
                    const response = await fetch("https://rickandmortyapi.com/api/character");
                    const data = await response.json();
                    setStore({ characters: data.results });
                } catch (error) {
                    console.log("Error al obtener personajes:", error);
                }
            }
        },
    };
};

export default getState;
