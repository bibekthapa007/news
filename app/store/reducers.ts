import { combineReducers } from "redux";

import i18n from "features/i18n/i18nSlice";
import auth from "../features/auth/AuthSlice";
import post from "../features/post/PostSlice";
import category from "../features/category/CategorySlice";
import adminpost from "features/adminPost/AdminPostSlice";
import { AdminPostSlice } from "./../features/adminPost/AdminPostSlice";

const reducers = combineReducers({
  auth,
  category,
  post,
  adminpost,
  i18n,
});

export default reducers;
