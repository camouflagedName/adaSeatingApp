//import { useState } from 'react'
/* import {
  Button,
  Container,
  Flex,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Spacer,
} from '@chakra-ui/react' */
//import SeatingMap from './components/SeatingMap';
import { getAllSeats } from './api/seatAPI';
import { IEventData, ISeat } from './utils/interfaces';
import { useEffect, useState } from 'react';
import { DataContext } from './context/context';
import { getEvent } from './api/eventAPI';
import MainPage from './components/MainPage';

//import './App.css'
//const currentDate = new Date();
/* const eventList = [
  {
    _id: 'abc',
    name: 'event #1',
    date: currentDate.getDate(),
    patrons: [],
    seats: []
  },
  {
    _id: 'def',
    name: 'event #2',
    date: currentDate.getDate() + 1,
    patrons: [],
    seats: []
  },
  {
    _id: 'ghi',
    name: 'event #3',
    date: currentDate.getDate() + 2,
    patrons: [],
    seats: []
  },
  {
    _id: 'jkl',
    name: 'event #4',
    date: currentDate.getDate() + 3,
    patrons: [],
    seats: []
  }
] */

function App() {
  const [seatData, setSeatData] = useState<ISeat[]>([]);
  const [eventData, setEventData] = useState<IEventData[]>([])
  const [currentPage, setCurrentPage] = useState<React.ReactElement>()

  const changePage = (page: React.ReactElement) => {

    setCurrentPage(page)
  }

  useEffect(() => {
    const fetchSeats = async () => {

      try {
        const res = await getAllSeats();
        if (res) {
          const seatList: ISeat[] = res.data;
          setSeatData(seatList)
        }
      } catch (err) {
        console.log(err)
      }
    }

    const fetchEvents = async () => {
      try {
        const res = await getEvent();
        if (res) {
          const eventList = res.data;
          setEventData(eventList);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchEvents();
    fetchSeats();

  }, [])


  /* TIER A */
  const tierAMap = seatData.filter(seatObj => seatObj.section === "TierA")
  const sortedTierARowA = tierAMap.filter(seatObj => seatObj.row === "A").sort((a, b) => a.seatNumber - b.seatNumber)
  const sortedTierARowB = tierAMap.filter(seatObj => seatObj.row === "B").sort((a, b) => a.seatNumber - b.seatNumber)

  /* TIER C */
  const sortedTierCMap = seatData.filter(seatObj => seatObj.section === "TierC").sort((a, b) => a.seatNumber - b.seatNumber)
  const tierCRight = sortedTierCMap.filter(seatObj => seatObj.seatNumber <= 106)
  const tierCRCtr = sortedTierCMap.filter(seatObj => seatObj.seatNumber > 106 && seatObj.seatNumber <= 122)
  const tierCLCtr = sortedTierCMap.filter(seatObj => seatObj.seatNumber > 122 && seatObj.seatNumber <= 137)
  const tierCLeft = sortedTierCMap.filter(seatObj => seatObj.seatNumber > 137)


  /* 2nd FlOOR WINGS */
  const secondFloorWingMap = seatData.filter(seatObj => seatObj.floor === 2 && (seatObj.section === "2ndFloorLeftWing" || seatObj.section === "2ndFloorRightWing"))
  const sortedSecondRightWing = secondFloorWingMap.filter(seatObj => seatObj.section === "2ndFloorRightWing").sort((a, b) => a.seatNumber - b.seatNumber)
  const sortedSecondLeftWing = secondFloorWingMap.filter(seatObj => seatObj.section === "2ndFloorLeftWing").sort((a, b) => a.seatNumber - b.seatNumber)

  /* 3rd FLOOR WINGS */
  const thirdFloorWingMap = seatData.filter(seatObj => seatObj.floor === 3 && (seatObj.section === "3rdFloorLeftWing" || seatObj.section === "3rdFloorRightWing"))
  const sortedThirdRightWing = thirdFloorWingMap.filter(seatObj => seatObj.section === "RightWing").sort((a, b) => a.seatNumber - b.seatNumber)
  const sortedThirdLeftWing = thirdFloorWingMap.filter(seatObj => seatObj.section === "LeftWing").sort((a, b) => a.seatNumber - b.seatNumber)

  //const allSeatsSorted = [...sortedTierARowA, ...sortedTierARowB, ...sortedTierCMap, ...sortedSecondRightWing, ...sortedSecondLeftWing, ...sortedThirdRightWing, ...sortedThirdLeftWing]
  const allSeatsSorted = {
    tierARowA: sortedTierARowA,
    tierARowB: sortedTierARowB,
    tierCRight: tierCRight,
    tierCLeft: tierCLeft,
    tierCLeftCenter: tierCLCtr,
    tierCRightCenter: tierCRCtr,
    secondRightWing: sortedSecondRightWing,
    secondLeftWing: sortedSecondLeftWing,
    thirdRightWing: sortedThirdRightWing,
    thirdLeftWing: sortedThirdLeftWing
  }

  useEffect(() => {
    if (eventData && seatData) setCurrentPage(<MainPage changePage={changePage} />)
  }, [eventData, seatData])



  return (
    <DataContext.Provider value={{ seatData: seatData, eventData: eventData, sortedSeatData: allSeatsSorted }}>
      {currentPage}
    </DataContext.Provider>
  )
}

export default App;

/*
      <SeatingMap seatData={seatData} />
*/