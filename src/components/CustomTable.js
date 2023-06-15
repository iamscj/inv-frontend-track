import React from "react";
import { useTable, usePagination } from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    IconButton,
    Text,
    Tooltip,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Center,
    Container,
    Heading
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
} from "@chakra-ui/icons";

function CustomTable({ columns, data, name1, name2 }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 6 }
        },
        usePagination
    );

    return (
        <>
            <Container display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"1%"}>
                <Heading fontSize={'4xl'} fontFamily={'body'} fontWeight={500}>
                    {name1}
                </Heading>
            </Container>
            <Container display={"flex"} justifyContent={"center"} mt={"1%"}>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    {name2}
                </Heading>
            </Container>
            <Center>

                <Table {...getTableProps()} colorScheme="linkedin" variant='striped' width={'50%'} border='3px solid gray' marginTop={'5vh'}>
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map((cell, index) => {
                                        return (
                                            <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Center>
            <Center>
                <Flex justifyContent="space-between" m={4} alignItems="center" width={'50%'} >
                    <Flex>
                        <Tooltip label="First Page">
                            <IconButton
                                onClick={() => gotoPage(0)}
                                isDisabled={!canPreviousPage}
                                icon={<ArrowLeftIcon h={3} w={3} />}
                                mr={4}
                                backgroundColor='gray.400'
                            />
                        </Tooltip>
                        <Tooltip label="Previous Page">
                            <IconButton
                                onClick={previousPage}
                                isDisabled={!canPreviousPage}
                                icon={<ChevronLeftIcon h={6} w={6} />}
                                backgroundColor='gray.300'
                            />
                        </Tooltip>
                    </Flex>

                    <Flex alignItems="center">
                        <Text flexShrink="0" mr={8}>
                            Page{" "}
                            <Text fontWeight="bold" as="span">
                                {pageIndex + 1}
                            </Text>{" "}
                            of{" "}
                            <Text fontWeight="bold" as="span">
                                {pageOptions.length}
                            </Text>
                        </Text>
                        <Text flexShrink="0">Go to page:</Text>{" "}
                        <NumberInput
                            ml={2}
                            mr={8}
                            w={28}
                            min={1}
                            max={pageOptions.length}
                            onChange={(value) => {
                                const page = value ? value - 1 : 0;
                                gotoPage(page);
                            }}
                            defaultValue={pageIndex + 1}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Select
                            w={32}
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[6, 8, 10, 12, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </Select>
                    </Flex>

                    <Flex>
                        <Tooltip label="Next Page">
                            <IconButton
                                onClick={nextPage}
                                isDisabled={!canNextPage}
                                icon={<ChevronRightIcon h={6} w={6} />}
                                backgroundColor='gray.300'
                            />
                        </Tooltip>
                        <Tooltip label="Last Page">
                            <IconButton
                                onClick={() => gotoPage(pageCount - 1)}
                                isDisabled={!canNextPage}
                                icon={<ArrowRightIcon h={3} w={3} />}
                                ml={4}
                                backgroundColor='gray.400'
                            />
                        </Tooltip>
                    </Flex>
                </Flex>
            </Center>
        </>
    );
}

export default CustomTable;