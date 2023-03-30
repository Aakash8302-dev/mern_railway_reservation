const asyncHandler = require('express-async-handler')
const Train = require('../models/trainModel.js')


const createTrain = asyncHandler(async(req,res)=> {
    try {
        const {train, trainId, routes} = req.body

        await Train.create({
            train,
            trainId,
            routes
        })

        res.json({
            status: 'ok',
            message: "New train route created"
        })
      

    } catch (error) {
        res.json({
            status: "error",
            error: error.message    
        })
    }
})

const getAllTrain = asyncHandler(async (req,res)=>{
    try {

        let trainRoutes = await Train.find({})

        if(trainRoutes.length>0){
            res.json({
                status: 'ok',
                data: trainRoutes
            })
        }else{
            throw new Error("No train Routes")
        }
       
    } catch (error) {
        res.json({
            status: "error",
            error: error.message    
        })
    }
})

const findStops = asyncHandler(async (req,res)=>{
    try {

        let trainRoutes = await Train.find({})

        let stops = new Set();

        if(trainRoutes.length>0){
            trainRoutes.forEach(train => {
                train.routes.forEach(r => {
                    stops.add(r.stop)
                })
            })

            let stopsArr = Array.from(stops)

            res.json({
                status: 'ok',
                data: stopsArr
            })

        }else{
            throw new Error("No train Routes")
        }
       
    } catch (error) {
        res.json({
            status: "error",
            error: error.message    
        })
    }
})

const trainSearch = asyncHandler(async (req,res)=>{
    try {
        const {from, to} = req.params

        let trainroutes = await Train.find({});

        if(trainroutes.length >0){
            
            let availableTrains = []

            trainroutes.forEach(tr => {
                let routeArr = [];
                tr.routes.forEach(route => {
                    routeArr.push(route.stop.toLowerCase());
                })

                let fromIndex = routeArr.indexOf(from)
                let toIndex = routeArr.indexOf(to)
                if((routeArr.includes(from) && routeArr.includes(to)) && ( toIndex - fromIndex>0 )){
                    
                    let distance = 0;
                    let time = null;
    
                    for(let i=fromIndex+1; i<=toIndex ; i++){
                        distance += tr.routes[i].prevDist
                    }

                    time = tr.routes[toIndex].depature - tr.routes[fromIndex].depature

                    tr = tr.toJSON();
                    tr.time = convertMsToTime(time)
                    tr.distance = distance
                    tr.price = distance * 1.25
                    tr.depature = tr.routes[fromIndex].depature
                    tr.arrival = tr.routes[toIndex].depature
                    tr.from = from,
                    tr.to = to
                    availableTrains.push(tr)    
                }
            })

            if(availableTrains.length > 0){
                res.json({
                    status: 'ok',
                    data: availableTrains,
                })
            }else{
                throw new Error("No available routes")
            }
               

           
        }else{
            throw new Error("No train routes found")
        }

    } catch (error) {
        res.json({
            status: "error",
            error: error.message    
        })
    }
})


function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;
  
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

module.exports ={
    createTrain,
    getAllTrain,
    findStops,
    trainSearch
}