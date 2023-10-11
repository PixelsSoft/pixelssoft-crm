import { createSlice } from "@reduxjs/toolkit";

export const LayoutSlice = createSlice( {
    name: "Layout",
    initialState: {
        layoutMode: "fluid",
        twoColumnTheme: "light",
        layoutType: "vertical",
        layoutColor: "light",
        layoutWidth: "fluid",
        menuPosition: "fixed",
        leftSideBarTheme: 'light',
        leftSideBarType: "default",
        showSidebarUserInfo: false,
        topbarTheme: "dark",
        showTwoToneIcons: false,
        isOpenRightSideBar: false,
        showRightSidebar: false

    },
    reducers: {
        changeLayoutModes: ( state, action ) => {
            state.layoutMode = action.payload;
        },
        changeTwoColumnThemes: ( state, action ) => {
            state.twoColumnTheme = action.payload;
        },
        changeLayout: ( state, action ) => {
            state.layoutType = action.payload;
        },
        changeLayoutColor: ( state, action ) => {
            state.layoutColor = action.payload;
        },
        changeLayoutWidth: ( state, action ) => {
            state.layoutWidth = action.payload;
        },
        changeMenuPositions: ( state, action ) => {
            state.menuPosition = action.payload;
        },
        changeSidebarTheme: ( state, action ) => {
            state.leftSideBarTheme = action.payload;
        },
        changeSidebarType: ( state, action ) => {
            state.leftSideBarType = action.payload;
        },
        toggleSidebarUserInfo: ( state, action ) => {
            state.showSidebarUserInfo = action.payload;
        },
        changeTopbarTheme: ( state, action ) => {
            state.topbarTheme = action.payload;
        },
        toggleTwoToneIcons: ( state, action ) => {
            state.showTwoToneIcons = action.payload;
        },
        showRightSidebar: ( state ) => {
            state.isOpenRightSideBar = true;
        },
        hideRightSidebar: state => {
            state.isOpenRightSideBar = false
        }
    },
} );

export const { changeLayoutModes,
    changeTwoColumnThemes,
    changeLayout,
    changeLayoutColor,
    changeLayoutWidth,
    changeMenuPositions,
    changeSidebarTheme,
    changeSidebarType,
    toggleSidebarUserInfo,
    changeTopbarTheme,
    toggleTwoToneIcons,
    showRightSidebar,
    hideRightSidebar
} = LayoutSlice.actions;
export default LayoutSlice.reducer;