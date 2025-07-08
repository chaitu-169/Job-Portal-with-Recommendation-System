import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // change path if needed

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Redirect if not authorized or if user is not an Employer
  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/login");  // Redirect to login page
    }
  }, [isAuthorized, user, navigateTo]);

  // Fetching all jobs posted by the employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Get the token from local storage
        const { data } = await API.get("/job/getmyjobs", {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to headers
          },
          withCredentials: true,
        });
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  // Enable editing for a specific job
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Disable editing mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Update the job details
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const token = localStorage.getItem("jwtToken"); // Get the token from local storage
      const { data } = await API.put(
        `/job/update/${jobId}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to headers
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  // Delete the job
  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Get the token from local storage
      const { data } = await API.delete(`/job/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to headers
        },
        withCredentials: true,
      });
      toast.success(data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  // Handle input change for job fields
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === jobId ? { ...job, [field]: value } : job))
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">
                    {/* Short input fields for editing */}
                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                      />
                    </div>
                    {/* Other fields go here */}
                  </div>
                  <div className="long_field">
                    {/* Long input fields for editing */}
                    <div>
                      <span>Description:</span>
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "description", e.target.value)
                        }
                      />
                    </div>
                    {/* Other long fields go here */}
                  </div>
                </div>
                {/* Action buttons for Edit/Delete */}
                <div className="button_wrapper">
                  <div className="edit_btn_wrapper">
                    {editingMode === element._id ? (
                      <>
                        <button onClick={() => handleUpdateJob(element._id)} className="check_btn">
                          <FaCheck />
                        </button>
                        <button onClick={handleDisableEdit} className="cross_btn">
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleEnableEdit(element._id)} className="edit_btn">
                        Edit
                      </button>
                    )}
                  </div>
                  <button onClick={() => handleDeleteJob(element._id)} className="delete_btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You've not posted any jobs or you may have deleted all of your jobs!</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
