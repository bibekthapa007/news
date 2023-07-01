import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/button";
import { Flex, Heading, Text, Box } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";

import { useAppDispatch, useAppSelector } from "store/hook";
import { createPost, updatePost } from "../adminPost/AdminPostSlice";
import { checkFileSize, checkMimeType, maxSelectFile } from "utils/image";
import { PostForm, PostResponse } from "types/post";

export default function CreatePostForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const postSlug = router.query.slug;

  const { post, updating, updateError, creating, createError } = useAppSelector(
    (state) => state.adminpost
  );

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<PostForm>();

  const userFiles = watch("userFiles");
  const file = userFiles && userFiles[0];

  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [reset, post]);

  const onSubmit = handleSubmit((data: any) => {
    console.log(data, postSlug);
    if (!postSlug) {
      dispatch(createPost(data)).then((data) => {
        let payload = data.payload as PostResponse;
        let requestStatus = data.meta.requestStatus as string;
        if (requestStatus === "fulfilled") {
          let id = payload.post._id;
          if (id) {
            router.push(`/post`);
          }
        }
      });
    } else {
      delete data.file;
      dispatch(updatePost(data));
    }
  });

  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if (
        maxSelectFile(event) &&
        checkMimeType(event) &&
        checkFileSize(event)
      ) {
      }
    }
  };
  return (
    <Box pt={2} maxW="xl" mx="auto">
      <form onSubmit={onSubmit}>
        <Heading fontSize="lg" mb={4} fontWeight="500">
          {postSlug ? "Update Post" : "Create Post"}
        </Heading>

        <FormControl
          mb={4}
          id="name"
          isInvalid={Boolean(errors.description)}
          isRequired
        >
          <FormLabel>Title</FormLabel>
          <Input
            borderColor="gray.300"
            placeholder="Title"
            isInvalid={Boolean(errors.title)}
            {...register("title", {
              required: "Please enter title.",
            })}
          />
          {errors.title && (
            <FormErrorMessage>
              {errors.title?.message as string}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          mb={4}
          id="description"
          isInvalid={Boolean(errors.description)}
          isRequired
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            borderColor="gray.300"
            size="sm"
            placeholder="Description"
            {...register("description", {
              required: "Please enter description.",
            })}
          />
        </FormControl>

        <FormLabel>Add Image</FormLabel>

        <Input
          borderColor="gray.300"
          type="file"
          accept={"image/*"}
          id="userFiles"
          {...register("userFiles", {
            required: false,
          })}
        />
        {/* <input
          type="file"
          id="userFiles"
          {...register("userFiles", {
            required: false,
          })}
          // onChange={fileChangedHandler}
          name="userFiles"
          style={{ display: "none" }}
        /> */}

        <Flex
          align="center"
          direction="column"
          p={[4, 16]}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="8px"
          onClick={() => {
            let element = document.getElementById("userFiles");
            element && element.click();
          }}
        >
          {file ? (
            /* eslint-disable */
            <img
              alt="category"
              className="profile-user-img img-fluid"
              style={{
                cursor: "pointer",
                height: "auto",
                minHeight: "150px",
                width: "100%",
                border: "2px solid #ddd",
                objectFit: "cover",
              }}
              src={URL.createObjectURL(file)}
            />
          ) : (
            <Box>
              <Heading fontSize="md">Add the Images</Heading>
              <Text>or click to add</Text>
            </Box>
          )}
        </Flex>

        <Text color="red.700" fontSize="sm">
          {!postSlug && createError && createError}
          {postSlug && updateError && updateError}
        </Text>

        <Flex justify="flex-end">
          <Button
            type="submit"
            isLoading={postSlug ? updating : creating}
            mx={2}
            colorScheme="blue"
            variant="solid"
            mb={8}
          >
            {postSlug && (!updating ? "Update Post" : "Updating")}
            {!postSlug && (!creating ? "Create Post" : "Creating")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
