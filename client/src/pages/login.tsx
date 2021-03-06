import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import InputGroup from "../components/InputGroup";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "../context/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      dispatch("LOGIN", res.data);

      router.back();
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/bricks.jpg')`,
        }}
      ></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-bold">Sign In</h1>

          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              value={username}
              setValue={setUsername}
              placeholder="Username"
              error={errors.username}
              type="text"
            />
            <InputGroup
              className="mb-4"
              value={password}
              setValue={setPassword}
              placeholder="Password"
              error={errors.password}
              type="password"
            />

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Login
            </button>
          </form>
          <small>
            New to reddit?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign Up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
