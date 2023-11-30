import { useDisclosure } from "@chakra-ui/react"
import { IAppData, ISeat, ISortedSeatMap } from "../interfaces/interfaces";
import { useState, useContext, useMemo } from "react";
import SeatDataModal from "./SeatDataModal";
import SeatingMapLayout from "./SeatingMapLayout";
import MapNav from "./MapNav";
import MapSVG from "./SVGComponents/MapSVG";
import SeatingMapTitle from "./SeatingMapTitle";
import { DataContext } from "../context/context";
import { LiveEventContext } from '../context/context';
import seatSorter from "../utils/seatSorter";
import mapper from "../utils/mapper";

const SeatingMapManager = ({ changePage, inPlaySeatIDs }: { changePage: (param: React.ReactElement) => void, inPlaySeatIDs: string[] }) => {
    const contextData = useContext(DataContext);
    const { seatData } = contextData as IAppData;
    const inPlaySeats = seatData.filter(seat => inPlaySeatIDs.includes(seat._id))
    const sortedInPlaySeats = seatSorter(inPlaySeats, "array") as ISeat[];
    const sortedStructInPlaySeats = seatSorter(inPlaySeats) as ISortedSeatMap;
    const [mapNavSeatData, setMapNavSeatData] = useState<ISeat[] | ISeat>(inPlaySeats);
    const [modalData, setModalData] = useState<ISeat>();
    const [navTitle, setNavTitle] = useState('ALL SEATS');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const updateSideBarNav = (data?: ISeat | ISeat[]) => {
        if (data) setMapNavSeatData(data);
        else setMapNavSeatData(inPlaySeats);
    }

    const updateNavTitle = (title: string) => {
        setNavTitle(title)
    }

    const handleModal = (data: ISeat) => {
        setModalData(data)
        onOpen();
    }

    const seatDataMap = useMemo(() => mapper(inPlaySeats) as Map<string, ISeat>, [inPlaySeats])

    return (
        <LiveEventContext.Provider value={{ sortedInPlaySeats: sortedInPlaySeats, sortedStructInPlaySeats: sortedStructInPlaySeats, seatDataMap: seatDataMap  }}>
            <SeatingMapLayout>
                <SeatingMapLayout.Header>
                    <SeatingMapTitle changePage={changePage} />
                </SeatingMapLayout.Header>
                <SeatingMapLayout.Main>
                    <MapSVG update={updateSideBarNav} updateNavTitle={updateNavTitle} />
                </SeatingMapLayout.Main>
                <SeatingMapLayout.Nav>
                    <MapNav mapNavSeatData={mapNavSeatData} handleModal={handleModal} updateSidebar={updateSideBarNav} navTitle={navTitle} />
                </SeatingMapLayout.Nav>
                <SeatingMapLayout.Footer>
                    <></>
                </SeatingMapLayout.Footer>
            </SeatingMapLayout>
            <SeatDataModal isOpen={isOpen} onClose={onClose} seatInfo={modalData} />
        </LiveEventContext.Provider>
    )
}

export default SeatingMapManager;