function creategraph(V,E){
    let adj_list=[]

    for(let i=0; i<V;i++)
        adj_list.push([]);

    for(let i=0; i<E.length; i++){
        //adj_list[E[i][0]].push([E[i][1],E[i][2]]);
        //adj_list[E[i][1]].push([E[i][0],E[i][2]]);
        
        adj_list[E[i][0]-1].push([E[i][1]-1, E[i][2]]);
        adj_list[E[i][1]-1].push([E[i][0]-1, E[i][2]]);
    }

    return adj_list;
}

const V=5;
const E=[[1,2,3],[1,4,2],[3,5,1],[3,4,3]]

let graph=creategraph(V,E);
console.log(graph)


var options={
    nodes:{
        fixed:false,
        scaling:{
            label:true
        },
        shadow:true
    }
}

// create an array with nodes
 var nodes = new vis.DataSet([
     { id: 1, label: "Node 1" },
     { id: 2, label: "Node 2" },
     { id: 3, label: "Node 3" },
     { id: 4, label: "Node 4" },
     { id: 5, label: "Node 5" }
   ]);
  
//   // create an array with edges
//   var edges = new vis.DataSet([
//     { from: 1, to: 3 },
//     { from: 1, to: 2 },
//     { from: 2, to: 4 },
//     { from: 2, to: 5 },
//     { from: 3, to: 3 }
//   ]);
  
//   // create a network
//   var container = document.getElementById("mynetwork");
//   var data = {
//     nodes: nodes,
//     edges: edges
//   };
//   var options = {};
//   var network = new vis.Network(container, data, options);
  



network.setOptions(options)