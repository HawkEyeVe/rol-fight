//! *****************************************
//! **           roll dice class           **
//! *****************************************

class RollDice {
  _dice: number;
  _type: number;
  constructor(dice: number, type: number) {
    this._dice = dice;
    this._type = type;
  }

  public get diceRole(): number {
    let result: number = 0;
    for (let i = 0; i < this._dice; i++) {
      result += Math.floor(Math.random() * this._type) + 1;
    }
    return result;
  }
}

//! *****************************************
//! **           character class           **
//! *****************************************

class character {
  _name: string;
  _hp: number;
  _str: number;
  _result: number;
  static counter: number = 1;
  constructor(name: string) {
    this._name = `${name}-${character.counter++}`;
    this._hp = 20;
    this._str = 2;
    this._result = 0;
  }

  public attack(): number {
    const roll = new RollDice(1, 6);
    this._result = roll.diceRole + this._str;
    //console.log(`attack: ${this._result}`);
    return this._result;
  }

  public takeDamage(damage: number): void {
    this._hp -= damage;
  }

  get result(): number {
    return this._result;
  }

  public get name(): string {
    return this._name;
  }

  public get hp(): number {
    if (this._hp <= 0) {
      return 0;
    }
    return this._hp;
  }
}

//! *****************************************
//! **           game class                **
//! *****************************************

class Game {
  _blueChar: character[];
  _redChar: character[];
  _qty: number;

  constructor() {
    this._qty = 0;
    this._blueChar = [];
    this._redChar = [];
  }

  public createchars(qty: number, faction: string): void {
    for (let i = 0; i < qty; i++) {
      if (faction === "red") {
        this._redChar.push(new character("fighter"));
      } else {
        this._blueChar.push(new character("fighter"));
      }
    }
  }

  public fight(): void {
    const roll = new RollDice(1, 2);
    let firstTurn: character[];
    let secondTurn: character[];
    if (roll.diceRole === 1) {
      firstTurn = this._blueChar;
      secondTurn = this._redChar;
    } else {
      firstTurn = this._redChar;
      secondTurn = this._blueChar;
    }
    while (this._blueChar.length >= 0 || this._redChar.length >= 0) {
      for (let i = 0; i < firstTurn.length; i++) {
        const characterToHit = Math.floor(Math.random() * secondTurn.length);
        secondTurn[characterToHit].takeDamage(firstTurn[i].attack());
        console.log(
          `${secondTurn[characterToHit].name} hp: ${secondTurn[characterToHit].hp}`
        );
        if (secondTurn[i].hp <= 0) {
          console.log(`${secondTurn[characterToHit].name} is dead`);
          secondTurn.splice(i, 1);
          if (secondTurn.length === 0) {
            console.log("red win");
            return;
          }
        }
      }
      for (let i = 0; i < secondTurn.length; i++) {
        const characterToHit = Math.floor(Math.random() * firstTurn.length);
        firstTurn[characterToHit].takeDamage(secondTurn[i].attack());
        console.log(
          `${firstTurn[characterToHit].name} hp: ${firstTurn[characterToHit].hp}`
        );
        if (firstTurn[i].hp <= 0) {
          console.log(`${firstTurn[characterToHit].name} is dead`);
          firstTurn.splice(i, 1);
          if (firstTurn.length === 0) {
            console.log("blue win");
            return;
          }
        }
      }
    }
  }
  public get characters(): object {
    interface facction {
      blue: character[];
      red: character[];
    }
    const obj: facction = {
      blue: this._blueChar,
      red: this._redChar,
    };
    return obj;
  }
}

//! *****************************************
//! **           main                      **
//! *****************************************

function app(arg: number): void {
  const game = new Game();
  game.createchars(arg, "blue");
  game.createchars(arg, "red");
  console.log(game.characters);
  game.fight();
}

app(3);
