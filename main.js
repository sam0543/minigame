const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./dogsheet.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.start();
	
	gameEngine.addEntity(new Dog(gameEngine, 200, 200, ASSET_MANAGER.getAsset("./dogsheet.png")));
});
