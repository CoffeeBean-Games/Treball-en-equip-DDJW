**Introducció**

Aquest projecte s'anomena "Captcha de la veritat", i és un minijoc provinent del joc anomenat "_FAKE NEWS_", on el jugador encarna a un periodista que s'embarca en una missió personal per desemmascarar a una mega-corporació creadora d'una IA que tracta d'augmentar el seu poder i la seva influència a través de la desinformació i el control de masses, i serà el teu treball aconseguir que això no succeeixi i treure la veritat a la llum.

**Descripció del disseny del joc**

Aquest joc consisteix en tres escenes principals, un menú principal, que és la primera a carregar i des d'on el jugador pot veure les instruccions de joc i iniciar una partida. Fent això, carrega l'escena principal del joc, on apareix una graella de 3X3 amb imatges, algunes modificades per la IA (fake) i d'altres sense cap modificació (true), i és el jugador qui ha de marcar d'aquestes les que han sigut modificades per tal de completar el minijoc, tenint aquest alhora un menú de pausa que se sobreposa a l'escena del joc i des del qual es pot: reprendre la partida, reiniciar la partida i sortir al menú principal.

**Descripció de les parts més rellevants de la implementació**

La part principal d'aquest projecte és el gameScene.js, on en carregar es genera una graella de 3X3, i en cada quadre/posició d'aquesta, apareix una imatge que pot estar en dos estats, fake o true. Les imatges Fake són imatges amb modificacions més o menys evidents, i les imatges true, són les mateixes però sense cap mena de modificació.
Per tant, un cop generades aquestes imatges, el jugador ha de seleccionar les que consideri que han sigut modificades (si no hi selecciona cap al joc l'indica que obligatòriament ha de seleccionar una, donat que mai hi seran totes true), un cop seleccionades, prem el botó de verificar, i aquests l'indicarà a través d'un missatge si ha seleccionat totes bé, o si hi ha cap error i quants n'hi ha (ja sigui que ha seleccionat una que no era fake o que no ha seleccionat una que ho era).
Les graelles es marquen d'un contorn verd si s'ha seleccionat correctament o d'un color vermell si s'ha seleccionat una que no era.

**Conclusions i problemes trobats**

Aquest ha sigut un projecte que ens ha permès millorar molt la nostra comprensió de les eines utilitzades (sobretot phaser), tot i que, a causa de la manca d'experiència treballant en equip en projectes similars a GitHub, hem tingut certes complicacions a l'hora de coordinar-nos i de treballar per sobre o des de la base del treball de l'altre.

**Manual d’usuari**

  COM ES JUGA?
  1. Se't mostren 9 imatges
  2. Selecciones les generades per IA
  3. Prems VERIFICAR quan estiguis llest
  4. Cada encert suma punts!
