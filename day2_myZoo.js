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
        super(name,"ราชาแห่งโลกแมว","🦁")
    }
    prepareFood(){
        return "🥩 วากิวย่างซอสเทริยากิ";
    }
}


class Tiger extends Animal {
    constructor(name){
        super(name,"เสือลายดาวกระจาย5แฉก","🐯")
    }
    
    prepareFood(){
        return "🦌 เนื้อกวางจากยอดเขาเหลียงซาน"
    }
}


class Bird extends Animal {
    constructor(name){
        super(name,"พญาอินทรีย์แห่งเทือกเขาอัลไต","🦅")
    }
    prepareFood(){
        return "🌰 เมล็ดพันธ์แห่งชีวิต";
    }
}

class Bear extends Animal {
        constructor(name){
        super(name,"ผู้นำกองทัพหมีขาว แห่งอาณาจักรหมี","🐻")
    }

    prepareFood(){
        return "🍯 น้ำผึ้งจากหุบเขาวงกต3000ปี";
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
        return "กลับมาที่ทางเข้า";
    } else {
        this.position--;
        return `${this.name} เดินไปทางซ้าย`;}
    }

    moveRight(maxPosition) {
    if (this.position === maxPosition) {
        return "อยู่ที่จุดสิ้นสุดแล้ว ต้องเดินกลับ";
    } else {
        this.position++;
        return `${this.name} เดินไปทางขวา`;}
    }
}




const animals = [
    new Lion("Johny"),
    new Tiger("Bobby"),
    new Bird("Joe"),
    new Bear("Babii")
    ];

const visitor = new Visitor("Yok","🤠");

const zooPath = [{
    symbol: "🚪",
    name: "ประตูมิติ",
    description:
      "ท่านอยู่ที่ทางเข้าหลักสู่ขุมนรก พื้นที่จัดแสดงของเหล่าสัตว์ประหลาดจากต่างโลก.",
  },
  {
    symbol: animals[0].symbol,
    name: "ไลอ้อนคิง ประกายแสงสีทอง",
    animal: animals[0],
  },
  {
    symbol: "🌴🪾",
    name: "สวนแห่งความสิ้นหวัง",
    description: "ซากของสวนป่าที่เคยอุดมสมบูรณ์ โดนทำลายหลังจากเหตุการณ์ถูกบุกโดยกองทัพลิซาร์ดอน ",
  },
  {
    symbol: animals[1].symbol,
    name: "เสื้อเขี้ยวดาบคาตานะ",
    animal: animals[1],
  },
  {
    symbol: animals[2].symbol,
    name: "ราชาเหยี่ยวนรก",
    animal: animals[2],
  },
  {
    symbol: animals[3].symbol,
    name: "หมียักษ์นักล่ามนุษย์",
    animal: animals[3],
  },
  {
    symbol: "⚰️💀",
    name: "สุสานผู้กล้า และโปเกม่อนของเหล่าผู้กล้า",
    description: "หลุมฝังศพของเหล่าวีรชนผู้กล้า🤔 และโปเกม่อนของพวกเขา ที่ครั้งนึงเคยเข้าร่วมต่อสู้ ป้องกันการรุกรานจากสัตว์ประหลาด(?)",
  },
]


const zooName = "Terminal Helltopia"


let messages = [];


let showDirectory = false;



function say(text) {
    messages.push(text);

}


function render() {
    console.clear();

    console.log(`==== ${zooName} ====`)
    console.log(` ยินดีต้อนรับผู้เยี่ยมชม : ${visitor.symbol} ${visitor.name} \n`)

    if (showDirectory) {
    console.log("\n=== สารบัญสัตว์ประหลาด ===");
    console.table(
            animals.map((a) => ({
                name: a.name,
                species: a.species,
                symbol: a.symbol,
            }))
        );
        showDirectory = false;
    }


    displayZoo();

    if (messages.length > 0) {
        console.log("\n------------------------")
        messages.forEach((m) => console.log(m))
        console.log("--------------------------")
    }


    messages = [];

}


function askForCommand() {

    render();

    rl.question(
        "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [f] Food | [a] Add Pokémon | [q] Quit\n> ",
        async (answer) => {
            const command = answer.trim().toLowerCase();

            if (command === "q") {
                console.log("\nThank you for visiting the Siwat Terminal Zootopia.");
                rl.close();
                return;
            }

            await handleCommand(command);   // ← ห้ามลืม await เพราะ askforcommand ต้องรอประมวลผลคำสั่งจาก handle command
        
            askForCommand();
        }
    );
}

async function handleCommand(command) {
    if (command === "l") {
        say(visitor.moveLeft());
    } else if (command === "r") {
        say(visitor.moveRight(zooPath.length - 1));
    } else if (command === "i") {
        inspectLocation();
    } else if (command === "d") {
        showZooDirectory();
    } else if (command === "f") {
        prepareAnimalFood();
    } else if (command === "a") {
        await handleAddPokemon();
    } else {
        say(" ได้โปรดเลือกคำสั่ง  L , R , I , D , F , A  or  Q ");
    }
}




