import { useCallback, useState, useRef, useMemo } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';
import './text-updater-node.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { familyTreeAPI } from '../services/api';
import { handleAPIError } from '../utils/errorHandler';

const rfStyle = {
  backgroundColor: '#34495e',
};

const nodeTypes = { textUpdater: TextUpdaterNode };

const initialNode = {
  id: '1',
  type: 'textUpdater',
  position: { x: -500, y: -500 },
  data: { value: 123, child: 0, FN: 'xxx', SN: 'yyy', male_female: true },
};


function TextUpdaterNode({ data, id, position, onUpdateNode, onAddChild, onDeleteNode }) {
  const onChange1 = (evt) => {
    onUpdateNode(id, { FN: evt.target.value });
  };

  const onChange2 = (evt) => {
    onUpdateNode(id, { SN: evt.target.value });
  };

  const handleChange = (event) => {
    onUpdateNode(id, {
      male_female: !event.target.checked,
    });
  };

  const addChild = () => {
    if (onAddChild) {
      onAddChild(id);
    }
  };

  const deleteNode = () => {
    if (onDeleteNode) {
      onDeleteNode(id);
    }
  };

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <input
          type="checkbox"
          checked={!data.male_female}
          onChange={handleChange}
        />
        Is First Person Female?
        <input
          className="deletebutton"
          type="button"
          value="Delete Node"
          onClick={deleteNode}
        />
        <br />
        <br />
        <label className="text" htmlFor="text">
          First Person Name
        </label>
        <input
          className="textcss"
          id="firstPersonName"
          name="text"
          value={data.FN || ''}
          onChange={onChange1}
        />
        <label className="text" htmlFor="text">
          Second Person Name
        </label>
        <input
          className="textcss"
          id="secondPersonName"
          name="text"
          value={data.SN || ''}
          onChange={onChange2}
        />
        <input
          className="addchildbutton"
          id="addChildButton"
          type="button"
          value="Add Child"
          onClick={addChild}
        />
        <div className="flex-container">
          <div className="flex-child magenta"></div>
          <div className="flex-child green"></div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

function Flow() {
  const { state } = useLocation();
  const email = state?.email || '';
  const password = state?.password || '';
  const newFamilyName = state?.newFamilyName || {};
  const familyName = newFamilyName?.familyName || '';
  const navigate = useNavigate();
  const currentNodeRef = useRef(null);

  const [nodes, setNodes] = useState([initialNode]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateNode = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  }, []);

  const addChildNode = useCallback((parentId) => {
    setNodes((nds) => {
      const parentNode = nds.find((n) => n.id === parentId);
      if (!parentNode) return nds;

      const childCount = (parentNode.data.child || 0) + 1;
      const newChildId = `${parentId}-${childCount}`;

      const newNode = {
        id: newChildId,
        type: 'textUpdater',
        position: {
          x: parentNode.position.x,
          y: parentNode.position.y + 250,
        },
        data: {
          value: Math.random(),
          child: 0,
          FN: 'xxx',
          SN: 'yyy',
          male_female: true,
        },
      };

      const newEdge = {
        id: newChildId,
        source: parentId,
        target: newChildId,
      };

      setEdges((eds) => [...eds, newEdge]);

      return nds
        .map((node) =>
          node.id === parentId
            ? { ...node, data: { ...node.data, child: childCount } }
            : node
        )
        .concat(newNode);
    });
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => !node.id.startsWith(nodeId)));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          !edge.source.startsWith(nodeId) && !edge.target.startsWith(nodeId)
      )
    );
  }, []);

  const onNodeClick = useCallback((event, node) => {
    currentNodeRef.current = node;
  }, []);

  const onNodeMouseEnter = useCallback((event, node) => {
    currentNodeRef.current = node;
  }, []);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        let updatedNodes = applyNodeChanges(changes, nds);
        
        // Find nodes that were dragged (position changed) and move their children
        changes.forEach((change) => {
          if (change.type === 'position' && change.position) {
            const draggedNode = updatedNodes.find((n) => n.id === change.id);
            if (draggedNode) {
              const oldNode = nds.find((n) => n.id === change.id);
              if (oldNode) {
                const deltaX = change.position.x - oldNode.position.x;
                const deltaY = change.position.y - oldNode.position.y;
                
                // Update all child nodes (nodes whose id starts with the dragged node's id)
                updatedNodes = updatedNodes.map((node) => {
                  if (node.id !== draggedNode.id && node.id.startsWith(draggedNode.id + '-')) {
                    return {
                      ...node,
                      position: {
                        x: node.position.x + deltaX,
                        y: node.position.y + deltaY,
                      },
                    };
                  }
                  return node;
                });
              }
            }
          }
        });
        
        return updatedNodes;
      });
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const handleCommit = async (e) => {
    e.preventDefault();
    setError('');

    if (!familyName) {
      setError('Family name is required');
      return;
    }

    setLoading(true);

    try {
      await familyTreeAPI.saveFamilyTree(
        familyName,
        email,
        password,
        nodes,
        edges
      );
      navigate('/viewFamilyTree');
    } catch (err) {
      handleAPIError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const nodeTypesWithProps = useMemo(() => ({
    textUpdater: (props) => (
      <TextUpdaterNode
        {...props}
        onUpdateNode={updateNode}
        onAddChild={addChildNode}
        onDeleteNode={deleteNode}
      />
    ),
  }), [updateNode, addChildNode, deleteNode]);

  return (
    <>
      {error && (
        <div className="alert alert-danger m-3" role="alert">
          {error}
        </div>
      )}
      <div className="m-3">
        <button
          className="btn btn-primary me-2"
          onClick={handleCommit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Commit'}
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypesWithProps}
        fitView
        style={rfStyle}
        onNodeClick={onNodeClick}
        onNodeMouseEnter={onNodeMouseEnter}
        nodesDraggable={true}
      />
    </>
  );
}

export default Flow;