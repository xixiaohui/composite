"use client";
import { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Papa from "papaparse";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("请选择 CSV 文件");

    setUploading(true);
    setError(null);
    setProgress(0);

    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      if (!target?.result) return;

      // 确保 target.result 是字符串
      const csvString = target.result as string;

      // 解析 CSV 字符串
      const csv = Papa.parse(csvString, { header: true });
      const rows = csv.data;

      try {
        for (let i = 0; i < rows.length; i++) {
          await addDoc(collection(db, "trade_data"), rows[i]);

          // 更新上传进度
          setProgress(((i + 1) / rows.length) * 100);
        }

        alert("数据上传成功！");
      } catch (error) {
        console.error("上传失败:", error);
        setError("上传失败，请检查文件格式");
      } finally {
        setUploading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-4 border rounded">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={uploading}
      />
      {file && !uploading && <p>选择的文件: {file.name}</p>}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? "上传中..." : "上传"}
      </button>

      {uploading && (
        <div className="mt-4">
          <p>上传进度: {Math.round(progress)}%</p>
          <div className="w-full bg-gray-300 rounded">
            <div
              className="bg-blue-500 text-white text-center p-1 rounded"
              style={{ width: `${progress}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
