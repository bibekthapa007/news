import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/toast";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  IAdminPostState,
  Post,
  PostForm,
  PostResponse,
  PostsResponse,
} from "types/post";

const toast = createStandaloneToast();

export const fetchPosts = createAsyncThunk(
  "post/list",
  async (
    data: { page: number; perPage: number; category?: string },
    thunkApi
  ) => {
    try {
      const response = await axios.get<PostsResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post`,
        {
          params: {
            perPage: data.perPage,
            page: data.page,
            category: data.category,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      let nomore = response.data.posts.length < data.perPage;
      return { page: data.page, nomore, ...response.data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const fetchPost = createAsyncThunk(
  "post/single",
  async (slug: string, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<PostResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/slug/${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (Post: PostForm, thunkApi) => {
    try {
      console.log(Post, Post.userFiles[0], "Form create Post");
      const data = new FormData();
      data.append("file", Post.userFiles[0]);
      data.append("title", Post.title);
      data.append("description", Post.description);
      console.log(data);

      const response = await axios.post<PostResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post`,
        data,
        {
          headers: {},
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (post: PostForm, thunkApi) => {
    try {
      if (post.userFiles.length < 0) delete post.userFiles;
      const data = new FormData();
      post.userFiles[0] && data.append("file", post.userFiles[0]);
      data.append("title", post.title);
      data.append("description", post.description);

      console.log("Updating the post");

      // post.categories &&
      //   data.append("categories", JSON.stringify(post.categories));

      const response = await axios.put<PostResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${post._id}`,
        data,
        {
          headers: {},
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (post_id: string, thunkApi) => {
    try {
      const response = await axios.delete<PostResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${post_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      response.data.post_id = post_id;
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const initfetchPosts = (params: any) => async (dispatch: any) => {
  await dispatch(initPosts());
  return await dispatch(fetchPosts({ page: 1, perPage: 1 }));
};

export const fetchMorePosts =
  (params: any) => async (dispatch: any, getState: any) => {
    await dispatch(incrementPage());
    // return await dispatch(fetchPosts({ page: getState().post.page }));
  };

const initialState: IAdminPostState = {
  posts: [],
  postsLoading: false,
  postsError: "",
  page: 1,
  perPage: 10,
  total: 1000,
  selectedRows: 1,
  nomore: false,
  paginationRowsPerPage: [10, 15, 20, 30, 50, 100],
  filter: {},

  post: null,
  postLoading: false,
  postError: "",

  creating: false,
  createError: "",

  updating: false,
  updateError: "",

  deleting: false,
  deleteError: "",
};

export const AdminPostSlice = createSlice({
  name: "admin/post",
  initialState,
  reducers: {
    handlePageChange: (state, data) => {
      console.log(data, "handlePageChange");
      state.page = data.payload.page;
      state.perPage = data.payload.perPage;
    },

    handlePerRowsChange: (state, data) => {
      let { perPage, page } = data.payload;
      state.page = page;
      state.perPage = perPage;
      // setPage(page);
      // setPerPage(newPerPage);
    },

    handleFilter: (state, data) => {
      // setFilter(data);
      state.filter = data;
    },

    handleClick: (state, data) => {
      state.post = data.payload.post;
      // setSelectedUser(data);
      // $("#nameDetailModal").modal("toggle");
    },

    handleSelectedRowsChange: (state, data) => {
      state.selectedRows = data.payload.selectedRows;
    },

    rowDisabledCriteria: (row) => {
      // return !row.image_id || !row.register_no;
    },

    incrementPage: (row) => {
      // return !row.image_id || !row.register_no;
    },
    initPosts: (state) => {
      state.posts = [];
      state.page = 1;
      state.nomore = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.postsLoading = true;
        state.postsError = "";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.nomore = action.payload.nomore;
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
        state.postsLoading = false;
        state.postsError = action.payload;
      })

      .addCase(fetchPost.pending, (state, action) => {
        state.postLoading = true;
        state.post = null;
        state.postError = "";
        state.updateError = "";
      })
      .addCase(
        fetchPost.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.postLoading = false;
          state.post = action.payload.post;
        }
      )
      .addCase(fetchPost.rejected, (state, action: PayloadAction<any>) => {
        state.postsLoading = false;
        state.postsError = action.payload;
      })

      .addCase(createPost.pending, (state, action) => {
        state.creating = true;
        state.createError = "";
      })
      .addCase(
        createPost.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.creating = false;

          toast.toast({
            title: "Post Created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
        state.creating = false;
        state.createError = action.payload;
      })

      .addCase(updatePost.pending, (state, action) => {
        state.updating = true;
        state.updateError = "";
      })
      .addCase(
        updatePost.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.updating = false;

          toast.toast({
            title: "Post edited successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(updatePost.rejected, (state, action: PayloadAction<any>) => {
        state.updating = false;
        state.updateError = action.payload;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.deleting = true;
        state.deleteError = "";
      })
      .addCase(
        deletePost.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.deleting = false;
          state.posts = state.posts.filter((v) => {
            return !(v._id === action.payload.post_id);
          });

          toast.toast({
            title: "Post deleted successfully",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(deletePost.rejected, (state, action: PayloadAction<any>) => {
        state.deleting = false;
        state.deleteError = action.payload;
      });
  },
});
export const {
  rowDisabledCriteria,
  incrementPage,
  initPosts,
  handlePageChange,
  handleClick,
  handleFilter,
  handlePerRowsChange,
  handleSelectedRowsChange,
} = AdminPostSlice.actions;

// export const selectCount = (state: RootState) => state.auth.user;

export default AdminPostSlice.reducer;
