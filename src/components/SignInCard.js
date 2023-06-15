import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function SignInCard() {
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const signIn = (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setLoading(false)
            toast({
                id: 'Success',
                title: `Sign In Successful!`,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "bottom-right",
            })
            navigate('/dashboard')   
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast({
                id: 'Error',
                title: errorMessage,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "bottom-right",
            });
            setLoading(false)
        });
       
    }

    return (
        <Stack spacing={8} mx={'auto'} width={'30vw'}>
            <Box
                borderBottomRadius={'10'}
                borderTopRightRadius={'10'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" borderColor={'gray.500'} onChange={(e)=>setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} borderColor={'gray.500'} onChange={(e)=>setPassword(e.target.value)}/>
                            <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() =>
                                        setShowPassword((showPassword) => !showPassword)
                                    }>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={2}>
                        <Button
                            bg={'green.500'}
                            color={'white'}
                            _hover={{
                                bg: 'green.700',
                            }}
                            onClick={signIn}
                            isLoading={loading}>
                            SIGN IN
                        </Button>
                        <Link textAlign={'end'} color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
}