import {  useDisclosure } from "@chakra-ui/react"
import { ISeat } from "../utils/interfaces";
import { useEffect, useState } from "react";
import SeatDataModal from "./SeatDataModal";
import SeatingMapLayout from "./SeatingMapLayout";
import MapNav from "./MapNav";
import MapSVG from "./SVGComponents/MapSVG";
//import anthemMap from "../


const SeatingMap = ({ seatData }: { seatData: ISeat[] }) => {
    const [sideBarData, setSideBarData] = useState<ISeat[]>(seatData);
    const [modalData, setModalData] = useState<ISeat>();
    const [navTitle, setNavTitle] = useState('ALL SEATS');
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
        setNavTitle(title)
    }

    const handleModal = (data: ISeat) => {
        setModalData(data)
        onOpen();
    }

    const updatedMapSVG = <MapSVG update={updateSideBarNav} updateNavTitle={updateNavTitle} />
    const updatedMapNav = <MapNav seatData={sideBarData} handleModal={handleModal} updateSidebar={updateSideBarNav} navTitle={navTitle} />

    return (
        <>
            <SeatingMapLayout seatData={seatData} mode="normal" svg={updatedMapSVG} nav={updatedMapNav} />
            <SeatDataModal isOpen={isOpen} onClose={onClose} seatInfo={modalData} />
        </>
    )
}

export default SeatingMap;