import { 
  Box, 
  Container, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login'
import { Signup } from '../components/Authentication/Signup'

const HomePage = () => {
  return (
    <Container
      maxW='xl'
      centerContent
    >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize='4xl'
          fontFamily='work sans'
          color='black'
          textAlign='center'
        > Talk-A-Tive </Text>
      </Box>
      <Box
        bg='white'
        w='100%'
        p={4}
        borderRadius='lg'
        borderWidth='1px'
      >
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList mb='1em'>
            <Tab width='100%'>Login</Tab>
            <Tab width='100%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage