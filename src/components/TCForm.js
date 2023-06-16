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
const tcDataInitialValues = {
    converter_no: "",
    pm_1: "",
    pm_2: "",
    pm_3: "",
    pm_4: "",
    pm_5: "",
    pm_6: "",
    pm_7: "",
    pm_8: "",
    pm_9: "",
    dcu_1: "",
    dcu_2: "",
    dcu_3: "",
    viu: "",
    mfi: "",
    date: "",
}


export default function TCForm() {
    const toast = useToast();
    const navigate = useNavigate();
    const [tcData, setTCData] = useState(tcDataInitialValues);
    const onInputChange = (e) => {
        setTCData({ ...tcData, [e.target.name]: e.target.value })
    }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const submitInsert = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("")
        if (tcData.converter_no.trim() === "") {
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
        const updatedTCData = {
            ...tcData,
            date: sqlFormattedDate,
        };

        setTCData(updatedTCData);

        try {
            const response = await axios.post(`https://inv-server-gold.vercel.app/insert-tc`, tcData);
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
                        <FormControl isRequired>
                            <InputGroup width={"67vw"} mx="25px" margin={"auto"}>
                                <InputLeftAddon children='Converter Number' bg="orange.300" />
                                <Input name="converter_no" onChange={(e) => onInputChange(e)} />
                            </InputGroup>
                        </FormControl>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 1' bg={"pink"} />
                                    <Input name="pm_1" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 2' bg={"pink"} />
                                    <Input name="pm_2" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 3' bg={"pink"} />
                                    <Input name="pm_3" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 4' bg={"pink"} />
                                    <Input name="pm_4" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 2' bg={"pink"} />
                                    <Input name="pm_5" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 6' bg={"pink"} />
                                    <Input name="pm_6" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 7' bg={"pink"} />
                                    <Input name="pm_7" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 8' bg={"pink"} />
                                    <Input name="pm_8" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Power Module 9' bg={"pink"} />
                                    <Input name="pm_9" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="4px">
                                <InputGroup>
                                    <InputLeftAddon children='Drive Control Unit 1' bg="green.100" />
                                    <Input name="dcu_1" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Drive Control Unit 2' bg="green.100" />
                                    <Input name="dcu_2" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Drive Control Unit 3' bg="green.100" />
                                    <Input name="dcu_3" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='Vehicle Interface Unit' bg="blue.200" />
                                    <Input name="viu" onChange={(e) => onInputChange(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl mx="15px">
                                <InputGroup>
                                    <InputLeftAddon children='MVB Fibre Interface' bg="yellow.200" />
                                    <Input name="mfi" onChange={(e) => onInputChange(e)} />
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