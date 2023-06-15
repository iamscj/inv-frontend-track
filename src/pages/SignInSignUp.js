import { Center, ThemeProvider, theme } from '@chakra-ui/react'
import React, { useState } from 'react'
import SignUpCard from '../components/SignUpCard'
import SignInCard from '../components/SignInCard'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Container,
    useColorModeValue,
    Grid,
    GridItem
} from '@chakra-ui/react';

const SignInSignUp = () => {
    const [currentAction, setCurrentAction] = useState(0);

    return (
        <ThemeProvider theme={theme}>

            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('blue.100', 'blue.900')}
            >
                <Box boxShadow={'xl`    '}>
                    <Stack borderRadius={'10'} bg='blue.300' spacing={0} mx={'auto'} maxW={'xxl'} py={5} px={5}>
                        <Stack spacing={0} mx={'auto'} maxW={'xxl'} >
                            <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                                <GridItem borderTopRadius={'10'} colSpan={1} h='10' bg={currentAction > 0 ? 'blue.300' : 'white'} onClick={async () => {
                                    setCurrentAction(0)
                                }}><Center h='10' textAlign={'center'} fontWeight={'bold'} textColor={currentAction > 0 ? 'gray.600' : 'black'}>SIGN IN</Center></GridItem>
                                <GridItem borderTopRadius={'10'} colSpan={1} h='10' bg={currentAction > 0 ? 'white' : 'blue.300'} onClick={async () => {
                                    setCurrentAction(1)
                                }}><Center h='10' textAlign={'center'} fontWeight={'bold'} textColor={currentAction > 0 ? 'black' : 'gray.600'}>SIGN UP</Center></GridItem>
                            </Grid>
                            {currentAction > 0 ? <SignUpCard /> : <SignInCard />}
                        </Stack>
                    </Stack>
                </Box>
            </Flex>
        </ThemeProvider >
    )
}

export default SignInSignUp;