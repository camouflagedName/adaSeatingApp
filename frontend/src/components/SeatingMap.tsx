import {  useDisclosure } from "@chakra-ui/react"
import { ISeat } from "../interfaces/interfaces";
import { useEffect, useState } from "react";
import SeatDataModal from "./SeatDataModal";
import SeatingMapLayout from "./SeatingMapLayout";
import MapNav from "./MapNav";
import MapSVG from "./SVGComponents/MapSVG";
import SeatingMapTitle from "./SeatingMapTitle";


const SeatingMap = ({ seatData, changePage }: { seatData: ISeat[], changePage: (param: React.ReactElement) => void }) => {
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

    const title = <SeatingMapTitle changePage={changePage}/>
    const footer = <></>
    const updatedMapSVG = <MapSVG update={updateSideBarNav} updateNavTitle={updateNavTitle} />
    const updatedMapNav = <MapNav seatData={sideBarData} handleModal={handleModal} updateSidebar={updateSideBarNav} navTitle={navTitle} />

    return (
        <>
            <SeatingMapLayout mode="normal" svg={updatedMapSVG} nav={updatedMapNav} title={title} footer={footer} />
            <SeatDataModal isOpen={isOpen} onClose={onClose} seatInfo={modalData} />
        </>
    )
}

export default SeatingMap;