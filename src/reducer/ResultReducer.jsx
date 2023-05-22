export const ResultReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        distinctOperatorsWithoutQuote:
          action.payload.distinctOperatorsWithoutQuote,
        totalOperatorsWithoutQuote: action.payload.totalOperatorsWithoutQuote,
        stringGetter: action.payload.stringGetter,
        distinctOperandsWithoutString: action.payload.distinctOperandsWithoutString
      };
    case "clear":
      return {
        distinctOperatorsWithoutQuote: [],
        totalOperatorsWithoutQuote: [],
      };
    default:
      throw new Error();
  }
};
