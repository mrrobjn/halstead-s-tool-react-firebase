export const TabBarReducer = (state, action) => {
  switch (action.type) {
    case "add":
      if (state.find((item) => item.id === action.item.id)) {
        return state;
      } else {
        return [...state, action.item];
      }
    case "change":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, active: true }
          : { ...item, active: false }
      );
    case "remove":
      // find index of delete item
      const index = state.findIndex((item) => item.id === action.id);
      // filter new state after delete
      let newState = state.filter((item) => item.id !== action.id);
      if (state[index].active && newState.length > 0) {
        const newIndex = index === newState.length ? index - 1 : index;
        newState = newState.map((item, i) =>
          i === newIndex ? { ...item, active: true } : item
        );
      }
      return newState;
    default:
      throw new Error();
  }
};
