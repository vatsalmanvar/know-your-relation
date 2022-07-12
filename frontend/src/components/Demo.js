import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};



const nodeTypes = { textUpdater: TextUpdaterNode };
let globalNodes = []
let globalCurrNode = {
  id:'1', 
  type: 'textUpdater', 
  position: { x: 50, y: 50 }, 
  data: { value: 123, child:0 }, 
};


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
      position:{x:globalCurrNode.position.x,y:globalCurrNode.position.y+100},
      data:{ value:Math.random(), child:0},
  });
    console.log('Clicked', globalNodes);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
        
        <div>
          <input type="button" value="addChild" onClick={addChild}/>
          <input type="button" value="Delete"/>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

function Flow() {
    let [nodes, setNodes] = useState([
      {
        id:'1', 
        type: 'textUpdater', 
        position: { x: 50, y: 50 }, 
        data: { value: 123, child:0 }, 
      }
    ]);
    let [edges, setEdges] = useState([]);  
    const [curNode, setCurNode] = useState(
      {
        id:'1', 
        type: 'textUpdater', 
        position: { x: 50, y: 50 }, 
        data: { value: 123, child:0 }, 
      }
    );
    //var currentnode = new TextUpdaterNode();
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

    function test(){
      console.log('test called');
    }
    
    // var test = function() {
    //   console.log('test called');
    // };

  //   const onNodeClick = useCallback((event, node) => {
  //     // setCurNode(node);
  //     // console.log("CurrNode: ", curNode);
      
  //     setNodes((nodes)=>{
  //       console.log('clicked node id: ', curNode.id);
  //       curNode.data.child = curNode.data.child+1;
  //       return [...nodes,{
  //           id: ((parseInt(curNode.id)*10) + curNode.data.child).toString(),
  //           type:'textUpdater',
  //           position:{x:curNode.position.x,y:curNode.position.y+100},
  //           data:{ value:Math.random(), child:0},
  //       }];
  //   },[]);
  //   console.log('init nodes',nodes);
    
  // //   setEdges((edges)=>{
  // //     //console.log('click edge',edges);
  // //     return [...edges,{
  // //         id:Math.random(),
  // //         source:node.id,
  // //         target:node.id+node.data.child,
  // //     }];
  // // });
  // })
  const OnSubmit=()=>{  
    console.log(nodes);
  }  
  const onNodeMouseEnter = useCallback((event, node)=> {
    globalNodes=nodes;
    globalCurrNode=node;
    setCurNode(node);
    //console.log("CurrNode: ", globalNodes);
  });
  const onNodeMouseLeave = useCallback((event, node)=> {
    nodes = globalNodes;
    console.log(" --- ------ CurrNode: ", nodes);
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
    <button value="test" onClick={FirstNode}>Start</button>
    <button value="test" onClick={OnSubmit}>Submit</button>

    <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    nodeTypes={nodeTypes}
    //onNodeClick={onNodeClick}
    fitView
    style={rfStyle}
    test={test}
    //x={x}
    onNodeMouseEnter={onNodeMouseEnter}
    onNodeMouseLeave={onNodeMouseLeave}
    />
    </>
    );
}
export default Flow;     