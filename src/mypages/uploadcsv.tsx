import UploadCSV from "../components/UploadCSV"

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">上传 CSV 文件</h1>
      <UploadCSV />
    </main>
  );
}
