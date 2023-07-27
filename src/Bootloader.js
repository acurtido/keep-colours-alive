class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';

        this.load.image([
            'floor_',
            'wall_640',
            'bloque_plataforma',
            'health-bar2',
            'container',
            'container-plants',
            'colour',
            'portal',
            'cursor_blue32',
            'cursor_red32',
            'cursor_green32',
            'cursor32',
            'colourA',
            'colourS',
            'colourD',
            'colourF',
        ]);

        this.load.image('health-bar15', 'health-bars/health-bar15.png');
        this.load.image('health-bar12', 'health-bars/health-bar12.png');
        this.load.image('health-bar9', 'health-bars/health-bar9.png');
        this.load.image('health-bar6', 'health-bars/health-bar6.png');
        this.load.image('health-bar3', 'health-bars/health-bar3.png');
        this.load.image('health-bar1', 'health-bars/health-bar1.png');

        this.load.spritesheet('colourman','colourman.png',{
            frameWidth: 32,
            frameHeight: 32 
        });

        this.load.spritesheet('macetas-numeradas','macetas-numeradas.png',{
            frameWidth: 16,
            frameHeight: 16 
        });

        this.load.spritesheet('plant-growth','plant-growth.png',{
            frameWidth: 16,
            frameHeight: 16 
        });

        this.load.audio('bongo', 'bongojam_f.mp3');
        this.load.audio('pop', 'pop.mp3');
        this.load.audio('draw', 'draw.mp3');
        
        this.load.audio('muerte', 'muerte.mp3');
        this.load.audio('vida', 'vida.mp3');
        this.load.audio('salvado', 'salvado.mp3');

        this.load.audio('creacion-planta', 'creacion-planta.mp3');
        this.load.audio('muerte-2', 'muerte-2.mp3');

        this.load.image('font', 'font/font.png');
        this.load.json('fontData', 'font/font.json');

        this.input.setDefaultCursor('url(assets/cursor32.png), pointer')

        this.load.on('complete', () => {

            //this.sound.play('bongo', {loop: true});

            const fontData = this.cache.json.get('fontData');
            this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontData));

            this.scene.start('Menu');
        });

        
    }
}
export default Bootloader;