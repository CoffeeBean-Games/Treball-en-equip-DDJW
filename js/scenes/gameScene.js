"use strict";

class gameScene extends Phaser.Scene {

    constructor() {
        super('gameScene');
        this.seleccionades = [];
        this.nErrades = 0;
        this.captches = [];
    }

    init() {
        this.seleccionades = [];
        this.nErrades = 0;
        this.captches = [];
    }

    preload() {
        const captchaActual = captchaData[0];
	const graella = captchaActual.graella;
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
        this.add.text(cx, 15, 'Selecciona les parts alterades per IA', {
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
        const inicix = (this.cameras.main.width - (3 * mida + 2 * separacio)) / 2 + mida / 2;
        const iniciy = 110;
	const captchaActual = captchaData[0];
        const graella = captchaActual.graella;
        for (let fila = 0; fila < 3; fila++) {
            for (let col = 0; col < 3; col++) {
                const x = inicix + col * (mida + separacio);
                const y = iniciy + fila * (mida + separacio);
                const variants = graella[fila][col].variants;
                const variantTriada = variants[Phaser.Math.Between(0, 1)];
                const imatge = this.add.image(x, y, variantTriada.img)
		   			.setDisplaySize(mida, mida)
                    .setInteractive();
                const marc = this.add.rectangle(x, y, mida, mida)
                    .setStrokeStyle(2, 0x444466)
                    .setFillStyle(0x000000, 0);
                const index = fila * 3 + col;
                this.captches.push({
                    caixa: marc,
		    imatge,
                    fake: variantTriada.fake,
                    seleccionada: false,
                    index
                });
                imatge.on('pointerup', () => this.marcarFakeNew(index));
                imatge.on('pointerover', () => {
                    if (!this.captches[index].seleccionada) {
                        marc.setStrokeStyle(2, 0xe94560);
                    }
                });
                imatge.on('pointerout', () => {
                    if (!this.captches[index].seleccionada) {
                        marc.setStrokeStyle(2, 0x444466);
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
            captcha.caixa.setStrokeStyle(3, 0xe94560);
            captcha.imatge.setTint(0x9966ff);
        } else {
            captcha.caixa.setStrokeStyle(2, 0x444466);
            captcha.imatge.clearTint();
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
            this.scene.pause('gameScene');
            this.scene.launch('pauseScene');
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
            if (captcha.seleccionada) {
                captcha.caixa.setStrokeStyle(3, 0xff0000);
            }
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
