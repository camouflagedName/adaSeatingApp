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
import { IEventData, ISeat, IPatronData } from './interfaces/interfaces';
import { useEffect, useState } from 'react';
import { DataContext } from './context/context';
import { getEvent } from './api/eventAPI';
import MainPage from './components/MainPage';
import seatSorter from './utils/seatSorter';
import { patronsSeedData } from './seedData/patrons';
import mapper from './utils/mapper';

function App() {
  const [seatData, setSeatData] = useState<ISeat[]>([]);
  const [eventData, setEventData] = useState<IEventData[]>([])
  const [patronData, setPatronData] = useState<IPatronData[]>([])
  const [patronDataMap, setPatronDataMap] = useState<Map<string, IPatronData>>()
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
          //this needs to be adjusted / removed
          const allSeatsSortedArray = seatSorter(seatList, "array") as ISeat[]
          //const allSeatsSorted = seatSorter(seatData)
          setSeatData(allSeatsSortedArray)
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

    const fetchPatrons = async () => {
      setPatronData(patronsSeedData)
    }

    fetchEvents();
    fetchSeats();
    fetchPatrons();
  }, [])

  useEffect(() => {
    setCurrentPage(<MainPage changePage={changePage} />)
  }, [])

  useEffect(() => {
    const dataMap = mapper(patronData) as Map<string, IPatronData>;
    setPatronDataMap(dataMap);
  }, [patronData])

  return (
    <DataContext.Provider value={{ seatData: seatData, eventData: eventData, patronData: patronData, patronDataMap: patronDataMap, updateEvents: setEventData, updateSeats: setSeatData, updatePatrons: setPatronData }}>
      {currentPage}
    </DataContext.Provider>
  )
}

export default App;