import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobPages from './pages/JobPages';
import NotFoundPage from './pages/NotFoundPage';
import Jobpage, { jobLoader } from './pages/Jobpage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const API_BASE_URL = "https://job-portals-dguh.onrender.com"; // ✅ Use your deployed backend URL

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    console.log(newJob);
    const res = await fetch(`${API_BASE_URL}`, {  // ✅ Correct API URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newJob),
    });
    return res.json();
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {  // ✅ Correct API URL
      method: "DELETE",
    });
    return res.json();
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`${API_BASE_URL}/${job.id}`, {  // ✅ Correct API URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(job),
    });
    return res.json();
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobPages />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path="/jobs/:id" element={<Jobpage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
