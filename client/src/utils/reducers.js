import {
  UPDATE_PARTS,
  ADD_TO_BUILD,
  ADD_MULTIPLE_TO_BUILD,
  UPDATE_BUILD_QUANTITY,
  REMOVE_FROM_BUILD,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_BUILD,
  TOGGLE_BUILD
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PARTS:
      return {
        ...state,
        parts: [...action.parts],
      };

    case ADD_TO_BUILD:
      return {
        ...state,
        buildOpen: true,
        build: [...state.build, action.part],
      };

    case ADD_MULTIPLE_TO_BUILD:
      return {
        ...state,
        build: [...state.build, ...action.parts],
      };

    case UPDATE_BUILD_QUANTITY:
      return {
        ...state,
        buildOpen: true,
        build: state.build.map(part => {
          if (action._id === part._id) {
            part.purchaseQuantity = action.purchaseQuantity
          }
          return part
        })
      };

    case REMOVE_FROM_BUILD:
      let newState = state.build.filter(part => {
        return part._id !== action._id;
      });

      return {
        ...state,
        buildOpen: newState.length > 0,
        build: newState
      };

    case CLEAR_BUILD:
      return {
        ...state,
        buildOpen: false,
        build: []
      };

    case TOGGLE_BUILD:
      return {
        ...state,
        buildOpen: !state.buildOpen
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

    default:
      return state;
  }
};
