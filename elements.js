class UIElement extends Entity
{
    constructor(game, x, y, clickable = false)
    {
        super(game, x, y);
        this.sceneElement = true;
    }

}

class Rectangle extends Entity
{
    constructor(game, x, y, width, height, color = "rgba(0, 0, 0, 1.0)")
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.color = color;
    }

    draw(ctx)
    {
        super.draw(ctx);
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.width, this.height);
        ctx.restore();
    }

}

class TextElement extends UIElement
{
    constructor(game, x, y, text, fontSize = 24, color = "#000", textAlign = "left")
    {
        super(game, x, y)

        this.text = text;
        this.fontSize = fontSize;
        this.color = color;
        this.textAlign = textAlign;
        this.maxWidth = 0;

        this.sceneElement = false;
    }

    draw(ctx)
    {
        ctx.save();

        if (this.invisible)
        {
            return;
        }

        ctx.font = (this.fontSize) + "px " + (this.fontFamily); 

        ctx.fillStyle = this.color;

        ctx.textAlign = this.textAlign;
        if (this.textAlign == "center")
        {
            ctx.textBaseline = "middle";
        }

        if (this.maxWidth == 0)
        {
            ctx.fillText(this.text, this.x - (this.sceneElement ? this.game.camera.x : 0), this.y);
        }
        else
        {
            ctx.fillText(this.text, this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.maxWidth);   
        }
        ctx.restore();
    }
}

class RoundedRectangle extends Entity
{
    constructor(game, x, y, width, height, color)
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.color = color;
        this.radius = 5;
    }

    draw(ctx)
    {
        super.draw(ctx);
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.roundRect(this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.width, this.height, this.radius);
        
        ctx.fill(); //TODO
        ctx.restore();
    }

}

class Button extends UIElement
{
    constructor(game, x, y, width, height, frontColor, backColor, textColor = "#fff", text = "")
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.clickable = true;
        this.hoverable = true;
        this.clicked = false;

        this.frontColor = frontColor;
        this.backColor = backColor;

        this.buttonBack = new RoundedRectangle(game, x, y, width, height, backColor);
        this.buttonFront = new RoundedRectangle(game, x, y, width, height - 6, frontColor);
        this.text = new TextElement(game, (x + width / 2), (y + height / 2), "FEED", height / 2, textColor, "center");

        this.children.push(this.buttonBack);
        this.children.push(this.buttonFront);
        this.children.push(this.text);
        
    }

    mouseClicked(mouseX, mouseY)
    {
        //console.log(mouseX + ", " + mouseY);
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            this.buttonFront.color = 'lightgreen';
            this.onMouseClicked();
        }
    }

    onMouseClicked()
    {
        this.clicked = true;
    }

    mouseUp(mouseX, mouseY)
    {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            this.buttonFront.color = this.frontColor;
        }
    }

    mouseHover(mouseX, mouseY)
    {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {   
            document.documentElement.style.cursor = "pointer";
            this.buttonFront.color = 'lightblue';
        }
        else
        {   
            this.buttonFront.color = this.frontColor;
            document.documentElement.style.cursor = "";
        }
    }

}

class ProgressBar extends UIElement
{
    constructor(game, x, y, width, height, color = rgb(160,38,37), settable = false)
    {
        super(game, x, y, false);

        this.width = width;
        this.height = height;
        this.color = color;

        this.currentPercent = 1;

        this.progressBarBack = new Rectangle(game, x, y, this.width, this.height, "rgba(0, 0, 0, 0.4)");
        this.progressBarFront = new Rectangle(game, x, y, this.width * this.currentPercent, this.height, this.color);

        let whiteBarPercent = 0.08;
        this.progressBarBottom = new Rectangle(game, x, y + height - this.height * whiteBarPercent, this.width, this.height * whiteBarPercent, rgba(255,255,255, 1));

        this.children.push(this.progressBarBack);
        this.children.push(this.progressBarFront);
        this.children.push(this.progressBarBottom);
    }

    setPercent(percent)
    {
        if (percent < 0) this.currentPercent = 0.0
        else if (percent > 1) this.currentPercent = 1.0
        else this.currentPercent = percent;

        this.progressBarFront.width = this.width * this.currentPercent;
    }

    incrementPercent(percentToIncrement)
    {
        this.setPercent(this.currentPercent += percentToIncrement);
    }
}

class PlayerHealthBar extends UIElement
{
    constructor(game, x, y, scale)
    {
        super(game, x, y);

        this.icon = new TextElement(game, x+1, y+50, "🍖");
        this.icon.fontSize = 50;
        //this.icon.color = 'darkred';
        this.progressBarHealth = new ProgressBar(game, x + 70, y + 20, 400, 30, rgb(160,38,37));
        this.progressBarText = new TextElement(game, x + 70, y + 18, "Hunger");
        
        this.icon.sceneElement = false;
        this.progressBarHealth.sceneElement = false;
        this.progressBarText.sceneElement = false;

        this.children.push(this.icon);
        this.children.push(this.progressBarHealth);
        this.children.push(this.progressBarText);
    }

    update()
    {
        let currentHealth = this.game.sceneManager.popcat.currentHealth;
        this.setPercent(currentHealth);
    }

    setPercent(percent)
    {
        this.progressBarHealth.setPercent(percent);
    }

    incrementPercent(percentToIncrement)
    {
        this.progressBarHealth(percentToIncrement);
    }

}