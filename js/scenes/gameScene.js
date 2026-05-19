"use strict";

class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
        this.seleccionades = [];
        this.nErrades = 0;
        this.captches = [];
    }

    preload() {
        const graella = captchaData[0].graella;
        for (let fila = 0; fila < 3; fila++) {
            for (let col = 0; col < 3; col++) {
                const variants = graella[fila][col].variants;
                variants.forEach(variant => {
                    this.load.image(variant.img, 'assets/captcha1/' + variant.img);
                });
            }
        }
    }


    create() {
        const cx = this.cameras.main.width / 2;
        this.add.text(cx, 40, 'Selecciona les parts alterades per IA', {
            fontSize: '16px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.textErrades = this.add.text(cx, 70, 'Errades: 0', {
            fontSize: '14px',
            fill: '#e94560'
        }).setOrigin(0.5);
        this.crearGraella();
        this.crearBotoVerificar();
        this.crearBotoPausa();
    }

    crearGraella() {
        const mida = 150;
        const separacio = 10;
        const inicix = 130;
        const iniciy = 110;
        const graella = captchaData[0].graella;
        for (let fila = 0; fila < 3; fila++) {
            for (let col = 0; col < 3; col++) {
                const x = inicix + col * (mida + separacio);
                const y = iniciy + fila * (mida + separacio);
                const variants = graella[fila][col].variants;
                const variantTriada = variants[Phaser.Math.Between(0, 1)];
                const caixa = this.add.rectangle(x, y, mida, mida, 0x16213e)
                    .setStrokeStyle(2, 0x444466)
                    .setInteractive();
                const etiqueta = this.add.text(x, y, variantTriada.img, {
                    fontSize: '10px',
                    fill: '#ffffff',
                    align: 'center',
                    wordWrap: { width: mida - 10 }
                }).setOrigin(0.5);
                const index = fila * 3 + col;
                this.captches.push({
                    caixa,
                    etiqueta,
                    fake: variantTriada.fake,
                    seleccionada: false,
                    index
                });
                caixa.on('pointerup', () => this.marcarFakeNew(index));
                caixa.on('pointerover', () => {
                    if (!this.captches[index].seleccionada) {
                        caixa.setStrokeStyle(2, 0xe94560);
                    }
                });
                caixa.on('pointerout', () => {
                    if (!this.captches[index].seleccionada) {
                        caixa.setStrokeStyle(2, 0x444466);
                    }
                });
            }
        }
    }

    /**
     * Marca o desmarca una casella com a fake news.
     * Pre: index ha de ser un índex vàlid de captches.
     * Post: la casella canvia de color segons si està seleccionada.
     */
    marcarFakeNew(index) {
        const captcha = this.captches[index];
        captcha.seleccionada = !captcha.seleccionada;
        if (captcha.seleccionada) {
            captcha.caixa.setFillStyle(0x3d1a78);
            captcha.caixa.setStrokeStyle(3, 0xe94560);
        } else {
            captcha.caixa.setFillStyle(0x16213e);
            captcha.caixa.setStrokeStyle(2, 0x444466);
        }
    }

    /**
     * Crea el botó de verificació a la part inferior.
     * Post: botó interactiu visible a la pantalla.
     */
    crearBotoVerificar() {
        const cx = this.cameras.main.width / 2;
        this.botoVerificar = this.add.text(cx, 560, '[ VERIFICAR ]', {
            fontSize: '22px',
            fill: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();
        this.botoVerificar.on('pointerover', () => {
            this.botoVerificar.setStyle({ fill: '#ffffff' });
        });
        this.botoVerificar.on('pointerout', () => {
            this.botoVerificar.setStyle({ fill: '#e94560' });
        });
        this.botoVerificar.on('pointerup', () => this.verificar());
    }

    /**
     * Crea el botó de pausa a la cantonada superior dreta.
     * Post: botó interactiu visible a la pantalla.
     */
    crearBotoPausa() {
        const boto = this.add.text(760, 20, '⏸', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();
        boto.on('pointerup', () => {
            this.scene.pause('GameScene');
            this.scene.launch('PauseScene');
        });
    }

    /**
     * Comprova si les caselles seleccionades són correctes.
     * Post: actualitza nErrades i mostra el resultat per pantalla.
     */
    verificar() {
        let errors = 0;
        this.captches.forEach(captcha => {
            if (captcha.seleccionada !== captcha.fake) {
                errors++;
                captcha.caixa.setStrokeStyle(3, 0xff0000);
            } else if (captcha.fake && captcha.seleccionada) {
                captcha.caixa.setStrokeStyle(3, 0x00ff00);
            }
        });
        this.nErrades += errors;
        this.textErrades.setText('Errades: ' + this.nErrades);
        if (errors === 0) {
            this.mostrarResultat('PERFECTE! Totes correctes!', '#00ff00');
        } else {
            this.mostrarResultat('Hi ha ' + errors + ' errors!', '#e94560');
        }
    }

    /**
     * Mostra un missatge de resultat que desapareix sol.
     * Pre: missatge és un string, color és un string hex vàlid.
     * Post: text visible durant 2 segons.
     */
    mostrarResultat(missatge, color) {
        const cx = this.cameras.main.width / 2;
        const text = this.add.text(cx, 520, missatge, {
            fontSize: '18px',
            fill: color
        }).setOrigin(0.5);
        this.time.delayedCall(2000, () => text.destroy());
    }
    update() { }
}