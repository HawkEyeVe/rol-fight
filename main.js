function diceType (dice) {
    dice= dice.slice(1)
    dice = Number(dice)
    dice = Math.floor(Math.random() * (dice + 1));
    return dice
}

class Charecters {
    constructor(_name, _age) {
        this.name = _name;
        this.age = _age;
        this.attributes = [];
        this.mod = [];
    }

    createAttributes() {
        function addAttributes() {
            let dice = []
            let  tempDice = 0
    
            for (let j = 0; j < 4; j++){
                tempDice = diceType("d6")
                    if (tempDice <=1 ){
                        diceType("d6")
                }
                dice.push(tempDice);
            }
            dice.sort((a, b) => a - b);
            dice.shift();
            return dice.reduce((a, b) => a + b, 0)
        } 
        for (let i = 0; i <= 2; i++) {
            this.attributes.push(addAttributes());
        }
    }
    calculateMod() {
        for (let i = 0; i < this.attributes.length; i++) {
            this.mod.push(Math.floor((this.attributes[i] - 10) / 2));
        }
    }

    setCharacter() {
        this.createAttributes();
        this.calculateMod();
        const char = {
            attributes : this.attributes,
            mod : this.mod
        }
        console.table(char)
        return char
    }
}

class mage extends Charecters {
    constructor(name, age) {
        super(name, age);
        this.hp = 0
        this.spells = [];
    }


    char = super.setCharacter();

    hpCalc() {
        this.hp = 6 + this.char.mod[0]
        for (let i = 0; i <=2; i++) {
            this.hp += diceType("d6")
        }
    }

}

class ranger extends Charecters {
    constructor(name, age) {
        super(name, age);
        this.hp = 0
        this.spells = [];
    }


    char = super.setCharacter();

    hpCalc() {
        this.hp = 6 + this.char.mod[0]
        for (let i = 0; i <=2; i++) {
            this.hp += diceType("d8")
        }
    }

}

class fighter extends Charecters {
    constructor(name, age) {
        super(name, age);
        this.hp = 0
        this.spells = [];
    }


    char = super.setCharacter();

    hpCalc() {
        this.hp = 6 + this.char.mod[0]
        for (let i = 0; i <=2; i++) {
            this.hp += diceType("d10")
        }
    }

}



const simon = new mage("simon", 20);
console.log(simon.name)
simon.hpCalc();
console.log(`Hp ${simon.hp}`)
const diego = new ranger("diego", 30);
console.log(diego.name)
diego.hpCalc();
console.log(`Hp ${diego.hp}`)
const cara = new fighter("cara", 40);
console.log(cara.name)
cara.hpCalc();
console.log(`Hp ${cara.hp}`)

