class IGamePlayer {
  // eslint-disable-next-line no-unused-vars
  login(user, password) {}
  killBoss() {}
  upgrade() {}
}

class GamePlayer extends IGamePlayer {
  constructor(name) {
    super();
    this.name = name;
  }
  killBoss() {
    console.log("kill boss");
  }
  login(user, password) {
    console.log(`${user} with ${password} is login`);
  }
  upgrade() {
    console.log(`${this.name} upgrade`);
  }
}

class GamePlayerProxy extends IGamePlayer {
  constructor(player) {
    super();
    this.player = player;
  }
  killBoss() {
    this.player.killBoss();
  }
  login(user, password) {
    this.player.login(user, password);
  }
  upgrade() {
    this.player.upgrade();
  }
}

let player = new GamePlayer("David");
let proxy = new GamePlayerProxy(player);
proxy.login("david", "123456");
proxy.killBoss();
proxy.upgrade();
