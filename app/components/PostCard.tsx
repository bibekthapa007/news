import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { HiChevronRight } from "react-icons/hi"
import { Post } from "types/post";

function PostCard({ post }: { post: Post }) {
  let { _id, title, description, imageLink, slug } = post;
  return (
    <Link href={`/post/${slug}`} key={_id}>
      <Box key={post._id} mb="6" position={"relative"}>
        <Box
          display="flex"
          justifyContent="center"
          overflow="hidden"
          borderRadius={10}
        >
          <Image
            style={{ height: "300px" }}
            src={imageLink ? imageLink : "/category.jpg"}
            alt="me"
            width="500"
            height="300"
            objectFit="cover"
          />
        </Box>
        <Box
          p={4}
          position="absolute"
          bg="white"
          width="calc(100% - 40px)"
          m="20px"
          bottom="-40px"
          boxShadow="md"
          height="80px"
        >
          <Heading size="sm">{title}</Heading>
        </Box>
      </Box>
      <Text mb={2}>{description}</Text>
      <Flex alignContent="center" justifyContent="space-between" alignItems={"center"} mb={6}>
        <Link href={`/category/${post.categories[0]}/post`}>
          <Button size="sm" colorScheme={"green"} variant="ghost" bg="green.50">
            Category Name
          </Button>
        </Link>
        <Link href={`/post/${slug}`}>
          <Button color="green.400" variant="link" textDecor={"underline"}>
            Continue Reading <HiChevronRight size={"20px"} />
          </Button>
        </Link>
      </Flex>
    </Link>
  );
}

export default PostCard;
