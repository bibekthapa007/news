import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Select,
  Heading,
  Checkbox,
  ListItem,
  Container,
  IconButton,
  UnorderedList,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { HiOutlineArrowSmRight } from "react-icons/hi";

import { updateUser } from "features/auth/AuthSlice";
import ProtectedLayout from "components/ProtectedRoute";
import DashboardLayout from "components/DashboardLayout";
import { useAppDispatch, useAppSelector } from "store/hook";

export interface UpdateInfoForm {
  age: number;
  gender: String;
  occupation: String;
  viewSensitive: Boolean;
  viewPolitical: Boolean;
}

function UpdateInfo() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<UpdateInfoForm>();

  useEffect(() => {
    if (user) {
      const { gender, occupation, viewPolitical, viewSensitive } = user;
      reset({ gender, occupation, viewPolitical, viewSensitive });
    }
  }, [user]);

  const onSubmit = handleSubmit((data) => {
    console.log(data, "User update form submitted");
    data.age = Number(data.age);

    dispatch(updateUser(data)).then((data: any) => {
      const requestStatus = data.meta.requestStatus as string;

      if (requestStatus === "fulfilled") {
        toast({
          title: "User updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  });

  return (
    <DashboardLayout>
      <ProtectedLayout>
        <Container maxW="2xl">
          <Flex
            justifyContent={"center"}
            alignItems="center"
            flexDir="column"
            pt="10"
          >
            <Heading size="lg" mb={8}>
              Tell us about you
            </Heading>
            <Text fontSize="lg" mb={8}>
              Infrom us about yourself so we can curate news stories that are
              relevant to you.
            </Text>
            <form onSubmit={onSubmit}>
              <Box width="100%" px={16}>
                <Box mb="6">
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Heading size="sm">What is your age?</Heading>

                    <Input
                      size="lg"
                      type="number"
                      width={"160px"}
                      {...register("age", {
                        required: "Please add age.",
                      })}
                    ></Input>
                  </Flex>
                  {errors.age && (
                    <Text color="red.500">{errors.age?.message as string}</Text>
                  )}
                </Box>

                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  mb="6"
                >
                  <Heading size="sm">What is your gender?</Heading>
                  <Select
                    placeholder="Select option"
                    size="lg"
                    width={"160px"}
                    {...register("gender", {
                      required: "Please select gender.",
                    })}
                  >
                    {["Male", "Female", "Perfer Not to say"].map((gender) => {
                      return <option value={gender}>{gender}</option>;
                    })}
                  </Select>
                  {errors.gender && (
                    <Text color="red.500">
                      {errors.gender?.message as string}
                    </Text>
                  )}
                </Flex>

                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  mb="6"
                >
                  <Heading size="sm">What occupation are you in?</Heading>
                  <Box>
                    <Select
                      placeholder="Select option"
                      size="lg"
                      width={"160px"}
                      {...register("occupation", {
                        required: "Please add occupation.",
                      })}
                    >
                      {["Student", "Artist", "Farmer", "Other"].map(
                        (occupation) => {
                          return (
                            <option value={occupation}>{occupation}</option>
                          );
                        }
                      )}
                    </Select>
                    {errors.occupation && (
                      <Text color="red.500">
                        {errors.occupation?.message as string}
                      </Text>
                    )}
                  </Box>
                </Flex>

                <Flex justifyContent="space-between" mb="6">
                  <Flex alignItems="center">
                    <IconButton
                      aria-label="explanation"
                      bg="yellow.400"
                      size="xs"
                      borderRadius="100%"
                      mr="2"
                    >
                      !
                    </IconButton>
                    <Heading size="sm">
                      Skip and avoid political news and anything political
                    </Heading>
                  </Flex>
                  <Checkbox
                    colorScheme="green"
                    size="lg"
                    {...register("viewPolitical")}
                  />
                </Flex>

                <Box mb="6">
                  <Flex justifyContent="space-between" mb="2">
                    <Flex alignItems="center">
                      <IconButton
                        aria-label="explanation"
                        bg="red.300"
                        size="xs"
                        borderRadius="100%"
                        mr="2"
                      >
                        !
                      </IconButton>
                      <Heading size="sm">
                        Skip and avoid any stories that have following
                      </Heading>
                    </Flex>
                    <Checkbox
                      colorScheme="green"
                      size="lg"
                      {...register("viewSensitive")}
                    />
                  </Flex>

                  <UnorderedList pl="4">
                    <ListItem>Self harm or physical voilencce</ListItem>
                    <ListItem>Murder, death or genocide</ListItem>
                    <ListItem>Rape or sexual harassment</ListItem>
                    <ListItem>Mental or psychological torture</ListItem>
                    <ListItem>
                      Anything that's not safe for work (NSFW)
                    </ListItem>
                  </UnorderedList>
                </Box>

                <Flex justifyContent="center">
                  <Button
                    type="submit"
                    disabled={!isDirty}
                    rightIcon={<HiOutlineArrowSmRight size="24px" />}
                    colorScheme="green"
                    size="lg"
                  >
                    Save & Continue
                  </Button>
                </Flex>
              </Box>
            </form>
          </Flex>
        </Container>
      </ProtectedLayout>
    </DashboardLayout>
  );
}

export default UpdateInfo;
