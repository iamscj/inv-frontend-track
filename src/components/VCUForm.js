import {
    Flex,
    Box,
    FormControl,
    Input,
    Stack,
    Button,
    useColorModeValue,
    InputGroup,
    InputLeftAddon,
    Text,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const vcuDataInitialValues = {
    converter_no: "",
    date: "",
}

export default function VCUForm() {
    const navigate = useNavigate();
    const toast = useToast();
    const [vcuData, setVCUData] = useState(vcuDataInitialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const onInputChange = (e) => {
        setVCUData({ ...vcuData, [e.target.name]: e.target.value })
    }
    const submitInsert = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("")
        if (vcuData.converter_no.trim() === "") {
            toast({
                title: "Error",
                description: "Please fill all the fields",
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: 'bottom-right'
            })
            setIsLoading(false);
            return;
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const sqlFormattedDate = `${year}-${month}-${day}`;
        const updatedvcuData = {
            ...vcuData,
            date: sqlFormattedDate,
        };

        setVCUData(updatedvcuData);

        try {
            const response = await axios.post(`https://inv-server-gold.vercel.app/insert-vcu`, vcuData);
            if (response.data.msg && response.data.msg !== 'successfull') {
                setError(response.data.msg)
                toast({
                    title: "Duplicates Found",
                    description: response.data.msg,
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                    position: 'bottom-right'
                })
                setIsLoading(false);
                return;
            }
            navigate('/new')
            toast({
                title: response.data.msg,
                description: "Successfully inserted",
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'bottom-right'
            })
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }
    return (
        <Flex
            minH={'80vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} width={'80vw'} py={12} px={6}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl>
                            <InputGroup width={"67vw"} mx="25px" margin={"auto"}>
                                <InputLeftAddon children='Converter Number' bg="orange.300" />
                                <Input name="converter_no" onChange={(e) => onInputChange(e)} />
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                isLoading={isLoading}
                                width={"40%"}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                margin={"auto"}
                                onClick={submitInsert}
                            >
                                ADD COMPONENT
                            </Button>
                            {
                                error.length !== 0 && (
                                    <Text
                                        bg={"red"}
                                        margin={"auto"}
                                        padding={"20px"}
                                        color={"white"}
                                    >
                                        Error : <strong>{String(error)}</strong>
                                    </Text>
                                )
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}