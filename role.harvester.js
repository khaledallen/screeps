var roleHarvester = {

   /** @param {Creep} creep **/
   run: function(creep) {
       if(!creep.memory.harvesting && creep.carry.energy == 0)
       {
           creep.memory.harvesting = true;
           creep.say("Harvesting");
       }
       if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity)
       {
           creep.memory.harvesting = false;
           creep.say("Storing");
       }

       if(creep.memory.harvesting)
       {
           var sources = creep.room.find(FIND_SOURCES);
           if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
               creep.moveTo(sources[0]);
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
