import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Task from './components/Task.component';
import Column from './components/Column.component';
import AddTask from './components/AddTask.component';
import ViewTask from './components/ViewTask.component';
import EditTask from './components/EditTask.component';
import { deleteTaskApi, getCompletedTaskApi, getInprogressTaskApi, getTodoTaskApi,updateTaskStatusApi } from './API/api';
import "./style.css"
import Loader from '../Loader';
import { MenuItem, Select } from '@mui/material';
export default function Tasks() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [viewDetails, setViewDetails] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [deletetaskId, setDeletetaskId] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [completedItems, setCompletedTodoItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loader,setLoader] = useState(false);
  const [sorting,setSorting] = useState('Recent');


  const filterAndSortTasks = (tasks) => {
    let filteredTasks = tasks;

    // Filter by search query
    if (searchQuery) {
      filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sort tasks by date
    filteredTasks.sort((a, b) => {
      if (sorting === "Recent") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Most recent first
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
      }
    });

    return filteredTasks;
  };

  const getTodoTask = useQuery({
    queryKey: ["getTodoTask"],
    queryFn: () => getTodoTaskApi(userId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled:userId!==null && token!==null,
    onSuccess: (response) => {
      if (response.status === 200) {
        setTodoItems(response?.data?.data);
      } else {
        toast.error(response?.response?.data?.message);
      }
    },
    onError: (err) => {
      toast.error(err);
    }
  });
  console.log(userId!==null , token!==null)
  useEffect(()=>{setLoader(getTodoTask?.isFetching)},[getTodoTask?.isFetching])
  const getInprogressTask = useQuery({
    queryKey: ["getInprogressTask"],
    queryFn: () => getInprogressTaskApi(userId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled:userId!==null && token!==null,
    onSuccess: (response) => {
      if (response.status === 200) {
        setInProgressItems(response?.data?.data);
      } else {
        toast.error(response?.response?.data?.message);
      }
    },
    onError: (err) => {
      toast.error(err);
    }
  });
  useEffect(()=>{setLoader(getInprogressTask?.isFetching)},[getInprogressTask?.isFetching])
  const getCompletedTask = useQuery({
    queryKey: ["getCompletedTask"],
    queryFn: () => getCompletedTaskApi(userId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled:userId!==null && token!==null,
    onSuccess: (response) => {
      if (response.status === 200) {
        setCompletedTodoItems(response?.data?.data);
      } else {
        toast.error(response?.response?.data?.message);
      }
    },
    onError: (err) => {
      toast.error(err);
    }
  });
  useEffect(()=>{setLoader(getCompletedTask?.isFetching)},[getCompletedTask?.isFetching])

  const deleteTodoTask = useQuery({
    queryKey: ["getTodoTask", deletetaskId],
    queryFn: () => deleteTaskApi(deletetaskId,userId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: deletetaskId !== null && userId !== null,
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setDeletetaskId(null);
        getTodoTask.refetch();
      } else {
        toast.error(response?.response?.data?.message);
      }
      setDeletetaskId(null);
    },
    onError: (err) => {
      toast.error(err);
    }
  });

  const handleDelete = (task_id) => {
    setDeletetaskId(task_id);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setEditTask(true);
  };
  const handleViewDetails = (task)=>{
    setViewDetails(true);
    setTaskToEdit(task);
  }
 
  const updateTaskStatus = (taskId, status) => {
    
    updateTaskStatusApi(taskId, status)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response?.data?.message);
          getTodoTask.refetch();
          getInprogressTask.refetch();
          getCompletedTask.refetch();
        } else {
          toast.error(response?.response?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="main_container">
      <div style={{marginLeft:10}}>
        <button
          className="add_task_btn"
          style={{ cursor: "pointer" }}
          onClick={() => setAddTask(true)}
        >
          Add Task
        </button>
      </div>
      <div className="search_container">
        <div style={{padding:10}}>
          <span >Search: </span>
          <input
            className="search_input"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        <div style={{padding:10}}>
        <span>Sort By: </span>
        <Select
          size='small'
          style={{width:100,height:30}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sorting}
          onChange={(e)=>setSorting(e.target.value)}
        >
          <MenuItem value={'Recent'}>Recent</MenuItem>
          <MenuItem value={'Oldest'}>Oldest</MenuItem>
        </Select>
        </div>
      </div>
      <div className="task_container">
        <Column status="todo" updateTaskStatus={updateTaskStatus}>
          <div className="task_title_div">
            <span style={{ padding: 10 }}>TODO</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {loader && <Loader/>}
            {!loader && (todoItems &&
              todoItems.length > 0 ?
              (filterAndSortTasks(todoItems).map((task) => (
                <Task
                  key={task._id}
                  task={{ ...task, status: 'TODO' }}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleViewDetails={handleViewDetails}
                />
              ))):<>Please add some task...</>)}
          </div>
        </Column>
        <Column status="inprogress" updateTaskStatus={updateTaskStatus}>
          <div className="task_title_div">
            <span style={{ padding: 10 }}>IN PROGRESS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {loader && <Loader/>}
            {!loader && (inProgressItems &&
              inProgressItems.length > 0 ?
              (filterAndSortTasks(inProgressItems).map((task) => (
                <Task
                  key={task._id}
                  task={{ ...task, status: 'IN_PROGRESS' }}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleViewDetails={handleViewDetails}
                />
              ))):<>Please add some task inprogress...</>)}
          </div>
        </Column>
        <Column status="completed" updateTaskStatus={updateTaskStatus}>
          <div className="task_title_div">
            <span style={{ padding: 10 }}>DONE</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {loader && <Loader/>}
            {!loader && (completedItems &&
              completedItems.length > 0?
              (filterAndSortTasks(completedItems).map((task) => (
                <Task
                  key={task._id}
                  task={{ ...task, status: 'DONE' }}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleViewDetails={handleViewDetails}
                />
              ))):<>Please complete some tasks..</>)}
          </div>
        </Column>
      </div>
      {addTask && <AddTask setAddTask={setAddTask} recallFunction={getTodoTask} />}
      {viewDetails && <ViewTask setViewDetails={setViewDetails} task={taskToEdit}/>}
      {editTask && <EditTask task={taskToEdit} setEditTask={setEditTask} recallFunction={getTodoTask} />}
    </div>
  );
}