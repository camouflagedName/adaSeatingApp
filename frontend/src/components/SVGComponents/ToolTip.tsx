import { Popover, PopoverContent, PopoverBody, Stack, StackDivider, Heading, Badge, Box, Text } from "@chakra-ui/react";
import { IPatronData, ISeat } from "../../interfaces/interfaces";
import { useContext, useEffect, useRef, useState } from "react";
import { LiveEventContext } from "../../context/context";
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";
import "../../style/style.css"

interface ToolTipData {
    cx: string;
    cy: string;
    patronID: string;
}

interface SeatComponentProps {
    toolTipData: ToolTipData;
    isOpen: boolean;
    onClose: () => void;
}

const ToolTip = ({ isOpen, toolTipData: { cx, cy, patronID } }: SeatComponentProps) => {
    const { seatDataMap, patronDataMap } = useContext(LiveEventContext) as IAppLiveEventData;
    const [patronData, setPatronData] = useState<IPatronData | null>(null);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (patronDataMap) {
            const patron = patronDataMap.get(patronID);
            if (patron) setPatronData(patron);
        }
    }, [patronDataMap, patronID]);


    return (
        <div style={{ position: 'absolute', left: cx, top: `${cy}` }}>
            {patronData &&
                <Popover
                    isOpen={isOpen}
                    isLazy
                    closeOnBlur={true}
                >
                    <PopoverContent ref={divRef} className="tooltip-arrow">
                        <PopoverBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Patron
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {patronData.fullName}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Seats
                                    </Heading>

                                    {
                                        patronData.seatID.map(id => {
                                            const seatData = seatDataMap.get(id) as ISeat;
                                            return <Text key={id} pt='2' fontSize='sm'>{`${seatData.section.split(/(?=[A-Z])/).join(" ")}, Row ${seatData.row}, #${seatData.seatNumber}`}</Text>
                                        })
                                    }

                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Notes
                                    </Heading>
                                    {patronData.notes.map(note => (
                                        <Box key={note}>
                                            <Badge>{note}</Badge>
                                        </Box>
                                    ))}
                                </Box>
                            </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover >
            }
        </div >
    )
}

export default ToolTip;