
async function createScheduleArray(passedArray){

                                 
            const timeArray = ['09:00 a.m.', '10:00 a.m.', '11:00 a.m.', '12:00 p.m.', '01:00 p.m.', '02:00 p.m.', '03:00 p.m.', '04:00 p.m.', '05:00 p.m.', '06:00 p.m.']
            const timeArray24 =['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00']
            let protoArray = [];
            let changeArray = [];

            
           
            for(let x = 0; x < 10; x ++){
                let objectProto = new Object;
                objectProto.time = timeArray[x];
                objectProto.miltime = timeArray24[x];
                objectProto.barber1 = 'Schedule';
                objectProto.barber2 = 'Schedule';
                objectProto.barber3 = 'Schedule';
                objectProto.barber4 = 'Schedule';
                protoArray.push(objectProto);               
            }


            //console.log(protoArray);

            async function createChangeArray(orgnlArr){
                let constructedArray = [];

                for(let num in orgnlArr){
                newObj = {
                    array_pos: passedArray[num].appt_time.slice(0,2)-9,
                    barber_num: passedArray[num].barber,
                }
                constructedArray.push(newObj);                
                }
                return constructedArray;
            }
            changeArray = await createChangeArray(passedArray);
            //console.log(changeArray);

            changeArray.forEach((change)=>{
                protoArray[change.array_pos][`barber${change.barber_num}`] = "Unavailable";
            })
            //console.log(protoArray);

            return protoArray;
        }

        
module.exports.createScheduleArray = createScheduleArray;