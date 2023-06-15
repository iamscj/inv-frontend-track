import { ThemeProvider, theme, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Spinner,
    Flex
} from '@chakra-ui/react';
import axios from "axios"
import CustomTable from '../components/CustomTable';
const AC = () => {
    const [ac_data, set_ac_data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([])
    const navigate = useNavigate();
    const get_AC_data = async () => {
        try {
            const response = await axios.get(`https://inv-server-gold.vercel.app/ac-details`);
            const data = response.data;
            set_ac_data(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        get_AC_data();
    }, []);

    useEffect(() => {
        if (ac_data.length > 0) {
            populateResultArray();
        }
    }, [ac_data]);

    const populateResultArray = () => {
        let result1 = ac_data;
        result1.map((item) => {
            for (let key in item) {
                if (key === 'converter_no') {
                    let val = item[key]
                    item["view_component"] = <Button colorScheme={'linkedin'} width="100%" onClick={() => navigate(`/ac-details/converter/${val}`)}>View</Button>
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
                accessor: "converter_no"
            },
            {
                Header: "Date",
                accessor: "date"
            },
            {
                Header: "View Compoent",
                accessor: "view_component"
            }
        ],
        []
    );

    return (
        <ThemeProvider theme={theme}>
            {isLoading ? (
                <Flex height="100vh" alignItems="center" justifyContent="center">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <>
                    <CustomTable columns={columns} data={result} name1={"AC Details"} />
                </>
            )}
        </ThemeProvider>
    );
};

export default AC;