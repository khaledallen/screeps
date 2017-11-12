var roleHarvester = {

   /** @param {Creep} creep **/
   run: function(creep) {
       if(!creep.memory.harvesting && creep.carry.energy == 0)
       {
           var sources = creep.room.find(FIND_SOURCES, {
               filter: (source) => {
                   var creepLoad = source.pos.findInRange(FIND_MY_CREEPS, 1);
                   return creepLoad.length < 4;
               }
           });
           if(creep.pos.findClosestByRange(sources) !== null)
           {
               creep.memory.harvesting = true;
               creep.memory.harvestTarget = creep.pos.findClosestByRange(sources).id;
           }

           creep.say("Harvesting");
       }
       if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity)
       {
           creep.memory.harvesting = false;
           creep.say("Storing");
       }
       if(creep.memory.harvesting && !creep.memory.harvestTarget)
       {
           creep.memory.harvesting = false;
           creep.say("Resetting");
       }

       if(creep.memory.harvesting)
       {
           if(creep.memory.harvestTarget){
               var target = Game.getObjectById(creep.memory.harvestTarget);
               if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(target);
               }
           }
       }
       if (!creep.memory.harvesting)
       {
           var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
               filter: (structure) => {
                   return (
                       structure.structureType == STRUCTURE_SPAWN ||
                       structure.structureType == STRUCTURE_EXTENSION ||
                       structure.structureType == STRUCTURE_TOWER ||
                       structure.structureType == STRUCTURE_CONTAINER
                       ) &&
                       structure.energy < structure.energyCapacity;
                   }
               });
           var repairs = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => structure.hits < structure.hitsMax });
               repairs.sort( (a,b) => a.hits - b.hits) ;

           if(targets)
           {
               if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
               {
                   creep.moveTo(targets);
               }
           }
           else if(repairs.length > 0)
           {
               if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE)
               {
                   creep.moveTo(repairs[0])
               }
           }
       }
   }
}

module.exports = roleHarvester;
