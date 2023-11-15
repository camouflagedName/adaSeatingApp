import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Menu, MenuButton, MenuItem, MenuList, } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { DateValue, IEventData } from "../utils/creatorInterfaces";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const EventInputCreator = ({ updateData }: {
    updateData: React.Dispatch<React.SetStateAction<IEventData>>
}) => {
    const [dateValue, onCalendarChange] = useState<DateValue>(new Date());
    const [inputValue, onInputChange] = useState<string>('')

    useEffect(()=> {
        updateData(prev => ({ ...prev, ['date']: dateValue}))
    }, [dateValue, updateData])

    useEffect(()=> {
        updateData(prev => ({ ...prev, ['name']: inputValue}))
    }, [inputValue, updateData])

    return (
        <Flex justify={'space-evenly'} h={'100%'}>
            <Box w="50%" marginBottom={'auto'} marginTop={'auto'}>
                <Input placeholder='Event Title' size='lg' onChange={(evt) => onInputChange(evt.target.value)} />
            </Box>
            <Box marginBottom={'auto'} marginTop={'auto'}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {dateValue ? formatDate(dateValue) : "Select a Date"}
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Calendar onChange={onCalendarChange} value={dateValue} />
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
}

export default EventInputCreator;

function formatDate(date: DateValue) {
    if (Array.isArray(date)) return date.toLocaleString();
    else if (date) return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}