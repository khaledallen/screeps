var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else
        {
            var source = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ) &&
                        structure.energy > 0;
                }
            });
            if(source){
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};

module.exports = roleUpgrader;
