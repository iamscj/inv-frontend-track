import { ThemeProvider, theme, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import {
    Spinner,
    Flex
} from '@chakra-ui/react';
import axios from "axios"
import CustomTable from '../components/CustomTable';
import { useParams } from "react-router-dom";

const TC_details = () => {
    const [tc_data_for_converter_no, set_tc_data_for_converter_no] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([])
    const { converter_no } = useParams();

    const getFullNames = {
        'pm_1': 'Power Module 1',
        'pm_2': 'Power Module 2',
        'pm_3': 'Power Module 3',
        'pm_4': 'Power Module 4',
        'pm_5': 'Power Module 5',
        'pm_6': 'Power Module 6',
        'pm_7': 'Power Module 7',
        'pm_8': 'Power Module 8',
        'pm_9': 'Power Module 9',
        'dcu_1': 'Drive Control Unit 1',
        'dcu_2': ' Drive Control Unit 2',
        'dcu_3': ' Drive Control Unit 3',
        'viu': 'Vehicle Interface Unit',
        'mfi': 'MVB Fibre Interface'
    };

    const get_converter_details = async () => {
        try {
            const response = await axios.get(`https://inv-server-gold.vercel.app/tc-details/${converter_no}`);
            const data = response.data;
            set_tc_data_for_converter_no(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        get_converter_details();
    }, []);

    useEffect(() => {
        if (tc_data_for_converter_no.length > 0) {
            populateResultArray();
        }
    }, [tc_data_for_converter_no]);

    const populateResultArray = () => {
        let result1 = [];
        const keys = Object.keys(tc_data_for_converter_no[0])
        for (let i = 0; i < keys.length; i++) {
            result1.push({
                "key1": getFullNames[keys[i]],
                "key2": tc_data_for_converter_no[0][keys[i]],
                "key3": <Button colorScheme={'linkedin'} width="100%">Claim</Button>
            })
        }

        setResult(result1)
    };



    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "key1"
            },
            {
                Header: "Serial Number",
                accessor: "key2"
            },
            {
                Header: "Claim Warranty",
                accessor: "key3"
            }
        ],
        []
    );


    return (
        <ThemeProvider theme={theme}>
            {isLoading || result.length === 0 ? (
                <Flex height="100vh" alignItems="center" justifyContent="center">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <>
                    <CustomTable columns={columns} data={result} name1="Components" name2={"Converter Number " + converter_no} />
                </>
            )}
        </ThemeProvider>
    );
};

export default TC_details;