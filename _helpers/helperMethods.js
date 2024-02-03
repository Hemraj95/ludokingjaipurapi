
function fn_filter(query) {
    query = JSON.parse(query);
    // let filter;
    // if(query.filterValue!=undefined||query.filterkey!=undefined){
    //     var filterkey=JSON.stringify(query.filterkey);
    //     var filterValue=JSON.stringify(query.filterValue);
    //       let obj={
    //       filterkey,
    //       filterValue
    //       }
    //       delete query.filterValue; delete query.filterkey;
    //        filter=JSON.parse(`{${obj.filterkey}:${obj.filterValue}}`)
    // }
    // filter=Object.assign(filter,query);


    let filter = {};
    for (let i = 0; i < query.length; i++) {
        if (query[i].filterValue != undefined || query[i].filterkey != undefined) {
            var filterkey = query[i].filterkey;
            var filterValue = query[i].filterValue;
            let obj = {
                filterkey,
                filterValue
            }
            delete query[i].filterValue; delete query[i].filterkey;
            // console.log("for Loop",filter);
            filter[obj.filterkey] = obj.filterValue;
        }
    }
    let where = [];
    for (let [col, data] of Object.entries(filter)) {
        //console.log("col",`${col}: ${data}`);
        for (let [operator, value] of Object.entries(data)) {
            //console.log("Oprator",`${operator}: ${value}`);
            switch (operator) {
                case 'eq': {
                    //where.push({ [col]: new RegExp('/^' + value + '/i') }) //exact match case insensitive, i represents insensitive             
                    //where.push({ [col]: { $regex: '/' + value + '/' } })
                    where.push({ [col]: new RegExp('^' + value + '') })
                    break;
                }
                case 'ne': {
                    where.push({ [col]: { $regex: value } })
                    break;
                }
                case 'contains': {
                    where.push({ [col]: new RegExp(value, "i") })// "like"              
                    break;
                }
                case 'beginsWith': {
                    where.push({ [col]: new RegExp('/^O /' + value + '') })
                    //where.push({ col: { $regex: /^O /, $options: 'm' } })
                    break;
                }
                case 'ge': {
                    where.push({ [col]: { $gte: value } })
                    break;
                }
                case 'gt': {
                    where.push({ [col]: { $gt: value } })
                    break;
                }
                case 'lt': {
                    where.push({ [col]: { $lt: value } })
                    break;
                }
                case 'lte': {
                    where.push({ [col]: { $lte: value } })
                    break;
                }
                case 'between': {
                    where.push({ [col]: { $gte: value[0], $lte: value[1] } })
                    break;
                }
                default:
                    break;
            }
        }
    }

    return where;
}

module.exports = {
    fn_filter
}