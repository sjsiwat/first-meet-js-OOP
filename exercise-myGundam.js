/**
 * THE BASE CLASS (Encapsulation)
 */
class Gundam {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.damage = 0;

  }

  // a method to check status
  getStatus() {
    if (this.damage <= 0) return "พร้อมรบ";
    if (this.damage <= 30) return "เตรียมส่งซ่อมบำรุง";
    return "ต้องซ่อมบำรุง";
  }

  attack() {
    this.damage += 10;
    console.log(`${this.name} โจมตี! สร้างความเสียหาย ${this.damage}`);
  }

  get health() {
    if (this.damage <= 0 ) return "อาวุธพร้อม เตรียมพร้อมรบ";
    if (this.damage <= 30) return "ได้รับความเสียหายเล็กน้อย ยังสู้ไหว ! ";
    return "ไม่พร้อมออกรบ";
  }



  // logic to change internal state
  fix() {
    if (this.damage <= 0) {
      console.log(`${this.name} กันดั้มพร้อมแล้ว !`);
    } else {
      this.damage = this.damage - 10;
      console.log(`${this.name} เตรียมซ่อมแซม หุ่นรบได้รับความเสียหาย  ${this.damage}.`);
    }
  }

  makeSound() {
    console.log(`${this.name} Unit Ready.`);
  }
}

/**
 * INHERITANCE
 * Bird gets everything from Animal via 'extends'
 */

class Pilot {
    constructor(name, type, colony) {
        this.name = name;
        this.colony = colony;
        this.type = type;
        this.gundam = null;
    }

    ride(gundam) {
        this.gundam = gundam;
    }
}

class Spaceship extends Gundam {
  constructor(name, type, lazerbeam) {
    super(name, type); 
    this.lazerbeam = lazerbeam;
  }

  // POLYMORPHISM
  // Replacing the generic sound with a bird-specific one
  makeSound() {
    console.log(`${this.name} ฟิ้ววว`);
  }

  fly() {
    console.log(`${this.name} กางปีก บูสไอพ่น เตรียมพร้อมใช้งาน(${this.lazerbeam}) !`);
  }
}

/**
 * THE Gundam union
 * A class to hold and run our animal objects
 */
class Union {
  constructor(unionName) {
    this.unionName = unionName;
    this.pilots = [];
    this.gundams = [];
  }

  addGundam(gundam) {
    this.gundams.push(gundam);
    console.log(`Added ${gundam.name} to the ${this.unionName}.`);
  }

  addPilot(pilot){
    this.pilots.push(pilot);
    console.log(`Added Pilot ${pilot.name} to the ${this.unionName}`);
  }

showAllGundams() {
    console.log(`Welcome to ${this.unionName}`);

    console.log("\n=== Gundams ===");

    this.gundams.forEach((gundam) => {
        console.log(
            `${gundam.name} | Status: ${gundam.getStatus()} | Health: ${gundam.health}`
        );

        gundam.makeSound();
        gundam.attack();
        gundam.fix();

        console.log("----------------");
    });

    console.log("\n=== Pilots ===");

    this.pilots.forEach((pilot) => {
        if (pilot.gundam) {
            console.log(`${pilot.name} controls ${pilot.gundam.name}`);
        } else {
            console.log(`${pilot.name} has no Gundam`);
        }
    });
}}



// --- EXECUTION ---

const myUnion = new Union("The Universal Century");

// Create instances
const RX78_2 = new Gundam("RX78_2", "prototype close-combat mobile suit");
const Red_Zaku = new Gundam("Zaku_1", "The Red");
const Amuro = new Pilot("Amuro Ray", "NewType Power", "Space colony");
const Char = new Pilot("Char Aznable", "NewType", "Zeon Party");

// Add them to the universe
myUnion.addGundam(RX78_2);
myUnion.addGundam(Red_Zaku);
myUnion.addPilot(Amuro);
myUnion.addPilot(Char);

// Run 

Amuro.ride(RX78_2);
Char.ride(Red_Zaku);
myUnion.showAllGundams()