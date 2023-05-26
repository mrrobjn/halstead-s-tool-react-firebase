export const ResultReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        distinctOperatorsWithoutQuote:
          action.payload.distinctOperatorsWithoutQuote,
        totalOperatorsWithoutQuote: action.payload.totalOperatorsWithoutQuote,
        stringGetter: action.payload.stringGetter,
        distinctOperandsWithoutString:
          action.payload.distinctOperandsWithoutString,
        totalOperandsWithoutString: action.payload.totalOperandsWithoutString,
      };
    case "clear":
      return {
        distinctOperatorsWithoutQuote: [],
        totalOperatorsWithoutQuote: [],
        stringGetter: [],
        distinctOperandsWithoutString: [],
        totalOperandsWithoutString: [],
      };
    default:
      throw new Error();
  }
};
