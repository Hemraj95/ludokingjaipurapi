
const db = require("../_helpers/db");
const dbState = db.state;
const dbCity = db.city;


async function bulkStateSave(req, res, next) {
    let arrStates = req.body;

    var res = arrStates.map((k,v) => {

        dbState({code:k.key, name: k.name}).save();
    });

    return { data: "success", responseCode: 1, responseMessage: "updated" };
  }

  async function bulkCitySave(req, res, next) {
    let arrStates = req.body;

    var res = arrStates.map(async(k,v) => {
      
        var stateId =await dbState.find({name : k.state})
       if(stateId){
        var cit = k.districts.map((r,s) => {
          dbCity({stateId:stateId[0]._id, name: r}).save();
        })
       
       }
        
      
      
    });

    return { data: "success", responseCode: 1, responseMessage: "updated" };
  }

  module.exports = {    
    bulkStateSave,
    bulkCitySave
  };
  