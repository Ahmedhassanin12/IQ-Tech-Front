// features/counter/counterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type LangPref = "ar" | "en"

// Define a type for the slice state
interface MainAppState {
  lang: LangPref;
  search: string;
  isSearchOpen: boolean,
  isMobileMenuOpen: boolean,
  isServicesOpen: boolean;
  currentSlide: number,

}

// Define the initial state using that type
const initialState: MainAppState = {
  lang: "en",
  search: "",
  isSearchOpen: false,
  isMobileMenuOpen: false,
  currentSlide: 0,
  isServicesOpen: false
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<LangPref>) => {
      state.lang += action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
      if (!state.isSearchOpen) {
        state.search = '';
      }
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleService: (state, action: PayloadAction<boolean>) => {
      state.isServicesOpen = action.payload;
    },
    setActiveSlide: (state, action: PayloadAction<{
      index: number
    }>) => {
      state.currentSlide = action.payload.index
    }

  },
});

export const { setLang, setSearchValue, toggleMobileMenu, toggleSearch, toggleService, setActiveSlide } = appSlice.actions;

export default appSlice.reducer;
