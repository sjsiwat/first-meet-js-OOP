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

class Pilot extends Gundam {
  constructor(name, type, colony) {
    super(name, type); // Calls the parent constructor
    this.colony = colony;
  }

  control() {
    console.log(`${this.name} กำลังควบคุมหุ่นรบจาก ${this.colony} fur.`);
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
  constructor(UnionName) {
    this.UnionName = UnionName;
    this.Gundams = [];
  }

  addGundam(gundam) {
    this.Gundams.push(gundam);
    console.log(`Added ${Gundam.name} to the ${this.UnionName}.`);
  }

  showAllGundams() {
    console.log(`\n--- ยิินดีต้อนรับเหล่านักบินผู้มีพลัง newtype และ เหล่าCoordinator \n--- ที่นี่คือ ${this.UnionName} --- \n--- และที่นี่คือสนามรบ ---`);
    this.Gundams.forEach((Gundam) => {
      // Accessing properties and calling methods
      // console.log("here ->", animal);
      // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(animal)));
      console.log(`Gundam: ${Gundam.name} | Status: ${Gundam.getStatus()} | health: ${Gundam.health}`);
      Gundam.makeSound();
      Gundam.attack();
      Gundam.fix();
      console.log("-------------------");
    });
  }
}

// --- EXECUTION ---

const myUnion = new Union("The Universal Century");

// Create instances
const RX78_2 = new Gundam("RX78_2", "prototype close-combat mobile suit");
const Red_Zaku = new Gundam("Zaku_1", "The Red");
const Amuro = new Pilot("Amuro Ray", "NewType Power", "Space colony");
const Char = new Pilot("Char Aznable", "NewType", "Zeon Party");

// Add them to the zoo
myUnion.addGundam(RX78_2);
myUnion.addGundam(Red_Zaku);
myUnion.addGundam(Amuro);
myUnion.addGundam(Char);

// Run the routine
myUnion.showAllGundams();