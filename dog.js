class Dog {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y });
        
        this.state = 0;
        
        this.loadAnimations(spritesheet);
        
    };

    loadAnimations(spritesheet) {
        
        this.dogAnim = [];
        //walk forwards
        this.dogAnim[0] = new Animator(spritesheet, 19, 0, 45, 67, 4, 0.33, 51, false, true);
        //walk right
        this.dogAnim[1] = new Animator(spritesheet, 4, 96, 69, 67, 4, 0.33, 27, false, true);
        //walk up
        this.dogAnim[2] = new Animator(spritesheet, 19, 177, 45, 82, 4, 0.33, 51, false, true);
        //walk left
        this.dogAnim[3] = new Animator(spritesheet, 4, 288, 69, 67, 4, 0.33, 27, false, true);
        //take seat forwards
        this.dogAnim[4] = new Animator(spritesheet, 19, 387, 45, 67, 4, 0.33, 51, true, false);
        //take seat right
        this.dogAnim[5] = new Animator(spritesheet, 4, 474, 72, 73, 4, 0.33, 24, true, false);
        //sit right
        this.dogAnim[6] = new Animator(spritesheet, 292, 667, 63, 72, 1, 1.0, 1, false, false);
        //relax right
        this.dogAnim[7] = new Animator(spritesheet, 4, 571, 63, 772, 2, 0.33, 33, false, true);
        //pet right
        this.dogAnim[8] = new Animator(spritesheet, 196, 571, 63, 72, 1, 0.33, 1, false, false);
        //sad face forward
        this.dogAnim[9] = new Animator(spritesheet, 307, 580, 45, 63, 1, 1.0, 1, false, false);
        //sleep
        this.dogAnim[10] = new Animator(spritesheet, 0, 682, 82, 54, 2, 0.33, 15, false, true);
        //run right
        this.dogAnim[11] = new Animator(spritesheet, 0, 766, 84, 69, 3, 0.33, 9.5, false, true);
        
    };

    update() {
        
    };
        
    draw(ctx) {
        
        this.dogAnim[this.state].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
        
    };
};
