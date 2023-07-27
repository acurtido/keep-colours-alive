import { COLORES, DB } from './../share/share.js';

class Colourman extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'colourman');
   
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setScale(1);
        this.setInteractive();
 
        this.body.setBounce(0.2);

        this.velocidad = 150;

        this.muerto = false;
        this.destruido = false;
        this.salvado = false;

        this.generarDireccionRandon();
        
        var randomNumber = this.randomNumber(0,2);
        var colores = [COLORES.RED, COLORES.GREEN, COLORES.BLUE];
        var coloresHex = [0xff0000, 0x00ff00, 0x0000ff];
        var color = coloresHex[randomNumber];

        this.setTint(color);

        this.color = colores[randomNumber];

        this.healthBar = this.scene.physics.add
            .image(this.body.x + 16, this.body.y - 6, "health-bar15")
            .setDepth(0)
            .disableBody(true)
            .setScale(1.1);

        this.tiempoTranscurrido = 0;
        this.vida = 15;
        this.timedEvent = this.scene.time.addEvent({ delay: 1000, callback: this.iniciarConteoVida, callbackScope: this, loop: true });
        
        this.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if(this.color === DB.colorActual)
            {
                switch ( DB.colorActual) {
                    case COLORES.RED:
                        if(DB.redCounter > 0){
                            this.aumentarVida();
                            this.scene.registry.events.emit('disminuir_marcador_red');
                        }
                        break;
        
                    case COLORES.GREEN:
                        if(DB.greenCounter > 0){
                            this.aumentarVida();
                            this.scene.registry.events.emit('disminuir_marcador_green');
                        }
                        break;
        
                    case COLORES.BLUE:
                        if(DB.blueCounter > 0){
                            this.aumentarVida();
                            this.scene.registry.events.emit('disminuir_marcador_blue');
                        }
                        break;
                }
            }
        });
    }

    aumentarVida(){
        this.vida += 4;

        if(this.vida > 15) {
            this.vida = 15;
        }

        this.scene.sound.play('vida');

        this.actualizarVida();
    }

    iniciarConteoVida() {
        this.tiempoTranscurrido += 1;
        this.vida -= 1;

        this.actualizarVida();
    }

    randomNumber(minimum, maximum) {
        return  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    actualizarVida() {
        if (!this.muerto) {
        if(this.vida >= 13) {
            this.healthBar.frame = this.scene.textures.getFrame('health-bar15');
        }
        
        if(this.vida <= 12) {
            this.healthBar.frame = this.scene.textures.getFrame('health-bar12');
        }

        if(this.vida <= 9) {
            this.healthBar.frame = this.scene.textures.getFrame('health-bar9');
        }

        if(this.vida <= 6) {
            this.healthBar.frame = this.scene.textures.getFrame('health-bar6');
        }

        if(this.vida <= 3) {
            this.healthBar.frame = this.scene.textures.getFrame('health-bar3');
        }

        if(this.vida <= 1) {
            this.healthBar.frame = this.scene.textures.getFrame('health-bar1');
        }

        if(this.vida <= -1) {
            this.vida = -1;
            this.muerto = true;
            this.scene.sound.play('muerte-2');
        }}
    }

    generarDireccionRandon() {
        if ( Phaser.Math.Between(0, 1) === 1 ) {
            this.girar();
        }
    }

    girar() {
        this.setFlipX(!this.flipX);
        this.velocidad *= -1;
    }

    create() {
        
    }

    salvar() {
        this.timedEvent.destroy();
        this.salvado = true;
        //hacking xD
        this.muerto = true;
        this.scene.sound.play('salvado');
    }

    destruirObjeto() {
        if(!this.destruido){
            this.destroy();
            this.healthBar.destroy();
            if(!this.salvado) {
                this.timedEvent.destroy();
            }
        }
    }

    update() {

        if(!this.muerto) {
            this.body.setVelocityX(this.velocidad);
        
            this.healthBar.x = this.body.x + 16;
            this.healthBar.y = this.body.y - 6;
        } 
    }
}

export default Colourman;