import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { Box, Container, Flex, Heading, Text, Spacer } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { Select } from "@chakra-ui/react";

import paths from "utils/paths";
import { useAppDispatch, useAppSelector } from "store/hook";
import { logout } from "features/auth/AuthSlice";
import { setLang } from "features/i18n/i18nSlice";

import EnglishIcon from "../public/en.png";
import NepaliIcon from "../public/np.png";
import Image from "next/image";

interface NavbarProps {
  admin?: boolean;
  onOpen: () => void;
}

function Navbar({ admin, onOpen }: NavbarProps) {
  let dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { lang, supportedLangs } = useAppSelector((state) => state.i18n);
  const imageLink = user?.imageLink;
  return (
    <Box
      borderBottom="1px solid"
      // bg="green.400"
      // color="white"
      borderColor="gray.200"
      py={3}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Link href="/">
              <Image src="/news.png" height="35" width="125" alt="sojo news" />
            </Link>
            {/* <Button ml="4" onClick={setModalOpen}>
              Log in
            </Button> */}
          </Flex>
          <Flex align="center" flexGrow="0">
            <Flex display={["none", "none", "flex"]}>
              <Box mr={2}>
                <Link href={paths.category}>Categories</Link>
              </Box>
              <Box mr={2}>
                <Link href={paths.post}>Post</Link>
              </Box>
            </Flex>

            <Select
              placeholder="Select languages"
              size="lg"
              width={"100%"}
              value={lang}
              onChange={(e) => {
                e.preventDefault();
                dispatch(setLang(e.target.value));
              }}
            >
              {[
                { lang: "en", label: "English", icon: EnglishIcon },
                { lang: "np", label: "Nepal", icon: NepaliIcon },
              ].map((data) => {
                return (
                  <option value={data.lang}>
                    <Image
                      height={data.icon.height}
                      width={data.icon.width}
                      src={data.icon}
                      alt="icon"
                    />
                    {data.label}
                  </option>
                );
              })}
            </Select>

            <Flex align="center" mr={2} display={["none", "none", "flex"]}>
              {user ? (
                <ProfileMenu imageLink={imageLink} />
              ) : (
                <Flex>
                  <Link href={paths.login}>
                    <Button variant="ghost" colorScheme={"green"} mr={"2"}>
                      Login
                    </Button>
                  </Link>
                  <Link href={paths.login}>
                    <Button variant="solid" colorScheme={"green"}>
                      Register
                    </Button>
                  </Link>
                </Flex>
              )}
            </Flex>

            <IconButton
              aria-label="Main Drawer"
              onClick={onOpen}
              colorScheme={"green"}
              icon={<AiOutlineMenu />}
              display={["inherit", "inherit", "none", "none"]}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

function ProfileMenu({ imageLink }: { imageLink: string | undefined }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  let src =
    "https://lh3.googleusercontent.com/a-/AOh14Gh3sw6_MgWpekvdavKnuW95E8FPfS-_y07WzkjM=s100";
  imageLink && (src = imageLink);

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            _active={{}}
            _hover={{}}
            colorScheme={"green"}
            px={[0, 2]}
            outline="none"
            rightIcon={<IoIosArrowDown />}
            leftIcon={<Avatar size="sm" src={src} />}
          >
            <Text display={["none", "none", "block"]}>Hello Bibek</Text>
          </MenuButton>
          <MenuList boxShadow="lg" border="none" color="green.700">
            <MenuItem>
              <Link href={paths.setting}>Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.category}>Category</Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.post}>Post</Link>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                dispatch(logout());
              }}
            >
              Log Out
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default Navbar;
