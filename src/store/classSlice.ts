import ClassService from '@/lib/services/ClassService';
import { IClass } from '@/lib/interfaces/Class/IClass';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IClassState } from '@/lib/interfaces/Class/IClassState';

const classService = new ClassService();

const initialState: IClassState = {
  classes: [],
  isLoading: false,
  error: null,
};

export const fetchClasses = createAsyncThunk(
  'class/fetchClasses',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: { token: string | null } };
    if (!auth.token) {
      return rejectWithValue('No token available');
    }
    try {
      return await classService.getClasses(auth.token);
    } catch (error) {
      return rejectWithValue('Failed to fetch classes');
    }
  }
);

export const createClass = createAsyncThunk(
  'class/createClass',
  async (classData: Omit<IClass, 'id'>, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: { token: string | null } };
    if (!auth.token) {
      return rejectWithValue('No token available');
    }
    try {
      return await classService.createClass(auth.token, classData);
    } catch (error) {
      return rejectWithValue('Failed to create class');
    }
  }
);

export const updateClass = createAsyncThunk(
  'class/updateClass',
  async ({ classId, classData }: { classId: string; classData: Partial<IClass> }, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: { token: string | null } };
    if (!auth.token) {
      return rejectWithValue('No token available');
    }
    try {
      return await classService.updateClass(auth.token, classId, classData);
    } catch (error) {
      return rejectWithValue('Failed to update class');
    }
  }
);

export const deleteClass = createAsyncThunk(
  'class/deleteClass',
  async (classId: string, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: { token: string | null } };
    if (!auth.token) {
      return rejectWithValue('No token available');
    }
    try {
      await classService.deleteClass(auth.token, classId);
      return classId;
    } catch (error) {
      return rejectWithValue('Failed to delete class');
    }
  }
);

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Classes
      .addCase(fetchClasses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Class
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Class
      .addCase(updateClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.classes.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Class
      .addCase(deleteClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = state.classes.filter(c => c.id !== action.payload);
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default classSlice.reducer;