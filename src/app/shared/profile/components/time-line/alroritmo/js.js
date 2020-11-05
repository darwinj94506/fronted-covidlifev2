const _ = require('lodash');
const { data } = require('./data');
const { data2 } = require('./data2');
const { data3 } = require('./data3');
function reporte(valor){
   let filtrado = _.chain(valor)
   .map(item=>({...item,
           desde_hasta: concatFechas(item.aislamiento_desde,item.aislamiento_hasta),
           aislamiento_desde: (item.aislamiento_desde)?(transformDate(item.aislamiento_desde)): null,
           aislamiento_hasta: (item.aislamiento_hasta)?(transformDate(item.aislamiento_hasta)): null,
           createAt: transformDate(item.createAt),
           createAtCeroHoras:setTimeToZero(transformDate(item.createAt)), 
           createAtString: transformDate(item.createAt).toLocaleDateString() 
           }
       )).value();
   let fechas = getRealDates(getFechasEnCuarentena(Object.keys(_.groupBy(filtrado,i=>i.desde_hasta))));
   // console.log(fechas);
   // console.log(JSON.stringify(fechas, null, 4));

   let final = _.chain(filtrado)
   .map(i=>({...i, enCuarenta: enCuanrentena(fechas,i)}))
   .groupBy(i=>i.createAtString)
   .value();
   var ordered = [];
   (Object.keys(final)).forEach(i=>{
     let obj = { };
     obj[i] = final[i];
     ordered.push(obj);
   }) 
   console.log(JSON.stringify(ordered, null, 4));
 }

 function getFechasEnCuarentena(fechas){
   let arrayFechas = [];
   _.forEach(fechas,i=>{
     if(i!="null"){
         arrayFechas.push({ desde: new Date(i.split('/')[0]), hasta: new Date(i.split('/')[1]) })
      }
   })
   // console.log(JSON.stringify(arrayFechas, null, 4));
   return arrayFechas
 }

 function enCuanrentena(fechas, seguimiento){
   let cuarentena = false;
     for(let i=0;i<fechas.length; i++){
         if(seguimiento.createAtCeroHoras >= fechas[i].desde && seguimiento.createAtCeroHoras <= fechas[i].hasta){
             cuarentena = true;
             break;
         } 
     }
   return cuarentena;
 }

 function concatFechas(fecha1, fecha2){
   if(fecha1!=null && fecha1 != undefined){
       let f1 = setTimeToZero(transformDate(fecha1));
       let f2 = setTimeToZero(transformDate(fecha2));
       return `${f1}/${f2}`
   }
   return null;
 }

 function getRealDates(arrayDesdeHasta){
   for(let i=0; i < arrayDesdeHasta.length; i++){
      for(let j=i+1; j< arrayDesdeHasta.length; j++){
         if(JSON.stringify(arrayDesdeHasta[i].desde) === JSON.stringify(arrayDesdeHasta[j].desde)){
            if(arrayDesdeHasta[i].hasta < arrayDesdeHasta[j].hasta){
               arrayDesdeHasta.splice(j,1);
            }else{
               arrayDesdeHasta.splice(i,1);
            }
         }
      }
   }
   return arrayDesdeHasta;
 }

 function setTimeToZero(date){
   date.setHours(0);
   date.setMinutes(0);
   date.setSeconds(0);
   return date
 }
 
 function transformDate(t){
   let today = new Date(t);
   return new Date(
       today.getFullYear(), today.getUTCMonth(), today.getUTCDate(),
       today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds())
 }

//  reporte(data);
 reporte(data3);