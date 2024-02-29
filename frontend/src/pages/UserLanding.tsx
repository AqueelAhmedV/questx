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
import { BasicLayout } from '../layouts/BasicLayout';


export function UserLanding() {
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
          <div id={quest.quest_id} key={quest.quest_id} tabIndex={0}
          className='p-3 mb-2 shadow-sm hover:shadow-md cursor-pointer border rounded-md grid gap-2' 
          onClick={handleQuestClick}>
              <span className='font-semibold text-md text-gray-700'>
                  {quest.quest_title}
              </span>
              <span className='text-gray-500'>
                  {quest.quest_description}
              </span>
          </div>
      )
    }), [data?.quests])

    
    return (
        <div className='h-full w-full flex justify-center items-center flex-col'>
            {/* <NavbarDefault list= {[]} isLoggedIn = {true} profileMenuItems= {profileMenuItems}/>
            <div className='mx-auto h-screen max-w-screen-xl p-2'> */}
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
                    <Button type='submit' size="md" className="invisible md:visible w-[100px] rounded-lg mx-auto">
                        Search
                    </Button>
                </div>
                </form>
                <div className='grid grid-cols-4 h-[76vh] px-8'>
                  <div className='col-span-1'></div>
                <div className='flex-col  flex h-full overflow-auto col-span-3' style={{ scrollbarWidth: 'none' }}>
                      {isLoading && <LoadingSpinner className={'animate-spin size-10'}/>}
                      {!isLoading && questResults}
                </div>
                </div>
        </div>
    )
}
