// create a bug
// get all bug
// get a single bug by id
// update a bug by id
// delete a bug by id

const Bug = require("../models/Bug");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const BugAssignedMail = require("../mail/BugAssignedMail");
const BugSolvedMail = require("../mail/BugSolvedMail");

const createBug = async (req, res) => {
  try {
    // get all data
    const { title, desc, status, priority, createdBy, assignedTo } = req.body;
    const userId = req.user.id;
    // validation
    if (!title || !desc) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // check if user is tester
    const user = await User.findById(userId, { role: "Tester" })
      .populate("firstName")
      .populate("lastName");

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Account Type Must be Tester",
      });
    }
    // create a bug
    const newBug = await Bug.create({
      title: title,
      desc: desc,
      status: status,
      priority: priority,
      createdBy: userId,
      assignedTo: assignedTo,
    });
    const mail = await User.findById(assignedTo);

    await mailSender(
      mail.email,
      "Bug Assigned ",
      BugAssignedMail(title, `${user.firstName + " " + user.lastName}`)
    );

    // return response

    return res.status(200).json({
      success: true,
      data: newBug,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to create a Bug",
    });
  }
};

// get all bug

const getAllBug = async (req, res) => {
  try {
    const allBug = await Bug.find(
      {},
      {
        title: true,
        desc: true,
        status: true,
        priority: true,
        createdBy: true,
        assignedTo: true,
      }
    );

    if (!allBug) {
      return res.status(400).json({
        success: false,
        error: "No Bug Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: allBug,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to Fetch all Bug",
    });
  }
};

// get a single Bug

const getBugById = async (req, res) => {
  try {
    let bugId = req.params.id;
    bugId = bugId.substring(1);
    console.log("bigid", bugId);
    const bugDetail = await Bug.findById({ _id: bugId });

    if (!bugDetail) {
      return res.status(400).json({
        success: false,
        error: "Bug Not Found By this id",
      });
    }

    return res.status(200).json({
      success: true,
      data: bugDetail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to Fetch a Bug",
    });
  }
};

// update a bug by id

const updateById = async (req, res) => {
  try {
    const { title, desc, status, priority, createdBy, assignedTo, bugId } =
      req.body;


    // validation
    const mail = await User.findById(createdBy).populate("email");
    const name = await User.findById(assignedTo)
      .populate("firstName")
      .populate("lastName");
    const bug = await Bug.findById(bugId);
    if (!bug) {
      return res.status(400).json({
        success: false,
        error: "Bug not found",
      });
    }
    if (title !== undefined) {
      bug.title = title;
    }
    if (desc !== undefined) {
      bug.desc = desc;
    }
    bug.priority = priority;
    bug.status = status;
    await bug.save();

    if (bug.status === "Closed") {
      await mailSender(
        mail.email,
        "Bug Solved",
        BugSolvedMail(bug.title, `${name.firstName + " " + name.lastName}`)
      );
    }
    return res.status(200).json({
      success: true,
      data: bug,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to Update a Bug",
    });
  }
};

// delete a bug by ID

const deleteBug = async (req, res) => {
  try {
    const bugId = req.params.id.substring(1);
    console.log(bugId)
    const bug = await Bug.findByIdAndDelete(req.params.id.substring(1));
    if (!bug) {
      return res.status(400).json({
        success: false,
        error: "Bug Not Found By this id",
      });
    }
    return res.status(200).json({
      success: true,
      error: "Bug deleted successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: "failed to Delete Bug",
    });
  }
};

module.exports = {
  createBug,
  getAllBug,
  getBugById,
  updateById,
  deleteBug,
};
