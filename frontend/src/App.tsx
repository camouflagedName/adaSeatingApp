import { getAllSeats } from './api/seatAPI';
import { IEventData, ISeat } from './interfaces/interfaces';
import { useEffect, useState } from 'react';
import { DataContext } from './context/context';
import { getEvent } from './api/eventAPI';
import MainPage from './components/MainPage';
import seatSorter from './utils/seatSorter';
import { ErrorPage } from './components/ErrorPage';
import ping from "./api/serverCheck";

function App() {
  const [seatData, setSeatData] = useState<ISeat[]>([]);
  const [eventData, setEventData] = useState<IEventData[]>([]);
  const [currentPage, setCurrentPage] = useState<React.ReactElement>();
  const [status, setStatus] = useState({
    init: true,
    isError: false,
    message: 'Contacting server...',
  });

  const changePage = (page: React.ReactElement) => {
    setCurrentPage(page)
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
        setCurrentPage(<MainPage changePage={changePage} />);
      }
    }
  }, [status]); 

  return (
    <DataContext.Provider value={{ seatData: seatData, eventData: eventData, updateEvents: setEventData, updateSeats: setSeatData }}>
      {currentPage}
    </DataContext.Provider>
  )
}

export default App;