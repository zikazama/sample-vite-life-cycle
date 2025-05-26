import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import CardComponent from "../components/CardComponent";

const TodoLayout = () => {
  const [todo, setTodo] = useState([]);
  const [_, setCurrentIndex] = useState(null);
  const inputTodo = useRef(null);

  // Mounting
  useEffect(() => {
    setTodo(["Berlajar React"]);
  }, []);

  // Updating
  useEffect(() => {
    Swal.fire({
      title: "Success!",
      text: "Berhasil menambahkan todo!",
      icon: "success",
    });
  }, [todo]);

  // Unmounting
  useEffect(() => {
    return () => {
      alert("Anda telah meninggalkan halaman todo!");
      Swal.fire({
        title: "Goodbye!",
        text: "Anda telah meninggalkan halaman todo!",
        icon: "info",
      });
    };
  }, []);

  const addTodo = () => {
    const newTodo = inputTodo.current.value;
    if (!newTodo) {
      Swal.fire({
        title: "Error!",
        text: "Todo tidak boleh kosong!",
        icon: "error",
      });
      return;
    }
    setTodo([...todo, newTodo]);
    inputTodo.current.value = "";
  };

  const deleteTodo = (index) => {
    setCurrentIndex(index);
    Swal.fire({
      title: "Apakah kamu yakin untuk hapus data?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Ya",
      denyButtonText: `Tidak`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Data terhapus!", "", "success");
        const newTodo = todo.filter((_, i) => i !== index);
        setTodo(newTodo);
      } else if (result.isDenied) {
        Swal.fire("Data dibatalkan untuk dihapus", "", "info");
      }
      setCurrentIndex(null);
    });
  };

  const updateTodo = async (index) => {
    setCurrentIndex(index);
    const { value: updataTodo } = await Swal.fire({
      title: "Mauskan nama baru todo",
      input: "text",
      inputValue: todo[index],
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Batal",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    if (updataTodo) {
      const tempTodo = todo;
      tempTodo[index] = updataTodo;
      setTodo([...tempTodo]);
      Swal.fire(`Mengubah todo menjadi ${updataTodo}`, "", "success");
    }
    setCurrentIndex(null);
  };
  return (
    <>
      <input
        style={{ padding: "20px" }}
        type="text"
        placeholder="Masukkan todo baru"
        ref={inputTodo}
      />
      <button onClick={addTodo} style={{ margin: "10px", padding: "20px" }}>
        Tambah
      </button>
      <ul>
        {todo.map((item, index) => (
          <li key={index} style={{ fontSize: "20px", margin: "10px" }}>
            {item}{" "}
            <button
              onClick={() => updateTodo(index)}
              style={{
                padding: "5px",
                marginLeft: "10px",
                backgroundColor: "blue",
                color: "white",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(index)}
              style={{
                padding: "5px",
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
      <CardComponent/>
    </>
  );
};

export default TodoLayout;
