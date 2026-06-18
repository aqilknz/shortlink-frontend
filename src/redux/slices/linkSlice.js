import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserLinksAPI, createLinkAPI, deleteLinkAPI } from "../../services/linkServices";

export const fetchLinks = createAsyncThunk(
  "links/fetchLinks",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const data = await getUserLinksAPI(page, limit, search);
      return data.results; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch links");
    }
  }
);

export const addLink = createAsyncThunk(
  "links/addLink",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createLinkAPI(payload);
      return data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create link");
    }
  }
);


export const removeLink = createAsyncThunk(
  "links/removeLink",
  async (id, { rejectWithValue }) => {
    try {
      await deleteLinkAPI(id);
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete link");
    }
  }
);

const initialState = {
  data: [],      
  meta: {
    current_page: 1,
    limit: 10,
    total_records: 0,
    total_pages: 1,
  },
  isLoading: false,
  error: null,
};

const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    clearLinkError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  fetch link
      .addCase(fetchLinks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // add link
      .addCase(addLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
        state.meta.total_records += 1;
      })
      .addCase(addLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // remove link
      .addCase(removeLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((link) => link.id !== action.payload);
        state.meta.total_records -= 1;
      })
      .addCase(removeLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLinkError } = linkSlice.actions;
export default linkSlice.reducer;