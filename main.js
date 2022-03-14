const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("pixelpopcatspritesheet.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
    
    sceneManager = new Scene(gameEngine);
    gameEngine.addEntity(sceneManager);
    gameEngine.sceneManager = sceneManager;
    
	gameEngine.init(ctx);

	gameEngine.start();
    	
	
});
