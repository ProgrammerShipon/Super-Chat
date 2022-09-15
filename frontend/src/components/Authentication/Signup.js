import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']

export const Signup = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmpassword] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleClick = () => setShow(!show)

  const postDetails = async pics => {
    setLoading(true)

    if (allowedImageTypes.includes(pics?.type)) {
      const form = new FormData()
      form.append('upload_preset', 'Super-Chat')
      form.append('file', pics)

      const { data } = await axios
        .post(
          'https://api.cloudinary.com/v1_1/programmer-shipon/image/upload',
          form,
          {
            headers: {
              'content-type':
                'multipart/form-data; boundary=---011000010111000001101001',
            },
          }
        )
        .catch(console.log) // Log error

      console.log(data)

      // Do whatever u want :)
    } else {
      toast({
        title: 'Please Select ans Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }

    setLoading(false)
  }
  const submitHandler = () => {}

  return (
    <VStack>
      <FormControl id="first-name" isRequired>
        <FormLabel> Name </FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={e => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel> Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={e => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="ConfirmPassword" isRequired>
        <FormLabel> Confirm-Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={e => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel> Upload Your Picture </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={e => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}
