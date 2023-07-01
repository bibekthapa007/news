import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { createCategory, fetchCategory, updateCategory } from "./CategorySlice";
import { CategoryForm, CategoryResponse } from "../../types/category";
import { checkFileSize, checkMimeType, maxSelectFile } from "../../utils/image";

export default function CreateCategoryForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { category, creating, createError, updating, updateError } =
    useAppSelector((state) => state.category);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>();

  const userFiles = watch("userFiles");
  const file = userFiles && userFiles[0];
  const categoryId = router.query.categoryId as string;
  const edit = Boolean(categoryId);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  const onSubmit = handleSubmit((data: any) => {
    if (edit) {
      delete data.slug;
      delete data.file;
      dispatch(updateCategory(data));
    } else {
      dispatch(createCategory(data)).then((data) => {
        let payload = data.payload as CategoryResponse;
        let requestStatus = data.meta.requestStatus as string;
        if (requestStatus === "fulfilled") {
          let id = payload.category._id;
          if (edit) return;
          if (id) {
            router.push(`/admin/category`);
          }
        }
      });
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
          {edit ? "Update Category" : "Create Category"}
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
          {!edit && createError && createError}
          {edit && updateError && updateError}
        </Text>

        <Flex justify="flex-end">
          <Button
            type="submit"
            isLoading={creating}
            mx={2}
            colorScheme="blue"
            variant="solid"
            mb={8}
          >
            {!edit && (creating ? "Creating" : "Create Category")}
            {edit && (updating ? "Updating" : "Update Category")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
