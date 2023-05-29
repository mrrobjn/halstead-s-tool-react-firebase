import { createContext, useReducer } from "react";
import { ResultReducer } from "../reducer/ResultReducer";

export const CalculateContext = createContext();
export const CalculateProvider = ({ children }) => {
  const initialState = {
    distinctOperatorsWithoutQuote: [],
    totalOperatorsWithoutQuote: [],
    stringGetter: [],
    distinctOperandsWithoutString: [],
    totalOperandsWithoutString: [],
    filename: "",
  };
  const [state, dispatch] = useReducer(ResultReducer, initialState);
  function tokenize(code) {
    const tokens = [];
    let currentToken = "";
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      if (char === " " || char === "\n" || char === "\t") {
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = "";
        }
      } else if (
        char === "(" ||
        char === ")" ||
        char === "{" ||
        char === "}" ||
        char === "[" ||
        char === "]" ||
        char === ";" ||
        char === "," ||
        char === "." ||
        char === "-"
      ) {
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = "";
        }
        tokens.push(char);
      } else if (char === "+" && code[i + 1] === "+") {
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = "";
        }
        tokens.push("++");
        i++;
      } else if (char === '"' || char === "'") {
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = "";
        }
        tokens.push(char);
        let endChar = i + 1;
        while (endChar < code.length && code[endChar] !== char) {
          endChar++;
        }
        tokens.push(code.slice(i + 1, endChar));
        tokens.push(char);
        i = endChar;
      } else {
        currentToken += char;
      }
    }
    if (currentToken.length > 0) {
      tokens.push(currentToken);
    }
    return tokens;
  }

  const fileCalculate = (text, filename) => {
    if (filename.split(".").pop() === "js") {
      const operators = [
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "break",
        "continue",
        "function",
        "return",
        "var",
        "let",
        "const",
        "+",
        "++",
        "+=",
        "-",
        "*",
        "/",
        "%",
        "=",
        "==",
        "===",
        "!=",
        "!==",
        "<",
        "<=",
        ">",
        ">=",
        "&&",
        "||",
        "(",
        "{",
        "[",
        "!",
        "?",
        ",",
        ";",
        ":",
        "map",
        "find",
        "filter",
        "concat",
        "copyWithin",
        "entries",
        "every",
        "fill",
        "findIndex",
        "flat",
        "flatMap",
        "forEach",
        "includes",
        "indexOf",
        "join",
        "keys",
        "lastIndexOf",
        "pop",
        "push",
        "reduce",
        "reduceRight",
        "reverse",
        "shift",
        "slice",
        "some",
        "sort",
        "splice",
        "toLocaleString",
        "toString",
        "unshift",
        "values",
        ".",
        "console",
        "log",
        "error",
        "warning",
        "length",
        "Math",
        "abs",
        "acos",
        "acosh",
        "asin",
        "asinh",
        "atan",
        "atan2",
        "atanh",
        "cbrt",
        "ceil",
        "clz32",
        "cos",
        "cosh",
        "exp",
        "expm1",
        "floor",
        "fround",
        "hypot",
        "imul",
        "log",
        "log1p",
        "log10",
        "log2",
        "max",
        "min",
        "pow",
        "random",
        "round",
        "sign",
        "sin",
        "sinh",
        "sqrt",
        "tan",
        "tanh",
        "trunc",
        "toFixed",
        "prompt",
      ];
      const mathMethods = [
        "abs",
        "acos",
        "acosh",
        "asin",
        "asinh",
        "atan",
        "atan2",
        "atanh",
        "cbrt",
        "ceil",
        "clz32",
        "cos",
        "cosh",
        "exp",
        "expm1",
        "floor",
        "fround",
        "hypot",
        "imul",
        "log",
        "log1p",
        "log10",
        "log2",
        "max",
        "min",
        "pow",
        "random",
        "round",
        "sign",
        "sin",
        "sinh",
        "sqrt",
        "tan",
        "tanh",
        "trunc",
      ];
      const quotation = ["'", '"'];
      const removeIndex = [")", "]", "}", "\r", "\n", "\t"];
      const words = tokenize(text);
      // tinh operators
      const operatorsWithoutQuote = words.filter(
        (w) => operators.includes(w) || mathMethods.includes(w)
      );
      // tinh operands
      const stringGetter = text
        .match(/"(.*?)"/g)
        ?.map((match) => match.slice(1, -1));
      const totalOperandsWithoutString = words.filter(
        (w) =>
          !operatorsWithoutQuote.includes(w) &&
          !removeIndex.includes(w) &&
          !stringGetter?.includes(w) &&
          !quotation.includes(w)
      );
      const distinctOperandsWithoutString = [
        ...new Set(totalOperandsWithoutString),
      ];
      const distinctOperatorsWithoutQuote = [...new Set(operatorsWithoutQuote)];
      if (distinctOperatorsWithoutQuote && operatorsWithoutQuote) {
        dispatch({
          type: "set",
          payload: {
            distinctOperatorsWithoutQuote: distinctOperatorsWithoutQuote,
            totalOperatorsWithoutQuote: operatorsWithoutQuote,
            stringGetter,
            distinctOperandsWithoutString,
            totalOperandsWithoutString,
            filename,
          },
        });
      }
    } else if (filename.split(".").pop() === "c++") {
      const operators = [
        "+",
        "++",
        "-",
        "*",
        "\\n",
        "<=",
        ">=",
        "\\",
        "^",
        "&lt;",
        "&gt;",
        "~",
        "&amp;",
        "|",
        "[",
        ";",
        ":",
        "%d",
        ",",
        "!",
        "<",
        ">",
        "#",
        "<>",
        "(",
        "main",
        "include",
        "stdio.h",
        "&",
        "{",
        "%",
        "=",
        "float",
        "input",
      ];
      const keywords = [
        "function",
        "println",
        "printf",
        "print",
        "global",
        "scanf",
        "for",
        "end",
        "while",
        "if",
        "elseif",
        "break",
        "switch",
        "case",
        "otherwise",
        "try",
        "catch",
        "end",
        "const",
        "immutable",
        "import",
        "importall",
        "export",
        "type",
        "typealias",
        "return",
        "true",
        "false",
        "macro",
        "int",
        "quote",
        "abstract",
        "module",
        "using",
        "continue",
        "do",
        "join",
        "aggregate",
        "hpat",
        "@acc",
        "range",
      ];

      const quotation = ["'", '"'];
      const removeIndex = [")", "]", "}", "\r", "\n", "\t"];
      const words = tokenize(text);
      // tinh operators
      const operatorsWithoutQuote = words.filter(
        (w) => operators.includes(w) || keywords.includes(w)
      );
      // tinh operands
      const stringGetter = text
        .match(/"(.*?)"/g)
        ?.map((match) => match.slice(1, -1));
      const totalOperandsWithoutString = words.filter(
        (w) =>
          !operatorsWithoutQuote.includes(w) &&
          !removeIndex.includes(w) &&
          !stringGetter?.includes(w) &&
          !quotation.includes(w)
      );
      const distinctOperandsWithoutString = [
        ...new Set(totalOperandsWithoutString),
      ];
      const distinctOperatorsWithoutQuote = [...new Set(operatorsWithoutQuote)];
      console.log(stringGetter);
      if (distinctOperatorsWithoutQuote && operatorsWithoutQuote) {
        dispatch({
          type: "set",
          payload: {
            distinctOperatorsWithoutQuote: distinctOperatorsWithoutQuote,
            totalOperatorsWithoutQuote: operatorsWithoutQuote,
            stringGetter: stringGetter ? stringGetter : [],
            distinctOperandsWithoutString,
            totalOperandsWithoutString,
            filename,
          },
        });
      }
    }
  };
  const clearResult = () => {
    dispatch({ type: "clear" });
  };
  return (
    <CalculateContext.Provider
      value={{
        fileCalculate,
        state,
        clearResult,
      }}
    >
      {children}
    </CalculateContext.Provider>
  );
};
