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
      // Check for whitespace characters
      if (char === " " || char === "\n" || char === "\t") {
        // If there is a current token, push it to the tokens array and reset currentToken
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = "";
        }
      } 
      // Check for single-character operators and delimiters
      else if (
        char === "(" ||
        char === ")" ||
        char === "{" ||
        char === "}" ||
        char === "[" ||
        char === "]" ||
        char === ";" ||
        char === "," ||
        char === "." ||
        char === "-" ||
        (char === "=" && code[i + 1] !== "=") || // modified this line to only check for a single "=" character
        (char === "<" && code[i + 1] !== "<" && code[i + 1] !== "=") ||
        (char === ">" && code[i + 1] !== ">") ||
        (char === "+" && code[i + 1] !== "+") || // modified this line to only check for a single "+" character
        char === "#" ||
        (char === ":" && code[i + 1] !== ":")
      ) {
        // If there is a current token, push it to the tokens array and reset currentToken
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = "";
        }
        // Push the current character as a separate token
        tokens.push(char);
      } 
      // Check for multi-character operators
      else if (
        (char == "<" && code[i + 1] == "<") ||
        (char == ">" && code[i + 1] == ">") ||
        (char == ":" && code[i + 1] == ":") ||
        (char == "!" && code[i + 1] == "=") ||
        (char == "=" && code[i + 1] == "=") ||
        (char == "<" && code[i + 1] == "=") ||
        (char == ">" && code[i + 1] == "=") ||
        (char == "+" && code[i + 1] == "+") ||
        (char == "-" && code[i + 1] == "-") ||
        (char == "&" && code[i + 1] == "&") ||
        (char == "|" && code[i + 1] == "|")
        // added this line to check for "++"
      ) {
        // If there is a current token, push it to the tokens array and reset currentToken
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = "";
        }
        // Push the two-character operator as a single token
        tokens.push(char + code[i + 1]);
        // Increment the loop counter by 1 to skip over the next character
        i++;
      } 
      // Check for string literals
      else if (char == '"' || char == "'") {
          // If there is a current token, push it to the tokens array and reset currentToken
          if (currentToken.length > 0) {
            tokens.push(currentToken);
            currentToken = "";
          }
          // Push the opening quote as a separate token
          tokens.push(char);
          // Find the position of the closing quote
          let endChar = i + 1;
          while (endChar < code.length && code[endChar] != char) {
            endChar++;
          }
          // Push the contents of the string literal as a separate token
          tokens.push(code.slice(i + 1, endChar));
          // Push the closing quote as a separate token
          tokens.push(char);
          // Set the loop counter to the position of the closing quote
          i = endChar;
      } 
      // Check for #include statements
      else if (currentToken.endsWith("#include") && char == "<") {
          // Find the position of the closing angle bracket
          let endChar = i;
          while (endChar < code.length && code[endChar] != ">") {
            endChar++;
          }
          // Add everything between the opening and closing angle brackets to currentToken
          currentToken += code.slice(i, endChar + 1);
          // Set the loop counter to the position of the closing angle bracket
          i = endChar;
      } 
      // Check for single-line comments
      else if (char == "/" && code[i + 1] == "/") {
          // If there is a current token, push it to the tokens array and reset currentToken
          if (currentToken.length > 0) {
            tokens.push(currentToken);
            currentToken = "";
          }
          // Find the position of the end of the comment
          let endComment = i + 2;
          while (
            endComment < code.length &&
            code[endComment] != "\n" &&
            code[endComment] != "\r"
          ) {
            endComment++;
          }
          // Push everything between the start and end of the comment as a separate token
          tokens.push(code.slice(i, endComment));
          // Set the loop counter to the position of the end of the comment
          i = endComment;
      } 
      // Check for escape sequences in string literals
      else if (
        char == "\\" &&
        (code[i + 1] == "n" || code[i + 1] == "r" || code[i + 1] == "t")
      ) {
        // Add both characters of the escape sequence to currentToken
        currentToken += char + code[i + 1];
        // Increment the loop counter by 1 to skip over the next character
        i++;
      } 
      else {
         // Add any other character to currentToken
         currentToken += char;
       }
     }
     if (currentToken.length > 0) {
       tokens.push(currentToken);
     }
     return tokens;
  }
  
  
  // render comment in array
  function getComments(code) {
    const comments = [];
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      if (char === "/" && code[i + 1] === "/") {
        let endComment = i + 2;
        while (
          endComment < code.length &&
          code[endComment] !== "\n" &&
          code[endComment] !== "\r"
        ) {
          endComment++;
        }
        comments.push(code.slice(i, endComment));
        i = endComment;
      }
    }
    return comments;
  }
  const fileCalculate = (text, filename) => {
    // calculate js
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
        "tan",
        "tanh",
        "trunc",
        "toFixed",
        "prompt",
      ];
      const keywords = [
        "abstract",
        "arguments",
        "await",
        "boolean",
        "break",
        "byte",
        "case",
        "catch",
        "char",
        "class",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "double",
        "else",
        "enum",
        "eval",
        "export",
        "extends",
        "false",
        "final",
        "finally",
        "float",
        "for",
        "function",
        "goto",
        "if",
        "implements",
        "import",
        "in",
        "instanceof",
        "int",
        "interface",
        "let",
        "long",
        "native",
        "new",
        "null",
        "package",
        "private",
        "protected",
        "public",
        "return",
        "short",
        "static",
        "super",
        "switch",
        "synchronized",
        "this",
        "throw",
        "throws",
        "transient",
        "true",
        "try",
        "typeof",
        "var",
        "void",
        "volatile",
        "while",
        "parseInt",
      ];
      const methods = [
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
        "document",
        "querySelector",
        "querySelectorAll",
        "addEventListener",
        "getElementById",
        "getElementsByTagName",
        "getElementsByClassName",
        "createElement",
        "removeChild",
        "appendChild",
        "replaceChild",
        "write",
        "writeln",
      ];
      const quotation = ["'", '"'];
      const removeIndex = [")", "]", "}", "\r", "\n", "\t"];
      const words = tokenize(text);
      // tinh operators
      const operatorsWithoutQuote = words.filter(
        (w) =>
          operators.includes(w) || methods.includes(w) || keywords.includes(w)
      );
      // tinh operands
      const comments = getComments(text);
      const stringGetter = text
        .match(/"(.*?)"/g)
        ?.map((match) => match.slice(1, -1));
      const totalOperandsWithoutString = words.filter(
        (w) =>
          !operatorsWithoutQuote.includes(w) &&
          !removeIndex.includes(w) &&
          !stringGetter?.includes(w) &&
          !quotation.includes(w) &&
          !comments.includes(w)
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
            stringGetter: stringGetter ? stringGetter : [],
            distinctOperandsWithoutString,
            totalOperandsWithoutString,
            filename,
          },
        });
      }
    }
    // calculate c++
    else if (filename.split(".").pop() === "cpp") {
      const operators = [
        "+",
        "++",
        "-",
        "*",
        "\\n",
        "<=",
        ">=",
        "<<",
        "\\",
        "^",
        "&lt;",
        "&gt;",
        "~",
        "&amp;",
        "|",
        "[",
        "&&",
        "||",
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
        "==",
        "main",
        "include",
        "stdio.h",
        "std",
        "::",
        "iostream",
        "conio.h",
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
        "else",
        "cout",
        "cin",
        "endl",
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
        "getch",
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
        "using",
        "char",
        "namespace",
      ];

      const quotation = ["'", '"'];
      const removeIndex = [")", "]", "}", "\r", "\n", "\t", "\\r"];
      const words = tokenize(text);
      
      // tinh operators
      const operatorsWithoutQuote = words.filter(
        (w) => operators.includes(w) || keywords.includes(w)
      );
      // tinh operands
      const comments = getComments(text);
      const stringGetter = text
        .match(/"(.*?)"/g)
        ?.map((match) => match.slice(1, -1));
      const totalOperandsWithoutString = words.filter(
        (w) =>
          !operatorsWithoutQuote.includes(w) &&
          !removeIndex.includes(w) &&
          !stringGetter?.includes(w) &&
          !quotation.includes(w) &&
          !comments.includes(w)
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
