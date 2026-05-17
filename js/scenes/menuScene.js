"use strict";

class MenuScene extends Phaser.Scene {

    /**
     * Constructor de l'escena del menú principal.
     */
    constructor() {
        super('MenuScene');
    }

    /**
     * Carrega els recursos visuals del menú.
     */
    preload() {
        // De moment sense assets externs
    }

    /**
     * Crea i posiciona tots els elements visuals del menú.
     * Post: es mostren el títol, subtítol i botó de jugar.
     */
    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // Fons
        this.cameras.main.setBackgroundColor('#1a1a2e');

        // Títol
        this.add.text(cx, cy - 160, 'CAPTCHA DE VERITAT', {
            fontSize: '36px',
            fill: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Subtítol
        this.add.text(cx, cy - 100, 'Detecta les Fake News', {
            fontSize: '18px',
            fill: '#a8a8b3'
        }).setOrigin(0.5);

        // Línia separadora
        this.add.rectangle(cx, cy - 60, 400, 2, 0xe94560);

        // Descripció
        this.add.text(cx, cy, 'Selecciona totes les imatges generades per IA\ni ajuda a frenar la desinformació.', {
            fontSize: '14px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Botó jugar
        this.botoJugar = this.add.text(cx, cy + 100, '[ INICIAR ]', {
            fontSize: '28px',
            fill: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        // Botó instruccions
        this.botoInstruccions = this.add.text(cx, cy + 155, 'Com es juga?', {
            fontSize: '16px',
            fill: '#a8a8b3'
        }).setOrigin(0.5).setInteractive();

        this.configurarBotons();
        this.animacioTitol();
    }

    /**
     * Assigna els esdeveniments de clic i hover als botons.
     * Pre: botoJugar i botoInstruccions han d'existir.
     * Post: els botons responen al clic i al ratolí per sobre.
     */
    configurarBotons() {
        // Hover botó jugar
        this.botoJugar.on('pointerover', () => {
            this.botoJugar.setStyle({ fill: '#ffffff' });
        });
        this.botoJugar.on('pointerout', () => {
            this.botoJugar.setStyle({ fill: '#e94560' });
        });
        this.botoJugar.on('pointerup', () => {
            this.scene.start('GameScene');
        });

        // Hover botó instruccions
        this.botoInstruccions.on('pointerover', () => {
            this.botoInstruccions.setStyle({ fill: '#ffffff' });
        });
        this.botoInstruccions.on('pointerout', () => {
            this.botoInstruccions.setStyle({ fill: '#a8a8b3' });
        });
        this.botoInstruccions.on('pointerup', () => {
            this.mostrarInstruccions();
        });
    }

    /**
     * Crea una animació de parpelleig al botó jugar.
     * Post: el botó parpelleja indefinidament.
     */
    animacioTitol() {
        this.tweens.add({
            targets: this.botoJugar,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }

    /**
     * Mostra un text d'instruccions a la pantalla.
     * Post: apareix un panell amb les instruccions del joc.
     */
    mostrarInstruccions() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        const fons = this.add.rectangle(cx, cy, 500, 300, 0x16213e)
            .setStrokeStyle(2, 0xe94560);

        const text = this.add.text(cx, cy - 80,
            'COM ES JUGA?\n\n' +
            '1. Se\'t mostren 9 imatges\n' +
            '2. Selecciona les generades per IA\n' +
            '3. Prem VERIFICAR quan estiguis llest\n' +
            '4. Cada encert suma punts!\n\n' +
            '[clic per tancar]', {
            fontSize: '14px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        fons.setInteractive();
        fons.on('pointerup', () => {
            fons.destroy();
            text.destroy();
        });
    }

    update() { }
}
