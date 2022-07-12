// import { useCallback } from 'react';
// import { Handle, Position } from 'react-flow-renderer';
// const Flow=require('./Demo');

// const handleStyle = { left: 10 };
// let vatsal="manvar";
// let textbox;


// function TextUpdaterNode({ data }) {
//   const onChange = useCallback((evt) => {
//     textbox=evt.target.name;
//     vatsal=evt.target.value;
//     //console.log(vatsal,textbox);
//   }, []);

//   return (
//     <div className="text-updater-node">
//       <Handle type="target" position={Position.Top} />
//       <div>
//         <label htmlFor="text">Text:</label>
//         <input id="text" name="text" onChange={onChange} />
//         <hr></hr>
//         <div>
//           <input type="button"  />
//           <input type="button" />
//         </div>
//       </div>
      
//       <Handle type="source" position={Position.Bottom} id="b" />
//     </div>
//   );
// }

// export default TextUpdaterNode;
