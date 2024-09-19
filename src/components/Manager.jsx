import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async (params) => {

        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords);
        setPasswordArray(passwords)


    }


    useEffect(() => {
        getPasswords()


    }, [])


    const copyText = (text) => {
        toast('🦄 Copied to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: "Bounce",
        });
        navigator.clipboard.writeText(text)
    }



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }

    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            //if any such is exist in db allredy then delete it -- for edit
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: form.id })
            })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form]);
            setform({ site: "", username: "", password: "" })
            // toast('🦄 Password saved succesfully!!!', {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            //     // transition: "Bounce",
            // });
        }
        else {
            toast("Password not saved")

        }
    }

    const deletePassword = async (id) => {
        console.log("deleting passwords with id:", id);
        let c = confirm("Are you sure you want to delete this item")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id))) 
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })


        }


    }

    const editPassword = (id) => {
        console.log("editing passwords with id:", id);
        setform({...passwordArray.filter(i => i.id === id)[0],id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))

        // setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form]);
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-3 md:mycontainer min-h-[84.7vh]">
                <h1 className='text-3xl font-bold text-center'>  <span className='text-green-700'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>

                <div className='text-black flex flex-col p-4 gap-5 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full gap-5">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-1 w-fit gap-2 border border-green-900 font-semibold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    <h2 className='text-xl font-bold py-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}

                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-1 border border-white text-center '>
                                        <div className="flex items-center justify-center gap-2">
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='copyicon cursor-pointer ' onClick={() => { copyText(item.site) }}>
                                                <span className="material-symbols-outlined">
                                                    content_copy
                                                </span>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-white text-center '>
                                        <div className="flex items-center justify-center gap-2">
                                            {item.username}
                                            <div className='copyicon cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <span className="material-symbols-outlined">
                                                    content_copy
                                                </span>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-white text-center  '>
                                        <div className="flex items-center justify-center gap-2">
                                            {"*".repeat(item.password.length)}
                                            <div className='copyicon cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <span className="material-symbols-outlined">
                                                    content_copy
                                                </span>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#121331,secondary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>

        </>
    )
}

export default Manager
