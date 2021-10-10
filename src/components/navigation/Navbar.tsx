import { useRouter } from "next/router";
import NextLink from "next/link";
import { User } from "next-auth";
import { useSession, signOut, signIn } from "next-auth/client";
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
  BoxProps,
  Container,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FiLogIn, FiLogOut } from "react-icons/fi";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: "Inspiration",
  //   children: [
  //     {
  //       label: "Explore Design Work",
  //       subLabel: "Trending Design to inspire you",
  //       href: "#",
  //     },
  //     {
  //       label: "New & Noteworthy",
  //       subLabel: "Up-and-coming Designers",
  //       href: "#",
  //     },
  //   ],
  // },
  // {
  //   label: "Find Work",
  //   children: [
  //     {
  //       label: "Job Board",
  //       subLabel: "Find your dream design job",
  //       href: "#",
  //     },
  //     {
  //       label: "Freelance Projects",
  //       subLabel: "An exclusive list for contract work",
  //       href: "#",
  //     },
  //   ],
  // },
  // {
  //   label: "Secret",
  //   href: "/protected",
  // },
  {
    label: "All Users SSR",
    href: "/all-users",
  },
  {
    label: "All Users CSR",
    href: "/all-users-client",
  },
  {
    label: "Popular",
    children: [
      { label: "Movies", subLabel: "All Popular Movies", href: "/popular-movies" },
      { label: "Actors", subLabel: "All Popular Actors", href: "/actors" },
    ],
  },
  {
    label: "Discover",
    href: "/movie-catalogue",
  },
  {
    label: "Search",
    children: [
      { label: "Movies", subLabel: "Search All Movies", href: "/" },
      { label: "Actors", subLabel: "Search All Actors", href: "/actors/search" },
    ],
  },
  {
    label: "Admin View",
    href: "/admin-view",
  },
  {
    label: "Groups",
    href: "/groups",
  },
  {
    label: "My Movie Reviews",
    href: "/reviews",
  },
];

const Navbar: React.FC<BoxProps> = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  const [session] = useSession();

  return (
    <Box
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      {...props}
    >
      <Container as={Flex} minH="16" align="center" py="2">
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        <Flex flex={1} align="center" justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily="heading"
            fontWeight="black"
            color={useColorModeValue("gray.800", "white")}
          >
            <NextLink href="/">Logo</NextLink>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml="5">
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: "none" }} direction="row" justify="flex-end" spacing={6}>
          {session?.user ? (
            <UserAvatar user={session.user} />
          ) : (
            <Button size="sm" leftIcon={<Icon as={FiLogIn} />} onClick={() => signIn("auth0")}>
              Sign In
            </Button>
          )}
        </Stack>
      </Container>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start" id="popover">
            <PopoverTrigger>
              <Text
                p={2}
                fontSize="sm"
                fontWeight="semibold"
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                <NextLink href={navItem.href ?? "#"}>{navItem.label}</NextLink>
              </Text>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                minW="sm"
                p="4"
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                rounded="xl"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NextLink href={href ?? "#"}>
      <Link
        as="div"
        role="group"
        display="block"
        p={2}
        rounded="md"
        _hover={{ bg: useColorModeValue("primary.50", "gray.900") }}
      >
        <Stack direction="row" align="center" justify="space-between">
          <Box>
            <Text
              fontWeight="semibold"
              transition="all .3s ease"
              _groupHover={{ color: "primary.700" }}
            >
              {label}
            </Text>
            <Text fontSize="sm">{subLabel}</Text>
          </Box>

          <Icon
            as={ChevronRightIcon}
            color="primary.500"
            boxSize={5}
            opacity={0}
            transform="translateX(-10px)"
            transition="all .3s ease"
            _groupHover={{ opacity: 1, transform: "translateX(0)" }}
          />
        </Stack>
      </Link>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <NextLink href={href ?? "#"}>
        <Flex
          py={2}
          justify="space-between"
          align="center"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition="all .25s ease-in-out"
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </NextLink>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
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

const UserAvatar: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton>
        <Stack direction="row" spacing="2" align="center">
          <Avatar name={user.name!} src={user.image!} boxSize="10" />
          <Icon as={ChevronDownIcon} />
        </Stack>
      </MenuButton>
      <Portal>
        <MenuList>
          <Text mx="4" fontSize="lg" fontWeight="medium">
            Welcome, {capitalize(user.name?.split(".")[0] || "")}
          </Text>

          <MenuDivider />

          <MenuGroup title="Profile">
            <MenuItem>My Account</MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup title="About">
            <MenuItem>Repository</MenuItem>
            <MenuItem>Credits</MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuItem
            icon={<Icon as={FiLogOut} />}
            onClick={async () => {
              await router.push("/");
              signOut({ redirect: false });
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default Navbar;

/** Utils */

function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
