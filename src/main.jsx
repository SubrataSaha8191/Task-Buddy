import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoalProvider } from './context/GoalContext';
import { TaskProvider } from './context/TaskContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoalProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </GoalProvider>
  </StrictMode>,
)
