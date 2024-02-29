//@ts-nocheck

import { useQuery } from "react-query"
import { useAuth } from "../contexts/AuthContext"
import { getQuests } from "../api/questApi"
import { LoadingSpinner } from "../components/Icons"
import { useEffect, useMemo, useState } from "react"

export function CmLanding() {
    const { authToken } = useAuth()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    // const { data, isLoading }: {[data:string]: GetQuestResponse, [isLoading:string]: boolean} = useQuery<GetQuestResponse>(
    //     [],
    //     async () => ,
    //     // {
    //     //     staleTime: 60*60*1000
    //     // }
    // )

    useEffect(() => {
        if (!authToken) return;
        console.log(authToken, "TOKEN")
        setLoading(true)
        getQuests(authToken)
        .then((data) => {
            setData(data)
            setLoading(false)
        })
        .catch(() => setLoading(false))
    }, [authToken])

    const questList = useMemo(() => {
        return data?.map((d, i) => (
            <div key={d.quest_id} className="p-2 grid gap-3">
                <span className="text-md font-semibold text-gray-700">
                    {d.quest_title}
                </span>
                <span className="text-sm text-gray-500">
                    {d.quest_description}
                </span>
            </div>
        ))
    }, [data])

    return (
        <div className="w-full h-full grid-cols-2 border ">
            <div className="h-full">
                {isLoading && <LoadingSpinner className='size-8'/>}
                {!isLoading && questList}
            </div>
            <div className="">
            </div>
        </div>
    )
}