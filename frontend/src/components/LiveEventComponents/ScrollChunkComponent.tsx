import { Center, Spinner } from "@chakra-ui/react"
import MapNavAccordion from "./MapNavAccordion"
import { useEffect, useRef, useState } from "react"
import { ISeat } from "../../interfaces/interfaces";


const ScrollChunkComponent = ({ seatData, handleModal, isBottom }:
    { seatData: ISeat[], handleModal: (param: ISeat) => void, isBottom: boolean }) => {
    const [chunk, updateChunk] = useState<ISeat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isInitial = useRef(true);
    const chunkSize = 15;

    const loadMoreItems = () => {
        const nextChunk = seatData.slice(0, chunk.length + chunkSize);
        updateChunk(nextChunk);
    }

    useEffect(() => {
        loadMoreItems();
        setIsLoading(false);
        isInitial.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isBottom) loadMoreItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBottom])

    useEffect(() => {
        if (!isInitial.current) {
            updateChunk(() => {
                const nextChunk = seatData.slice(0, chunkSize);
                return nextChunk;
            });
        }
    }, [seatData])

    return (
        <>
            {
                isLoading ?
                    <Center style={{ height: "50%" }}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            color='blue.500'
                            size='xl'
                        />
                    </Center> :
                    chunk.map(seatInfo =>
                        <MapNavAccordion
                            key={seatInfo._id}
                            seatInfo={seatInfo}
                            handleModal={handleModal} />
                    )
            }
        </>
    )
}

export default ScrollChunkComponent;