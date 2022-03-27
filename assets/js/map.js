import Commons from "./commons.js";
import { FieldObject } from "./object.js";

export class Map {

    constructor(field, level){
        this.field = field;
        // attributs joueur
        this.player_x = null;
        this.player_y = null;
        // paramètres globales
        this.map_coeff = Commons.getMapCoeff(); // taille d'un carré sur le map
        // paramêtres de map
        this.level = level;
        this.currentSettings = this.getLevelSettings();
        // elements avec la gravité
        this.gravity_cycle = 180; // en millisecond
        this.gravity_objects = []; // DOM objets avec gravité
        // dessiner les objets
        this.draw();
        // Lancer la gravité
        this.gravity();
    }

    draw(level){
        if(! level) level = this.level;
        let settings = this.currentSettings;
        // dessiner les murs
        settings.walls.map((wall, key) => {
            this.appendObjetToField("wall", wall);
        });
        // dessigner les dirts
        settings.dirts.map((dirt, key) => {
            this.appendObjetToField("dirt", dirt);
        });
        // dessigner les diamands
        settings.gems.map((gem, key) => {
            this.appendObjetToField("gem", gem);
            this.applyGravityTo("gems", key, gem); // appliquer la gravité à cette objet
        });
        // dessigner les roches
        settings.rocks.map((rock, key) => {
            this.appendObjetToField("rock", rock);
            this.applyGravityTo('rocks', key, rock);
        });
    }

    appendObjetToField(type, obj){
        // définir l'objet et ces attributs
        let w = document.createElement('div');
        w.style.marginLeft = obj.x * this.map_coeff;
        w.style.marginTop = obj.y * this.map_coeff;
        w.className = "objects " + type;
        w.id = obj.id;
        this.field.object.appendChild(w); //  ajoute l'objet à l'espace de jeu
        return w;
    }

    // récupérer les objets de niveau actuel
    getLevelSettings = () => {
        let regular = this.levels()[this.level -1];
        let settings = {
            'gems': [], 'rocks': [], 'walls' : [], 'dirts' : []
        };
        regular.gems.map((gem, key) => {
            settings.gems.push(new FieldObject(this, "gems", key, gem[0], gem[1]));
        });
        regular.walls.map((wall, key) => {
            settings.walls.push(new FieldObject(this, "walls", key, wall[0], wall[1]));
        });
        regular.dirts.map((dirt, key) => {
            settings.dirts.push(new FieldObject(this, "dirts", key, dirt[0], dirt[1]));
        });
        regular.rocks.map((rock, key) => {
            settings.rocks.push(new FieldObject(this, "rocks", key, rock[0], rock[1]));
        });
        return settings;
    }

    // lancer la gravité
    gravity = () => {
        let object, x, y, is_colised;
        setInterval(() => {
            // pour chaque objet
            this.gravity_objects.map((gem, key) => {
                object = document.getElementById(gem.object.id);
                // vérifier la collision avec les limites de l'espace de jeu
                    y = parseInt(object.style.marginTop.split('p')[0]);
                    x = parseInt(object.style.marginLeft.split('p')[0]);
                if(y <= parseInt(this.field.object.style.height.split('p')[0]) - this.map_coeff*2){
                    // vérifier la collision avec les autres objets
                    is_colised = false;
                    let objs = ['walls', 'gems', 'dirts', 'rocks'];
                    objs.map((o) => {
                        this.currentSettings[o].map((ob) => {
                            if(ob.x * this.map_coeff == x && y == ob.y * this.map_coeff - this.map_coeff){
                                is_colised = true; return true;
                            }
                        });
                    });
                    // vérifier si le joueur est en dessous de l'objet
                    if(this.player_x == x && y == this.player_y - this.map_coeff){
                        is_colised = true; return true;
                    }
                    if(! is_colised){
                        object.style.marginTop = y + this.map_coeff; // modifier les coordonnées dans l'espace
                        gem.object.updateObjectCoords([x, y + this.map_coeff]); // nouvelles coordonnées sur le map
                    }
                }
            });
        }, this.gravity_cycle);
    }

    // appliquer la gravité à un objet de l'espace
    applyGravityTo = (type, index, object) => {
        this.gravity_objects.push({
            'type': type,
            'index' : index,
            'object' : object
        });
    }

    // définir tous les niveau de jeu
    levels(){
        return [
            {
                'level': 1,
                'walls' : [
                    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[12,6],[13,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[20,6],
                    [17,9],[18,9],[19,9],[20,9],[21,9],[22,9],[23,9],[24,9],[25,9],[26,9],[27,9],[28,9],[29,9],
                ],
                'dirts' : [
                    [10, 2], [10, 3], [10, 4], [13, 12]
                ],
                'gems' : [
                    [10, 15], [28, 12], [25, 5], [11, 3], [14, 13]
                ],
                'rocks' : [
                    [12, 15], [14, 15], [14, 14], [14, 12]
                ]
            }
        ]
    }

    setPlayerCoords = (x, y) => {
        this.player_x = x;
        this.player_y = y;
    }
}