class Popcat extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        
        this.state = 2;
        this.scale = 3;
        this.isPop = true;
        this.currentHealth = .9;
        this.timeElapsed = 0;
        
        this.ani = [];
        this.ani[1] = new Animator(ASSET_MANAGER.getAsset("pixelpopcatspritesheet.png"), 13, 0, 64, 64, 6, .2);
        this.ani[0] = new Animator(ASSET_MANAGER.getAsset("pixelpopcatspritesheet.png"), 397, 0, 64, 64, 8, .15);
        this.ani[2] = new Animator(ASSET_MANAGER.getAsset("pixelpopcatspritesheet.png"), 397, 0, 64, 64, 1, 1);
        
    }
    
    
    changeHealth(val) {
        this.currentHealth += val;

        if (this.currentHealth <= 0) {
            this.timeElapsed++;
            if (this.timeElapsed > 100) {
                this.isPop = false;
            } 
        }
    }
    
    update(){
        super.update();

    }
    
    draw(ctx){
        ctx.save();
        this.ani[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale, 0);
        super.draw(ctx);
        ctx.restore();
    }
    
}