import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const IndexPage = () => {
    return (
        <div>
            <Link
                className={buttonVariants({ variant: "default" })}
                to="/login"
            >
                Login
            </Link>
        </div>
    );
};
