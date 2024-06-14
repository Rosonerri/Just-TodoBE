// import React from 'react'
import { useEffect, useState } from "react";
import moment from "moment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IoCreateSharp, IoTrashBin } from "react-icons/io5";

const HomeScreen = () => {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<{}>({});
  const [parent, enableAnimations] = useAutoAnimate();
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const fetchData = () => {
    const url: string = "http://localhost:2233/api/get";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text }),
    }).then(() => {});

    fetch(url, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("This is ress",res?.data)
        setData(res?.data);
      });
  };

  let title = Object.keys(data);
  let values = Object.values(data);
  console.log("This is Values", values);
  console.log("This is title", title);

  const changeToDone = (Id: string) => {
    const url: string = `http://localhost:2233/api/done/${Id}`;
    fetch(url, {
      method: "PATCH",
    })
      .then((res: any) => {
        return res.json();
      })
      .then((res) => {
        setData(res?.data);
        window.location.reload();
      });
  };
  const deleteTodo = (Id: string) => {
    const url: string = `http://localhost:2233/api/delete/${Id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res: any) => {
        return res.json();
      })
      .then((res) => {
        console.log("hih", res?.data);
        setData(res?.data);
        window.location.reload();
      });
  };
  const changeToProgress = (Id: string) => {
    const url: string = `http://localhost:2233/api/progress/${Id}`;
    fetch(url, {
      method: "PATCH",
    })
      .then((res: any) => {
        return res.json();
      })
      .then((res) => {
        setData(res?.data);
        window.location.reload();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createTask = () => {
    const url: string = "http://localhost:2233/api/create";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text }),
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="p-8 flex flex-col relative">
      {toggle && (
        <div className="h-screen top-0 backdrop-blur-sm item-center justify-between absolute w-[97%]">
          <div className="border h-screen flex justify-center items-center">
            <div className="w-[400px] flex justify-center items-center flex-col">
              <input
                type="text"
                className="w-[300px] border h-[40px] p-2"
                placeholder="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <button
                className="bg-blue-950 w-[300px] border h-[40px] p-2 text-white mt-3 rounded-md mb-[50px]"
                onClick={() => {
                  createTask();
                  setText("");
                  onToggle();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="border rounded-md w-[800px] p-4">
        <div className="gap-3 `flex">
          {title?.map((props: string) => (
            <div
              key={props}
              className="border flex justify-between gap-3 w-[250px] p-2 rounded-md mb-5 items-center"
            >
              <span className="capitalize font-semibold tracking-widest">
                {props}
              </span>
              {props === "task" && (
                <IoCreateSharp
                  className="text-[30px] cursor-pointer"
                  onClick={onToggle}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {values?.map((el: any) => (
            <div>
              {
                el?.map((props: any) => (
                  <main
                    key={props?._id}
                    className="border w-[247px] h-[200px] rounded-md p-1 mb-[10px]"
                  >
                    <div className="font-[700] text-[20px] mb-10">
                      {props.title}
                    </div>
                    <div className="font-[500] text-[15px] mb-10">
                      {moment(props.createdAt).fromNow()}
                    </div>
                    <div className="flex justify-between">
                      <button
                        className={`py-1 px-8 ${
                          props.progress && props.done
                            ? "bg-green-950"
                            : props.progress
                            ? "bg-orange-500"
                            : "bg-red-700"
                        } text-white -tracking-widest font-semibold rounded-md`}
                        onClick={() =>
                          !props?.progress && !props?.done
                            ? changeToProgress(props?._id)
                            : props?.progress && !props?.done
                            ? changeToDone(props?._id)
                            : changeToDone(props?._id)
                        }
                      >
                        {props.progress && props.done
                          ? "Completed"
                          : props.progress
                          ? "In Progress"
                          : "Start"}
                      </button>
                      <IoTrashBin
                        className="text-[crimson] text-[25px] cursor-pointer mt-2"
                        onClick={() => {
                          deleteTodo(props._id);
                        }}
                      />
                    </div>
                  </main>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
