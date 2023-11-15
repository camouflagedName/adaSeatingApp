import { Center, useDisclosure, Button, VStack, Flex } from "@chakra-ui/react"
//import { useEffect, useState } from "react"
import { ISeat } from "../utils/interfaces";
import { useEffect, useMemo, useState } from "react";
import SeatDataModal from "./SeatDataModal";
import SeatingMapLayout from "./SeatingMapLayout";
import MapNavCreator from "./MapNavCreator";
import MapSVGCreator from "./SVGComponents/MapSVGCreator";
import { ISeatMeta, IEventData } from "../utils/creatorInterfaces";
import EventInputCreator from "./EventInputCreator";
import { addEvent } from "../api/eventAPI";
import MainPage from "./MainPage";
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
    const [sideBarData, setSideBarData] = useState<ISeat[]>(seatData);
    const [modalData, setModalData] = useState<ISeat>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        setSideBarData(seatData);
    }, [seatData])

    const updateSideBarNav = (data?: ISeat | ISeat[]) => {

        if (data && Array.isArray(data)) setSideBarData(data)
        else if (data) setSideBarData([data]);
        else setSideBarData(seatData);
    }

    const updateNavTitle = (title: string) => {

    }

    const handleModal = (data: ISeat) => {
        setModalData(data)
        onOpen();
    }

    useEffect(() => {
        const seatIDArray: string[] = []
        Object.keys(metaData).forEach(key => {
            if (metaData[key].isSelected) seatIDArray.push(metaData[key].seat._id)
        })
        updateEventData(prev => ({ ...prev, ['seats']: seatIDArray }))

    }, [metaData])

    console.log(eventData)

    const updatedTitle = <EventInputCreator updateData={updateEventData} />
    const updatedMapSVG = <MapSVGCreator update={updateSideBarNav} updateNavTitle={updateNavTitle} seatMeta={metaData} updateMeta={setMetaData} />
    const updatedMapNav = <MapNavCreator seatData={sideBarData} handleModal={handleModal} updateSidebar={updateSideBarNav} seatMeta={metaData} updateMeta={setMetaData} />
    const updatedCreateBtn = eventData.name.length > 0 ? <CreateButton data={eventData} changePage={changePage}/> : null

    return (
        <>
            <SeatingMapLayout seatData={seatData} mode="create" svg={updatedMapSVG} nav={updatedMapNav} title={updatedTitle} footer={updatedCreateBtn} />
            <SeatDataModal isOpen={isOpen} onClose={onClose} seatInfo={modalData} />
        </>
    )

}

export default SeatingMapCreator;

const CreateButton = ({ data, changePage }: { data: IEventData, changePage: (param: React.ReactElement) => void  }) => {

    const handleSubmit = async () => {

        try {
            const res = await addEvent(data)

            if (res?.status === 200) changePage(<MainPage changePage={changePage} />)
        } catch (err) {
            console.log(err)
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