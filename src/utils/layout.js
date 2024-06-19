// app constants
import { SideBarTypes, LayoutWidth } from "../constants";


const getLayoutConfigs = ( layoutWidth ) => {
  // add property to change in particular layoutWidth
  let config = {
    leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
  };

  switch ( layoutWidth ) {
    case LayoutWidth.LAYOUT_WIDTH_FLUID:
      config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT;
      break;
    case LayoutWidth.LAYOUT_WIDTH_BOXED:
      config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;
      break;
    default:
      return config;
  }
  return config;
};

/**
 * Changes the body attribute
 */
const changeHTMLAttribute = ( attribute, value ) => {
  if ( document.body )
    document.getElementsByTagName( "html" )[0].setAttribute( attribute, value );
};

export { getLayoutConfigs, changeHTMLAttribute };
