"use client"


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 注册 Chart.js 插件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartVisualization() {
  const [data, setData] = useState<any[]>([]); // 存储 Firestore 数据
  const [loading, setLoading] = useState(true);

  // 获取 Firestore 数据
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "trade_data"));
      const data: any[] = [];

      querySnapshot.forEach((doc) => {
        data.push(doc.data());  // 获取每个文档的数据
      });

      setData(data);  // 更新数据
      setLoading(false);  // 设置加载完成
    };

    fetchData();
  }, []);

  if (loading) return <div>加载中...</div>;

  // 提取中文字段
  const labels = data.map((item) => item["搜索字词"]);  // 提取商品名称作为 x 轴标签
  const prices = data.map((item) => item["关键字"]);  // 提取价格作为数据
  const quantities = data.map((item) => item["展示次数"]);  // 提取数量作为数据

  // 图表数据
  const chartData = {
    labels, // x 轴标签
    datasets: [
      {
        label: "关键字",  // 数据集 1：价格
        data: prices,  // 价格数据
        backgroundColor: "rgba(255, 99, 132, 0.6)",  // 背景颜色
      },
      {
        label: "展示次数",  // 数据集 2：数量
        data: quantities,  // 数量数据
        backgroundColor: "rgba(54, 162, 235, 0.6)",  // 背景颜色
      },
    ],
  };

  return (
    <div>
      
      {/* 使用 Bar 图展示数据 */}
      <Bar data={chartData} />
    </div>
  );
}
