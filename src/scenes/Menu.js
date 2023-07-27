class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    init(data) {
        this.points = 0;

        console.log(data);

        if(Object.keys(data).length !== 0) {
            this.points = data.points;
        }

    }

    create() {
        const pointsDB = localStorage.getItem('best_points');
        this.betsPoints = (pointsDB !== null) ? pointsDB : 0;
        
        if(this.points >= this.betsPoints) {
            console.log('set local storage');
            localStorage.setItem('best_points', this.points);
        }

        // Pared izquierda
        this.add.image(0, 0, 'wall_640')
            .setOrigin(0);
        
        // Pared Derecha
        this.add.image(this.scale.width, 0, 'wall_640')
        .setOrigin(1, 0)
        .setFlipX(true);

        // Suelo
        this.add.image(0, this.scale.height, 'floor_')
            .setOrigin(0, 1);

        // Texto inicial
        this.textoInicial = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height/2,
            'pixelFont',
            'KEEP COLOURS ALIVE'
        ).setDepth(2).setOrigin(0.5).setInteractive().setScale(1.6).setTint(0Xff00ff);

        this.textoInicial.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.textoInicial,
                ease: 'Bounce.easeIn',
                y: -200,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('Play');
                }
            });
        });


        this.pointsText = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height - 100,
            'pixelFont',
            'POINTS ' + this.points
        ).setDepth(2).setOrigin(0.5);

        this.bestPointsText = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height - 80,
            'pixelFont',
            'BEST  ' + this.betsPoints
        ).setDepth(2).setOrigin(0.5);


        // Agregar un logo centrado
        /*
          this.logoMenu = this.add.image(
            this.scale.width/2,
            this.scale.height/2,
            'logo'
        ).setScale(2).setInteractive();

        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu,
                ease: 'Bounce.easeIn',
                y: -200,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('Play');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],
                ease: 'Bounce.easeIn',
                y: 400,
                duration: 1000
            });
        });
        */

     
    }
}

export default Menu;