const urlBaseRick = "https://rickandmortyapi.com/api/character"

export async function getCharacterRick(page = 1, name = "") {
    try {


        const response = await fetch(`${urlBaseRick}?page=${page}&name=${name}`)
        // const data = await response.json()


        if (!response.ok) {
            throw new Error(data?.error || "Error getting character")
        }
        return response
    } catch (error) {

    }
}