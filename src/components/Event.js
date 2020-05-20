import React from 'react';

//	Since this is a small app hence i haven't implemented many components but have kept it
//  as simple as possible
const Event = props =>{
	return(
		<div className="Event" onDragOver={props.onDragOver} onDrop={props.onDrop}>
			<div className="header">{props.header}</div>
			{props.addTodo?
				<input type="text" placeholder="Type New To-do here" onKeyDown={props.addTodo}/>
				:null}
			{props.children}
		</div>
	)
}

export default Event;