import { Center, Button, Flex } from "@chakra-ui/react"
//import { useEffect, useState } from "react"
import { IAppData, ISeat } from "../interfaces/interfaces";
import { useContext, useEffect, useMemo, useState } from "react";
import SeatingMapLayout from "./SeatingMapLayout";
import MapNavCreator from "./MapNavCreator";
import MapSVGCreator from "./SVGComponents/MapSVGCreator";
import { ISeatMeta, IEventData } from "../interfaces/creatorInterfaces";
import EventInputCreator from "./EventInputCreator";
import { addEvent } from "../api/eventAPI";
import MainPage from "./MainPage";
import { DataContext } from "../context/context";
//import anthemMap from "../


const SeatingMapCreator = ({ seatData, changePage }: { seatData: ISeat[], changePage: (param: React.ReactElement) => void  }) => {
    const seatMeta = useMemo(() => {
        let updatedSeatMeta = {}

        seatData.forEach(seat => {
            updatedSeatMeta = {
                ...updatedSeatMeta,
                [seat._id]: {
                    seat: seat,
                    isSelected: false
                }
            }
        })

        return updatedSeatMeta;
    }, [seatData])

    const [eventData, updateEventData] = useState<IEventData>({
        name: '',
        date: null,
        seats: [''],
    });
    const [metaData, setMetaData] = useState<ISeatMeta>(seatMeta)
    //const [sideBarData, setSideBarData] = useState<ISeat[]>(seatData);
    //const [modalData, setModalData] = useState<ISeat>();

    useEffect(() => {
        const seatIDArray: string[] = []
        Object.keys(metaData).forEach(key => {
            if (metaData[key].isSelected) seatIDArray.push(metaData[key].seat._id)
        })
        updateEventData(prev => ({ ...prev, ['seats']: seatIDArray }))

    }, [metaData])

    console.log(eventData)

    const updatedTitle = <EventInputCreator updateData={updateEventData} />
    const updatedMapSVG = <MapSVGCreator seatMeta={metaData} updateMeta={setMetaData} />
    const updatedMapNav = <MapNavCreator seatMeta={metaData} updateMeta={setMetaData} />
    const updatedCreateBtn = eventData.name.length > 0 ? <CreateButton data={eventData} changePage={changePage}/> : null

    return (
        <>
            <SeatingMapLayout mode="create" svg={updatedMapSVG} nav={updatedMapNav} title={updatedTitle} footer={updatedCreateBtn} />
        </>
    )

}

export default SeatingMapCreator;


const CreateButton = ({ data, changePage }: { data: IEventData, changePage: (param: React.ReactElement) => void  }) => {
    const contextData = useContext(DataContext)
    const { updateEvents } = contextData as IAppData;

    const handleSubmit = async () => {
        try {
            const res = await addEvent(data)

            if (res?.status === 200) {
                updateEvents(prev => [...prev, res.data])
                changePage(<MainPage changePage={changePage} />);
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