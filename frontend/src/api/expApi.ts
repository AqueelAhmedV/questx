import { BACKEND_BASE_URL } from "../constants";


export async function createExperience(expInfo: CreateExperienceInfo, authToken: string) {
    let response = await fetch(`${BACKEND_BASE_URL}/experience/`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expInfo),
        credentials: 'include',
    })
    let data = await response.json()
    if (response.status >= 400) {
        throw data;
    }
    return data;
}