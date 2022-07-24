import { useCallback, useState, useContext } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import './text-updater-node.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import home from './Home'
import treeContext from '../context/treeContext';
import { globalFamilyName } from './Home';

const rfStyle = {
  backgroundColor: '#34495e',
};

const nodeTypes = { textUpdater: TextUpdaterNode };

let familyName;
let globalNodes = [{
  id:'1', 
  type: 'textUpdater', 
  position: { x: 0, y: 0 }, 
  data: { value: 123, child:0 ,FN:"xxx", SN:"yyy", male_female:true}}
];
let globalCurrNode = {
  id:'1', 
  type: 'textUpdater', 
  position: { x: 0, y: 0 }, 
  data: { value: 123, child:0, FN:"abc", SN:"def", male_female:true}, 
};
let globalEdges = [];


function TextUpdaterNode(props) {
  
  // const x = props.nodes;
  // console.log(x);
  const onChange1 = useCallback((evt) => {
    globalCurrNode.data.FN=evt.target.value;
    //console.log(globalCurrNode.data.FN);
  }, []);
  const onChange2 = useCallback((evt) => {
    globalCurrNode.data.SN=evt.target.value;
    //console.log(globalCurrNode.data.SN);
  }, []);
  const handleChange = event => {
    if (event.target.checked) {
      globalCurrNode.data.male_female = false;
      //console.log('false');
    } else {
      globalCurrNode.data.male_female = true;
      //console.log('true');
    }
  };
  const addChild = useCallback((evt)=>{
    
    console.log("family name is:",globalFamilyName);
    globalCurrNode.data.child = globalCurrNode.data.child+1;
    globalNodes.push({
      id: globalCurrNode.id + "-" + (globalCurrNode.data.child).toString(),
      type:'textUpdater',
      position:{x:globalCurrNode.position.x, y:globalCurrNode.position.y+250},
      data:{ value:Math.random(), child:0, FN:"xxx", SN:"yyy", male_female:true},
    });
    globalEdges.push({
      id: globalCurrNode.id + "-" + (globalCurrNode.data.child).toString(),
      source: globalCurrNode.id.toString(),
      target: globalCurrNode.id + "-" + (globalCurrNode.data.child).toString(),
    })
    console.log(globalNodes)
    //console.log("Child Added");
  }, []);

  const deleteNode = useCallback((evt)=>{
    let x = [];
    globalNodes.map((item)=>{
      if(item.id.startsWith(globalCurrNode.id) === false){
        x.push(item);
      }

    });
    globalNodes=x;
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>     
                <input type="checkbox" value="xxx" onClick={handleChange}/>Is First Person Female?
                <input className="deletebutton" type="button" value="Delete Node" onClick={deleteNode}/>
                <br></br>
                <br></br>
                <label className="text" htmlFor="text" >First Person Name</label>
                <input className="textcss"id="firstPersonName" name="text" onChange={onChange1} />
                <label className="text" htmlFor="text">Second Person Name</label>
                <input className="textcss" id="secondPersonName" name="text" onChange={onChange2} />
                
                
                <input className="addchildbutton" id="addChildButton" type="button" value="Add Child" onClick={addChild}/>

                <input className="addchildbutton" id="hitme" type="button" value="Hit Me" />
              
        <div>
          
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

function Flow() {
  
  let [nodes, setNodes] = useState(globalNodes);
  let [edges, setEdges] = useState([]);  

  // const hitme = (node) =>{
  //   console.log("Hit me");
  // }
  
  const onNodeClick = (event, node) => {
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    setEdges((edges)=>{
      return [...globalEdges,];
    },[]);
    console.log("onNodeClick");
  }

  const onNodeDrag = async (event, node) => {
    globalCurrNode.position.x =await node.position.x;
    globalCurrNode.position.y =await node.position.y;    
    console.log("onNodeDrag");
  }

  const onNodeDragStop = (event, node) => {
    globalCurrNode.position.x = node.position.x;
    globalCurrNode.position.y = node.position.y; 

    console.log("onNodeDragStop", globalCurrNode.id, node.id); 
  }

  const onNodeMouseEnter = (event, node)=> {
    globalCurrNode=node;
    console.log("onNodeMouseEnter");
  };

  const onNodeMouseLeave = (event, node)=> {
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    console.log("onNodeMouseLeave");
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, globalNodes)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <>
    <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    nodeTypes={nodeTypes}
    fitView
    style={rfStyle}

    onNodeClick={onNodeClick}
    onNodeMouseEnter={onNodeMouseEnter}
    onNodeMouseLeave={onNodeMouseLeave}
    onNodeDrag={onNodeDrag}
    //onNodeDragStop={onNodeDragStop}
    />
    </>
    );
}
export default Flow;     
export {globalCurrNode};