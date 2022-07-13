import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#34495e',
};


const nodeTypes = { textUpdater: TextUpdaterNode };

let globalNodes = [{
  id:'1', 
  type: 'textUpdater', 
  position: { x: 50, y: 50 }, 
  data: { value: 123, child:0 }, 
}];
let globalCurrNode = {
  id:'1', 
  type: 'textUpdater', 
  position: { x: 50, y: 50 }, 
  data: { value: 123, child:0 }, 
};
let globalEdges = [];


let vatsal="manvar";
let textbox;

function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
    textbox=evt.target.name;
    vatsal=evt.target.value;
    console.log(vatsal,textbox);
  }, []);

  const addChild = useCallback((evt)=>{
    globalCurrNode.data.child = globalCurrNode.data.child+1;
    globalNodes.push({
      id: ((parseInt(globalCurrNode.id)*10) + globalCurrNode.data.child).toString(),
      type:'textUpdater',
      position:{x:globalCurrNode.position.x, y:globalCurrNode.position.y+100},
      data:{ value:Math.random(), child:0},
    });
    globalEdges.push({
      id:((parseInt(globalCurrNode.id)*10) + globalCurrNode.data.child).toString(),
      source: globalCurrNode.id.toString(),
      target: ((parseInt(globalCurrNode.id)*10) + globalCurrNode.data.child).toString(),
    })
    console.log("Child Added");
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
        
        <div>
          <input id="addChildButton" type="button" value="addChild" onClick={addChild}/>
          <input type="button" value="Delete"/>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

function Flow() {
  let [nodes, setNodes] = useState(globalNodes);
  let [edges, setEdges] = useState([]);  
    

  const onNodeClick = useCallback((event, node) => {
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    setEdges((edges)=>{
      return [...globalEdges,];
    },[]); 
    console.log("onNodeClicked");
    console.log(nodes);
    console.log(edges);
  })
  

  const onNodeDragStop = useCallback((event, node) => {
    globalNodes.map((item)=>{
      if(node.id === item.id) {
        item.position.x = node.position.x;
        item.position.y = node.position.y;
      }
    });
    console.log('onNodeDragStop');
    
  })


  const onNodeMouseEnter = useCallback((event, node)=> {
    globalCurrNode=node;
    console.log('onNodeMouseEnter');
  });
  const onNodeMouseLeave = useCallback((event, node)=> {
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    console.log('onNodeDragLeave');
  });


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
    //onNodeMouseMove={onNodeMouseMove}
    onNodeMouseLeave={onNodeMouseLeave}
    //onNodeDragStart={onNodeDragStart}
    //onNodeDrag={onNodeDrag}
    onNodeDragStop={onNodeDragStop}
    />
    </>
    );
}
export default Flow;     