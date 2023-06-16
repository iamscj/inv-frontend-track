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
const acDataInitialValues = {
    converter_no: "",
    cr_1: "",
    cr_2: "",
    buffer_1: "",
    buffer_2: "",
    inverter_1: "",
    inverter_2: "",
    aci_1: "",
    aci_2: "",
    battery_charger: "",
    date: "",
}

export default function ACForm() {
    const navigate = useNavigate();
    const toast = useToast();
    const [acData, setACData] = useState(acDataInitialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const onInputChange = (e) => {
        setACData({ ...acData, [e.target.name]: e.target.value })
    }
    const submitInsert = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("")
        if (acData.converter_no.trim() === "") {
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
        const updatedacData = {
            ...acData,
            date: sqlFormattedDate,
        };

        setACData(updatedacData);

        try {

            const response = await axios.post(`https://inv-server-gold.vercel.app/insert-ac`, acData);
            console.log(response.data);

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
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Controlled Rectifier 1' bg={"pink"} />
                                    <Input name="cr_1" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Controlled Rectifier 2' bg={"pink"} />
                                    <Input name="cr_2" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Buffer 1' bg={"green.100"} />
                                    <Input name="buffer_1" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Buffer 2' bg={"green.100"} />
                                    <Input name="buffer_2" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Inverter 1' bg={"blue.200"} />
                                    <Input name="inverter_1" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Inverter 2' bg={"blue.200"} />
                                    <Input name="inverter_2" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Auxilary Control Interface 1' bg={"cyan.300"} />
                                    <Input name="aci_1" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="4px">
                                <InputGroup>
                                    <InputLeftAddon children='Auxilary Control Interface 2' bg="cyan.300" />
                                    <Input name="aci_2" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Battery Charger' bg="yellow.200" />
                                    <Input name="battery_charger" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
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