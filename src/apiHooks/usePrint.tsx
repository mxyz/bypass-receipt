"use client";

import useAxios from "axios-hooks";
import { useCallback } from "react";

const IP = "192.168.1.179";

const usePrint = () => {
  const [, _onPrint] = useAxios(
    {
      url: `http://${IP}:3001/print`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    },
    { manual: true }
  );

  const [{ data: templateData, loading }, onFetch] = useAxios(
    {
      url: `http://${IP}:3001/print`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    },
    { manual: true }
  );

  const onPrint = useCallback(() => {
    console.log("calling", `http://${IP}:3001/print`);
    _onPrint({ data: {} }).then((response) => {
      console.log("DONE");
      // dispatch(addTodo(response.data));
    });
    // .finally(() => refetch());
  }, [_onPrint]);

  return { onPrint, templateData };
};

export default usePrint;
