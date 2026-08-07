// Template Class ที่ชื่อ Animal / blueprint / prototype (Encapsulation) 

class Animal {
    constructor(name , species){
        this.name = name;
        this.species = species;
        this.hunger = 50;
    }

    makeSound(){
        console.log(`${this.name} is Crying ! `);
        
    }

    eat(){
        this.hunger = this.hunger - 10;
        console.log(`${this.name} the ${this.species} are eating some human. Hunger level now is ${this.hunger}`);
    }
}

// Object instance

const Joey = new Animal("Joey","Super Chicken");


// specialized classes (Inheritance) 

class Mammal extends Animal {
    constructor(name, species, Color){
        super(name, species);   //sub class  ถ้ามี constuctor ต้องมี super 
        this.Color = Color;
    }

    groom() {
        console.log(`${this.name} is brushing their ${this.Color} fur from  human blood`);
    }

    killing (){
        console.log(`${this.name} is now killing someone and now looking at you`)
    }
}



class Birds extends Animal {
    constructor(name, species, wingspan){
        super(name, species);
        this.wingspan = wingspan;
    }    

    // this is example of polymorphism ; overide the parent's method
    makeSound(){
        console.log(`${this.name} is crying: Die Human Die ! `);
        
    }
    fly(){
        console.log(`${this.name} are flying above you `)
    }

    lazerbeam() {
        console.log(`${this.name} focus on you and use the lazerbeam`)
    }
}

const Zaku = new Birds("Zaku","Legendary Bird","10 Feet");
const Bobby = new Mammal("Bobby", "Bear","Black-white");



class Reptile extends Animal {
    constructor(name, species, type) {
        super(name, species);
        this.type = type;

    }
    hunter() {
        console.log(`${this.name} is killing some people now`);
    }

    run() {
        console.log(`${this.name} is looking at you and start running`);
    }
}

const MegaDinosaur = new Reptile("MegaDinosaur","Hunter","Water lived");





class God extends Animal {
    constructor(name, species, type){
        super(name, species);
        this.type = type;
    }

    inspect(){
        console.log(`${this.name} are still watching the doomsday`)

    }

    Admin() {
        console.log(`${this.name} Now is Thinking to Kill everyone`);
    }
}

const Yok = new God("Yok","God","God of the Zoo");





console.log(`${Animal.name}`)
Joey.eat();
console.log(`${Bobby.name} is  ${Bobby.Color} color and ${Bobby.species} type`); 
Bobby.groom()
Bobby.killing()
MegaDinosaur.hunter();
MegaDinosaur.run();
Zaku.makeSound();
Zaku.fly();
Zaku.lazerbeam();
Yok.inspect()
Yok.Admin()