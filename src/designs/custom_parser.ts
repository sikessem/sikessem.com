// const empty_template = (): QwikJSX.Element => <></>;

// export function Component(name: string) {
//     return (constructor: any): typeof Renderer => {
//         const render = constructor.render || empty_template;
//         constructor.constructor = function () {
//             this.render.bind(this.render)
//         }
//         constructor.render = render;
//         constructor.name = name;
//         constructor.prototype = Renderer;
//         return constructor;
//     }
// }

// function customParser(input) {
//     // Définir une fonction récursive pour traiter chaque caractère
//     function parseValue(char, index) {
//       // Vérifier le type de caractère
//       if (char === "t") {
//         // Si le caractère est 't', c'est probablement 'true'
//         return { value: true, newIndex: index + 3 };
//       } else if (char === "f") {
//         // Si le caractère est 'f', c'est probablement 'false'
//         return { value: false, newIndex: index + 4 };
//       } else if (char === "n") {
//         // Si le caractère est 'n', c'est probablement 'null'
//         return { value: null, newIndex: index + 3 };
//       } else if (char === "'") {
//         // Si le caractère est "'", c'est probablement une chaîne
//         var endIndex = input.indexOf("'", index + 1);
//         return { value: input.slice(index + 1, endIndex), newIndex: endIndex + 1 };
//       } else if (char === '"') {
//         // Si le caractère est '"', c'est probablement une chaîne
//         var endIndex = input.indexOf('"', index + 1);
//         return { value: input.slice(index + 1, endIndex), newIndex: endIndex + 1 };
//       } else if (char === "[") {
//         // Si le caractère est '[', c'est probablement un tableau
//         var newArray = [];
//         var newIndex = index + 1;

//         // Parcourir les éléments du tableau
//         while (input[newIndex] !== "]") {
//           var result = parseValue(input[newIndex], newIndex);
//           newArray.push(result.value);
//           newIndex = result.newIndex;
//           // Ignorer les virgules et les espaces entre les éléments du tableau
//           while (input[newIndex] === "," || input[newIndex] === " ") {
//             newIndex++;
//           }
//         }

//         return { value: newArray, newIndex: newIndex + 1 };
//       } else if (char === "{") {
//         // Si le caractère est '{', c'est probablement un objet
//         var newObject = {};
//         var newIndex = index + 1;

//         // Parcourir les paires clé-valeur de l'objet
//         while (input[newIndex] !== "}") {
//           var keyResult = parseValue(input[newIndex], newIndex);
//           var key = keyResult.value;
//           newIndex = keyResult.newIndex;

//           // Ignorer les espaces et le caractère ':' entre la clé et la valeur
//           while (input[newIndex] === " " || input[newIndex] === ":") {
//             newIndex++;
//           }

//           var valueResult = parseValue(input[newIndex], newIndex);
//           var value = valueResult.value;
//           newIndex = valueResult.newIndex;

//           newObject[key] = value;

//           // Ignorer les virgules et les espaces entre les paires clé-valeur
//           while (input[newIndex] === "," || input[newIndex] === " ") {
//             newIndex++;
//           }
//         }

//         return { value: newObject, newIndex: newIndex + 1 };
//       } else {
//         // Si le caractère n'est pas spécial, c'est probablement un nombre
//         var endIndex = index;
//         while (!isNaN(input[endIndex]) || input[endIndex] === ".") {
//           endIndex++;
//         }
//         return { value: parseFloat(input.slice(index, endIndex)), newIndex: endIndex };
//       }
//     }

//     // Appeler la fonction parseValue avec l'index initial 0
//     return parseValue(input[0], 0).value;
//   }

//   // Exemples d'utilisation
//   console.log(customParser("10"));           // 10
//   console.log(customParser("'10'"));         // '10'
//   console.log(customParser('"10"'));         // "10"
//   console.log(customParser("false"));        // false
//   console.log(customParser("true"));         // true
//   console.log(customParser("undefined"));    // undefined
//   console.log(customParser("null"));         // null
//   console.log(customParser("[1, 2, 'three']"));  // [1, 2, 'three']
//   console.log(customParser("{ 'a': 1, 'b': true, 'c': [1, 2] }")); // { a: 1, b: true, c: [1, 2] }

