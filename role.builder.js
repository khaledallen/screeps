var roleBuilder = {

   /** @param {Creep} creep **/
   run: function(creep) {
       if(!creep.memory.harvesting && creep.carry.energy == 0)
       {
           creep.memory.harvesting = true;
           creep.say("Collecting");
       }
       if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity)
       {
           creep.memory.harvesting = false;
           creep.say("Building");
       }
       if(creep.memory.harvesting)
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
       if (!creep.memory.harvesting)
       {
           var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
           var repairs = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => structure.hits < structure.hitsMax });
               repairs.sort( (a,b) => a.hits - b.hits) ;

           if (sites.length > 0) {
               if(creep.build(sites[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
               {
                   creep.moveTo(sites[0]);
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

module.exports = roleBuilder;
