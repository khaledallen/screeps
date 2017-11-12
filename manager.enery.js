/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manager.energy');
 * mod.thing == 'a thing'; // true
 */

 var energyManager = {

    totalEnergy: function() {
        let count = 0;

        count += Game.spawns['Spawn1'].energy;

        var exts = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_EXTENSION);
        for(let i=0; i<exts.length; i++){
            count += exts[i].energy;
        }
        if( count > exts.length * 50 )
        {
            //Game.notify("Near maximum energy");
        }
        return count;
    }

 }

module.exports = energyManager;
