class Charecters {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.attributes = [];
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
}

const simon = new Charecters("simon", 20,);
simon.createAttributes();
console.table(simon.attributes)
