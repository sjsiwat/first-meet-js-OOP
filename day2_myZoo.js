import {createInterface} from "node:readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});






class Animal{
    constructor(name, species, symbol){
        this.name = name;
        this.species = species;
        this.symbol = symbol;
        
    }

}

class Lion extends Animal {
    constructor(name){
        super(name,"lion","🦁")
    }
}


class Tiger extends Animal {
    constructor(name){
        super(name,"Cheetah","🐯")
    }
}



class Bird extends Animal {
    constructor(name){
        super(name,"Desert Eagle","🦅")
    }
}

class Bear extends Animal {
        constructor(name){
        super(name,"Ice Bear","🐻")
    }
}


class Visitor {
    constructor(name,symbol) {
        this.name = name;
        this.symbol =symbol;
        this.position = 0;
    }
    moveLeft() {
    if (this.position === 0) {
        return "You are at the entrance";
    } else {
        this.position--;
        return `${this.name} Move Left`;}
    }

    moveRight(maxPosition) {
    if (this.position === maxPosition) {
        return "You are at the end of zoo";
    } else {
        this.position++;
        return `${this.name} Move Right`;}
    }
}




const animals = [
    new Lion("Johny"),
    new Tiger("Bobby"),
    new Bird("Joe"),
    new Bear("Babii")
    ];

const visitor = new Visitor("Yok","🤖");

const zooPath = [{
    symbol: "🚪",
    name: "Entrance",
    description:
      "The main entrance to the zoo. The morning visitors are arriving.",
  },
  {
    symbol: animals[0].symbol,
    name: "Golden Lion",
    animal: animals[0],
  },
  {
    symbol: "🌳",
    name: "Garden",
    description: "A quiet garden with large trees and shaded benches.",
  },
  {
    symbol: animals[1].symbol,
    name: "Twin Head Tiger ",
    animal: animals[1],
  },
  {
    symbol: animals[2].symbol,
    name: "The Desert Eagle",
    animal: animals[2],
  },
  {
    symbol: animals[3].symbol,
    name: "Killer Bear",
    animal: animals[3],
  },
  {
    symbol: "🍽️",
    name: "Food court",
    description: "The food court smells like popcorn and fresh fruit.",
  },
]


const zooName = "Js terminal zoo"







function askForCommand() {
    rl.question(
        "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ", (answer) => {
            
            const command = answer.trim().toLowerCase();

      if (command === "q") {
        console.log("\nThank you for visiting the JS Terminal Zoo.");
        rl.close();
        return;
      }

      handleCommand(command);
      displayZoo();
      askForCommand();
        }
    )
}

function handleCommand(command) {
    if(command === "l") {
        console.log(visitor.moveLeft())
    } else if(command === "r") {
        console.log(visitor.moveRight(zooPath.length -1));
    } else if(command === "i") {
        inspectLocation();
    } else if(command === "d") {
        showZooDirectory();
    } else {
        console.log("Please enter r , i , d , or q ")
    }
}

function showZooDirectory(){
    console.log("\n=== Zoo Directory ===")
    console.table(
    animals.map((animal) => ({
        name: animal.name,
        species: animal.species,
        symbol: animal.symbol,
    })),
);
}





function displayZoo() {
    const topRow = zooPath
        .map(location => location.symbol)
        .join(" ");

    const bottomRow = zooPath
        .map((location, index) => {
            if (visitor.position === index) {
                return visitor.symbol;
            }

            return "x";
        })
        .join(" ");

    console.log(topRow);
    console.log(bottomRow);
}


function inspectLocation(){
    
}


function prepareAnimalFood(){}






console.log(`Welcome to the ${zooName} Explorer.`);
showZooDirectory();
displayZoo();
askForCommand();

/* 
inspectLocation();
prepareAnimalFood();
 */