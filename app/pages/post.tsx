import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { Button, Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";

import PostCard from "components/PostCard";
import DashboardLayout from "components/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchMorePosts, initfetchPosts } from "../features/post/PostSlice";

export default function PostPage() {
  let dispatch = useAppDispatch();
  const { posts, postsTotal, postsLoading, postsError, nomore } =
    useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(initfetchPosts({ page: 1 }));
  }, [dispatch]);

  const loadMore = () => {
    dispatch(fetchMorePosts({}));
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl">
        <Heading size="md">Post({postsTotal})</Heading>
        <SimpleGrid columns={[1, 2, 2, 3]} spacing={5} my={2}>
          {posts &&
            posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
        </SimpleGrid>
        <Flex justifyContent={"center"}>
          {!nomore && (
            <Button colorScheme="green" onClick={loadMore}>
              {postsLoading ? "Loading" : "Load More"}
            </Button>
          )}
        </Flex>
      </Container>
    </DashboardLayout>
  );
}
