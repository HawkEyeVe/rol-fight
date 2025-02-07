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

  private doRound(firstTurn: character[], secondTurn: character[]): boolean {
    for (let attakerIdx = 0; attakerIdx < firstTurn.length; attakerIdx++) {
      const defenderIdx = Math.floor(Math.random() * secondTurn.length);
      const defender = secondTurn[defenderIdx];
      const attacker = firstTurn[attakerIdx];
      defender.takeDamage(attacker.attack());
      console.log(`${defender.name} hp: ${defender.hp}`);
      if (defender.hp <= 0) {
        console.log(`${defender.name} is dead`);
        secondTurn.splice(defenderIdx, 1);
        if (secondTurn.length === 0) {
          return true;
        }
      }
    }
    return false;
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
    //full round

    while (this._blueChar.length >= 0 || this._redChar.length >= 0) {
      if (this.doRound(firstTurn, secondTurn)) {
        console.log("first win");
        return;
      }
      if (this.doRound(secondTurn, firstTurn)) {
        console.log("second win");
        return;
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

app(1);
