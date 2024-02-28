//@ts-nocheck

import React, { useMemo, useState } from 'react';
import { useQuery } from "react-query";


import {
    Input,
    Button,
    Typography
} from '@material-tailwind/react'

import NavbarDefault from "../components/NavbarDefault";
import { Card, CardBody, CardHeader, MaterialTailwindTheme } from '@material-tailwind/react';
import { BACKEND_BASE_URL, profileMenuItems } from '../constants';
import { LoadingSpinner } from '../components/Icons';
import { tryViewTransition } from '../utils/dom';


const UserLanding = () => {
    const [searchText, setSearchText] = useState('')
    const [inputText, setInputText] = useState('')
    const { data, isLoading } = useQuery<QuestSearchResponse>(
      [searchText],
      async () => {
        return fetch(`${BACKEND_BASE_URL}/search/quest?query=${searchText}`)
        .then(r => r.json())
      },
      {
        staleTime: 1000*60*60,
        retryDelay(failureCount, error) {
          return 2**failureCount
        },
      }
    )

    function handleInputChange(e) {
      setInputText(e.target.value)
    }

    function handleSearchSubmit(e) {
      e.preventDefault()
      setSearchText(inputText)
    }

    function handleQuestClick(e) {
      
    }
    

    const questResults = useMemo(() => data?.quests?.sort((a, b) => b.score - a.score).map((quest) => {
      return (
          <Card key={quest.quest_id} 
          className='p-3 mb-2 shadow-sm hover:shadow-md' onClick={handleQuestClick}>
              <span className='font-medium text-md text-slate-400'>
                  {quest.quest_title}
              </span>
              <span className='text-slate-300'>
                  {quest.quest_description}
              </span>
          </Card>
      )
    }), [data?.quests])

    
    return (
        <>
            <NavbarDefault list= {[]} isLoggedIn = {true} profileMenuItems= {profileMenuItems}/>
            <Card shadow className='mx-auto max-w-screen-xl h-[85vh]'>
            <form onSubmit={handleSearchSubmit}>
                <div className='flex flex-wrap md:flex-nowrap py-2 px-10 gap-2'>
                  
                    <Input
                        value={inputText}
                        onChange={handleInputChange} 
                        type="search"
                        color="black"
                        label="Type here..."
                        className=" min-w-[288px]"
                    />
                    <Button type='submit' size="md" className="w-[100px] rounded-lg mx-auto">
                        Search
                    </Button>
                </div>
                </form>
                
                <CardBody className='h-[90%]'>
                    {isLoading && <LoadingSpinner className={'animate-spin size-10'}/>}
                    {!isLoading && questResults}
                </CardBody>
            </Card>
        </>
    )
}

export default UserLanding;