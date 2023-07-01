import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Img,
  Text,
  Flex,
  Grid,
  Button,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "store/hook";
import { selectTranslations, setLang } from "features/i18n/i18nSlice";
import { fetchMorePosts, initfetchPosts } from "features/post/PostSlice";

import Slider from "components/Slider";
import PostCard from "components/PostCard";
import DashboardLayout from "components/DashboardLayout";
import { NextArrow, PrevArrow } from "components/SliderArrow";

import { Category } from "types/category";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function OldTop({
  categories,
  settings,
}: {
  categories: Category[];
  settings: any;
}) {
  return (
    <Grid
      templateColumns={[
        "minmax(0, auto)",
        "minmax(0, auto)",
        "250px minmax(200px, 3fr) ",
        "250px minmax(200px, 3fr) ",
      ]}
      gap={[0, 4, 6]}
      position="relative"
      mb="10"
    >
      <Box>
        {categories.map((category) => {
          let { _id, title, imageLink } = category;
          return (
            <Box
              bg="gray.200"
              borderRadius={10}
              key={category._id}
              overflow="hidden"
              my={2}
            >
              <Link href={`/category/${_id}/post`} key={_id}>
                <Box p={4}>
                  <Box>{title}</Box>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
      <Box overflow="hidden">
        <Slider {...settings}>
          {Array(10)
            .fill(10)
            .map((item, index) => {
              return (
                <Box key={index} width="100%">
                  <Img objectFit="cover" src="/category.jpg" alt="image" />
                </Box>
              );
            })}
        </Slider>
      </Box>
    </Grid>
  );
}

function NewTop({ categories }: { categories: Category[] }) {
  let dispatch = useAppDispatch();
  const t = useAppSelector(selectTranslations);
  const { lang } = useAppSelector((state) => state.i18n);

  return (
    <Flex flexDir="column" alignItems="center" textAlign="center" m={16}>
      <Heading size="2xl" mb="8">
        Curated News <br /> every{" "}
        <Box color="green.400" display={"inline-block"}>
          {" "}
          single{" "}
        </Box>{" "}
        day.
      </Heading>

      <Heading size="md" mb={4}>
        {t.home.CHOOSE_YOUR_PREFERRED_LANGUAGE}
      </Heading>
      <Flex>
        <Button
          colorScheme="green"
          mr={4}
          leftIcon={<Img src="/nepali.svg" alt="nepali" />}
          onClick={() => dispatch(setLang("np"))}
        >
          Nepali
        </Button>
        <Button
          colorScheme="green"
          leftIcon={<Img src="/english.svg" alt="english" />}
          onClick={() => {
            lang !== "en" && dispatch(setLang("en"));
          }}
        >
          English
        </Button>
      </Flex>
    </Flex>
  );
}

function CategorySlider({ categories }: { categories: Category[] }) {
  let settings = {
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    variableWidth: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <Box
      py={4}
      top={"0px"}
      position={"sticky"}
      bgColor="white"
      overflow="hidden"
      zIndex={1}
    >
      <Box max-width={"100%"} mx={8}>
        <Slider {...settings}>
          {categories.map((category) => {
            let { _id, title, imageLink } = category;
            return (
              <Link href={`/category/${_id}/post`} key={_id}>
                <Button size="lg" mr={4}>
                  {title}
                </Button>
              </Link>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
}

export default function Home() {
  let dispatch = useAppDispatch();
  let router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  console.log(user, "User");

  const { categories, categoriesLoading } = useAppSelector(
    (state) => state.category
  );

  const { page, nomore, posts, postsLoading, postsError } = useAppSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(initfetchPosts({ page: 1 }));
  }, [dispatch]);

  const loadMore = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(fetchMorePosts({ page }));
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mx={"auto"} maxW={"6xl"} pb={14} position="relative">
        <NewTop categories={categories} />
        <CategorySlider categories={categories} />

        <Heading size="md" my="6">
          Top News of the day
        </Heading>
        {!posts && postsLoading && <Box>Loading Posts...</Box>}
        <SimpleGrid columns={[1, 2, 2, 3, 3]} spacing={5} my={2}>
          {posts &&
            posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
        </SimpleGrid>

        <Text colorScheme={"red"}>{postsError && postsError}</Text>

        <Flex justifyContent={"center"}>
          {!nomore && (
            <Button colorScheme="green" onClick={loadMore}>
              {postsLoading ? "Loading" : "Load More"}
            </Button>
          )}
        </Flex>
      </Box>
    </DashboardLayout>
  );
}
