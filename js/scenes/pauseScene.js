"use strict";

class pauseScene extends Phaser.Scene {

    constructor() {
        super('pauseScene');
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.add.rectangle(cx, cy, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);

        this.add.rectangle(cx, cy, 360, 320, 0x16213e)
            .setStrokeStyle(2, 0xe94560);

        this.add.text(cx, cy - 110, 'PAUSA', {
            fontSize: '32px',
            fill: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.rectangle(cx, cy - 75, 280, 2, 0xe94560);

        this.botoReprendre = this.add.text(cx, cy - 30, '[ REPRENDRE ]', {
            fontSize: '22px',
            fill: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        this.botoReiniciar = this.add.text(cx, cy + 40, '[ REINICIAR ]', {
            fontSize: '22px',
            fill: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        this.botoMenu = this.add.text(cx, cy + 110, '[ MENÚ PRINCIPAL ]', {
            fontSize: '22px',
            fill: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        this.configurarBotons();
    }

    configurarBotons() {
        this.configurarHover(this.botoReprendre);
        this.configurarHover(this.botoReiniciar);
        this.configurarHover(this.botoMenu);

        this.botoReprendre.on('pointerup', () => {
            this.scene.resume('gameScene');
            this.scene.stop('pauseScene');
        });

        this.botoReiniciar.on('pointerup', () => {
            this.scene.stop('pauseScene');
            this.scene.restart('gameScene');
        });

        this.botoMenu.on('pointerup', () => {
            this.scene.stop('gameScene');
            this.scene.start('menuScene');
        });
    }

    configurarHover(boto) {
        boto.on('pointerover', () => {
            boto.setStyle({ fill: '#ffffff' });
        });
        boto.on('pointerout', () => {
            boto.setStyle({ fill: '#e94560' });
        });
    }

    update() { }
}
