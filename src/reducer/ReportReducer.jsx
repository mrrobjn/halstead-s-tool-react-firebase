export const ReportInitalState = {
  distinctOperatorsWithoutQuote: [],
  totalOperatorsWithoutQuote: [],
  stringGetter: [],
  distinctOperandsWithoutString: [],
  totalOperandsWithoutString: [],
  filename: "",
  formattedDate: "",
};
export const ReportReducer = (state, action) => {
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
        filename: action.payload.filename,
        formattedDate: action.payload.formattedDate,
      };
    case "clear":
      return {
        distinctOperatorsWithoutQuote: [],
        totalOperatorsWithoutQuote: [],
        stringGetter: [],
        distinctOperandsWithoutString: [],
        totalOperandsWithoutString: [],
        filename: "",
        formattedDate: "",
      };
    default:
      throw new Error();
  }
};
