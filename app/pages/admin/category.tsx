import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import DataTable, { TableColumn } from "react-data-table-component";

import { useAppDispatch, useAppSelector } from "store/hook";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { fetchCategories } from "features/category/CategorySlice";
import CreateCategoryForm from "features/category/CreateCategoryForm";
import AdminLayout from "components/admin/AdminLayout";
import { Category, CategoryForm } from "types/category";
import paths from "utils/paths";

export default function AdminCategory() {
  let dispatch = useAppDispatch();
  let router = useRouter();
  const { categories, categoriesLoading } = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSelectedRowsChange = () => {};

  // @ts-ignore
  const columns: TableColumn<Category>[] = useMemo(
    () => [
      {
        name: "Image",
        selector: (row) => (
          <Image
            src={row.imageLink ? row.imageLink : ""}
            alt="Image"
            height="70"
            width="70"
          />
        ),
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.description,
        grow: 2,
        allowOverflow: true,
      },
      {
        name: "Action",
        cell: (row) => {
          return (
            <Flex>
              <Tooltip label="Update the Category" aria-label="Edit Post">
                <Link href={`/admin/category/${row._id}`}>
                  <IconButton
                    size="sm"
                    ml={1}
                    aria-label="Edit Category"
                    icon={<FiEdit />}
                  />
                </Link>
              </Tooltip>
              <Tooltip label="Delete the Category" aria-label="Delete Category">
                <IconButton
                  ml={1}
                  size="sm"
                  aria-label="Delete"
                  onClick={(e) => {
                    e.preventDefault();
                    // return handleModalOpen(vaccine.id);
                  }}
                  icon={<AiOutlineDelete />}
                />
              </Tooltip>
            </Flex>
          );
        },
        ignoreRowClick: true,
      },
    ],
    []
  );

  if (categoriesLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <AdminLayout>
      <Flex justifyContent="space-between" mx="4">
        <Heading size="md">Categories</Heading>
        <Link href={paths.adminCreateCategory}>
          <Button colorScheme={"green"}>Create Category</Button>
        </Link>
      </Flex>
      <Box mx="4">
        <DataTable
          data={categories}
          columns={columns}
          selectableRows={false}
          onSelectedRowsChange={onSelectedRowsChange}
        />
      </Box>
    </AdminLayout>
  );
}
