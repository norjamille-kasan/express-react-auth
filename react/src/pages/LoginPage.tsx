import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((r) => {
                console.log(r);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="w-full min-h-screen flex items-center justify-center h-full">
                <div className="max-w-xl mx-auto w-full px-10">
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Login to your account</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        id="email"
                                        type="text"
                                        className="mt-1"
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                                <div className="mt-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        id="password"
                                        type="password"
                                        className="mt-1"
                                        placeholder="*******"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="w-full ">
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </>
    );
};
