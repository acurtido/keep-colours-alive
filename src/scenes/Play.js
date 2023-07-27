import Colourman from '../Player/Colourman.js';
import {COLORES, DB} from '../share/share.js';

class Play extends Phaser.Scene {
    constructor() {
        super({ key: "Play" });
    }

    init() {}

    create() {
        this.teclas = this.input.keyboard.addKeys("a,s,d,f");

        // Se crea un staticGroup para agrupar
        // sprites que colisionarán con los Colormen
        this.wall_floor = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();
        this.container_plants = this.physics.add.staticGroup();
        this.container_colours = this.physics.add.staticGroup();
        this.colours = this.physics.add.staticGroup();
        this.container_plants = this.physics.add.staticGroup();
        this.portals = this.physics.add.staticGroup();

        this.portals.create(39, 585, "portal")
        .setDepth(0).setScale(1.4);

        this.portals.create(601, 585, "portal")
        .setDepth(0).setScale(1.4).setFlipX(true);

        // Se agrega pared izquierda al grupo
        this.wall_floor.create(0, 0, "wall_640")
        .setOrigin(0).setDepth(0);

        // Se agrega pared derecha al grupo
        this.wall_floor
            .create(this.scale.width, 0, "wall_640")
            .setOrigin(1, 0)
            .setFlipX(true)
            .setDepth(1);

        // Se agrega suelo al grupo
        this.wall_floor
            .create(0, this.scale.height, "floor_")
            .setOrigin(0, 1)
            .setDepth(0);

        // interfaz colores y contenedores
        const mover = 20;
        const escala = 1.5;
        const posY = 15;

        //1
        this.container_colours
            .create(50, posY, "container")
            .setDepth(0)
            .setScale(escala);

        this.colours
            .create(49, posY-1, "colourA")
            .setDepth(1)
            //.setTint(0xff0000)
            .setScale(escala);

        //2
        this.container_colours
            .create(66 + mover, posY, "container")
            .setDepth(0)
            .setScale(escala);

        this.colours
            .create(65 + mover, posY -1, "colourS")
            .setDepth(1)
            //.setTint(0x00ff00)
            .setScale(escala);

        //3
        this.container_colours
            .create(102 + mover, posY, "container")
            .setDepth(0)
            .setScale(escala);

        this.colours
            .create(101 + mover, posY -1, "colourD")
            .setDepth(1)
            //.setTint(0x0000ff)
            .setScale(escala);

        //4
        this.container_colours
            .create(138 + mover, posY, "container")
            .setDepth(0)
            .setTint(0xff00ff)
            .setScale(escala);

        this.colours
            .create(137 + mover, posY -1, "colourF")
            .setDepth(1)
            .setScale(escala);

        let posicionX = 40;
        let posicionY = 232;

        // Contadores

        this.marcadorRed = this.add
            .bitmapText(200, 5, "pixelFont", "R 0")
            .setTint(0xff0000)
            .setScale(1.5);

        this.marcadorGreen = this.add
            .bitmapText(320, 5, "pixelFont", "G 0")
            .setTint(0x0ff00)
            .setScale(1.5);

        this.marcadorBlue = this.add
            .bitmapText(430, 5, "pixelFont", "B 0")
            .setTint(0x0000ff)
            .setScale(1.5);

        this.agruparPlantas();

        /** */
        //1
        this.container_plants
            .create(547, 20, "container-plants")
            .setDepth(1)
            .setTint(0xffffff)
            .setScale(2);

        //2
        this.container_plants
            .create(587, 20, "container-plants")
            .setDepth(1)
            .setTint(0xffffff)
            .setScale(2);

        //3
        this.container_plants
            .create(547, 59, "container-plants")
            .setDepth(1)
            .setTint(0xffffff)
            .setScale(2);

        //4
        this.container_plants
            .create(587, 59, "container-plants")
            .setDepth(1)
            .setTint(0xffffff)
            .setScale(2);

        //5
        this.container_plants
            .create(547, 99, "container-plants")
            .setDepth(1)
            .setTint(0xffffff)
            .setScale(2);

        //6
        this.container_plants
            .create(587, 99, "container-plants")
            .setDepth(1)
            .setTint(0xffffff)
            .setScale(2);

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 36; j++) {
                this.platforms
                    .create(posicionX, posicionY, "bloque_plataforma")
                    .setTint(0xff00ff)
                    .setDepth(1);

                posicionX += 16;
            }
            posicionY += 64;
            posicionX = 40;
        }

        this.platforms.getChildren()[30].destroy();
        this.platforms.getChildren()[30].destroy();
        this.platforms.getChildren()[30].destroy();

        this.platforms.getChildren()[37].destroy();
        this.platforms.getChildren()[37].destroy();
        this.platforms.getChildren()[37].destroy();

        this.platforms.getChildren()[90].destroy();
        this.platforms.getChildren()[90].destroy();
        this.platforms.getChildren()[90].destroy();

        this.platforms.getChildren()[102].destroy();
        this.platforms.getChildren()[102].destroy();
        this.platforms.getChildren()[102].destroy();

        this.platforms.getChildren()[132].destroy();
        this.platforms.getChildren()[132].destroy();
        this.platforms.getChildren()[132].destroy();

        this.platforms.getChildren()[172].destroy();
        this.platforms.getChildren()[172].destroy();
        this.platforms.getChildren()[172].destroy();

        this.wall_floor.refresh();

        this.wall_floor.getChildren()[2].setOffset(0, 0);

        this.leftWall = this.wall_floor.getChildren()[0];
        this.rightWall = this.wall_floor.getChildren()[1];
        this.floor = this.wall_floor.getChildren()[2];

        this.anims.create({
            key: "colourman_walk",
            frames: this.anims.generateFrameNumbers("colourman", {
                start: 0,
                end: 7,
            }),
            repeat: -1,
            frameRate: 20,
        });

        this.colourmen = [];
        this.agregarColourman();
        this.agregarColourman();
        
        this.teclas.a.on("down", () => {
            this.cambiarCursor(COLORES.RED);
        });

        this.teclas.s.on("down", () => {
            this.cambiarCursor(COLORES.GREEN);
        });

        this.teclas.d.on("down", () => {
            this.cambiarCursor(COLORES.BLUE);
        });

        this.teclas.f.on("down", () => {
            this.cambiarCursor(COLORES.BLACK);
        });

        this.tiempo = 0;
        this.muertes = 0;
        this.sobrevivientes = 0;

        this.marcadorMuertes = this.add.bitmapText(40, 40, "pixelFont", "DEAD 0").setScale(1);

        this.marcadorSobrevivientes = this.add
            .bitmapText(40, 65, "pixelFont", "SURVIVORS 0")
            .setScale(1);

        this.tiempoTotal = 60;    
        this.contadorRegresivo = this.tiempoTotal;

        this.marcadorPuntos = this.add
            .bitmapText(40, 90, "pixelFont", "POINTS 0")
            .setTint(0x00ffff);

        this.marcadorTiempo = this.add
            .bitmapText(35, 120, "pixelFont", "TIME " + this.contadorRegresivo)
            .setScale(1.4)
            .setTint(0x00ffff);

        
        this.timedEventGlobal = this.time.addEvent({
                delay: 1000,
                callback: this.actualizarTiempo,
                callbackScope: this,
                loop: true,
            });

        this.registry.events.on('disminuir_marcador_red', () => {
            this.marcadorRed.setText('R ' + --DB.redCounter);
        });

        this.registry.events.on('disminuir_marcador_green', () => {
            this.marcadorGreen.setText('G ' + --DB.greenCounter);
        });

        this.registry.events.on('disminuir_marcador_blue', () => {
            this.marcadorBlue.setText('B ' + --DB.blueCounter);
        });
    }

    actualizarTiempo() {

        ++this.tiempo;

        this.marcadorTiempo.setText("TIME  " + --this.contadorRegresivo);
        
        if (this.tiempo > (this.tiempoTotal / 2)){
            if(this.tiempo%3 === 0) {
                this.agregarColourman();
            }
        }
        else {
            if(this.tiempo%5 === 0) {
                this.agregarColourman();
            }
        }

        if(this.tiempo === this.tiempoTotal) {
            this.timedEventGlobal.destroy();
            var puntos = this.sobrevivientes - this.muertes;
            if(this.muertes >= this.sobrevivientes){
                puntos = 0;
            }
            this.scene.start('Menu', { points: puntos } );
        }
    }

    actualizarPuntos() {
        var puntos = this.sobrevivientes - this.muertes;
        if(this.muertes >= this.sobrevivientes){
            puntos = 0;
        }

        this.marcadorPuntos.setText("POINTS  " + puntos);
    }

    aumentarMarcadorSobrevivientes() {
        this.marcadorSobrevivientes.setText("SURVIVORS  " + ++this.sobrevivientes);
        this.actualizarPuntos();
    }

    aumentarMarcadorMuertos() {
        this.marcadorMuertes.setText("DEAD  " + ++this.muertes);
        this.actualizarPuntos();
    }

    agregarColourman(){
        var colourman = new Colourman({
            scene: this,
            x: Phaser.Math.Between(39, this.scale.width - 64),
            y: 128,
        });

        this.colourmen.push(colourman);

        this.anims.play("colourman_walk", colourman);

        this.physics.add.collider(
            colourman,
            this.floor
        );

        this.physics.add.collider(
            colourman,
            this.platforms
        );

        this.physics.add.collider(
            colourman,
            this.portals,
            (obj) => {
                obj.salvar();
                this.aumentarMarcadorSobrevivientes();
            }
        );

        this.physics.add.collider(
            colourman,
            this.rightWall,
            (obj) => {
                obj.girar();
            }
        );

        this.physics.add.collider(
            colourman,
            this.leftWall,
            (obj) => {
                obj.girar();
            }
        );
    }

    agruparPlantas() {
        this.planta1_container = this.physics.add.staticGroup();
        this.planta2_container = this.physics.add.staticGroup();
        this.planta3_container = this.physics.add.staticGroup();
        this.planta4_container = this.physics.add.staticGroup();
        this.planta5_container = this.physics.add.staticGroup();
        this.planta6_container = this.physics.add.staticGroup();

        //contenedores plantas

        this.num1 = this.add
            .sprite(547, 18, "macetas-numeradas", 0)
            .setScale(2)
            .setDepth(1)
            .setInteractive();

        this.plant1 = this.add
            .image(547, 18, "plant-growth", 0)
            .setScale(2)
            .setDepth(0)
            .setInteractive();

        this.planta1_container.create(this.num1);
        this.planta1_container.create(this.plant1);

        /** */

        this.num2 = this.add
            .image(587, 18, "macetas-numeradas", 0)
            .setScale(2)
            .setDepth(1)
            .setInteractive();

        this.plant2 = this.add
            .image(587, 18, "plant-growth", 0)
            .setScale(2)
            .setDepth(0)
            .setInteractive();

        this.planta2_container.create(this.num2);
        this.planta2_container.create(this.plant2);

        /** */

        this.num3 = this.add
            .image(547, 57, "macetas-numeradas", 0)
            .setScale(2)
            .setDepth(1)
            .setInteractive();
        this.plant3 = this.add
            .image(547, 57, "plant-growth", 0)
            .setScale(2)
            .setDepth(0)
            .setInteractive();

        this.planta3_container.create(this.num3);
        this.planta3_container.create(this.plant3);

        /** */

        this.num4 = this.add
            .image(587, 57, "macetas-numeradas", 0)
            .setScale(2)
            .setDepth(1)
            .setInteractive();

        this.plant4 = this.add
            .image(587, 57, "plant-growth", 0)
            .setScale(2)
            .setDepth(0)
            .setInteractive();

        this.planta4_container.create(this.num4);
        this.planta4_container.create(this.plant4);

        /** */

        this.num5 = this.add
            .image(547, 97, "macetas-numeradas", 0)
            .setScale(2)
            .setDepth(1)
            .setInteractive();

        this.plant5 = this.add
            .image(547, 97, "plant-growth", 0)
            .setScale(2)
            .setDepth(0)
            .setInteractive();

        this.planta5_container.create(this.num5);
        this.planta5_container.create(this.plant5);

        /** */

        this.num6 = this.add
            .image(587, 97, "macetas-numeradas", 0)
            .setScale(2)
            .setDepth(1)
            .setInteractive();

        this.plant6 = this.add
            .image(587, 97, "plant-growth", 0)
            .setScale(2)
            .setDepth(0)
            .setInteractive();

        this.planta6_container.create(this.num6);
        this.planta6_container.create(this.plant6);

        this.contador2 = 0;
        this.contador3 = 0;
        this.contador4 = 0;
        this.contador5 = 0;
        this.contador6 = 0;

        this.ejecucionPlanta1 = false;
        this.ejecucionPlanta2 = false;
        this.ejecucionPlanta3 = false;
        this.ejecucionPlanta4 = false;
        this.ejecucionPlanta5 = false;
        this.ejecucionPlanta6 = false;

        this.num1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.ejecucionPlanta1 && DB.colorActual != COLORES.BLACK) {
                this.contador1 = 0;
                this.ejecucionPlanta1 = true;
                this.plant1.setFrame(1);
                this.plant1Colour = DB.colorActual;
                this.sound.play('creacion-planta');
                this.timedEvent1 = this.time.addEvent({
                    delay: 1000,
                    callback: this.cronometrarPlanta1,
                    callbackScope: this,
                    loop: true,
                });
            }

            if (this.ejecucionPlanta1 && DB.colorActual == COLORES.BLACK) {
                if (
                    this.contador1 === 7 ||
                    this.contador1 === 8 ||
                    this.contador1 === 9
                ) {
                    
                    this.limpiarPlanta1();
                    this.contabilizarPlanta(this.plant1Colour);
                }
            }
        });

        this.num2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.ejecucionPlanta2 && DB.colorActual != COLORES.BLACK) {
                this.contador2 = 0;
                this.ejecucionPlanta2 = true;
                this.plant2.setFrame(1);
                this.plant2Colour = DB.colorActual;
                this.sound.play('creacion-planta');
                this.timedEvent2 = this.time.addEvent({
                    delay: 1000,
                    callback: this.cronometrarPlanta2,
                    callbackScope: this,
                    loop: true,
                });
            }

            if (this.ejecucionPlanta2 && DB.colorActual == COLORES.BLACK) {
                if (
                    this.contador2 === 7 ||
                    this.contador2 === 8 ||
                    this.contador2 === 9
                ) {
                    this.limpiarPlanta2();
                    this.contabilizarPlanta(this.plant2Colour);
                }
            }
        });

        this.num3.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.ejecucionPlanta3 && DB.colorActual != COLORES.BLACK) {
                this.contador3 = 0;
                this.ejecucionPlanta3 = true;
                this.plant3.setFrame(1);
                this.plant3Colour = DB.colorActual;
                this.sound.play('creacion-planta');
                this.timedEvent3 = this.time.addEvent({
                    delay: 1000,
                    callback: this.cronometrarPlanta3,
                    callbackScope: this,
                    loop: true,
                });
            }

            if (this.ejecucionPlanta3 && DB.colorActual == COLORES.BLACK) {
                if (
                    this.contador3 === 7 ||
                    this.contador3 === 8 ||
                    this.contador3 === 9
                ) {
                    this.limpiarPlanta3();
                    this.contabilizarPlanta(this.plant3Colour);
                }
            }
        });

        this.num4.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.ejecucionPlanta4 && DB.colorActual != COLORES.BLACK) {
                this.contador4 = 0;
                this.ejecucionPlanta4 = true;
                this.plant4.setFrame(1);
                this.plant4Colour = DB.colorActual;
                this.sound.play('creacion-planta');
                this.timedEvent4 = this.time.addEvent({
                    delay: 1000,
                    callback: this.cronometrarPlanta4,
                    callbackScope: this,
                    loop: true,
                });
            }

            if (this.ejecucionPlanta4 && DB.colorActual == COLORES.BLACK) {
                if (
                    this.contador4 === 7 ||
                    this.contador4 === 8 ||
                    this.contador4 === 9
                ) {
                    this.limpiarPlanta4();
                    this.contabilizarPlanta(this.plant4Colour);
                }
            }
        });

        this.num5.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.ejecucionPlanta5 && DB.colorActual != COLORES.BLACK) {
                this.contador5 = 0;
                this.ejecucionPlanta5 = true;
                this.plant5.setFrame(1);
                this.plant5Colour = DB.colorActual;
                this.sound.play('creacion-planta');
                this.timedEvent5 = this.time.addEvent({
                    delay: 1000,
                    callback: this.cronometrarPlanta5,
                    callbackScope: this,
                    loop: true,
                });
            }

            if (this.ejecucionPlanta5 && DB.colorActual == COLORES.BLACK) {
                if (
                    this.contador5 === 7 ||
                    this.contador5 === 8 ||
                    this.contador5 === 9
                ) {
                    this.limpiarPlanta5();
                    this.contabilizarPlanta(this.plant5Colour);
                }
            }
        });

        this.num6.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.ejecucionPlanta6 && DB.colorActual != COLORES.BLACK) {
                this.contador6 = 0;
                this.ejecucionPlanta6 = true;
                this.plant6.setFrame(1);
                this.plant6Colour = DB.colorActual;
                this.sound.play('creacion-planta');
                this.timedEvent6 = this.time.addEvent({
                    delay: 1000,
                    callback: this.cronometrarPlanta6,
                    callbackScope: this,
                    loop: true,
                });
            }

            if (this.ejecucionPlanta6 && DB.colorActual == COLORES.BLACK) {
                if (
                    this.contador6 === 7 ||
                    this.contador6 === 8 ||
                    this.contador6 === 9
                ) {
                    this.limpiarPlanta6();
                    this.contabilizarPlanta(this.plant6Colour);
                }
            }
        });
    }

    cronometrarPlanta1() {
        this.contador1++;

        var spriteFrame = 0;
        switch (this.plant1Colour) {
            case COLORES.RED:
                spriteFrame = 3;
                break;

            case COLORES.GREEN:
                spriteFrame = 4;

                break;

            case COLORES.BLUE:
                spriteFrame = 5;
                break;
        }

        if (this.contador1 === 1) {
            this.num1.setFrame(1);
            this.plant1.setFrame(1);
        }

        if (this.contador1 === 2) {
            this.num1.setFrame(2);
            this.plant1.setFrame(1);
        }

        if (this.contador1 === 3) {
            this.num1.setFrame(3);
            this.plant1.setFrame(1);
        }

        if (this.contador1 === 4) {
            this.num1.setFrame(1);
            this.plant1.setFrame(2);
        }

        if (this.contador1 === 5) {
            this.num1.setFrame(2);
            this.plant1.setFrame(2);
        }

        if (this.contador1 === 6) {
            this.num1.setFrame(3);
            this.plant1.setFrame(2);
        }

        if (this.contador1 === 7) {
            this.sound.play('pop');
            this.num1.setFrame(1);
            this.plant1.setFrame(spriteFrame);
        }

        if (this.contador1 === 8) {
            this.num1.setFrame(2);
            this.plant1.setFrame(spriteFrame);
        }

        if (this.contador1 === 9) {
            this.num1.setFrame(3);
            this.plant1.setFrame(spriteFrame);
        }

        if (this.contador1 === 10) {
            this.limpiarPlanta1();
        }
    }

    limpiarPlanta1() {
        this.num1.setFrame(0);
        this.plant1.setFrame(0);
        this.contador1 = 0;
        this.ejecucionPlanta1 = false;
        this.timedEvent1.destroy();
    }

    contabilizarPlanta(plantColour) {
        switch (plantColour) {
            case COLORES.RED:
                DB.redCounter += 3;
                this.marcadorRed.setText("R " + DB.redCounter);
                break;

            case COLORES.GREEN:
                DB.greenCounter += 3;
                this.marcadorGreen.setText("G " + DB.greenCounter);
                break;

            case COLORES.BLUE:
                DB.blueCounter += 3;
                this.marcadorBlue.setText("B " + DB.blueCounter);
                break;
        }
    }

    cronometrarPlanta2() {
        this.contador2++;

        var spriteFrame = 0;
        switch (this.plant2Colour) {
            case COLORES.RED:
                spriteFrame = 3;
                break;

            case COLORES.GREEN:
                spriteFrame = 4;

                break;

            case COLORES.BLUE:
                spriteFrame = 5;
                break;
        }

        if (this.contador2 === 1) {
            this.num2.setFrame(1);
            this.plant2.setFrame(1);
        }

        if (this.contador2 === 2) {
            this.num2.setFrame(2);
            this.plant2.setFrame(1);
        }

        if (this.contador2 === 3) {
            this.num2.setFrame(3);
            this.plant2.setFrame(1);
        }

        if (this.contador2 === 4) {
            this.num2.setFrame(1);
            this.plant2.setFrame(2);
        }

        if (this.contador2 === 5) {
            this.num2.setFrame(2);
            this.plant2.setFrame(2);
        }

        if (this.contador2 === 6) {
            this.num2.setFrame(3);
            this.plant2.setFrame(2);
        }

        if (this.contador2 === 7) {
            this.sound.play('pop');
            this.num2.setFrame(1);
            this.plant2.setFrame(spriteFrame);
        }

        if (this.contador2 === 8) {
            this.num2.setFrame(2);
            this.plant2.setFrame(spriteFrame);
        }

        if (this.contador2 === 9) {
            this.num2.setFrame(3);
            this.plant2.setFrame(spriteFrame);
        }

        if (this.contador2 === 10) {
            this.limpiarPlanta2();
        }
    }

    limpiarPlanta2() {
        this.num2.setFrame(0);
        this.plant2.setFrame(0);
        this.contador2 = 0;
        this.ejecucionPlanta2 = false;
        this.timedEvent2.destroy();
    }

    cronometrarPlanta3() {
        this.contador3++;

        var spriteFrame = 0;
        switch (this.plant3Colour) {
            case COLORES.RED:
                spriteFrame = 3;
                break;

            case COLORES.GREEN:
                spriteFrame = 4;

                break;

            case COLORES.BLUE:
                spriteFrame = 5;
                break;
        }

        if (this.contador3 === 1) {
            this.num3.setFrame(1);
            this.plant3.setFrame(1);
        }

        if (this.contador3 === 2) {
            this.num3.setFrame(2);
            this.plant3.setFrame(1);
        }

        if (this.contador3 === 3) {
            this.num3.setFrame(3);
            this.plant3.setFrame(1);
        }

        if (this.contador3 === 4) {
            this.num3.setFrame(1);
            this.plant3.setFrame(2);
        }

        if (this.contador3 === 5) {
            this.num3.setFrame(2);
            this.plant3.setFrame(2);
        }

        if (this.contador3 === 6) {
            this.num3.setFrame(3);
            this.plant3.setFrame(2);
        }

        if (this.contador3 === 7) {
            this.sound.play('pop');
            this.num3.setFrame(1);
            this.plant3.setFrame(spriteFrame);
        }

        if (this.contador3 === 8) {
            this.num3.setFrame(2);
            this.plant3.setFrame(spriteFrame);
        }

        if (this.contador3 === 9) {
            this.num3.setFrame(3);
            this.plant3.setFrame(spriteFrame);
        }

        if (this.contador3 === 10) {
            this.limpiarPlanta3();
        }
    }

    limpiarPlanta3() {
        this.num3.setFrame(0);
        this.plant3.setFrame(0);
        this.contador3 = 0;
        this.ejecucionPlanta3 = false;
        this.timedEvent3.destroy();
    }

    cronometrarPlanta4() {
        this.contador4++;

        var spriteFrame = 0;
        switch (this.plant4Colour) {
            case COLORES.RED:
                spriteFrame = 3;
                break;

            case COLORES.GREEN:
                spriteFrame = 4;

                break;

            case COLORES.BLUE:
                spriteFrame = 5;
                break;
        }

        if (this.contador4 === 1) {
            this.num4.setFrame(1);
            this.plant4.setFrame(1);
        }

        if (this.contador4 === 2) {
            this.num4.setFrame(2);
            this.plant4.setFrame(1);
        }

        if (this.contador4 === 3) {
            this.num4.setFrame(3);
            this.plant4.setFrame(1);
        }

        if (this.contador4 === 4) {
            this.num4.setFrame(1);
            this.plant4.setFrame(2);
        }

        if (this.contador4 === 5) {
            this.num4.setFrame(2);
            this.plant4.setFrame(2);
        }

        if (this.contador4 === 6) {
            this.num4.setFrame(3);
            this.plant4.setFrame(2);
        }

        if (this.contador4 === 7) {
            this.sound.play('pop');
            this.num4.setFrame(1);
            this.plant4.setFrame(spriteFrame);
        }

        if (this.contador4 === 8) {
            this.num4.setFrame(2);
            this.plant4.setFrame(spriteFrame);
        }

        if (this.contador4 === 9) {
            this.num4.setFrame(3);
            this.plant4.setFrame(spriteFrame);
        }

        if (this.contador4 === 10) {
            this.limpiarPlanta4();
        }
    }

    limpiarPlanta4() {
        this.num4.setFrame(0);
        this.plant4.setFrame(0);
        this.contador4 = 0;
        this.ejecucionPlanta4 = false;
        this.timedEvent4.destroy();
    }

    cronometrarPlanta5() {
        this.contador5++;

        var spriteFrame = 0;
        switch (this.plant5Colour) {
            case COLORES.RED:
                spriteFrame = 3;
                break;

            case COLORES.GREEN:
                spriteFrame = 4;

                break;

            case COLORES.BLUE:
                spriteFrame = 5;
                break;
        }

        if (this.contador5 === 1) {
            this.num5.setFrame(1);
            this.plant5.setFrame(1);
        }

        if (this.contador5 === 2) {
            this.num5.setFrame(2);
            this.plant5.setFrame(1);
        }

        if (this.contador5 === 3) {
            this.num5.setFrame(3);
            this.plant5.setFrame(1);
        }

        if (this.contador5 === 4) {
            this.num5.setFrame(1);
            this.plant5.setFrame(2);
        }

        if (this.contador5 === 5) {
            this.num5.setFrame(2);
            this.plant5.setFrame(2);
        }

        if (this.contador5 === 6) {
            this.num5.setFrame(3);
            this.plant5.setFrame(2);
        }

        if (this.contador5 === 7) {
            this.sound.play('pop');
            this.num5.setFrame(1);
            this.plant5.setFrame(spriteFrame);
        }

        if (this.contador5 === 8) {
            this.num5.setFrame(2);
            this.plant5.setFrame(spriteFrame);
        }

        if (this.contador5 === 9) {
            this.num5.setFrame(3);
            this.plant5.setFrame(spriteFrame);
        }

        if (this.contador5 === 10) {
            this.limpiarPlanta5();
        }
    }

    limpiarPlanta5() {
        this.num5.setFrame(0);
        this.plant5.setFrame(0);
        this.contador5 = 0;
        this.ejecucionPlanta5 = false;
        this.timedEvent5.destroy();
    }

    cronometrarPlanta6() {
        this.contador6++;

        var spriteFrame = 0;
        switch (this.plant6Colour) {
            case COLORES.RED:
                spriteFrame = 3;
                break;

            case COLORES.GREEN:
                spriteFrame = 4;

                break;

            case COLORES.BLUE:
                spriteFrame = 5;
                break;
        }

        if (this.contador6 === 1) {
            this.num6.setFrame(1);
            this.plant6.setFrame(1);
        }

        if (this.contador6 === 2) {
            this.num6.setFrame(2);
            this.plant6.setFrame(1);
        }

        if (this.contador6 === 3) {
            this.num6.setFrame(3);
            this.plant6.setFrame(1);
        }

        if (this.contador6 === 4) {
            this.num6.setFrame(1);
            this.plant6.setFrame(2);
        }

        if (this.contador6 === 5) {
            this.num6.setFrame(2);
            this.plant6.setFrame(2);
        }

        if (this.contador6 === 6) {
            this.num6.setFrame(3);
            this.plant6.setFrame(2);
        }

        if (this.contador6 === 7) {
            this.sound.play('pop');
            this.num6.setFrame(1);
            this.plant6.setFrame(spriteFrame);
        }

        if (this.contador6 === 8) {
            this.num6.setFrame(2);
            this.plant6.setFrame(spriteFrame);
        }

        if (this.contador6 === 9) {
            this.num6.setFrame(3);
            this.plant6.setFrame(spriteFrame);
        }

        if (this.contador6 === 10) {
            this.limpiarPlanta6();
        }
    }

    limpiarPlanta6() {
        this.num6.setFrame(0);
        this.plant6.setFrame(0);
        this.contador6 = 0;
        this.ejecucionPlanta6 = false;
        this.timedEvent6.destroy();
    }

    cambiarCursor(color) {
        this.container_colours.getChildren()[0].setTint(0xffffff);
        this.container_colours.getChildren()[1].setTint(0xffffff);
        this.container_colours.getChildren()[2].setTint(0xffffff);
        this.container_colours.getChildren()[3].setTint(0xffffff);

        switch (color) {
            case COLORES.RED:
                this.input.setDefaultCursor(
                    "url(assets/cursor_red32.png), pointer"
                );
                this.container_colours.getChildren()[0].setTint(0xff00ff);
                DB.colorActual = COLORES.RED;
                break;

            case COLORES.GREEN:
                this.input.setDefaultCursor(
                    "url(assets/cursor_green32.png), pointer"
                );
                this.container_colours.getChildren()[1].setTint(0xff00ff);
                DB.colorActual = COLORES.GREEN;
                break;

            case COLORES.BLUE:
                this.input.setDefaultCursor(
                    "url(assets/cursor_blue32.png), pointer"
                );
                this.container_colours.getChildren()[2].setTint(0xff00ff);
                DB.colorActual = COLORES.BLUE;
                break;

            case COLORES.BLACK:
                this.input.setDefaultCursor(
                    "url(assets/cursor32.png), pointer"
                );
                this.container_colours.getChildren()[3].setTint(0xff00ff);
                DB.colorActual = COLORES.BLACK;
                break;
        }
    }

    update() {
        this.colourmen.map((obj, index) =>{
            if(obj) {
                if(!obj.muerto) {
                    obj.update();
                } else if (!obj.destruido) {
                    obj.destruirObjeto();
                    obj.destruido = true;
                    if(!obj.salvado) {
                        this.aumentarMarcadorMuertos();
                    }
                }
            }
        });
    }
}

export default Play;