"use client"

// components/ViewFirestoreFields.tsx
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";  // 导入 Firebase 配置
import { collection, getDocs } from "firebase/firestore";

export default function ViewFirestoreFields() {
  const [fields, setFields] = useState<string[] | null>(null);  // 存储字段名称
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "trade_data"));  // 假设你有一个 trade_data 集合
      const fieldNames: string[] = [];  // 用于存储字段名称

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        Object.keys(data).forEach((key) => {
          if (!fieldNames.includes(key)) {
            fieldNames.push(key);  // 提取字段名称并避免重复
          }
        });
      });

      setFields(fieldNames);  // 设置字段名称
      setLoading(false);  // 加载完成
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Firestore 字段名称</h2>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <ul>
          {fields?.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
