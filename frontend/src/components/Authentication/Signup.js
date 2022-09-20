import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmpassword] = useState()
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const history = useHistory()

  const handlePasswordVisibleClick = () => setShowPassword(!showPassword)

  const postImage = async pic => {
    setLoading(true)
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (allowedImageTypes.includes(pic?.type)) {
      const form = new FormData()
      form.append('upload_preset', 'Super-Chat')
      form.append('file', pic)

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/programmer-shipon/image/upload',
        form
      )
      setImage(data.url)
    } else {
      toast({
        title: 'Please Select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }

    setLoading(false)
  }

  const signupSubmitHandler = async () => {
    setLoading(true)

    if (!(name && email && password && confirmPassword)) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return setLoading(false)
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match..',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return setLoading(false)
    }

    try {
      const body = { name, email, password, pic: image }
      const { data } = await axios.post('/api/user', body)
      localStorage.setItem('userInfo', JSON.stringify(data))

      /**
      @WARNING first implement this route then enable
      
      history.push('/chats') */
    } catch (error) {
      toast({
        title: ' Error Occured! ',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }

    setLoading(false)
  }

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
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={e => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordVisibleClick}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="ConfirmPassword" isRequired>
        <FormLabel> Confirm-Password </FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={e => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordVisibleClick}>
              {showPassword ? 'Hide' : 'Show'}
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
          onChange={e => postImage(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={signupSubmitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}
