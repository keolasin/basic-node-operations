const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
 //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch(command) {
    case "echo":
    //we will add the functionality of echo next within the object commandLibrary
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    case "reverseString":
      commandLibrary.reverseString(userInputArray.slice(1).join(" "));
      break;
    default:
      commandLibrary.errorHandler();
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  "errorHandler": function(){
    done('Error: command not found');
  },
  "echo": function(userInput){
    done(userInput);
  },
  "cat": function(fullPath){
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  "head": function(fullPath){
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let slicedText = data.toString().split('\n').slice(0,4).join('\n');
      done(slicedText);
    });
  },
  "tail": function(fullPath){
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let stringData = data.toString();
      let lastLines = stringData.split('\n').slice(-4).join('\n');
      done(lastLines);
    });
  },
  "reverseString": function(userInput){
    let wordsArray = userInput.split(' ');
    let tempArray = [];

    wordsArray.forEach( (word) => {
      let reversedWord = word.split('').reverse().join('');
      tempArray.push(reversedWord);
    });
    let reversedInput = tempArray.join(' ');
    done(reversedInput);
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
