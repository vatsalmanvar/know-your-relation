import React,{useContext} from "react";
import treeContext from '../context/treeContext';
import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import './text-updater-node.css';


const rfStyle = {
  backgroundColor: '#34495e',
};
const nodeTypes = { textUpdater: TextUpdaterNode };

function TextUpdaterNode({ data }) {
    const a = useContext(treeContext);
    const addChild = useCallback((evt)=>{
        console.log(a.family);
        a.family="sanariya";
        console.log(a.family);
      }, []);
    return (
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} />
        <div>     
                  <input type="checkbox" value="xxx" />Is First Person Female?
                  <input className="deletebutton" type="button" value="Delete Node" />
                  <br></br>
                  <br></br>
                  <label className="text" htmlFor="text" >First Person Name</label>
                  <input className="textcss"id="firstPersonName" name="text"  />
                  <label className="text" htmlFor="text">Second Person Name</label>
                  <input className="textcss" id="secondPersonName" name="text" />
                  <input className="addchildbutton" id="addChildButton" type="button" value="Add Child" onClick={addChild}/>
          <div>
            
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} id="b" />
      </div>
    );
  }




function TestCreateTree() {
    const a = useContext(treeContext);
    const [nodes, setNodes] = useState(a.nodes);
   
    

    const onNodeClick = (event, node) => {
        
    }

    
    const onNodesChange = useCallback(
      (changes) => (setNodes((nds) => applyNodeChanges(changes, a.nodes))),
      [setNodes]
    );
    
    return (
      <>
      <ReactFlow
      nodes={a.nodes}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
      onNodeClick={onNodeClick}
    //   onNodeMouseEnter={onNodeMouseEnter}
    //   onNodeMouseLeave={onNodeMouseLeave}
    //   onNodeDrag={onNodeDrag}
    //   onNodeDragStop={onNodeDragStop}
      />
      </>
      );
  }
export default TestCreateTree;  