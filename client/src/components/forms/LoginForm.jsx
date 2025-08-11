import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/user/UserContext";

export function LoginForm() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    function handleFormSubmit(e) {
        e.preventDefault();
        // fetch
        login('chuck@norris.lt', 1);
        navigate('/admin');
    }

    return (
        <form onSubmit={handleFormSubmit} className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="mb-4">
                <label htmlFor="username_or_email" className="form-label">Username</label>
                <input id="username_or_email" type="text" className="form-control fs-5" required="" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" type="password" className="form-control fs-5" required="" />
            </div>
            <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100 py-2 fs-5">Login</button>
            </div>
        </form>
    );
}