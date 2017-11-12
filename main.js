var roleHarvester = require('role.harvesterAdv');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var energyManager = require('manager.energy');
var buildManager = require('manager.build');

module.exports.loop = function () {

    console.log("Total room energy: " + energyManager.totalEnergy());

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    buildManager.buildQueue();
    buildManager.buildReport();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
