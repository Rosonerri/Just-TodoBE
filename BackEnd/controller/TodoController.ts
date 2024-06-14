import { Request, Response } from "express";
import todoModel, { iProps } from "../model/todoModel";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const createTask = await todoModel.create({ title: title });

    return res.status(201).json({
      message: "Todo task Created Successfully",
      data: createTask,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(404).json({
      message: "Error Creating Task",
      data: error.message
    });
  }
};

export const moveTodoToProgress = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;

    const find = await todoModel.findByIdAndUpdate(
      Id,
      { progress: true },
      { new: true }
    );

    return res.status(201).json({
      message: "Task Found",
      data: find,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Finding Task",
    });
  }
};

export const moveProgressToDone = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;

    const findTask = await todoModel.findById(Id);
    if (findTask?.progress) {
      const createTask = await todoModel.findByIdAndUpdate(
        Id,
        { done: true },
        { new: true }
      );
      return res.status(201).json({
        message: "Todo Task created succesfully",
        data: createTask,
      });
    } else {
      return res.status(404).json({
        message: "Task must have started first...!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error Creating new Todo",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const getTask = await todoModel.find();

    return res.status(201).json({
      message: "Todo task created successfully",
      data: getTask,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating new Todo",
    });
  }
};

export const getAllCombine = async (req: Request, res: Response) => {
  try {
    const getTask = await todoModel.find();

    const getAllTask = getTask.filter((el: iProps) => {
      return el.progress === false && el.done === false;
    });

    const getAllProgress = getTask.filter((el: iProps) => {
      return el.progress === true && el.done === false;
    });

    const getAllDone = getTask.filter((el: iProps) => {
      return el.progress === true && el.done === true;
    });

    let data = {
      task: getAllTask,
      progress: getAllProgress,
      done: getAllDone,
    };

    return res.status(200).json({
      message: "Todo task gotten successfully",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating new Todo",
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { taskId } = req.params;
    const getTasks = await todoModel.findByIdAndDelete(taskId);

    return res.status(201).json({
      msg: " todo deleted successfully",
      data: getTasks,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error deleting  todo",
    });
  }
};