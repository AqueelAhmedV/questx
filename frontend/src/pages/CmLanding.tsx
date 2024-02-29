//@ts-nocheck

import { useQuery } from "react-query"
import { useAuth } from "../contexts/AuthContext"
import { getQuests } from "../api/questApi"
import { LoadingSpinner } from "../components/Icons"
import { useEffect, useMemo, useState } from "react"
import { Button, Card, CardBody, Typography } from "@material-tailwind/react"

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
        return (
            data.length>0 ? (
                data?.map((d, i) => (
                    <>
                        <Card key={d.quest_id} className="min-h-20 p-4">
                            <div className="flex justify-between">
                                <span className="text-md font-semibold text-gray-700">
                                    {d.quest_title}
                                </span>
                                <span className="text-md font-semibold text-gray-700">
                                    {d.quest_start_date}
                                </span>
                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="text-sm align-center ml-1">
                                    {
                                        `${Math.floor(d.quest_duration)} Days `
                                    }
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {d.quest_description}
                            </span>
                        </Card>
                        
                    </>
                ))
            ) : (
                <Typography className="text-center">
                    No Quests Created
                </Typography>
            )
        ) 
    }, [data])

    return (
        <div className="container mx-auto w-full grid-cols-2">
            <div className="h-full">
                {isLoading && <LoadingSpinner className='size-8'/>}
                <Card className="p-3 max-h-[80vh] overflow-y-auto" shadow={false}>
                    {
                        data.length>0? (
                            <div className="flex justify-between">
                                <div></div>
                                <Button  onClick = {() => window.location = '/cm/create-quest'}>
                                    Create Quest
                                </Button>
                            </div>
                        ) : null
                    }
                    
                    <CardBody className="flex flex-col gap-4">
                           { !isLoading && questList}
                            {
                                data.length>0? null : (
                                    <div className="flex justify-center">
                                        <Button  onClick = {() => window.location = '/cm/create-quest'}>
                                            Create Quest
                                        </Button>
                                    </div>
                                )
                            }
                    </CardBody>
                </Card>
            </div>
            <div className="">
            </div>
        </div>
    )
}