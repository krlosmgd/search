import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  hasText: false,
  isSearching: false,
  searchResults: [],
  detailResult: {},
  showModalDetailInResponsive: false,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setHasText: (state, action) => {
      state.hasText = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setDetailResult: (state, action) => {
      state.detailResult = action.payload;
    },
    setShowModalDetailInResponsive: (state, action) => {
      state.showModalDetailInResponsive = action.payload;
    },
  }
})


export const { setSearchValue, setHasText, setIsSearching, setSearchResults, setDetailResult, setShowModalDetailInResponsive } = searchSlice.actions;

export default searchSlice.reducer;