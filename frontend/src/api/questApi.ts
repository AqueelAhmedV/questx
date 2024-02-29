import { BACKEND_BASE_URL } from "../constants";

// for cm
export async function getQuests(
    authToken: string    
): Promise<GetQuestResponse | unknown> {
    let response = await fetch(`${BACKEND_BASE_URL}/quest/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    let data = await response.json()
    if (response.status >= 400) {
        throw data;
    }
    return data;
}

export async function createQuest(questInfo: CreateQuestInfo, authToken: string) {
    console.log("createQuest TOKEN", authToken)
    let response = await fetch(`${BACKEND_BASE_URL}/quest/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`  
        },
        body: JSON.stringify(questInfo)
    })
    let data = await response.json()
    if (response.status >= 400) {
        throw data;
    }
    return data;
}