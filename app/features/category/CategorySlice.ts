import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/toast";

import {
  ICategoryState,
  Category,
  CategoryForm,
  CategoryResponse,
  CategoriesResponse,
} from "types/category";

const toast = createStandaloneToast();

export const fetchCategories = createAsyncThunk(
  "category/list",
  async (data, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<CategoriesResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
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

export const fetchCategory = createAsyncThunk(
  "category/single",
  async (Category_id: string, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<CategoryResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/${Category_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
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

export const createCategory = createAsyncThunk(
  "category/create",
  async (Category: CategoryForm, thunkApi) => {
    try {
      console.log(Category, Category.userFiles[0], "Form create Category");
      const data = new FormData();
      data.append("file", Category.userFiles[0]);
      data.append("title", Category.title);
      data.append("description", Category.description);

      const response = await axios.post<CategoryResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category`,
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

export const updateCategory = createAsyncThunk(
  "category/update",
  async (category: Category, thunkApi) => {
    try {
      const data = new FormData();
      category.userFiles[0] && data.append("file", category.userFiles[0]);
      data.append("title", category.title);
      data.append("description", category.description);
      const response = await axios.put<CategoryResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/${category._id}`,
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

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (category_id: string, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete<CategoryResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/${category_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.category_id = category_id;
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

const initialState: ICategoryState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: "",
  category: null,
  categoryLoading: false,
  categoryError: "",

  creating: false,
  createError: "",

  updating: false,
  updateError: "",

  deleting: false,
  deleteError: "",
};

export const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state: ICategoryState, action) => {
        state.categoriesLoading = true;
        state.categoriesError = "";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state: ICategoryState, action: PayloadAction<CategoriesResponse>) => {
          state.categoriesLoading = false;
          state.categories = action.payload.categories;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.categoriesLoading = false;
          state.categoriesError = action.payload;
        }
      )

      .addCase(fetchCategory.pending, (state, action) => {
        state.categoryLoading = true;
        state.categoryError = "";
        state.updateError = "";
      })
      .addCase(
        fetchCategory.fulfilled,
        (state, action: PayloadAction<CategoryResponse>) => {
          state.categoryLoading = false;
          state.category = action.payload.category;
        }
      )
      .addCase(fetchCategory.rejected, (state, action: PayloadAction<any>) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
      })

      .addCase(createCategory.pending, (state, action) => {
        state.creating = true;
        state.createError = "";
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<CategoryResponse>) => {
          state.creating = false;

          toast.toast({
            title: "Category Created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.creating = false;
        state.createError = action.payload;
      })

      .addCase(updateCategory.pending, (state, action) => {
        state.updating = true;
        state.updateError = "";
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<CategoryResponse>) => {
          state.updating = false;

          toast.toast({
            title: "Category edited successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(updateCategory.rejected, (state, action: PayloadAction<any>) => {
        state.updating = false;
        state.updateError = action.payload;
      })

      .addCase(deleteCategory.pending, (state, action) => {
        state.deleting = true;
        state.deleteError = "";
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<CategoryResponse>) => {
          state.deleting = false;
          state.categories = state.categories.filter((v) => {
            return !(v._id === action.payload.category_id);
          });

          toast.toast({
            title: "Category deleted successfully",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
        state.deleting = false;
        state.deleteError = action.payload;
      });
  },
});
// export const {} = userSlice.actions;

// export const selectCount = (state: RootState) => state.auth.user;

export default CategorySlice.reducer;
