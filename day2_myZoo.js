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

    prepareFood() {
        return " 🍖 Animal food .";
    }

}

class Lion extends Animal {
    constructor(name){
        super(name,"Cat King","🦁")
    }
    prepareFood(){
        return "🥩 Wagyu grill with toriyaki sauce";
    }
}


class Tiger extends Animal {
    constructor(name){
        super(name,"Cheetah","🐯")
    }
    
    prepareFood(){
        return "🦌 Rein Deer  "
    }
}



class Bird extends Animal {
    constructor(name){
        super(name,"Desert Eagle","🦅")
    }
    prepareFood(){
        return "🌰 Seeds of life";
    }
}

class Bear extends Animal {
        constructor(name){
        super(name,"Ice Bear","🐻‍❄️")
    }

    prepareFood(){
        return "🍯 100years Golden Honey";
    }
}

class Pokemon extends Animal {
     constructor(name, species, symbol, food) {
        super(name, species, symbol)
        this.food = food
    
    }

    prepareFood () {
        return this.food
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


const zooName = "Siwat terminal zootopia"







function askForCommand() {
    rl.question(
        "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [f] Food | [q] Quit\n> ", (answer) => {
            
            const command = answer.trim().toLowerCase();

      if (command === "q") {
        console.log("\nThank you for visiting the Siwat Terminal Zootopia.");
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
    } else if(command === "f") {
        prepareAnimalFood();
    } else {
        console.log("Please enter r , i , d , f , or q ")
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
        .join(" ____ ");

    const bottomRow = zooPath
        .map((location, index) => {
            if (visitor.position === index) {
                return visitor.symbol;
            }

            return "  ";
        })
        .join(" ____ ");

    console.log(topRow);
    console.log(bottomRow);
}


function inspectLocation(){
    const currentLocation = zooPath[visitor.position]
    console.log("\n ==== Current Location ====")
    console.log(`📍 ${currentLocation.name}`);

    if (currentLocation.animal) {
        console.log(`${currentLocation.animal.symbol} ${currentLocation.animal.name}`);
        console.log(`Species: ${currentLocation.animal.species}`);
        }
        else {
        console.log(currentLocation.description);    
        }
}


function prepareAnimalFood(){
    const currentLocation = zooPath[visitor.position];
    if (currentLocation.animal) {
        const animal = currentLocation.animal;
        console.log(`${visitor.name} prepares food for ${animal.symbol} ${animal.name}`);
        console.log(`Food: ${animal.prepareFood()}`);
    } else {
        console.log(`🦴 There is no animal here 💀`);
    }
}


async function fetchPokemon(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        
    if (!response.ok) throw new Error(`Status ${response.status}`)
         const data = await response.json();

    return new Pokemon(
        data.name.charAt(0).toUpperCase() + data.name.slice(1),
        data.types
        .map(t => t.type.name)
        .join("-"),
        "👻","😱 Nightmare"
    );


}



async function main() {
    console.log(`Welcome ${visitor.name} to the --- ${zooName} ---.`);

    try {
        const gengar = await fetchPokemon("gengar");
        animals.push(gengar);
        zooPath.splice(zooPath.length - 1, 0, {
            symbol: gengar.symbol,
            name: "Ghost House",
            animal: gengar,
        });
    } catch (error) {
        console.error("โหลด Pokémon ไม่สำเร็จ ข้ามไปก่อน:", error.message);
    }

    showZooDirectory();
    displayZoo();
    inspectLocation();
    askForCommand();
}

main();