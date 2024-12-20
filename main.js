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
                tempDice = Math.floor(Math.random() * 6) + 1
                    if (tempDice <=1 ){
                        Math.floor(Math.random() * 6) + 1
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
}

class mage extends Charecters {
    constructor(name, age) {
        super(name, age);
        this.hp = 0
        this.spells = [];
    }
    setCharacter() {
        super.createAttributes();
        super.calculateMod();
        const char = {
            attributes : this.attributes,
            mod : this.mod
        }
        console.table(char)
        return char
    }

    char = this.setCharacter();

    hpCalc() {
        this.hp = 6 + this.char.mod[0]
        for (let i = 0; i <=2; i++) {
            this.hp += Math.floor(Math.random() * 6) + 1 + this.char.mod[0]
        }
    }

}


const simon = new mage("simon", 20);
simon.hpCalc();
console.log(simon.hp)
