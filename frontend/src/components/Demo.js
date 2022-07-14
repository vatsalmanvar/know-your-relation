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
    console.log(globalCurrNode.data.FN);
  }, []);
  const onChange2 = useCallback((evt) => {
    globalCurrNode.data.SN=evt.target.value;
    console.log(globalCurrNode.data.SN);
  }, []);
  const handleChange = event => {
    if (event.target.checked) {
      globalCurrNode.data.male_female = false;
      console.log('false');
    } else {
      globalCurrNode.data.male_female = true;
      console.log('true');
    }
  };
  const addChild = useCallback((evt)=>{
    globalCurrNode.data.child = globalCurrNode.data.child+1;
    globalNodes.push({
      id: globalCurrNode.id + "-" + (globalCurrNode.data.child).toString(),
      type:'textUpdater',
      position:{x:globalCurrNode.position.x, y:globalCurrNode.position.y+100},
      data:{ value:Math.random(), child:0, FN:"xxx", SN:"yyy", male_female:true},
    });
    globalEdges.push({
      id: globalCurrNode.id + "-" + (globalCurrNode.data.child).toString(),
      source: globalCurrNode.id.toString(),
      target: globalCurrNode.id + "-" + (globalCurrNode.data.child).toString(),
    })
    console.log("Child Added");
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
              <div class="flex-container">
                <div class="flex-child magenta">
                  <label class="text" htmlFor="text" >First Person</label>
                  <input class="textcss"id="firstPersonName" name="text" onChange={onChange1} />
                </div>

                <div class="flex-child green">
                  <label class="text" htmlFor="text">Second Person</label>
                  <input class="textcss" id="secondPersonName" name="text" onChange={onChange2} />
                </div>
              </div>
              
              <div>
              <input type="checkbox" onClick={handleChange}/>Is First Person Female
              <input class="deletebutton" type="button" value="Delete Node"/>
              <br></br>
              <input class="addchildbutton" id="addChildButton" type="button" value="Add Child" onClick={addChild}/>
              </div>

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
    

  const onNodeClick = useCallback((event, node) => {
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    setEdges((edges)=>{
      return [...globalEdges,];
    },[]); 
  })
  
  
  const onNodeDrag = useCallback((event, node) => {
    globalCurrNode.position.x = node.position.x;
    globalCurrNode.position.y = node.position.y;
    console.log('onNodeDrag');
  })

  const onNodeDragStop = useCallback((event, node) => {
    globalCurrNode.position.x = node.position.x;
    globalCurrNode.position.y = node.position.y;
    setNodes((nodes)=>{
      return [...globalNodes,];
    },[]);
    
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

  const printgnodes = useCallback((evt) => {
    globalNodes.map((item)=>{
      console.log(item.id, item.data.FN, item.data.SN, item.data.male_female);
    });
    console.log(globalEdges);
  }, []);

  return (
    <>
    <button onClick={printgnodes}>Print All nodes details</button>
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
export default Flow;     