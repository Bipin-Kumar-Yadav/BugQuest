import React, { useEffect, useState } from "react";

import Btn from "../components/common/Btn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { deleteBug } from "../services/operations/userAPI";
import { toast } from "react-hot-toast";
import UserDisplayName from "../components/common/UserDisplayName";

const Bug = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const url = BASE_URL + "/bug/getAllBug";

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/dashboard/create-bug");
  };
  const handleDelete = (data) => {
    console.log(data);
    const url = process.env.REACT_APP_BASE_URL + `/bug/deleteBug/:${data}`;
    dispatch(deleteBug(token, url, navigate));
  };
  useEffect(() => {
    const fetchBug = async (req, res) => {
      setLoading(true);
      const response = await apiConnector("GET", url);

      if (user.role === "Developer") {
        const filterBug = response.data.data.filter(
          (bug) => bug.assignedTo === user._id
        );
        console.log("BUG",filterBug)
        setBugs(filterBug);
      } else {
        const filterBug = response.data.data.filter(
          (bug) => bug.createdBy === user._id
        );
        console.log("BUG",filterBug)
        setBugs(filterBug);
      }
      if (!response.data.success) {
        throw new Error("No bug found");
      }
      setLoading(false);
    };
    fetchBug();
  }, []);
 
  return (
    <div>
      {loading ? (
        <div className="flex justify-center mx-auto text-richblack-25 text-xl font-bold">
          Loading...
        </div>
      ) : bugs.length === 0 ? (
        <div>
        <div className="flex justify-center mx-auto text-richblack-25 text-xl font-bold">
          No Bug Found
        </div>
        {
          user.role === "Tester" && (<Btn onClick={handleClick}>Create Bug</Btn>)
        }
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <p className="text-richblack-25 text-xl font-bold">All bugs</p>
            {user.role === "Tester" && (
              <Btn onClick={handleClick}>Create Bug</Btn>
            )}
          </div>

          {bugs.map((bug) => (
            <div
              key={bug._id}
              className=" bg-richblue-600 flex flex-col gap-2 text-richblack-25 mt-3 mb-3 rounded-lg px-10 py-5"
            >
              <p className="text-richblack-5 font-semibold flex gap-2">
                Bug Name : <p className="text-richblack-300">{bug.title}</p>
              </p>
              <p className="text-richblack-5 font-semibold flex gap-2">
                Bug Description :{" "}
                <p className="text-richblack-300"> {bug.desc} </p>
              </p>
              <p className="text-richblack-5 font-semibold flex gap-2">
                Bug Status :{" "}
                <p className="text-richblack-300"> {bug.status} </p>
              </p>
              <p className="text-richblack-5 font-semibold flex gap-2">
                Bug Priority :{" "}
                <p className="text-richblack-300"> {bug.priority} </p>
              </p>
              <p className="text-richblack-5 font-semibold flex gap-2">
                Created By :{" "}
                <span className="text-richblack-300">
                    <UserDisplayName userId={bug.createdBy} />
                </span>
              </p>
              <p className="text-richblack-5 font-semibold flex gap-2">
                Assigned To :{" "}
                <span className="text-richblack-300">
                  {
                    <UserDisplayName userId={bug.assignedTo}/>
                  }
                </span>
              </p>
                <p className="text-richblack-5 font-semibold flex gap-2">
                Bug Report : <a className="text-richblack-300" href={bug.bugUrl}>{bug.bugUrl ? "Download Attachment" : "No Attachment"}</a>
                </p>
                <p className="text-richblack-5 font-semibold flex gap-2">
                  Resolve Bug Report : <a className="text-richblack-300" href={bug.resolveUrl}>{bug.resolveUrl ? "Download Attachment" : "No Attachment"}</a>
                </p>
              <div className="flex justify-between items-center">
                {user?.role === "Tester" && (
                  <Btn onClick={() => handleDelete(bug._id)}>Delete</Btn>
                )}

                <Btn
                  onClick={() => {
                    user?.role === "Developer"
                      ? navigate(`/dashboard/editDevBug/:${bug._id}`)
                      : navigate(`/dashboard/editTestBug/:${bug._id}`);
                  }}
                >
                  Edit
                </Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bug;
