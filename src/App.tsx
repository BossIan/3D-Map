import LoginPage, { Password } from "@react-login-page/base";
import "./App.css";
import { useState } from "react";

function App() {
  const [role, setRoleData] = useState("");

  async function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.success);  
        setRoleData(result.role);
        console.log(role);
        
      } else {
        console.error("Submission failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  }
  return (
    <form method="post" action="/login" onSubmit={Submit}>
      <LoginPage>
        <Password index={2} />
        <h1>Role: {role}</h1>
      </LoginPage>
    </form>
  );
}

export default App;
