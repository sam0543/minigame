class Scene extends Entity {
    constructor(game) {
    super(game, 0, 0);
    this.game.camera = this;
    this.game.elapsedTime = 0;
    this.blinktimer = 0;
    this.x = 0;
    this.entites = [];
    //this.game.mouse;
    
    this.playerHealthBar = new PlayerHealthBar(game, 10, 10, 1);
    this.game.addEntity(this.playerHealthBar);
    this.popcat = new Popcat(game, 450, 300);
    this.game.addEntity(this.popcat);
    
    this.butt = new Button(game, 10, 600, 1000, 68, 'lightblue', 'pink', 'white', 'FEED');
    this.game.addEntity(this.butt);
    
    
    };
    
    

    
    update() {
        this.game.elapsedTime++;
        if (this.game.elapsedTime%100000 && this.popcat.isPop ){
            this.popcat.changeHealth(-.001);
        }
        
        if(this.game.mouse != undefined) {
            this.butt.mouseClicked(this.game.mouse.x, this.game.mouse.y);
            if (this.butt.clicked) {
                this.butt.clicked = false;
                this.popcat.state = 1;
                this.popcat.changeHealth(.1);
                
            } else {
                this.blinktimer++;
                if (this.blinktimer >= 100) {
                    if (this.blinktimer >= 150) {
                        this.blinktimer = 0;
                    }
                    this.popcat.state = 0;
                } else {
                    this.popcat.state = 2;
                }

            }
        }
        
        
    
    };
    
    draw(ctx){
        
        if(this.popcat.isPop == false) {
            ctx.fillText("popcat was too hungry :(", 450, 300);
            this.playerHealthBar.removeFromWorld = true;
            this.popcat.removeFromWorld = true;
            this.butt.removeFromWorld = true;
            
        }
    
    };

}