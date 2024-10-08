import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/modal";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Divider, Stack, Text } from "@chakra-ui/layout";

import paths from "utils/paths";
import { useAppSelector } from "store/hook";

import Link from "./Link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavItem from "./NavItem";

interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

function DashboardLayout({ children, bgColor }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Navbar onOpen={onOpen} />
      <Box bg={bgColor || "gray.50"} minHeight="calc(100vh - 80px)">
        {children}
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <MainDrawerContent />
      </Drawer>
      <Footer />
    </Box>
  );
}

function MainDrawerContent() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        <Link href="/">Sabkobazar</Link>
      </DrawerHeader>

      <Stack>
        <NavItem icon={<AiOutlineHome />} label="Post" link={paths.post} />
        <NavItem
          icon={<CgMenuGridO />}
          label="Category"
          link={paths.category}
        />

        <Divider color="gray.400" />
        {user?.role === "admin" && (
          <NavItem
            icon={<CgMenuGridO />}
            label="Admin Panel"
            link={paths.adminHome}
          />
        )}

        <NavItem
          icon={<CgMenuGridO />}
          label="Prefrence"
          link={paths.userInfo}
        />

        <Divider color="gray.400" />
        {user && <NavItem icon={<BiLogOut />} label="Log Out" link="#" />}
        {!user && (
          <NavItem icon={<CgMenuGridO />} label="Login" link={paths.login} />
        )}
        {!user && (
          <NavItem icon={<CgMenuGridO />} label="Register" link={paths.login} />
        )}
        <Divider color="gray.400" />
      </Stack>
      <DrawerFooter></DrawerFooter>
    </DrawerContent>
  );
}

export default DashboardLayout;
