const urlBaseRick = "https://rickandmortyapi.com/api/character"

export async function getCharacterRick() {
    const response = await fetch(urlBaseRick)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data?.error || "Error getting character")
    }
    return data.results
}