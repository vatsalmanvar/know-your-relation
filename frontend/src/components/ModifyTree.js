import { useCallback, useState, useRef, useEffect, useMemo } from 'react';
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

// Node dimensions for collision detection
const NODE_WIDTH = 200;
const NODE_HEIGHT = 250;

// Check if two nodes overlap (allows touching but not overlapping)
const nodesOverlap = (node1, node2) => {
  const x1 = node1.position.x;
  const y1 = node1.position.y;
  const x2 = node2.position.x;
  const y2 = node2.position.y;
  
  // Check for actual overlap (not just touching)
  // Two rectangles overlap if they intersect
  return !(
    x1 + NODE_WIDTH <= x2 ||
    x2 + NODE_WIDTH <= x1 ||
    y1 + NODE_HEIGHT <= y2 ||
    y2 + NODE_HEIGHT <= y1
  );
};

// Find the closest non-overlapping position to the intended position (for dragging)
const findClosestNonOverlappingPosition = (intendedPosition, existingNodes, excludeId = null) => {
  // First, try the exact intended position
  let testNode = { position: intendedPosition, id: 'test' };
  const overlapsIntended = existingNodes.some(
    (node) => node.id !== excludeId && nodesOverlap(testNode, node)
  );
  
  if (!overlapsIntended) {
    return intendedPosition;
  }
  
  // Try minimal adjustments - push away from overlapping node by just enough to not overlap
  const overlappingNode = existingNodes.find(
    (node) => node.id !== excludeId && nodesOverlap(testNode, node)
  );
  
  if (overlappingNode) {
    const intendedX = intendedPosition.x;
    const intendedY = intendedPosition.y;
    const overlapX = overlappingNode.position.x;
    const overlapY = overlappingNode.position.y;
    
    // Calculate minimal adjustments needed
    const candidates = [];
    
    // Push right (if overlapping node is to the left)
    if (overlapX + NODE_WIDTH > intendedX) {
      candidates.push({ x: overlapX + NODE_WIDTH, y: intendedY });
    }
    // Push left (if overlapping node is to the right)
    if (overlapX < intendedX + NODE_WIDTH) {
      candidates.push({ x: overlapX - NODE_WIDTH, y: intendedY });
    }
    // Push down (if overlapping node is above)
    if (overlapY + NODE_HEIGHT > intendedY) {
      candidates.push({ x: intendedX, y: overlapY + NODE_HEIGHT });
    }
    // Push up (if overlapping node is below)
    if (overlapY < intendedY + NODE_HEIGHT) {
      candidates.push({ x: intendedX, y: overlapY - NODE_HEIGHT });
    }
    
    // Try diagonal positions (touching corners)
    candidates.push(
      { x: overlapX + NODE_WIDTH, y: overlapY + NODE_HEIGHT },
      { x: overlapX - NODE_WIDTH, y: overlapY + NODE_HEIGHT },
      { x: overlapX + NODE_WIDTH, y: overlapY - NODE_HEIGHT },
      { x: overlapX - NODE_WIDTH, y: overlapY - NODE_HEIGHT }
    );
    
    // Find the closest valid position
    let closestPos = null;
    let minDistance = Infinity;
    
    for (const candidate of candidates) {
      testNode = { position: candidate, id: 'test' };
      const overlaps = existingNodes.some(
        (node) => node.id !== excludeId && nodesOverlap(testNode, node)
      );
      
      if (!overlaps) {
        const distance = Math.sqrt(
          Math.pow(candidate.x - intendedX, 2) + Math.pow(candidate.y - intendedY, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestPos = candidate;
        }
      }
    }
    
    if (closestPos) {
      return closestPos;
    }
  }
  
  // Fallback to the regular function if minimal adjustments don't work
  return findNonOverlappingPosition(intendedPosition, existingNodes, excludeId);
};

// Find a non-overlapping position for a new node (prefers zero distance/touching)
const findNonOverlappingPosition = (proposedPosition, existingNodes, excludeId = null) => {
  // First, try the exact proposed position
  let testNode = { position: proposedPosition, id: 'test' };
  const overlapsProposed = existingNodes.some(
    (node) => node.id !== excludeId && nodesOverlap(testNode, node)
  );
  
  if (!overlapsProposed) {
    return proposedPosition;
  }
  
  // Try positions that are exactly touching (zero distance) in all 4 directions
  const touchingPositions = [
    { x: proposedPosition.x, y: proposedPosition.y + NODE_HEIGHT }, // Below
    { x: proposedPosition.x, y: proposedPosition.y - NODE_HEIGHT }, // Above
    { x: proposedPosition.x + NODE_WIDTH, y: proposedPosition.y }, // Right
    { x: proposedPosition.x - NODE_WIDTH, y: proposedPosition.y }, // Left
    { x: proposedPosition.x + NODE_WIDTH, y: proposedPosition.y + NODE_HEIGHT }, // Bottom-right
    { x: proposedPosition.x - NODE_WIDTH, y: proposedPosition.y + NODE_HEIGHT }, // Bottom-left
    { x: proposedPosition.x + NODE_WIDTH, y: proposedPosition.y - NODE_HEIGHT }, // Top-right
    { x: proposedPosition.x - NODE_WIDTH, y: proposedPosition.y - NODE_HEIGHT }, // Top-left
  ];
  
  for (const pos of touchingPositions) {
    testNode = { position: pos, id: 'test' };
    const overlaps = existingNodes.some(
      (node) => node.id !== excludeId && nodesOverlap(testNode, node)
    );
    if (!overlaps) {
      return pos;
    }
  }
  
  // If no touching position works, try spiral pattern (still with zero distance increments)
  let position = { ...proposedPosition };
  const maxAttempts = 50;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    // Try positions in a grid pattern with zero distance increments
    const gridX = (attempts % 5) - 2; // -2 to 2
    const gridY = Math.floor(attempts / 5) - 2; // -2 to 2
    
    position = {
      x: proposedPosition.x + (gridX * NODE_WIDTH),
      y: proposedPosition.y + (gridY * NODE_HEIGHT),
    };
    
    testNode = { position, id: 'test' };
    const overlaps = existingNodes.some(
      (node) => node.id !== excludeId && nodesOverlap(testNode, node)
    );
    
    if (!overlaps) {
      return position;
    }
    
    attempts++;
  }
  
  // Fallback: place far to the right (still touching)
  return {
    x: proposedPosition.x + (attempts * NODE_WIDTH),
    y: proposedPosition.y,
  };
};


