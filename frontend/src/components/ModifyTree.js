import { useCallback, useState, useContext } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import './text-updater-node.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
  position: { x: -500, y: -500 }, 
  data: { value: 123, child:0 ,FN:"xxx", SN:"yyy", male_female:true}}
];
let globalCurrNode = {
  id:'1', 
  type: 'textUpdater', 
  position: { x: 50, y: 50 }, 
  data: { value: 123, child:0, FN:"abc", SN:"def", male_female:true}, 
};
let globalEdges = [];


function TextUpdaterNode({ data }) {
  
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
                <label className="text" htmlFor="text" >{data.FN}</label>
                
                <label className="text" htmlFor="text">Second Person Name</label>
                <input className="textcss" id="secondPersonName" name="text" onChange={onChange2} />
                <label className="text" htmlFor="text" >{data.SN}</label>
                
                
                <input className="addchildbutton" id="addChildButton" type="button" value="Add Child" onClick={addChild}/>
              
              <div className="flex-container">
                <div className="flex-child magenta">
                  
                </div>

                <div className ="flex-child green">
                  
                </div>
              </div>
              
              <div>
              
              </div>

        <div>
          
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

function ModifyTree() {
  const {state}=useLocation();
  const {familyObj}=state;
  const a = useContext(treeContext);
  const navigate=useNavigate();
  let [nodes, setNodes] = useState(familyObj.globalNodes);
  let [edges, setEdges] = useState(familyObj.globalEdges);  
    globalNodes = familyObj.globalNodes;
    globalEdges = familyObj.globalEdges;
  const onNodeClick = (event, node) => {
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    setEdges((edges)=>{
      return [...globalEdges,];
    },[]); 
  }

  const onNodeDragStop = (event, node) => {
    globalCurrNode.position.x = node.position.x;
    globalCurrNode.position.y = node.position.y;
    //console.log('onNodeDragStop');
    // setNodes((nodes)=>{
    //   return [...globalNodes,];
    // },[]);    
  }

  const onNodeMouseEnter = (event, node)=> {
    globalCurrNode=node;
    //console.log(globalCurrNode.id);
  };
  const onNodeMouseLeave = (event, node)=> {
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
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

  const Commitfunction=async (e)=>{
    e.preventDefault();
    console.log(familyObj);
    let familyName = familyObj.familyName;
    let email = familyObj.email;
    let password = familyObj.password;
    axios.post('/modifyTree',{familyName, email, password, globalNodes, globalEdges})
      .then(res=>{console.log(res);console.log('save family success');
    })
    //navigate('/viewFamilyTree')}).catch(err=>{console.log(err);console.log('registration failed')})
    
    console.log("Trying to Commit");
  }

  return (
    <>
    <button>Print All nodes details</button>
    <button onClick={Commitfunction}>Commit</button>
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
    //onNodeDrag={onNodeDrag}
    onNodeDragStop={onNodeDragStop}
    />
    </>
    );
}
export default ModifyTree;     
export {globalCurrNode};