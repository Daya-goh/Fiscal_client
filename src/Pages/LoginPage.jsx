import { useFormik } from "formik";
import * as Yup from "yup"; 

const url = "http://localhost:4856/login"; 

function LoginPage(){

    const formik = useFormik(
        {
            initialValues: {
                username: "", 
                password: ""
            }, 
            validationSchema: Yup.object(
                {
                    username: Yup.string().required("*Required"), 
                    password: Yup.string().required("*Required")
                }
            ), 
            onSubmit: async (values) => {
                // alert(JSON.stringify(values, null, 2)); 

                const res = await fetch(url, {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json", 
                    }, 
                    body: JSON.stringify(values), 
                }); 
                const data = await res.json(); 
                console.log("Response for login:", data);
            }
        }
    )

    return (
        <form onSubmit={formik.handleSubmit} className="expense flex flex-col gap-8 mx-2">
            <div className="flex flex-col">
                <label>
                    Username:
                    <input name="username" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                </label>
                {formik.touched.username && formik.errors.username ? (<div className="text-sm text-red-300 italic">{formik.errors.username}</div>) : null}
            </div>
            <div className="flex flex-col">
                <label>
                    Password:
                    <input name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                </label>
                {formik.touched.password && formik.errors.password ? (<div className="text-sm text-red-300 italic">{formik.errors.password}</div>) : null}
            </div>
            <button type="submit" className="btn btn-error w-20">Login</button>
        </form>
    )
}

export default LoginPage; 

// import LoginPage from "./Pages/LoginPage";
// <LoginPage />