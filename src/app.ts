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
  static counter: number = 1;
  constructor(name: string) {
    this._name = `${name}-${character.counter++}`;
    this._hp = 20;
    this._str = 2;
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
}

app(3);
