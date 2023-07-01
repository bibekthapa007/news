import { useEffect } from "react";
import Router, { useRouter } from "next/router";

import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/modal";
import { BsPerson } from "react-icons/bs";
import { Spinner } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/hooks";
import { BiLogOut, BiStore } from "react-icons/bi";
import { CgMenuGridO, CgOptions } from "react-icons/cg";
import { Box, Divider, Grid, Stack } from "@chakra-ui/layout";

import paths from "utils/paths";
import { logout } from "features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "store/hook";

import Navbar from "../Navbar";
import NavItem from "../NavItem";

interface AdminLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

const AdminDrawerItems = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Stack w="100%">
      <NavItem icon={<AiOutlineHome />} label="Home" link={paths.adminHome} />
      <NavItem icon={<CgMenuGridO />} label="Post" link={paths.adminPost} />
      <NavItem
        icon={<BsPerson />}
        label="Category"
        link={paths.adminCategory}
      />
      <Divider color="gray.300" />
      <NavItem icon={<BiStore />} label="Home" link="/" />
      <Divider color="gray.300" />
      <NavItem
        icon={<BiLogOut />}
        onClick={(e) => {
          e.preventDefault();
          dispatch(logout()).then((data) => router.push("/login"));
        }}
        label="Log Out"
        link="/#"
      />
      <Divider color="gray.300" />
    </Stack>
  );
};

interface AdminRouteProps {
  children: React.ReactNode | React.ReactNode[];
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, initialLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!initialLoading && !(user?.role === "admin")) {
      Router.replace("/");
    }
  }, [user, initialLoading]);

  if (initialLoading) {
    return <Spinner />;
  }

  if (!initialLoading && user?.role === "admin") {
    return <>{children}</>;
  }

  return null;
};

const AdminDrawerContent = () => {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Sabkobazar</DrawerHeader>
      <AdminDrawerItems />
      <DrawerFooter>
        <NavItem icon={<CgMenuGridO />} label="Log Out" link="/#" />
      </DrawerFooter>
    </DrawerContent>
  );
};

function AdminLayout({ children, bgColor }: AdminLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AdminRoute>
      <Box>
        <Navbar onOpen={onOpen} />
        <Box bg={bgColor || "gray.50"} minHeight="calc(100vh - 64px)">
          <Grid
            templateColumns={["auto", "auto", "1fr 2fr", "1fr 3fr", "1fr 4fr"]}
            gap={[2, 2, 4]}
            autoRows={`minmax(min-content, max-content)`}
            position="relative"
          >
            <Box
              display={["none", "none", "flex"]}
              bg="gray.50"
              minHeight="calc(100vh - 64px)"
              maxHeight="100vh"
              position="sticky"
              top={0}
            >
              <AdminDrawerItems />
            </Box>
            <Box p={2}>{children}</Box>
          </Grid>
        </Box>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <AdminDrawerContent />
        </Drawer>
      </Box>
    </AdminRoute>
  );
}

export default AdminLayout;
