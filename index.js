// Template Class ที่ชื่อ Animal / blueprint / prototype (Encapsulation) 

class Animal {
    constructor(name , species){
        this.name = name;
        this.species = species;
        this.hunger = 50;
    }

    makeSound(){
        console.log(`${this.name} make a sound ... `);
        
    }

    eat(){
        this.hunger = this.hunger - 10;
        console.log(`${this.name} the ${this.species} ate. Hunger level now is ${this.hunger}`);
    }
}

// Object instance

const johny = new Animal("Johny","Super Cat");

console.log(johny);

console.log(johny.hunger);

johny.eat();
console.log(johny.hunger);

// specialized classes (Inheritance) 

class Mammal extends Animal {
    constructor(name, species, furColor){
        super(name, species);   //sub class  ถ้ามี constuctor ต้องมี super 
        this.furColor = furColor;
    }

    groom() {
        console.log(`${this.name} is brushing their ${this.furColor}`);
    }
}



class Birds extends Animal {
    constructor(name, species, wingspan){
        super(name, species);
        this.wingspan = wingspan;
    }    

    // this is example of polymorphism ; overide the parent's method
    makeSound(){
        console.log(`${this.name} chirps: Tweet! Tweet ! `);
        
    }
}

const Zaku = new Birds("Zaka","Legendary Bird","10 Feet");
const Bobby = new Mammal("Bobby", "Bear","Black-white");

console.log(`${Bobby.name} is color ${Bobby.furColor}`);
Bobby.makeSound()




class Reptile extends Animal {
    constructor(name, species, type) {
        super(name, species);
        this.type = type;

    }
    hunter() {
        console.log(`${this.name} is killing some people now`);
    }
}

const MegaDinosaur = new Reptile("MegaDinosaur","Hunter","Water lived");

MegaDinosaur.hunter();




class God extends Animal {
    constructor(name, species, type){
        super(name, species);
        this.type = type;
    }

    Admin() {
        console.log(`${this.name} are God can Kill everyone`);
    }
}

const Yok = new God("Yok","undefined","God");
Yok.Admin()
Zaku.makeSound()