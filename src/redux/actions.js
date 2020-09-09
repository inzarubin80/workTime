import {
  SET_CURRENTDATE
} from './types'

export const addFavorite = (idProd) => {  
    return {
        type: INSET_FAVORITE,
        payload: idProd
    }
}

export const removeFavorite = (idProd) => {  
  return {
      type: REMOVE_FAVORITE,
      payload: idProd
  }
}


export const setCurrentDate = (currentDate) => {  
  return {
      type: SET_CURRENTDATE,
      payload: currentDate
  }
}