//   function parseString(input, index, quoteChar) {
//     var endIndex = input.indexOf(quoteChar, index + 1);
//     var stringValue = input.slice(index + 1, endIndex);
//     // Gérer les caractères d'échappement
//     stringValue = stringValue.replace(/\\(.)/g, '$1');
//     return { value: stringValue, newIndex: endIndex + 1 };
//   }

//   function parseBoolean(input, index) {
//     if (input.startsWith("true", index)) {
//       return { value: true, newIndex: index + 4 };
//     } else if (input.startsWith("false", index)) {
//       return { value: false, newIndex: index + 5 };
//     } else {
//       throw new Error("Invalid boolean value");
//     }
//   }

//   function parseNull(input, index) {
//     if (input.startsWith("null", index)) {
//       return { value: null, newIndex: index + 4 };
//     } else {
//       throw new Error("Invalid null value");
//     }
//   }

//   function parseNumber(input, index) {
//     var endIndex = index;
//     while (!isNaN(input[endIndex]) || input[endIndex] === ".") {
//       endIndex++;
//     }
//     return { value: parseFloat(input.slice(index, endIndex)), newIndex: endIndex };
//   }

//   function parseArray(input, index) {
//     var newArray = [];
//     var newIndex = index + 1;

//     while (input[newIndex] !== "]") {
//       var result = parseValue(input, newIndex);
//       newArray.push(result.value);
//       newIndex = result.newIndex;

//       // Ignorer les virgules et les espaces entre les éléments du tableau
//       while (input[newIndex] === "," || input[newIndex] === " ") {
//         newIndex++;
//       }
//     }

//     return { value: newArray, newIndex: newIndex + 1 };
//   }

//   function parseObject(input, index) {
//     var newObject = {};
//     var newIndex = index + 1;

//     while (input[newIndex] !== "}") {
//       var keyResult = parseString(input, newIndex, "'");
//       var key = keyResult.value;
//       newIndex = keyResult.newIndex;

//       // Ignorer les espaces et le caractère ':' entre la clé et la valeur
//       while (input[newIndex] === " " || input[newIndex] === ":") {
//         newIndex++;
//       }

//       var valueResult = parseValue(input, newIndex);
//       var value = valueResult.value;
//       newIndex = valueResult.newIndex;

//       newObject[key] = value;

//       // Ignorer les virgules et les espaces entre les paires clé-valeur
//       while (input[newIndex] === "," || input[newIndex] === " ") {
//         newIndex++;
//       }
//     }

//     return { value: newObject, newIndex: newIndex + 1 };
//   }

//   function parseValue(input, index) {
//     var char = input[index];

//     if (char === "'") {
//       return parseString(input, index, "'");
//     } else if (char === '"') {
//       return parseString(input, index, '"');
//     } else if (char === "t" || char === "f") {
//       return parseBoolean(input, index);
//     } else if (char === "n") {
//       return parseNull(input, index);
//     } else if (char === "[") {
//       return parseArray(input, index);
//     } else if (char === "{") {
//       return parseObject(input, index);
//     } else {
//       return parseNumber(input, index);
//     }
//   }

//   // Exemples d'utilisation
//   console.log(parseValue("10", 0).value);           // 10
//   console.log(parseValue("'10'", 0).value);         // '10'
//   console.log(parseValue('"10"', 0).value);         // "10"
//   console.log(parseValue("false", 0).value);        // false
//   console.log(parseValue("true", 0).value);         // true
//   console.log(parseValue("undefined", 0).value);    // undefined
//   console.log(parseValue("null", 0).value);         // null
//   console.log(parseValue("[1, 2, 'three']", 0).value);  // [1, 2, 'three']
//   console.log(parseValue("{ 'a': 1, 'b': true, 'c': [1, 2] }", 0).value); // { a: 1, b: true, c: [1, 2] }
