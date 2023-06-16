import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container } from '@chakra-ui/react'
import TCForm from '../components/TCForm'
import ACForm from '../components/ACForm'
import VCUForm from '../components/VCUForm'

const InsertModules = () => {
    return (
        <Container maxW={"80vw"} >
            <Tabs variant='enclosed'>
                <TabList>
                    <Tab>Tranction Controller</Tab>
                    <Tab>Aux Controller</Tab>
                    <Tab>Vehicle Controller Unit</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <TCForm />
                    </TabPanel>
                    <TabPanel>
                        <ACForm />
                    </TabPanel>
                    <TabPanel>
                        <VCUForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    )
}

export default InsertModules
