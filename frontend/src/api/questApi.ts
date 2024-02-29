import { BACKEND_BASE_URL } from "../constants";

// for cm
export async function getQuests(
    authToken: string    
): Promise<GetQuestResponse | unknown> {
    return fetch(`${BACKEND_BASE_URL}/quest/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(r => r.json())
    .catch(console.log)
}

export async function createQuest(questInfo: CreateQuestInfo, authToken: string) {
    return fetch(`${BACKEND_BASE_URL}/quests/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`  
        },
        body: JSON.stringify(questInfo)
    })
    .then(r => r.json())
}