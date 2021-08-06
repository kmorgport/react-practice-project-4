import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHTttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const transformTasks = useCallback(taskObj => {
    const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTasks);
  },[])
  
  const {isLoading, error, sendRequest: fetchTasks } = useHTttp(transformTasks)


  useEffect(() => {
    fetchTasks({
      url: 'https://react-practice-project-4-default-rtdb.firebaseio.com/tasks.json',
      
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
