import React from 'react';
import './App.css';
import Event from '../components/Event';

export default class App extends React.Component{
	state={
		tasks:[]
	}

	// All dragable fns 

	// Fn to allow things to be dropped over
	onDragOver = event =>{
		event.preventDefault();
	}

	// Fn that allows content state to be saved as we are dragging
	onDragStart = (event,text) =>{
		console.log('dragstart: ',text);
		event.dataTransfer.setData('myKey',text);
	}

	// Fn that is run whenever drop is finally made
	onDrop = (event,status) =>{
		let newText = event.dataTransfer.getData('myKey');
		let tasks = this.state.tasks.filter(task=>{
			if(task.text==newText){
				task.status = status;
			}
			return task;
		})
		this.setState({...this.state,tasks});
	}

	// This fn is used to add task in to-do section when input is 
	// typed and enter is pressed
	addTaskHandler = (event) =>{
		if(event.target.value.length>0 && event.key==='Enter'){
			let newTasks = this.state.tasks;
			newTasks.push({text:event.target.value, status:"todo"});
			this.setState({	tasks:newTasks });
			event.target.value='';
		}
	}

	render(){
		let tasks = {
			todo:[],
			doing:[],
			done:[]
		}

		this.state.tasks.forEach((task,i)=>{
			tasks[task.status].push(
				<div className="card"
					onDragStart = {event=>this.onDragStart(event,task.text)}
					key={task.text+i}
					draggable
				>
					{task.text}
				</div>
			);
		})

		return(
			<div className="App">
				<Event addTodo={this.addTaskHandler} header="To-Do">{tasks.todo}</Event>
				<Event 
					header="Doing" 
					onDragOver={event=>this.onDragOver(event)}
					onDrop={event=>this.onDrop(event,"doing")}>{tasks.doing}</Event>
				<Event 
					header="Done" 
					onDragOver={event=>this.onDragOver(event)}
					onDrop={event=>this.onDrop(event,"done")}>{tasks.done}</Event>
			</div>
		);
	}
}