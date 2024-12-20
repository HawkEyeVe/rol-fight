class Charecters {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.attributes = [];
    }

    createAttributes() {
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
    this.attributes.push(dice.reduce((a, b) => a + b, 0));
    }
}

const simon = new Charecters("simon", 20,);
simon.createAttributes();
console.table(simon.attributes)
