import { useFormik } from "formik";
import * as Yup from "yup"; 
import YupPassword from "yup-password";
YupPassword(Yup); 

const url = "http://localhost:4856/users"; 

function SignUpPage(){

    const formik = useFormik(
        {
            initialValues: {
                username: "", 
                password: ""
            }, 
            validationSchema: Yup.object(
                {
                    username: Yup.string()
                        .min(3, "Must be at least 3 characters")
                        .max(15, "Must be at most 15 characters")
                        .required("*Required"), 
                    password: Yup.string().password()
                        .minLowercase(1, "Password must contain at least 1 lower-case letter")
                        .minUppercase(1, "Password must contain at least 1 upper-case letter")
                        .minNumbers(1, "Password must contain at least 1 number")
                        .minSymbols(1, "Password must contain at least 1 special character")
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
                console.log("Response:", data);
            }
        }
    ); 


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
            <button type="submit" className="btn btn-error w-20">Sign Up</button>
        </form>
    )
} 

export default SignUpPage; 