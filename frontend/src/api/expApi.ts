import { BACKEND_BASE_URL } from "../constants";


export async function createExperience(expInfo: CreateExperienceInfo) {
    let response = await fetch(`${BACKEND_BASE_URL}/experience/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expInfo),
        credentials: 'include',
    })
    let data = await response.json()
    if (response.status >= 400) {
        throw data;
    }
    console.log(data)
    return data;
}

export async function getExps(): Promise<GetExperienceResponse | unknown> {
    let response = await fetch(`${BACKEND_BASE_URL}/experience/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    let data = await response.json()
    if (response.status >= 400) {
        throw data;
    }
    console.log(data)
    return data;
}