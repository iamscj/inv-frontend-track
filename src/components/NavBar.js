import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    Center,
    useToast
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from '@chakra-ui/icons';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const { isOpen, onToggle } = useDisclosure();
    const toast = useToast();
    // const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        // signOut(auth).then((userCredetial) => {
        //     // Signed in
        //     localStorage.removeItem('uid');
        //     toast({
        //         id: 'Success',
        //         title: `Logged Out Successfully!`,
        //         status: "success",
        //         duration: 2000,
        //         isClosable: true,
        //         position: "bottom-right",
        //     })
        //     navigate('/')
        // })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         toast({
        //             id: 'Error',
        //             title: errorMessage,
        //             status: "error",
        //             duration: 2000,
        //             isClosable: true,
        //             position: "bottom-right",
        //         });
        //     });
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue('blue.900', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                height={'8vh'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Image src='/logo.png' height='6vh' />
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Link>
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        mr={3}
                        spacing={6}>
                        <Button
                            as={'a'}
                            fontSize={'sm'}
                            color={'white'}
                            fontWeight={400}
                            variant={'link'}
                            _hover={{
                                textDecoration: 'none',
                                color: 'yellow',
                            }}
                            onClick={logout}>
                            Logout
                            <Image marginLeft={'5px'} src='/logout.svg' height='3vh' />
                        </Button>
                    </Stack>
                </Link>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {localStorage.getItem('uid') === 'b0x2xPKuoaasyS82hrC49hqTwLe2' && NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'click'} placement={'bottom-start'}>
                        {({ isOpen, onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Center>
                                        <Link
                                            p={2}
                                            href={navItem.href ?? '#'}
                                            fontSize={'sm'}
                                            fontWeight={500}
                                            color={'white'}
                                            _hover={{
                                                textDecoration: 'none',
                                                color: 'yellow',
                                            }}>
                                            {navItem.drops && <Icon color={'white'} w={5} h={5} as={isOpen ? ChevronUpIcon : ChevronDownIcon} />}
                                            {navItem.label}
                                        </Link>
                                    </Center>
                                </PopoverTrigger>

                                {navItem.children && (
                                    <PopoverContent
                                        border={0}
                                        boxShadow={'xl'}
                                        bg={popoverContentBgColor}
                                        p={4}
                                        rounded={'xl'}
                                        minW={'sm'}>
                                        <Stack>
                                            {navItem.children.map((child) => (
                                                <DesktopSubNav key={child.label} {...child} />
                                            ))}
                                        </Stack>
                                    </PopoverContent>
                                )}
                            </>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel, drops }) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'blue.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, drops }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};


const NAV_ITEMS = [
    {
        label: 'Home',
        drops: false,
        href: '#',
    },
    {
        label: 'Database',
        drops: true,
        children: [
            {
                label: 'Traction Controller',
                subLabel: 'View all dispatched TCs',
                href: '#',
            },
            {
                label: 'Vehicle Control Unit',
                subLabel: 'View all dispatched VCUs',
                href: '#',
            },
            {
                label: 'Auxillary Elements',
                subLabel: 'View all dispatched AUXs',
                href: '#',
            },
            {
                label: 'Warranty Claims',
                subLabel: 'View all pending warranty claims',
                href: '#',
            },
        ],
    },
    {
        label: 'Add Data',
        drops: true,
        children: [
            {
                label: 'Add New TC',
                href: '#',
            },
            {
                label: 'Add New VCU',
                href: '#',
            },
            {
                label: 'Add New AUX',
                href: '#',
            },
        ],
    },
];