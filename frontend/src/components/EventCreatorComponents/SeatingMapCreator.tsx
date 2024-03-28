import { Center, Button, Flex } from "@chakra-ui/react"
import { IAppData, ISeat } from "../../interfaces/interfaces";
import { useContext, useEffect, useMemo, useState } from "react";
import SeatingMapLayout from "../SeatingMapLayout";
import MapNavCreator from "./MapNavCreator";
import MapSVGEventCreator from "./MapSVGEventCreator";
import { ISeatMeta, IEventData } from "../../interfaces/creatorInterfaces";
import EventInputCreator from "./EventInputCreator";
import { addEvent } from "../../api/eventAPI";
import MainPage from "../MainPage";
import { DataContext } from "../../context/context";
import seatSorter from "../../utils/seatSorter";
import { EventCreator } from "../../context/context";

const SeatingMapCreator = ({ seatData, changePage, eventsLoaded }: { seatData: ISeat[], changePage: (param: React.ReactElement) => void, eventsLoaded: boolean }) => {
    const [layoutMainHeight, setLayoutMainHeight] = useState(0);
    const allSeatsSorted = useMemo(() => seatSorter(seatData), [seatData]);
    const seatMeta = useMemo(() => {
        let updatedSeatMeta = {}

        seatData.forEach(seat => {
            updatedSeatMeta = {
                ...updatedSeatMeta,
                [seat._id]: false
            }
        });

        return updatedSeatMeta;
    }, [seatData]);


    const [eventData, updateEventData] = useState<IEventData>({
        name: '',
        date: null,
        seats: [''],
    });
    const [metaData, setMetaData] = useState<ISeatMeta>(seatMeta)

    const handleSetLayoutMainHeight = (height: number) => {
        console.log("passed map height: ", height);
        setLayoutMainHeight(height);
    }

    useEffect(() => {
        const seatIDArray: string[] = []
        Object.keys(metaData).forEach(key => {
            if (metaData[key] === true) seatIDArray.push(key)
        })
        updateEventData(prev => ({ ...prev, ['seats']: seatIDArray }))
    }, [metaData])


    const updatedCreateBtn = eventData.name.length > 0 ? <CreateButton data={eventData} changePage={changePage} eventsLoaded={eventsLoaded} /> : null


    return (
        <EventCreator.Provider value={{ sortedSeatData: allSeatsSorted, seatMeta: seatMeta, updateMeta: setMetaData }}>
            <SeatingMapLayout>
                <SeatingMapLayout.Header>
                    <EventInputCreator
                        updateData={updateEventData}
                        changePage={changePage}
                        eventsLoaded={eventsLoaded} />
                </SeatingMapLayout.Header>
                <SeatingMapLayout.Main
                    setHeight={handleSetLayoutMainHeight}>
                    <MapSVGEventCreator
                        seatMeta={metaData}
                        updateMeta={setMetaData} 
                        height={layoutMainHeight} />
                </SeatingMapLayout.Main>
                <SeatingMapLayout.Nav>
                    <MapNavCreator
                        seatMeta={metaData} />
                </SeatingMapLayout.Nav>
                <SeatingMapLayout.Footer>
                    {updatedCreateBtn}
                </SeatingMapLayout.Footer>
            </SeatingMapLayout>
        </EventCreator.Provider>

    )
}

export default SeatingMapCreator;


const CreateButton = ({ data, changePage, eventsLoaded }: { data: IEventData, changePage: (param: React.ReactElement) => void, eventsLoaded: boolean }) => {
    const contextData = useContext(DataContext)
    const { updateEvents } = contextData as IAppData;

    const handleSubmit = async () => {
        try {
            const res = await addEvent(data)

            if (res?.status === 200) {
                updateEvents(prev => [...prev, res.data])
                changePage(<MainPage changePage={changePage} eventsLoaded={eventsLoaded} />);
            }
        } catch (err) {
            console.log("This error was generated at SeatingMapCreator component:");
            console.error(err);
        }
    }

    return (
        <Flex h={'100%'} justify={'center'}>
            <Center>
                <Button size="lg" onClick={handleSubmit}>Create</Button>
            </Center>
        </Flex>
    )
}