function TextUpdaterNode({ data, id, position, onUpdateNode, onAddChild, onDeleteNode, onAddParent, isTopmost }) {
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

  const addParent = () => {
    if (onAddParent) {
      onAddParent(id);
    }
  };

  const deleteNode = () => {
    if (onDeleteNode) {
      onDeleteNode(id);
    }
  };

  return (
    <div className={`text-updater-node ${!data.male_female ? 'node-female' : 'node-male'}`}>
      <Handle type="target" position={Position.Top} />
      {isTopmost && (
        <button
          className="add-parent-icon-button"
          type="button"
          onClick={addParent}
          title="Add Parent"
          aria-label="Add Parent"
        >
          ↑
        </button>
      )}
      <button
        className="delete-icon-button"
        type="button"
        onClick={deleteNode}
        title="Delete Node"
        aria-label="Delete Node"
      >
        ×
      </button>
      <div className="node-content">
        <div className="checkbox-container">
        <input
          type="checkbox"
          checked={!data.male_female}
          onChange={handleChange}
            id={`checkbox-${id}`}
          />
          <label htmlFor={`checkbox-${id}`} className="checkbox-label">
            Female
        </label>
        </div>
        <div className="input-group">
        <input
            className="textcss person-name"
            id={`firstPersonName-${id}`}
            name="firstPersonName"
            placeholder="First Name"
          value={data.FN || ''}
          onChange={onChange1}
        />
        </div>
        <div className="input-group">
        <input
            className="textcss person-name"
            id={`secondPersonName-${id}`}
            name="secondPersonName"
            placeholder="Second Name"
          value={data.SN || ''}
          onChange={onChange2}
        />
        </div>
      </div>
      <button
        className="add-child-icon-button"
        id={`addChildButton-${id}`}
        type="button"
        onClick={addChild}
        title="Add Child"
        aria-label="Add Child"
      >
        +
      </button>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

function ModifyTree() {
  const { state } = useLocation();
  const familyObj = state?.familyObj || {};
  const navigate = useNavigate();
  const currentNodeRef = useRef(null);

  const [nodes, setNodes] = useState(familyObj.globalNodes || []);
  const [edges, setEdges] = useState(familyObj.globalEdges || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (familyObj.globalNodes && familyObj.globalNodes.length > 0) {
      setNodes(familyObj.globalNodes);
    }
    if (familyObj.globalEdges && familyObj.globalEdges.length > 0) {
      setEdges(familyObj.globalEdges);
    }
  }, [familyObj]);

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

      // Proposed position: directly below parent (touching)
      const proposedPosition = {
        x: parentNode.position.x,
        y: parentNode.position.y + NODE_HEIGHT,
      };

      // Find a non-overlapping position
      const safePosition = findNonOverlappingPosition(proposedPosition, nds);

      const newNode = {
        id: newChildId,
        type: 'textUpdater',
        position: safePosition,
        data: {
          value: Math.random(),
          child: 0,
          FN: '',
          SN: '',
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

  const addParentNode = useCallback((topmostNodeId) => {
    setNodes((nds) => {
      // Find all topmost nodes (nodes without "-" in their ID)
      const topmostNodes = nds.filter((node) => !node.id.includes('-'));
      
      if (topmostNodes.length === 0) return nds;

      // Find the highest existing ID to create a new parent ID
      const existingIds = nds.map((n) => {
        const parts = n.id.split('-');
        return parseInt(parts[0]) || 0;
      });
      const maxId = Math.max(...existingIds, 0);
      const newParentId = `${maxId + 1}`;

      // Calculate position for new parent (above the topmost nodes)
      const topmostY = Math.min(...topmostNodes.map((n) => n.position.y));
      const topmostX = topmostNodes.length === 1 
        ? topmostNodes[0].position.x 
        : topmostNodes.reduce((sum, n) => sum + n.position.x, 0) / topmostNodes.length;

      const proposedPosition = {
        x: topmostX,
        y: topmostY - NODE_HEIGHT,
      };

      // Find a non-overlapping position
      const safePosition = findNonOverlappingPosition(proposedPosition, nds);

      // Create new parent node
      const newParentNode = {
        id: newParentId,
        type: 'textUpdater',
        position: safePosition,
        data: {
          value: Math.random(),
          child: topmostNodes.length,
          FN: '',
          SN: '',
          male_female: true,
        },
      };

      // Create mapping of old IDs to new IDs for ALL nodes
      // This shifts every node down one level in the hierarchy
      const idMapping = {};
      
      // First, map topmost nodes to become children of new parent
      topmostNodes.forEach((node, index) => {
        const oldId = node.id;
        const newChildId = `${newParentId}-${index + 1}`;
        idMapping[oldId] = newChildId;
      });

      // Then, recursively update all descendant nodes
      // For each node, if it starts with a topmost node ID, prepend the new parent ID
      nds.forEach((node) => {
        if (!idMapping[node.id]) {
          // Check if this node is a descendant of any topmost node
          for (const topmostNode of topmostNodes) {
            if (node.id === topmostNode.id || node.id.startsWith(topmostNode.id + '-')) {
              // This node is a descendant - shift it down
              const topmostIndex = topmostNodes.findIndex((tn) => 
                node.id === tn.id || node.id.startsWith(tn.id + '-')
              );
              if (topmostIndex !== -1) {
                const topmostOldId = topmostNodes[topmostIndex].id;
                const topmostNewId = idMapping[topmostOldId];
                // Replace the old topmost ID with the new one
                const newId = node.id.replace(topmostOldId, topmostNewId);
                idMapping[node.id] = newId;
              }
              break;
            }
          }
        }
      });

      // Update all nodes with new IDs
      const updatedNodes = nds.map((node) => {
        const newId = idMapping[node.id];
        if (newId) {
          return {
            ...node,
            id: newId,
            data: {
              ...node.data,
            },
          };
        }
        return node;
      });

      // Update edges separately
      setEdges((eds) => {
        // Update all edges with new node IDs
        const updatedEdges = eds.map((edge) => {
          const newSource = idMapping[edge.source] || edge.source;
          const newTarget = idMapping[edge.target] || edge.target;
          return {
            ...edge,
            id: `edge-${newSource}-${newTarget}`,
            source: newSource,
            target: newTarget,
          };
        });

        // Add new edges from parent to all former topmost nodes
        const newEdges = topmostNodes.map((_, index) => ({
          id: `edge-${newParentId}-${newParentId}-${index + 1}`,
          source: newParentId,
          target: `${newParentId}-${index + 1}`,
        }));

        return [...updatedEdges, ...newEdges];
      });

      return [...updatedNodes, newParentNode];
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

                // Check if dragged node overlaps with other nodes (excluding its children)
                const draggedNodeWithNewPosition = updatedNodes.find((n) => n.id === change.id);
                if (draggedNodeWithNewPosition) {
                  const overlappingNode = updatedNodes.find(
                    (node) =>
                      node.id !== draggedNodeWithNewPosition.id &&
                      !node.id.startsWith(draggedNodeWithNewPosition.id + '-') &&
                      nodesOverlap(draggedNodeWithNewPosition, node)
                  );

                  if (overlappingNode) {
                    // Find the closest non-overlapping position to where user is dragging
                    const safePosition = findClosestNonOverlappingPosition(
                      change.position,
                      updatedNodes.filter((n) => n.id !== draggedNodeWithNewPosition.id),
                      draggedNodeWithNewPosition.id
                    );
                    
                    draggedNodeWithNewPosition.position = safePosition;
                    
                    // Recalculate delta for children
                    const newDeltaX = safePosition.x - oldNode.position.x;
                    const newDeltaY = safePosition.y - oldNode.position.y;
                    
                    // Update child positions with new delta
                    updatedNodes = updatedNodes.map((node) => {
                      if (node.id !== draggedNodeWithNewPosition.id && node.id.startsWith(draggedNodeWithNewPosition.id + '-')) {
                        return {
                          ...node,
                          position: {
                            x: node.position.x + (newDeltaX - deltaX),
                            y: node.position.y + (newDeltaY - deltaY),
                          },
                        };
                      }
                      return node;
                    });
                  }
                }
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

    const familyName = familyObj.familyName;
    const email = familyObj.email;
    const password = familyObj.password;

    if (!familyName || !email || !password) {
      setError('Missing family information');
      return;
    }

    setLoading(true);

    try {
      await familyTreeAPI.modifyTree(
        familyName,
        email,
        password,
        nodes,
        edges
      );
      navigate('/UserProfile', {
        state: { email, password },
      });
    } catch (err) {
      handleAPIError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const nodeTypesWithProps = useMemo(() => {
    return {
      textUpdater: (props) => {
        const isTopmost = !props.id.includes('-');
        return (
      <TextUpdaterNode
        {...props}
        onUpdateNode={updateNode}
        onAddChild={addChildNode}
        onDeleteNode={deleteNode}
            onAddParent={addParentNode}
            isTopmost={isTopmost}
          />
        );
      },
    };
  }, [updateNode, addChildNode, deleteNode, addParentNode]);

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

export default ModifyTree;