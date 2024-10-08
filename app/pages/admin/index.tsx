import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { FiPlus } from "react-icons/fi";
import { Box, Flex, Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { fetchUserData } from "features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "store/hook";

import paths from "utils/paths";
import AdminLayout from "components/admin/AdminLayout";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const data = [
    { label: "Write a News Story", link: paths.adminCreatePost },
    { label: "Add a Featured Story", link: paths.adminCreatePost },
    { label: "Add a New Banner", link: paths.adminHome },
    { label: "Add a New Topic", link: paths.adminCreateCategory },
  ];

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <AdminLayout bgColor="white">
      <Heading>Dashboard</Heading>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {data.map((item) => {
          return (
            <Link href={item.link}>
              <Flex borderRadius={"10px"} boxShadow={"md"}>
                <Text
                  px="4"
                  py="4"
                  flexGrow={1}
                  color={"gray.600"}
                  borderRight={"1px solid"}
                  borderColor="gray.300"
                >
                  {item.label}
                </Text>
                <Flex px="3" pt="4" pb="12">
                  <FiPlus />
                </Flex>
              </Flex>
            </Link>
          );
        })}
      </Grid>
    </AdminLayout>
  );
}
