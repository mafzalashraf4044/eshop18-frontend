const defaultInnerShadow = { color: "#e2e2e2", distance: 1, blur: 0, angle: 1, opacity: 100 }
const defaultDropShadow = { color: "#000000", distance: 2, blur: 0, angle: 1, opacity: 100 }

const defaultState = {
  isLoading: false,
  blurBackground: false,
  icons: null,
  searchTerm: '',
  selectedIcons: [],
  selectedIconsForEdit: [],
  isToolboxVisible: true,
  collections: [],
  sidebarIndex: -1,
  iconColor:"#444",
  ambientColor: "#333",
  bgColor: "#222",
  isEditorOpen: false,
  iconInnerShadow: defaultInnerShadow,
  iconDropShadow: defaultDropShadow,
  bgInnerShadow: defaultInnerShadow,
  bgDropShadow: defaultDropShadow,
  scale: [1,1],
	rotate: 0,
  applyIconInnerShadow: false,
	applyIconDropShadow: false,
	applyBgInnerShadow: false,
	applyBgDropShadow: false,
  glossEffect: {effect: -1, opacity: 100, image: null, x:0, y:0},
  
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SAVE_SIDEBAR_INDEX':
    case 'SAVE_IS_LOADING':
    case 'SAVE_BLUR_BACKGROUND':
    case 'SAVE_SEARCH_RESULTS':
    case 'SAVE_IS_TOOLBOX_VISIBLE':
    case 'SET_SELECTED_ICONS':
    case 'SAVE_SEARCH_TERM':
    case 'SAVE_COLLECTIONS':
    case 'SET_SELECTED_ICONS_FOR_EDIT':
    case 'SET_ICON_COLOR':
    case 'SET_AMBIENT_COLOR':
    case 'SET_BACKGROUND_COLOR':
    case 'SET_IS_EDITOR_OPEN':
    case 'APPLY_ICON_INNER_SHADOW':
    case 'APPLY_BG_DROP_SHADOW':
    case 'APPLY_ICON_DROP_SHADOW':
    case 'APPLY_BG_INNER_SHADOW':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_ICON_INNER_SHADOW':
        let {iconInnerShadow} = state
        let iishadow = Object.assign({}, iconInnerShadow, action.payload)
        return {...state, ...{iconInnerShadow: iishadow}};
    case 'SET_ICON_DROP_SHADOW':
      let {iconDropShadow} = state
      let idshadow = Object.assign({}, iconDropShadow, action.payload)
      return {...state, ...{iconDropShadow: idshadow}};
    case 'SET_BG_INNER_SHADOW':
      let {bgInnerShadow} = state
      let bishadow = Object.assign({}, bgInnerShadow, action.payload)
      return {...state, ...{bgInnerShadow: bishadow}};
    case 'SET_BG_DROP_SHADOW':
      let {bgDropShadow} = state
      let bdshadow = Object.assign({}, bgDropShadow, action.payload)
      return {...state, ...{bgDropShadow: bdshadow}};
    default:
      return state;
  }
}