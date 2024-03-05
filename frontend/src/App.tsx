import { getAllSeats } from './api/seatAPI';
import { IEventData, ISeat } from './interfaces/interfaces';
import { useEffect, useState } from 'react';
import { DataContext } from './context/context';
import { getEvent } from './api/eventAPI';
import MainPage from './components/MainPage';
import seatSorter from './utils/seatSorter';
import { ErrorPage } from './components/ErrorPage';
import ping from "./api/serverCheck";
import { Socket, io } from "socket.io-client";
import API_ROOT from './api/apiRoot';

function App() {
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [seatData, setSeatData] = useState<ISeat[]>([]);
  const [eventData, setEventData] = useState<IEventData[]>([]);
  const [currentPage, setCurrentPage] = useState<React.ReactElement>();
  const [eventHasStarted, setEventHasStarted] = useState(false);
  const [status, setStatus] = useState({
    init: true,
    isError: false,
    message: 'Contacting server...',
  });
  const [socketInState, setSocket] = useState<Socket>();

  const changePage = (page: React.ReactElement) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    const initServerCheck = async () => {
      try {
        const serverStatus = await ping();

        if (serverStatus !== 200) {
          setStatus({
            init: false,
            isError: true,
            message: "unhandled error while connecting to server"
          });
        } else {
          setStatus({
            init: false,
            isError: false,
            message: "Connected to server."
          });
        }

      } catch (err) {
        setStatus({
          init: false,
          isError: true,
          message: (err as Error).message,
        });
      }
    }

    initServerCheck();
  }, [])

  useEffect(() => {
    const fetchSeats = async () => {

      try {
        const res = await getAllSeats();
        if (res) {
          const seatList: ISeat[] = res;
          //this needs to be adjusted / removed
          const allSeatsSortedArray = seatSorter(seatList, "array") as ISeat[]
          //const allSeatsSorted = seatSorter(seatData)
          setSeatData(allSeatsSortedArray)
        } else console.error("Unknown and unhandled error");
      } catch (err) {
        console.error(err);
      }
    }

    const fetchEvents = async () => {
      try {
        const res = await getEvent();
        if (res) {
          const eventList = res;
          setEventData(eventList);
          setEventsLoaded(true);
        } else console.error("Unknown and unhandled error");
      } catch (err) {
        console.error(err);
      }
    }

    console.log(status.message)
    if (!status.init) {
      if (status.isError) setCurrentPage(<ErrorPage errorMessage={status.message} />);
      else {
        fetchEvents();
        fetchSeats();
        setCurrentPage(<MainPage changePage={changePage} eventsLoaded={eventsLoaded} />);
      }
    }
  }, [status, eventsLoaded]);

  useEffect(() => {
    const socket = io(API_ROOT, {
      withCredentials: true,
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log(`Connected to websocket with socked ID ${socket.id}`)
    });

    setSocket(socket);

    return () => {
      if (socket && socket.connected) {
        socket.off('connect');
        socket.disconnect();
      }
    }
  }, []);

  return (
    <DataContext.Provider value={{
      seatData: seatData,
      eventData: eventData,
      updateEvents: setEventData,
      updateSeats: setSeatData,
      eventHasStarted: eventHasStarted,
      setEventHasStarted: setEventHasStarted,
      socket: socketInState,
    }}>
      {currentPage}
    </DataContext.Provider>
  )
}

export default App;