"use client";
import usePrint from "@/apiHooks/usePrint";
import useBills from "@/hooks/useBills";
import { useCallback } from "react";

const Home = () => {
  // const { onPrint } = usePrint();
  const { onPrint } = useBills();

  const onHandlePrint = useCallback(() => {
    //
    onPrint();
  }, [onPrint]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={onHandlePrint}>Print</button>
    </main>
  );
};

export default Home;
