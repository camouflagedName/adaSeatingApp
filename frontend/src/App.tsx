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
import SeatingMap from './components/SeatingMap';
import { getAllSeats } from './api/seatAPI';
import { ISeat } from './utils/interfaces';
import { useEffect, useState } from 'react';

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

    fetchSeats();
  }, [])

  /* 
    const handleClickEdit = (eventID: string) => {
      console.log(eventID)
    }
  
    const handleClickStart = (eventID: string) => {
      console.log(eventID)
    }
   */

  return (
    <SeatingMap seatData={seatData} />
  )
}

export default App
/*

<>
      <Flex justify='center' style={{ height: "100vh" }}>
        <Container centerContent maxW='container.lg' style={{ margin: "auto" }}>
          <Text fontSize='4xl'>Welcome to The Anthem Seating App</Text>
          <Text fontSize='2xl'> Choose one below: </Text>
          <Text fontSize='xl'> Current Event: </Text>
          {
            eventList.map(event => {
              if (event.date === currentDate.getDate()) return (
                <Menu>
                  <MenuButton as={Button}>
                    {event.name}
                  </MenuButton>
                  <MenuList>
                    <MenuItem key={`edit_${event._id}`} onClick={() => handleClickEdit(event._id)}>Edit</MenuItem>
                    <MenuItem key={`start_${event._id}`} onClick={() => handleClickStart(event._id)}>Start</MenuItem>
                  </MenuList>
                </Menu>
              )
            })
          }

          <Text fontSize='xl'> Upcoming Events: </Text>
          <VStack>
            {
              eventList.map(event => {
                if (event.date !== currentDate.getDate()) return (
                  <>
                    <Menu key={event._id}>
                      <MenuButton key={event._id} as={Button}>
                        {event.name}
                      </MenuButton>
                      <MenuList>
                        <MenuItem key={`edit_${event._id}`} onClick={() => handleClickEdit(event._id)}>Edit</MenuItem>
                        <MenuItem key={`start_${event._id}`} onClick={() => handleClickStart(event._id)}>Start</MenuItem>
                      </MenuList>
                    </Menu>
                  </>
                )
              })
            }
          </VStack>
        </Container>

      </Flex>
    </>

*/