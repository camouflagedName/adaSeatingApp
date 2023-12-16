import { Flex, Container, Text } from "@chakra-ui/react"



export const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {

    return (
        <Flex direction='column' justify='center' style={{ height: "100vh" }}>
            <Container centerContent maxW='container.lg' style={{ margin: "auto" }}>
                <Text textAlign="center" fontSize='4xl' colorScheme="red">
                    {errorMessage}
                </Text>
            </Container>
        </Flex>
    )

}