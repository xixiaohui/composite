import ChartVisualization from "../components/ChartVisualization";
// import ViewFirestoreFields from "../components/ViewFirestoreFields";
// import UploadCSV from "@/app/components/UploadCSV"

export default function Home() {


  return (
      <main className="p-6">
        {/* <h1 className="text-2xl font-bold">上传 CSV 文件</h1>
        <UploadCSV />

        <h1 className="text-2xl font-bold">展示数据</h1>
        <ViewFirestoreFields /> */}

        <h1 className="text-2xl font-bold">搜索字词报告</h1>
        <ChartVisualization />
      </main>
    );
}