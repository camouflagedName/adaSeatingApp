import { Flex, Checkbox, Center, Button, Box } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { ISeat } from "../../interfaces/interfaces";
import { EventCreator } from "../../context/context";
import { IAppEventCreatorData } from "../../interfaces/creatorInterfaces";

const MapNavCreatorRowSelector = ({ label, seatDataArr, metaData, handleModalBtnClick }:
    { label: string, seatDataArr: ISeat[], metaData: [string, boolean][], handleModalBtnClick: (content: ISeat[]) => void }) => {
    const { updateMeta } = useContext(EventCreator) as IAppEventCreatorData;
    const [isChecked, setIsChecked] = useState(true);

    const handleSelectedCheck = (updatedMetaData: object) => {
        updateMeta(prev => {
            return {...prev, ...updatedMetaData}
        } );
    }

    const handleCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = evt.target.checked
        let meta = {}
    
        seatDataArr.forEach(seat =>
            meta = {
                ...meta,
                [seat._id]: isChecked,
            }
        )
    
        handleSelectedCheck(meta);
    }
 
    useEffect(() => {
        if (metaData.length > 0) {
            let isCheckedEffectVal = true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const [_id, value] of metaData) {
                if (!value) {
                    isCheckedEffectVal = false
                    break;
                }
            }
            setIsChecked(isCheckedEffectVal);
        } else setIsChecked(false)

    }, [metaData])


    return (
        <>
            <Box display="flex" flexDirection="column">
                <Flex justifyContent="space-between">
                    {`- ${label} -`}
                    <Checkbox name={`${label}-checkbox`} onChange={handleCheck} isChecked={isChecked}>Select All</Checkbox>
                </Flex>
                <Center marginTop={3}>
                    <Button onClick={() => handleModalBtnClick(seatDataArr)}>Select Individual Seats</Button>
                </Center>
            </Box>
        </>
    )
}

export default MapNavCreatorRowSelector;