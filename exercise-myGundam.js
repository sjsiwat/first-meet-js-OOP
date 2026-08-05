/**
 * THE BASE CLASS (Encapsulation)
 */
class Gundam {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.hp = 100;
    this.power = 20;
    this.inven = 5;
    this.reloaded = false;
  }

  // a method to check status
  getStatus() {
    if (this.hp <= 0) return "หุ่นรบโดนทำลาย";
    if (this.hp <= 30) return "ใกล้ถึงขีดจำกัด";
    return "พร้อมลุย";
  }

  attack(enemy) {
    
    if (this.inven <= 0) {
      console.log(`${this.name} กระสุนหมด ไม่สามารถโจมตีได้`)
      return;
    }
    this.inven--;
    enemy.hp -= this.power
    console.log(`${this.name} โจมตี! สร้างความเสียหาย ${this.power}  `);
    console.log(`${enemy.name} ได้รับความเสียหาย ${this.power} `)
    console.log(`${enemy.name} HP คงเหลือ ${enemy.hp}`)
    
  }

  get ammo() {
    if (this.inven <= 0 ) return "กระสุนหมดแล้ว ไม่สามารถโจมตีได้";
    if (this.inven >= 1 )return "ปืนลำแสงเตรียมพร้อม";
  }



  // logic to change internal state
  fix() {
    this.hp += 15;

    if(this.hp > 100) {
       this.hp = 100;
    }
    console.log(`${this.name} ทำการซ่อมแซมตัวเอง พลังฟื้นฟูเพิ่ม 15`)
    console.log(`พลังชีวิตคงเหลือ ${this.hp}`)

  }

  
}

/**
 * INHERITANCE
 * 
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

class Battle {

    constructor(gundam1, gundam2){
        this.gundam1 = gundam1;
        this.gundam2 = gundam2;
        this.turn = 1;
    }

    start() {
    console.log("===== BATTLE START =====");
    console.log(`${this.gundam1.name} VS ${this.gundam2.name}`);
    }

    nextTurn() {
      this.gundam1.attack(this.gundam2)
      if (this.gundam2.hp > 0) {
        this.gundam2.attack(this.gundam1);
    }
      this.turn++;
    }

    showStatus() {
      console.log("===STATUS===")
      console.log(` ${this.gundam1.name} HP คงเหลือ ${this.gundam1.hp}`);
      console.log(` ${this.gundam2.name} HP คงเหลือ ${this.gundam2.hp}`);
    }
    
    reload() {
     if (this.reloaded) {
    console.log("ใช้ Reload ไปแล้ว");
    return;
    }

     if (this.gundam.inven > 2) {
    console.log("กระสุนยังเหลือเยอะ ไม่จำเป็นต้อง Reload");
    return;
    }

     this.gundam.inven += 2;
     this.reloaded = true;

    console.log(`${this.gundam.name} Reload สำเร็จ! กระสุน = ${this.gundam.inven}`);
    }
    




}

/**
 * THE Gundam union
 * 
 */
class Union {
  constructor(unionName) {
    this.unionName = unionName;
    this.gundams = [];
  }

  addGundam(gundam) {
    this.gundams.push(gundam);
    console.log(`Added ${gundam.name} to the ${this.unionName}.`);
  }

showAllGundams() {
    console.log(`Welcome to ${this.unionName}`);

    console.log("\n=== Gundams ===");

    this.gundams.forEach((gundam) => {
        console.log(`${gundam.name} | Status: ${gundam.getStatus()} | Ammo: ${gundam.ammo}`);
        console.log("----------------");
    });

    


}

}
class Human {
  constructor(humanName) {
    this.humanName = humanName;
    this.pilot = [];
  }

   addPilot(pilot){
    this.pilot.push(pilot);
    console.log(`Added Pilot ${pilot.name} to the ${this.humanName}`);
  }
  
  showAllPilot() {
    
    console.log("\n=== Pilot ===");

    this.pilot.forEach((pilot) => {
        if (pilot.gundam) {
          console.log(`${pilot.name} เข้าควบคุม ${pilot.gundam.name}`)
        } else {
          console.log(`${pilot.name} ยังไม่มี Gundam`)
        }

        console.log(`${pilot.name} พร้อมเข้าสู่สนามรบ`)
        console.log("----------------");
    })
  
  }}




// --- EXECUTION ---

const myUnion = new Union("The Universal Century");
const myHuman = new Human("Mobile Suit Operator")

// Create instances
const RX78_2 = new Gundam("RX78_2", "prototype close-combat mobile suit");
const Red_Zaku = new Gundam("Zaku_1", "The Red");
const Amuro = new Pilot("Amuro Ray", "NewType Power", "Space colony");
const Char = new Pilot("Char Aznable", "NewType", "Zeon Party");
const battle = new Battle(RX78_2,Red_Zaku);

// Add them to the universe
myUnion.addGundam(RX78_2);
myUnion.addGundam(Red_Zaku);
myHuman.addPilot(Amuro);
myHuman.addPilot(Char);

// Run 

Amuro.ride(RX78_2);
Char.ride(Red_Zaku);
myUnion.showAllGundams()
myHuman.showAllPilot()
battle.start();