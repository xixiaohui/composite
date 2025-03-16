"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "trade_data"));
      const chartData = querySnapshot.docs.map(doc => doc.data());
      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="商品" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="价格" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
