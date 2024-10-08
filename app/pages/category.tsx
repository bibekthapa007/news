import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchCategories } from "features/category/CategorySlice";

import DashboardLayout from "components/DashboardLayout";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { categories, categoriesLoading } = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  if (categoriesLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl">
        <Heading size="md">Category Page </Heading>
        <SimpleGrid columns={[2, 3, 4, 4]} spacing={5} my={2}>
          {categories.map((category) => {
            let { _id, title, description, imageLink } = category;
            return (
              <Link href={`/category/${_id}/post`} key={_id}>
                <Box
                  bg={"gray.200"}
                  borderRadius={10}
                  key={category._id}
                  overflow="hidden"
                >
                  <Box display="flex" justifyContent="center" mt="2">
                    <Image
                      style={{ height: "auto" }}
                      src={imageLink ? imageLink : "/category.jpg"}
                      alt="me"
                      width="70"
                      height="70"
                      objectFit="cover"
                    />
                  </Box>
                  <Box p={4}>
                    <Box>{title}</Box>
                    <Box>{description}</Box>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </SimpleGrid>
      </Container>
    </DashboardLayout>
  );
}
