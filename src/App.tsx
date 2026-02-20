import LoginPage, { Password } from '@react-login-page/base';
import "./App.css";

function App() {
  function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
  }
  return (
    <form method="post" onSubmit={Submit}>
    <LoginPage>
      <Password index={2}/>
    </LoginPage>
    </form>
  );
}

export default App;
