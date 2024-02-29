import { BACKEND_BASE_URL } from "../constants";


export async function searchQuests(searchText: string) {
    let response = await fetch(`${BACKEND_BASE_URL}/search/quest?query=${searchText}`)
    let data = await response.json()
    if (response.status >= 400) {
        throw data
    }
    return data;
}