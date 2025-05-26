import TodoLayout from "../layouts/TodoLayout";

const HomePage = () => {
  return (
    <div style={{ width: '500px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Home Page</h1>
      <p>Todo App</p>
      <TodoLayout/>
    </div>
  );
}

export default HomePage;