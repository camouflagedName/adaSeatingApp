import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react"


const PatronFormAlert = ({ patronName }: { patronName: string }) => {


    return (
        <Alert
            status='info'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Patron {patronName} successfully added!
            </AlertTitle>
        </Alert>
    )
}

export default PatronFormAlert;