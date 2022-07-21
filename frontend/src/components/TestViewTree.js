import { useCallback, useState, useContext } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import './text-updater-node.css';
import treeContext from '../context/treeContext';
import { useLocation } from 'react-router-dom';
const rfStyle = {
  backgroundColor: '#CEE5D0',
};

const nodeTypes = { textUpdater: TextUpdaterNode };

let globalNodes = []
let globalCurrNode = {
  id:'1', 
  type: 'textUpdater', 
  position: { x: 50, y: 50 }, 
  data: { value: 123, child:0, FN:"abc", SN:"def", male_female:true}, 
};
let globalEdges = []
function TextUpdaterNode({ data }) {

  return (
    <div className="text-updater-node">
        <Handle type="target" position={Position.Top} id="b" />
        <div>
            <label className="text" htmlFor="text" ><h3>{data.FN}</h3></label>
            <label className="text" htmlFor="text"><h5>{data.relationFromPerson1}</h5></label>
            <hr></hr>
            <label className="text" htmlFor="text"><h3>{data.SN}</h3></label>
            <label className="text" htmlFor="text"><h5>{data.relationFromPerson2}</h5></label>
        <div>
          
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

function TestViewTree() {
  
  const a = useContext(treeContext);
  
  const {state}=useLocation();
  const {globalFamilyName}=state;
  console.log("globalFamilyName: in view tree",globalFamilyName);
  
  let [nodes, setNodes] = useState(a.familyNodes);
  let [edges, setEdges] = useState(a.familyEdges); 
  globalNodes = nodes;
  globalEdges = edges; 
  console.log(nodes);
  
  
  const onNodeClick = (event, node) => {
    
    // function to find the relationship
    // main logic begins ---------------------
    let depthOfNode = globalCurrNode.id.split('-').length;

    globalNodes.map((item)=>{
        let depthOfItem = item.id.split('-').length;
        console.log(depthOfNode);
        if(globalCurrNode.id === item.id){
            item.data.relationFromPerson1 = 'You';
            if(item.data.male_female) item.data.relationFromPerson2 = 'Wife';
            else item.data.relationFromPerson2 = 'Husband';
        }
        else {
            if(depthOfItem===depthOfNode){ // same generation
                if(item.data.male_female){item.data.relationFromPerson1 = "Brother"; item.data.relationFromPerson2 ="Sister in law";}
                else{item.data.relationFromPerson1 = "Sister"; item.data.relationFromPerson2 ="Brother in law";}
            }   
            else if(depthOfItem+1===depthOfNode){ // mom dad uncle aunt
                if(globalCurrNode.id.startsWith(item.id) === true){
                    if(item.data.male_female){item.data.relationFromPerson1 = "Dad"; item.data.relationFromPerson2 ="Mom";}
                    else{item.data.relationFromPerson1 = "Mom"; item.data.relationFromPerson2 ="Dad";}
                }else{
                    if(item.data.male_female){item.data.relationFromPerson1 = "Uncle"; item.data.relationFromPerson2 ="Aunt";}
                    else{item.data.relationFromPerson1 = "Aunt"; item.data.relationFromPerson2 ="Uncle";}
                }
            }
            else if(depthOfItem===depthOfNode+1){ // son daughter soninlaw daughterinlaw nephew niece
                if(item.id.startsWith(globalCurrNode.id) === true){
                    if(item.data.male_female){item.data.relationFromPerson1 = "Son"; item.data.relationFromPerson2 ="Daughter in law";}
                    else{item.data.relationFromPerson1 = "Daughter"; item.data.relationFromPerson2 ="Son in law";}
                }else{
                    if(item.data.male_female){item.data.relationFromPerson1 = "Nephew"; item.data.relationFromPerson2 ="Niece in law";}
                    else{item.data.relationFromPerson1 = "Niece"; item.data.relationFromPerson2 ="Nephew in law";}
                }
            }
            else if(depthOfItem<depthOfNode){
                if(item.data.male_female){item.data.relationFromPerson1 = "GrandFather"; item.data.relationFromPerson2 ="GrandMother";}
                else{item.data.relationFromPerson1 = "GrandMother"; item.data.relationFromPerson2 ="GrandFather";}
            }
            else{
                if(item.data.male_female){item.data.relationFromPerson1 = "DrandSon"; item.data.relationFromPerson2 ="GrandDaughter in law";}
                else{item.data.relationFromPerson1 = "GrandDaughter"; item.data.relationFromPerson2 ="GrandSon in law";}
                //item.data.relationFromPerson1 = item.data.relationFromPerson2 ="Junior";
            }
        }
        if(item.data.SN==='') item.data.relationFromPerson2="";
    });


    //main logic  ----------------------------

    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    setEdges((edges)=>{
      return [...globalEdges,];
    },[]); 
    console.log(edges);
  }

  const onNodeMouseEnter = (event, node)=> {
    globalCurrNode=node;
  };

  return (
    <>
    <ReactFlow
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
    fitView
    style={rfStyle}
    onNodeClick={onNodeClick}
    onNodeMouseEnter={onNodeMouseEnter}
    />
    </>
    );
} 
export default TestViewTree;
