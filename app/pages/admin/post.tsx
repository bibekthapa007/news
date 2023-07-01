import { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "store/hook";
import {
  fetchPosts,
  handleSelectedRowsChange,
  handlePerRowsChange,
  handlePageChange,
  rowDisabledCriteria,
} from "features/adminPost/AdminPostSlice";
import { Post } from "types/post";
import AdminLayout from "components/admin/AdminLayout";
import Image from "next/image";
import paths from "utils/paths";
import { HiOutlineX, HiSearch } from "react-icons/hi";

export default function AdminPost() {
  let dispatch = useAppDispatch();
  let router = useRouter();
  const {
    posts,
    postsLoading,
    page,
    perPage,

    total,
    postsError,
    paginationRowsPerPage,
  } = useAppSelector((state) => state.adminpost);

  useEffect(() => {
    console.log(page, perPage);
    dispatch(fetchPosts({ page, perPage }));
  }, [dispatch, page, perPage]);

  // @ts-ignore
  const columns: TableColumn<Post>[] = useMemo(
    () => [
      {
        name: "Image",
        grow: 0,
        selector: (row) => (
          <Image
            src={row.imageLink ? row.imageLink : ""}
            alt={row.title}
            height="70"
            width="70"
          />
        ),
      },
      {
        name: "Detail",
        selector: (row) => {
          return <Box>
            <Heading size="sm">{row.title}</Heading>
            <Text>{row.title}</Text>
          </Box>
        },
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => {
          return (
            <Box>
              {row.categories.map((category: string) => {
                return <Box key={category}>{category}</Box>;
              })}
            </Box>
          );
        },
      },
      {
        name: "Views",
        grow: 0,
        selector: (row) => row.views
      },
      {
        name: "Written Date",
        selector: (row) => row.createdAt
      },
      {
        name: "Written By",
        selector: (row) => row.author
      },
      {
        name: "Action",
        cell: (row: Post) => {
          return (
            <Flex>
              <Tooltip label="Update the Post" aria-label="Edit Post">
                <Link href={`/admin/post/${row.slug}`}>
                  <IconButton
                    size="sm"
                    colorScheme="green"
                    ml={1}
                    aria-label="Edit Vaccine"
                    icon={<FiEdit />}
                  />
                </Link>
              </Tooltip>
              <Tooltip label="Delete the Post" aria-label="Delete Post">
                <IconButton
                  ml={1}
                  size="sm"
                  aria-label="Delete"
                  colorScheme={"red"}
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

  return (
    <AdminLayout bgColor="white">
      <Flex justifyContent="space-between" mx="4">
        <Heading size="lg">Created News</Heading>
        <Flex mb={4}>
          <Link href={paths.adminCreatePost}>
            <Button colorScheme={"green"} mr={4}>Add a News</Button>
          </Link>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<HiSearch color='gray.300' />}
            />
            <Input type='tel' placeholder='Search for a Keyword' />
            <InputRightElement
              pointerEvents='none'
              children={<HiOutlineX color='gray.300' />}
            />
          </InputGroup>
        </Flex>
      </Flex>
      <Box mx="4">
        <DataTable
          data={posts}
          columns={columns}
          selectableRows={false}
          onSelectedRowsChange={({ selectedCount }) => {
            dispatch(handleSelectedRowsChange({ selectedCount }));
          }}
          progressPending={postsLoading}
          paginationTotalRows={total}
          onChangeRowsPerPage={(perPage) => {
            dispatch(handlePerRowsChange({ perPage }));
          }}
          onChangePage={(page: number) => {
            dispatch(handlePageChange({ page, perPage }));
          }}
          paginationRowsPerPageOptions={paginationRowsPerPage}
          // selectableRowsComponent={<input type="checkbox" />}
          pagination
          paginationServer
          persistTableHead
          highlightOnHover
          pointerOnHover
        />
      </Box>
    </AdminLayout>
  );
}
