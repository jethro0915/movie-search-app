import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "../assets/google.svg";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/database/server";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();
  const { state } = useLocation();

  const redirectLink = state ? `${state.url}${state?.query}` : "/";

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } else {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let userEmail = localStorage.getItem("emailForSignIn");
        if (!userEmail) {
          userEmail = window.prompt(
            "Please provide your email for confirmation"
          );
        }
        setLoading(true);
        signInWithEmailLink(
          auth,
          localStorage.getItem("emailForSignIn"),
          window.location.href
        )
          .then((result) => {
            // Clear email from storage.
            localStorage.removeItem("emailForSignIn");
            setLoading(false);
            setError(null);
            navigate("/");
          })
          .catch((error) => {
            setLoading(false);
            setError(error);
            navigate("/login");
          });
      }
    }
  }, [currentUser, navigate]);

  const handleEmailLinkLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:5173/login",
      handleCodeInApp: true,
    })
      .then(() => {
        localStorage.setItem("emailForSignIn", email);
        setLoading(false);
        setError(null);
        toast({
          title: "Email has been sent to your address",
          variant: "successful",
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem with your request. Please retry. (${error.message})`,
        });
      });
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    setLoading(true);
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        setLoading(false);
        navigate(redirectLink, { replace: true });
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem with your request. Please retry. (${error.message})`,
        });
      });
  };

  return (
    <div className="flex h-screen items-center">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Card className="w-[350px] mx-auto self-center">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Choose your sign-in option</CardDescription>
          {error && (
            <p className="text-red-500">There is a problem. Please retry</p>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-5 mt-5">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="dark:border-slate-200 dark:bg-white dark:file:text-slate-950 dark:placeholder:text-slate-500 focus-visible:border-red-400"
          />
          <Button
            onClick={handleEmailLinkLogin}
            className="gap-3 font-semibold items-center bg-red-600 hover:bg-red-400 dark:text-white dark:bg-red-600 dark:hover:bg-red-400"
            disabled={loading === true}
          >
            Sign In
          </Button>
          <div className="flex items-center gap-2 text-slate-400">
            <hr className="flex-grow" />
            <span>OR</span>
            <hr className="flex-grow" />
          </div>
          <Button
            onClick={signInWithGoogle}
            className="gap-3 font-semibold items-center bg-red-600 hover:bg-red-400 dark:text-white dark:bg-red-600 dark:hover:bg-red-400"
            disabled={loading === true}
          >
            <GoogleIcon width={20} height={20} fill="white" />
            Continue With Google
          </Button>
          <p className="text-slate-300 self-center text-[12px]">
            * Unblock pop-up required
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex gap-2 items-baseline mt-10">
            <img src="/assets/movie.svg" width={20} height={20} />
            <h1 className="font-bold text-2xl tracking-tighter text-black">
              MovieWarehouse
            </h1>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
