var express = require('express')
var app = express()




// var clusterfck = require('clusterfck')
// function compare(a,b) {
//   if (a.country < b.country)
//     return -1;
//   if (a.country > b.country)
//     return 1;
//   return 0;
// }
var clusterMaker = require('clusters');

//number of clusters, defaults to undefined
clusterMaker.k(16);

//number of iterations (higher number gives more time to converge), defaults to 1000
clusterMaker.iterations(750);

//data from which to identify clusters, defaults to []
// clusterMaker.data([[1, 0], [0, 1], [0, 0], [-10, 10], [-9, 11], [10, 10], [11, 12]]);

function stringToNum(input) {
    var output = 0
   
    output= "";
    for (i=0; i < input.length; i++) {var e=input[i].charCodeAt(0);var s = "";
    do{
        var a =e%2;
        e=(e-a)/2;
        s=a+s;
        }while(e!=0);
        while(s.length<8){s="0"+s;}
        output +=s;
    }
return parseInt(output, 2)
}

var data = require("./data.json")
var objs = data
data = data.map((a,i)=>{
    return [stringToNum(a.country.substr(0,4)), stringToNum(a.name.substr(0,4)), i]
})

clusterMaker.data(data);


var clusters = JSON.stringify(clusterMaker.clusters().map(
    (a)=>{
        return a.points.map(
            (b)=>{
                b[2] = objs[b[2]]
                return b
            }
        )
    }
))

app.get('/', function (req, res) {
  res.send(clusters)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

