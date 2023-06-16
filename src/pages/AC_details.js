import { ThemeProvider, theme, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import {
    Spinner,
    Flex
} from '@chakra-ui/react';
import axios from "axios"
import CustomTable from '../components/CustomTable';
import { useParams } from "react-router-dom";

const AC_details = () => {
    const [ac_data_for_converter_no, set_ac_data_for_converter_no] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([])
    const { converter_no } = useParams();

    const getFullNames = {
        'cr_1': 'Controlled Rectifier 1',
        'cr_2': 'Controlled Rectifier 2',
        'buffer_1': 'Buffer 1',
        'buffer_2': 'Buffer 2',
        'inverter_1': 'Inverter 1',
        'inverter_2': 'Inverter 2',
        'aci_1': 'Auxilary Control Interface 1',
        'aci_2': 'Auxilary Control Interface 2',
        'battery_charger': 'Battery Charger'
    };

    const get_converter_details = async () => {
        try {
            const response = await axios.get(`https://inv-server-gold.vercel.app/ac-details/${converter_no}`);
            const data = response.data;
            set_ac_data_for_converter_no(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        get_converter_details();
    }, []);

    useEffect(() => {
        if (ac_data_for_converter_no.length > 0) {
            populateResultArray();
        }
    }, [ac_data_for_converter_no]);

    const populateResultArray = () => {
        let result1 = [];
        const keys = Object.keys(ac_data_for_converter_no[0])
        for (let i = 0; i < keys.length; i++) {
            result1.push({
                "key1": getFullNames[keys[i]],
                "key2": ac_data_for_converter_no[0][keys[i]],
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

export default AC_details;