var energyManager = require('manager.energy');

const LIM_UP = 6;
const LIM_HARV = 16;
const MIN_HARV = 5;
const LIM_BUILD = 4;

var buildManager = {
    harvesters: 0,
    upgraders: 0,
    builders: 0,

    buildReport: function(){
        this.harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        this.upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        this.builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Harvesters: ' + this.harvesters.length);
        console.log('Upgraders: ' + this.upgraders.length);
        console.log('Builders: ' + this.builders.length);
    },

    buildQueue: function(){

    if(this.harvesters.length < MIN_HARV) {             //prioritize harvesters
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
        console.log('Spawning new harvester: ' + newName);
    }
    else
    {
        if(this.harvesters.length < LIM_HARV) {
            console.log("Less than " + LIM_HARV + " harvesters");
            if(this.harvesters.length > 2 && energyManager.totalEnergy() >= 500) {
                var newName = '+Harvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new SUPER harvester: ' + newName);
            }
        }
        else if (this.upgraders.length < LIM_UP) {
            if(this.upgraders.length > 2){
                console.log("Building a super upgrader");
                var newName = '+Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
            } else {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
            }
        }
        else if (this.builders.length < LIM_BUILD ) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'builder'}});
        }
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    }
}

module.exports = buildManager;
