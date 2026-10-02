import { useEffect, useState } from "react";
import axios from "axios";
interface Pitch {
  id: string;
  name: string;
  price: number;
  location: string;
  type: string;
}
function ListPage() {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [search, setSearch] = useState("");


  function getPitches() {
   axios.get("http://localhost:3000/pitches?name_like=" + search).then((res) => {setPitches(res.data);
   });
  }

  function deletePitch(id: string) {
    if(confirm("Bạn xóa muốn xóa không")) {
      axios.delete("http://localhost:3000/pitches/" +id).then(() => {
        getPitches();
      }) ;
    }
  }
  useEffect(() => {
    getPitches();
  }, [search]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách sân bóng</h1>
       <input
      type="text"
      placeholder="Tìm kiếm tên sân"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
       />

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">STT</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tên sân
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Giá thuê/Giờ
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Giá thuê 2 giờ
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
               Địa điểm
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
               Loại sân
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
               Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {pitches.map((item: Pitch, index:number) => {
              return (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-300">{item.name}</td>
              <td className="px-4 py-2 border border-gray-300">{item.price}</td>
              <td className="px-4 py-2 border border-gray-300">{item.price*2}</td>
              <td className="px-4 py-2 border border-gray-300">{item.location}</td>
              <td className="px-4 py-2 border border-gray-300">{item.type}</td>
              <td className="px-4 py-2 border border-gray-300">Edit
                <button
                onClick={() => deletePitch(item.id)}
                className="ml-4">
                  Delete
                </button>
                </td>
            </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
