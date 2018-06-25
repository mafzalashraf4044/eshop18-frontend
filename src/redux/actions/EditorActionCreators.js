import axios from 'axios';
import { API_URL, API_TOKEN } from 'general/constants';

export function saveSidebarIndex(sidebarIndex) {
  return {
    type: 'SAVE_SIDEBAR_INDEX',
    payload: {
      sidebarIndex,
    },
  };
}

export function saveIsLoading(isLoading) {
  return {
    type: 'SAVE_IS_LOADING',
    payload: {
      isLoading,
    },
  };
}

export function saveBlurBackground(blurBackground) {
  return {
    type: 'SAVE_BLUR_BACKGROUND',
    payload: {
      blurBackground,
    },
  };
}

export function saveIsToolboxVisible(isToolboxVisible) {
  return {
    type: 'SAVE_IS_TOOLBOX_VISIBLE',
    payload: {
      isToolboxVisible,
    },
  };
}

export function saveIcons(icons) {
  return {
    type: 'SAVE_SEARCH_RESULTS',
    payload: {
      icons,
    },
  };
}

export function saveSearchTerm(searchTerm) {
  return {
    type: 'SAVE_SEARCH_TERM',
    payload: {
      searchTerm,
    },
  };
}

export function setSelectedIcons(selectedIcons) {
  return {
    type: 'SET_SELECTED_ICONS',
    payload: {
      selectedIcons,
    },
  };
}

export function saveCollections(collections) {
  return {
    type: 'SAVE_COLLECTIONS',
    payload: {
      collections,
    },
  };
}

export function setSelectedIconsForEdit(selectedIconsForEdit) {
  return {
    type: 'SET_SELECTED_ICONS_FOR_EDIT',
    payload: {
      selectedIconsForEdit,
    },
  };
}

export function setIconColor(iconColor) {
  return {
    type: 'SET_ICON_COLOR',
    payload: {
      iconColor,
    },
  };
}

export function setAmbientColor(ambientColor) {
  return {
    type: 'SET_AMBIENT_COLOR',
    payload: {
      ambientColor,
    },
  };
}

export function setBgColor(bgColor) {
  return {
    type: 'SET_BACKGROUND_COLOR',
    payload: {
      bgColor,
    },
  };
}

export function setIsEditorOpen(isEditorOpen) {
  console.log('isEditorOpen', isEditorOpen);
  
  return {
    type: 'SET_IS_EDITOR_OPEN',
    payload: {
      isEditorOpen,
    },
  };
}

export function applyIconInnerShadow(applyIconInnerShadow) {
  
  return {
    type: 'APPLY_ICON_INNER_SHADOW',
    payload: {
      applyIconInnerShadow,
    },
  };
}

export function applyIconDropShadow(applyIconDropShadow) {
  
  return {
    type: 'APPLY_ICON_DROP_SHADOW',
    payload: {
      applyIconDropShadow,
    },
  };
}

export function applyBGInnerShadow(applyBgInnerShadow) {
  
  return {
    type: 'APPLY_BG_INNER_SHADOW',
    payload: {
      applyBgInnerShadow,
    },
  };
}

export function applyBGDropShadow(applyBgDropShadow) {
  
  return {
    type: 'APPLY_BG_DROP_SHADOW',
    payload: {
      applyBgDropShadow,
    },
  };
}


export function setIconInnerShadow(options) {
  
  return {
    type: 'SET_ICON_INNER_SHADOW',
    payload: {
      ...options
    },
  };
}

export function setIconDropShadow(options) {
  
  return {
    type: 'SET_ICON_DROP_SHADOW',
    payload: {
      options,
    },
  };
}

export function setBGInnerShadow(options) {
  
  return {
    type: 'SET_BG_INNER_SHADOW',
    payload: {
      options,
    },
  };
}

export function setBGDropShadow(options) {
  
  return {
    type: 'SET_BG_DROP_SHADOW',
    payload: {
      options,
    },
  };
}

/* Thunks */

export function getIcons(offset, limit, searchTerm) {
  return () => {
    return axios.get(`${API_URL}/api/app/iconeditor/icons${searchTerm ? `/${searchTerm}` : ''}?offset=${offset}&limit=${limit}&api_token=${API_TOKEN}`);
  };
}

export function getCollections() {
  return () => {
    return axios.get(`${API_URL}/api/app/iconeditor/collections?api_token=${API_TOKEN}`);
  };
}

export function getCollectionById(id) {
  return () => {
    return axios.get(`${API_URL}/api/app/iconeditor/collection/${id}?api_token=${API_TOKEN}`);
  };
}

export function saveCollection(collection) {
  const headers = { Authorization: "Bearer " + API_TOKEN, "x-requested-with": "XMLHttpRequest" };
  
  return () => {
    return axios.post(`${API_URL}/api/app/iconeditor/collections?api_token=${API_TOKEN}`, collection, {headers});
  };
}

export function updateCollection(id, collection) {
  const headers = { Authorization: "Bearer " + API_TOKEN, "x-requested-with": "XMLHttpRequest" };
  
  return () => {
    return axios.post(`${API_URL}/api/app/iconeditor/collections/${id}?api_token=${API_TOKEN}`, {...collection, _method:"patch"}, {headers});
  };
}

export function deleteCollection(id) {
  return () => {
    return axios.delete(`${API_URL}/api/app/iconeditor/collections/${id}?api_token=${API_TOKEN}`);
  };
}

export function getTemplates() {
  return () => {
    return axios.get(`${API_URL}/api/app/iconeditor/templates?api_token=${API_TOKEN}`);
  };
}

export function saveTemplate(template) {
  return () => {
    return axios.post(`${API_URL}/api/app/iconeditor/templates?api_token=${API_TOKEN}`, template);
  };
}


export function deleteTemplate(id) {
  return () => {
    return axios.delete(`${API_URL}/api/app/iconeditor/template/${id}?api_token=${API_TOKEN}`);
  };
}

export function getBackgrounds() {
  return () => {
    return axios.get(`${API_URL}/api/app/iconeditor/backgrounds?api_token=${API_TOKEN}`);
  };
}

export function saveBackground(background) {
  return () => {
    return axios.post(`${API_URL}/api/app/iconeditor/backgrounds?api_token=${API_TOKEN}`, background);
  };
}

export function deleteBackground(id) {
  return () => {
    return axios.delete(`${API_URL}/api/app/iconeditor/background/${id}?api_token=${API_TOKEN}`);
  };
}

export function getSVGFromURL(url) {
  const encodedURL = encodeURIComponent(`${API_URL}/p.php?url=${url}&api_token=${API_TOKEN}`);

  return () => {
    return axios.get(url);
  };
}