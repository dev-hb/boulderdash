import Commons from "./commons.js";

export class Player {

    // Création de joueur
    constructor(context, field, map, objId){
        // objets globales
        this.context = context; // le context de jeu, l'objet global BoulderDash
        this.field = field; // l'espace de jeu en cours
        this.map = map; // les différente objets de l'espace
        // Caractériqtiques de joueur
        this.object = document.getElementById(objId); // l'objet DOM de joueur dans HTML (balise img)
        this.x = 0; // coordonnée x de joueur
        this.y = 0; // coordonnée y de joueur
        this.map.setPlayerCoords(this.x, this.y);
        this.player_step_shift = Commons.getMapCoeff(); // nombre de pixels de mouvement pour une étape
    }


    loadEvents(){
        window.document.addEventListener('keydown', (e) => {
            let code = e.keyCode; // récupérer le code de caractère clavier saisi
            console.log(code)
            let x = this.x, y = this.y, obj; // récupérer les coordonnées
            switch(code){ // vérifier les nouveaux coordonnées de joueur et les collisions avec les mûrs et limites d'espace de jeu
                case 90: if(this.y >= this.player_step_shift){
                    y -= this.player_step_shift;
                    if(this.checkWallsCollisions(x, y)) return false;
                } break;
                case 83: if(this.y <= this.field.height - this.player_step_shift*2){
                    y += this.player_step_shift;
                    if(this.checkWallsCollisions(x, y)) return false;
                } break;
                case 81: if(this.x >= this.player_step_shift){
                    x -= this.player_step_shift;
                    obj = this.checkWallsCollisions(x, y);
                    if(obj){
                        // boucher le roche si la case suivante est vide
                        if(obj.type == "rocks"){
                            if(this.existsObject(x, y) === undefined){
                                --obj.obj.x;
                                obj.obj.getDOM().style.marginLeft = obj.obj.x * Commons.getMapCoeff();
                            } else return false;
                        }else return false;
                    }
                } break;
                case 68: if(this.x <= this.field.width - this.player_step_shift*2) {
                    x += this.player_step_shift;
                    obj = this.checkWallsCollisions(x, y);
                    if(obj){
                        // boucher le roche si la case suivante est vide
                        if(obj.type == "rocks"){
                            if(this.existsObject(x, y) === undefined){
                                ++obj.obj.x;
                                obj.obj.getDOM().style.marginLeft = obj.obj.x * Commons.getMapCoeff();
                            } else return false;
                        }else return false;
                    }
                } break;
            }
            // modifier vers les nouvelles coordonnées
            this.x = x;
            this.y = y;
            // repositionner le joueur dans l'espace de jeu
            this.move();
            // mise à jour des statistiques
            this.context.update();
        });
    }

    // redéplacer le joueur
    move(x = undefined, y = undefined){
        x = x ? x : this.x;
        y = y ? y : this.y;
        this.object.style.marginTop = y;
        this.object.style.marginLeft = x;
        // une fois le joueur boujé, vérifier les collisions
        this.manageCollisions(x, y);
        this.map.setPlayerCoords(x, y);
    }

    manageCollisions(newX, newY){
        // vérifier la collision avec les objets
        this.map.currentSettings.dirts.map((dirt, key) => {
            if(newX == dirt.x * this.map.map_coeff && newY == dirt.y * this.map.map_coeff){
                this.map.currentSettings.dirts.splice(key, 1);
                document.getElementById(dirt.id).style.display = "none";
                return true;
            }
        });
        // avec les diamands
        this.map.currentSettings.gems.map((gem, key) => {
            if(newX == gem.x * this.map.map_coeff && newY == gem.y * this.map.map_coeff){
                this.map.currentSettings.gems.splice(key, 1);
                document.getElementById(gem.id).style.display = "none";
                // mise a juor de score
                this.context.gems++;
                Commons.playSound('gem');
                return true;
            }
        });
    }

    // vérifier la collision sur les mûrs par rapport aux nouvelles coordonnées du joueur
    checkWallsCollisions(newX, newY){
        let collised = null;
        let objs = ['walls', 'rocks'];
        objs.map((o) => {
            this.map.currentSettings[o].map((ob) => {
                if(newX == ob.x * this.map.map_coeff && newY == ob.y * this.map.map_coeff){
                    collised = {'res': true, 'type' : o, 'obj': ob}; return true;
                }
            });
        });
         return collised;
    }


    // vérifier si une case est vide
    existsObject = (x, y) => {
        x = (x - Commons.getMapCoeff()) / Commons.getMapCoeff();
        y = y / Commons.getMapCoeff();
        if(x <= 0 || y <= 0 || x >= this.field.width || y >= this.field.height) return undefined;
        let gems_and_rocks = this.map.currentSettings.gems.concat(this.map.currentSettings.rocks)
        let walls_and_dirts = this.map.currentSettings.walls.concat(this.map.currentSettings.dirts)
        let all_objects = gems_and_rocks.concat(walls_and_dirts);
        let exists = undefined;
        all_objects.map((o) => {
            if(o.x == x && o.y == y){
                exists = true; return false;
            }
        });
        return exists;
    }
}