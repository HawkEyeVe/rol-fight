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

const role = new RollDice(5, 6).diceRole;

console.log(`the result of the roll is ${role}`);

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

class Game {
  _characters: character[];
  _qty: number = 0;

  constructor(qty: number) {
    this._qty = qty;
    this._characters = [];
  }

  public createCharacters(): void {
    for (let i = 0; i < this._qty; i++) {
      this._characters.push(new character("fighter"));
      console.log(this._characters);
    }
  }

  public get characters(): character[] {
    return this._characters;
  }
}

const game = new Game(3).createCharacters();
