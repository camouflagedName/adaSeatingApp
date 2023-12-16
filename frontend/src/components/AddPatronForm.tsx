import { Box, Card, CardBody, CardHeader, FormControl, FormLabel, HStack, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react"
import SelectableButton from "./SelectableButton";
import { useEffect, useState } from "react";
import { IEventData, IPatronData } from "../interfaces/interfaces";

interface IButtons {
    [key: string]: string;
}

const AddPatronForm = ({ event, patronData, setPatronData }: { event: IEventData, patronData: IPatronData, setPatronData: React.Dispatch<React.SetStateAction<IPatronData>>  }) => {
    const [patronNeeds, setPatronNeeds] = useState<string[]>([]);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const id = evt.target.id;
        let value: string | number = evt.target.value;

        if (id === "numberRequested") value = Number(value);
        setPatronData(prev => { return { ...prev, [id]: value } })
    }

    const handleSelectableButtonClick = (value: string, selected: boolean) => {
        if (selected) setPatronNeeds([...patronNeeds, value])
        else setPatronNeeds(prev => {
            const copyPrevious: string[] = [...prev]
            if (copyPrevious.includes(value)) {
                const index = copyPrevious.indexOf(value);
                const deletedArray = copyPrevious.splice(index, 1);
                console.log(deletedArray)
            }

            return copyPrevious
        })
    }

    const buttons: IButtons = {
        mobileDevice: "Mobile Device",
        stairs: "No Stairs",
        walkingDevice: "Walking Device",
        standing: "Cannot Stand",
        walking: "Limit Walking",
        emt: "EMT Access",
        space: "Uncrowded",
        injury: "Injured",
        pregnant: "Pregnant",
        other: "Other Health Issue"
    }

    const buttonsArr: React.ReactElement[] = []

    for (const key in buttons) {
        if (Object.prototype.hasOwnProperty.call(buttons, key)) {
            const value = buttons[key as keyof typeof buttons];
            buttonsArr.push(
                <SelectableButton key={key} id={key} label={value} updateSelection={handleSelectableButtonClick} />
            )
        }
    }

    useEffect(() => {
        setPatronData(prev => { return { ...prev, notes: patronNeeds } })
    }, [patronNeeds, setPatronData])

    return (
        <>
            <Card variant={"unstyled"}>
                <CardHeader>

                </CardHeader>
                <CardBody>
                    <SimpleGrid row={3} spacing={7}>
                        <HStack>
                            <Heading size='sm' textTransform='uppercase'>
                                Event:
                            </Heading>
                            <Text fontSize='sm'>
                                {event.name}
                            </Text>
                        </HStack>
                        <HStack>
                            <Heading size='sm' textTransform='uppercase'>
                                Date:
                            </Heading>
                            <Text fontSize='sm'>
                                {event.date.toLocaleString().split("T")[0]}
                            </Text>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel>Patron Name</FormLabel>
                            <Input id="fullName" type={"text"} onChange={handleChange} value={patronData.fullName} />
                            <FormLabel>Number of Seats Requested</FormLabel>
                            <Input id="numberRequested" type={"text"} onChange={handleChange} value={patronData.numberRequested} />
                            <FormLabel>Notes</FormLabel>
                            <Box>
                                <SimpleGrid columns={3} row={4} spacing={5}>
                                    {buttonsArr}
                                </SimpleGrid>
                            </Box>
                        </FormControl>
                    </SimpleGrid>
                </CardBody>
            </Card>
        </>
    )
}

export default AddPatronForm;