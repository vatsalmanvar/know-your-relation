import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';

import TextUpdaterNode from './TextUpdaterNode.js';

import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

// const initialNodes = [
//   ,
// ];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);  
  const FirstNode=()=>{
    setNodes((nodes)=>{
      return [...nodes,{
        id:'1', 
        type: 'textUpdater', 
        position: { x: 50, y: 50 }, 
        data: { value: 123, child:0 }, 
      }]
    })
    console.log('nodes: ',nodes);
  }
  const onNodeClick = useCallback((event, node) => {
    setNodes((nodes)=>{
        console.log('clicked node id: ', node.id);
        node.data.child = node.data.child+1;
        return [...nodes,{
            id: ((parseInt(node.id)*10) + node.data.child).toString(),
            type:'textUpdater',
            position:{x:node.position.x,y:node.position.y+100},
            data:{ value:Math.random(), child:0},
        }];
    },[]);
    console.log('init nodes',nodes);
    //console.log('child', node.data.child);
    //console.log('->>> id', node.id);
    //console.log('edges', edges);
    setEdges((edges)=>{
      console.log('click edge',edges);
      return [...edges,{
          id:Math.random(),
          source:node.id,
          target:node.id+node.data.child,
      }];
  });
  })
  const OnSubmit=()=>{  
    console.log(nodes);
  }  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
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
    <button value="test" onClick={FirstNode}>Start</button>
    <button value="test" onClick={OnSubmit}>Submit</button>

    <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    nodeTypes={nodeTypes}
    onNodeClick={onNodeClick}
    fitView
    style={rfStyle}
    />
    </>
    );
}

export default Flow;