function showZooDirectory(){
    showDirectory = true;
  
}


function displayZoo() {
    const topRow = zooPath
        .map(location => location.symbol)
        .join("－－－");

    const bottomRow = zooPath
        .map((location, index) => {
            if (visitor.position === index) {
                return visitor.symbol;
            }

            return "  ";
        })
        .join("➖➖➖");

    console.log(topRow);
    console.log(bottomRow);
}


function inspectLocation(){
    const currentLocation = zooPath[visitor.position]
    say("\n ==== Current Location ====")
    say(`📍 ${currentLocation.name}`);

    if (currentLocation.animal) {
        say(`${currentLocation.animal.symbol} ${currentLocation.animal.name}`);
        say(`Species: ${currentLocation.animal.species}`);
        }
        else {
        say(currentLocation.description);    
        }
}


function prepareAnimalFood(){
    const currentLocation = zooPath[visitor.position];
    if (currentLocation.animal) {
        const animal = currentLocation.animal;
        say(`${visitor.name} prepares food for ${animal.symbol} ${animal.name}`);
        say(`Food: ${animal.prepareFood()}`);
    } else {
        say(`🦴 ไม่พบสิ่งมีชีวิตที่นี่ 💀`);
    }
}


const DEFAULT_SYMBOL = "😈";
const DEFAULT_FOOD = "👶🏻 Baby human";

const typeSymbols = {
    
        normal: "😈", fire: "🔥", water: "💧", grass: "🌿",
        electric: "⚡", ice: "❄️", fighting: "🥊", poison: "☠️",
        ground: "⛰️", flying: "🕊️", psychic: "🔮", bug: "🐛",
        rock: "🪨", ghost: "👻", dragon: "🐉", dark: "🌑",
        steel: "⚙️", fairy: "🧚",
    };

 const typeFoods = {
        fire: "🌶️🔥 Spicy Hell Chilli",
        water: "💦🦈 Fresh Ancient Megashark",
        grass: "🥬☘️ Fruits Salad",
        electric: "🔋🔌 Voltage Battery",
        ghost: "😱🌚 Nightmare",
        psychic: "🍄😵 Psychic Mushroom",
        dragon: "🍖🩸 Pokemon's Steak",
    };

function ask(question) {
return new Promise((resolve) => rl.question(question, resolve));
}



async function fetchPokemon(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();

    const types = data.types.map((t) => t.type.name);
    const mainType = types[0];

    return new Pokemon(
        data.name.charAt(0).toUpperCase() + data.name.slice(1),
        types.join("-"),
        typeSymbols[mainType] ?? DEFAULT_SYMBOL,   // ← default symbol
        typeFoods[mainType] ?? DEFAULT_FOOD
    );
}


async function addPokemonToZoo(pokemonName) {
    const pokemon = await fetchPokemon(pokemonName);

    const exists = animals.some(
        (a) => a.name.toLowerCase() === pokemon.name.toLowerCase()
    );
    if (exists) {
        console.log(`⚠️  ${pokemon.name} อยู่ใน helltopia อยู่แล้ว`);
        return null;
    }

    animals.push(pokemon);

    const insertIndex = zooPath.length - 1;   // แทรกก่อน Food court
    zooPath.splice(insertIndex, 0, {
        symbol: pokemon.symbol,
        name: `${pokemon.name} House`,
        animal: pokemon,
    });

    if (visitor.position >= insertIndex) {
        visitor.position++;
    }

    return pokemon;
}


async function handleAddPokemon() {
    render();   // วาดจอก่อนถาม จะได้ไม่โล่ง
    const input = await ask("\n🔍 พิมพ์ชื่อ Pokémon (เช่น pikachu): ");
    const name = input.trim().toLowerCase();

    if (!name) {
        say("ยกเลิก");
        return;
    }

    console.log("⏳ คาถาอัญเชิญ...");   // อันนี้ log ตรงได้ เพราะเดี๋ยวโดน clear อยู่แล้ว

    try {
        const pokemon = await addPokemonToZoo(name);
        if (pokemon) {
            say(`✅ ${pokemon.symbol} ${pokemon.name} (${pokemon.species}) มาแล้ว!`);
        }
    } catch (error) {
        say(`❌ "${name}" ไม่ตอบรับ: ${error.message}`);
    }
}


function mainRun() {
    say(`Welcome ${visitor.name} to the --- ${zooName} ---`);
    say("💡 กด [a] เพื่ออัญเชิญ Pokémon เข้ามาใน Helltopia ได้เลย");

    showDirectory = true;
    askForCommand();

    
}


mainRun();
