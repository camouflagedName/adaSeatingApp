import { Text, Center, Box, Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import MainPage from "./MainPage";

const SeatingMapTitle = ({ changePage }: { changePage: (param: React.ReactElement) => void }) => {

    const handleReturnBtnClick = () => {
        changePage(<MainPage changePage={changePage} />)
    }

    return (
        <>
            <Box marginBottom={'auto'} marginTop={'auto'}>
                <Button onClick={handleReturnBtnClick}>
                    <ChevronLeftIcon color='gray.500' />
                    Return
                </Button>
            </Box>
            <Center>
                <Text fontSize='4xl'>ADA Seating</Text>
            </Center>
        </>
    )
}

export default SeatingMapTitle;