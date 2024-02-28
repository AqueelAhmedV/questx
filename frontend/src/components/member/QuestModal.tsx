import { useQuery } from "react-query";
import { BACKEND_BASE_URL } from "../../constants";


export function QuestModal({ questId }: QuestModalProps) {
    const { data, isLoading } = useQuery(
        [questId],
        async () => fetch(`${BACKEND_BASE_URL}/quests/${questId}`)
        .then(r => r.json())
        ,
        {
            staleTime: 60*60*1000,
            retryDelay(failureCount, error) {
                return 2**failureCount
            },
        }
    )

    return (
        <></>
    )
}