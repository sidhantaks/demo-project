import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    fullname: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: "",
    city: ''
  }
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    }
  }
});

export const { updateFormData, resetFormData } = signupSlice.actions;

export default signupSlice.reducer;
