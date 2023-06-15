import { ThemeProvider, theme, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import {
    Spinner,
    Flex
} from '@chakra-ui/react';
import axios from "axios"
import CustomTable from '../components/CustomTable';
import { useNavigate, useParams } from "react-router-dom";

const VCU = () => {
    const navigate = useNavigate();
    const [vcu_data, set_vcu_data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([])
    const get_vcu_details = async () => {
        try {
            const response = await axios.get(`https://inv-server-gold.vercel.app/vcu-details`);
            const data = response.data;
            set_vcu_data(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        get_vcu_details();
    }, []);

    useEffect(() => {
        if (vcu_data.length > 0) {
            populateResultArray();
        }
    }, [vcu_data]);

    const populateResultArray = () => {
        let result1 = vcu_data;
        result1.map((item) => {
            for (let key in item) {
                if (key === 'module_no') {
                    let val = item[key]
                    item["view_component"] = <Button colorScheme={'linkedin'} width="100%">Claim</Button>
                }
                else if (key === 'date') {
                    const dateObject = new Date(item[key]);
                    const dateOnly = dateObject.toISOString().split('T')[0];
                    item[key] = dateOnly;
                }
            }
        });

        setResult(result1)
    };



    const columns = React.useMemo(
        () => [
            {
                Header: "Converter Number",
                accessor: "module_no"
            },
            {
                Header: "Date",
                accessor: "date"
            },
            {
                Header: "Claim Warranty",
                accessor: "view_component"
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
                    <CustomTable columns={columns} data={result} name1="VCU Details" />
                </>
            )}
        </ThemeProvider>
    );
};

export default VCU;