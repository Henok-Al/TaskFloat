import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import Notice from "../models/notis.js";

const createTask = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, team, stage, date, priority, assets, links, description } =
      req.body;

    //alert users of the task
    let text = "New task has been assigned to you";
    if (team?.length > 1) {
      text = text + ` and ${team?.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
        date
      ).toDateString()}. Thank you!!!`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };
    let newLinks = null;

    if (links) {
      newLinks = links?.split(",");
    }

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      activities: activity,
      links: newLinks || [],
      description,
    });

    await Notice.create({
      team,
      text,
      task: task._id,
    });

    const users = await User.find({
      _id: team,
    });

    if (users) {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        await User.findByIdAndUpdate(user._id, { $push: { tasks: task._id } });
      }
    }

    res
      .status(200)
      .json({ status: true, task, message: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
});

const duplicateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const task = await Task.findById(id);

    //alert users of the task
    let text = "New task has been assigned to you";
    if (team.team?.length > 1) {
      text = text + ` and ${task.team?.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${
        task.priority
      } priority, so check and act accordingly. The task date is ${new Date(
        task.date
      ).toDateString()}. Thank you!!!`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };

    const newTask = await Task.create({
      ...task,
      title: "Duplicate - " + task.title,
    });

    newTask.team = task.team;
    newTask.subTasks = task.subTasks;
    newTask.assets = task.assets;
    newTask.links = task.links;
    newTask.priority = task.priority;
    newTask.stage = task.stage;
    newTask.activities = activity;
    newTask.description = task.description;

    await newTask.save();

    await Notice.create({
      team: newTask.team,
      text,
      task: newTask._id,
    });

    res
      .status(200)
      .json({ status: true, message: "Task duplicated successfully." });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

const postTaskActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { type, activity } = req.body;

  try {
    const task = await Task.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };
    task.activities.push(data);

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Activity posted successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});
export {
    createTask,
    duplicateTask,
    postTaskActivity
}