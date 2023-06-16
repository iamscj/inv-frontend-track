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
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Button onClick={() => navigate('/tc-details')} >TC DETAILS</Button>
            <Button onClick={() => navigate('/ac-details')} >AC DETAILS</Button>
            <Button onClick={() => navigate('/vcu-details')} >VCU DETAILS</Button>
            <Button onClick={() => navigate('/new')} >ADD COMP</Button>
            <Grid bg='blue.100' marginTop='10vh' height='90vh' px={'4vh'} py={'4vh'} templateColumns='repeat(5, 1fr)' templateRows='repeat(3, 1fr)' rowGap={3} columnGap={3}>
                <GridItem w='100%' h='54vh' rowSpan={2} colSpan={3} border='3px solid lightgray' borderRadius={10} bg='white' />
                <GridItem w='100%' h='54vh' rowSpan={2} colSpan={1} border='3px solid lightgray' borderRadius={10} bg='white' />
                <GridItem w='100%' h='54vh' rowSpan={2} colSpan={1} border='3px solid lightgray' borderRadius={10} bg='white' />
                <GridItem w='100%' h='27vh' rowSpan={1} colSpan={5} border='3px solid lightgray' borderRadius={10} bg='white' />
            </Grid>
        </ThemeProvider>
    )
}

export default Dashboard;