import { React, useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const manager = () => {
    const ref = useRef();
    const passref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passarray, setpassarray] = useState([]);

    let passwords = async()=>{
        const pass = await fetch("http://localhost:3000/")
        const passres = await pass.json()
        setpassarray(passres)
    }
    useEffect(() => {
      passwords()
    }, [])
    

    const showpass = () => {
        if (ref.current.src.includes("/public/hidden.png")) {
            ref.current.src = "/public/eye.png";
            passref.current.type = "text";
        }
        else {
            ref.current.src = "/public/hidden.png";
            passref.current.type = "password";
        }
    }
    const handlebutton = async() => {
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id:form.id}) })
        setpassarray([...passarray, {...form, id: uuidv4()}])
        toast.success('Your Password is saved', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        
        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
        // localStorage.setItem("password", JSON.stringify([...passarray, {...form, id: uuidv4()}]))
        // console.log([...passarray, form])
        setform({ site: "", username: "", password: "" })

    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const CopyText = (item) => {
        toast.success('Copied to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(item)
    }
    const handledelete = async(id)=>{
        let c = confirm("Are you sure you want to delete?")
        if(c){
            setpassarray(passarray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id}) })
        }
        toast.success('Your Password is deleted', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        
    }
    const handleedit = async(id)=>{
        setform({...passarray.filter(item=>item.id===id)[0], id:id})
        setpassarray(passarray.filter(item => item.id !== id))

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div class="absolute top-0 -z-10 h-full w-full bg-white"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
            <div className='mt-6 flex justify-center min-h-[81.6vh]'>
                <div className='w-[90vw] md:w-[70vw] min-h-[80vh] flex flex-col items-center p-4 gap-7'>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-extrabold text-[22px]'>&lt;GetPass/&gt;</h1>
                        <p>Your online password manager</p>
                    </div>
                    <div className='flex flex-col gap-4 md:w-[50vw]'>
                        <input className='h-9 border-2 border-violet-500 rounded-full px-2' value={form.site} onChange={handlechange} type="text" name='site' id='site' placeholder='Website' />
                        <div className='flex gap-4 justify-between'>
                            <input className='h-9 w-full border-2 border-violet-500 rounded-full px-2' value={form.username} onChange={handlechange} type="text" name='username' id='username' placeholder='Username' />
                            <div className='relative'>
                                <input ref={passref} className='h-9 w-full border-2 border-violet-500 rounded-full px-2 relative' value={form.password} onChange={handlechange} type="password" name='password' id='password' placeholder='Password' />
                                <span className='absolute right-3 top-[6px] cursor-pointer'>
                                    <img ref={ref} onClick={showpass} className='w-6' src="/public/hidden.png" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <button disabled={form.site.length<5} className='flex items-center gap-1 font-semibold bg-violet-500 text-white rounded-full px-4 py-2 hover:bg-violet-600' onClick={handlebutton}><lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#ffffff"
                        stroke="bold">
                    </lord-icon>Add Password</button>
                    <div>
                        <h1 className='text-xl font-bold py-4'>Your Passwords</h1>
                        {passarray.length === 0 && <div>Passwords is empty</div>}
                        {passarray.length != 0 &&
                            <table className="table-auto w-[50vw] rounded-md overflow-hidden">
                                <thead className='bg-violet-500 text-white'>
                                    <tr>
                                        <th className='py-1 '>Site</th>
                                        <th className='py-1 px-2'>Username</th>
                                        <th className='py-1 px-2'>Password</th>
                                        <th className='py-1 px-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-violet-100'>
                                    {passarray.map((e) =>
                                        <tr>
                                            <td className='text-center py-2'>

                                                <div className='flex items-center justify-center gap-1 cursor-pointer' onClick={() => CopyText(e.site)}>
                                                    <a target='_blank' href={e.site}>{e.site}</a>

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/fjvfsqea.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#000000"
                                                        style={{ width: "20px" }}>
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='text-center py-2'>
                                                <div className='flex items-center justify-center gap-1 cursor-pointer' onClick={() => CopyText(e.username)}>
                                                    {e.username}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/fjvfsqea.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#000000"
                                                        style={{ width: "20px" }}>
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='text-center py-2'>
                                                <div className='flex items-center justify-center gap-1 cursor-pointer' onClick={() => CopyText(e.password)}>
                                                    {"•".repeat(e.password.length)}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/fjvfsqea.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#000000"
                                                        style={{ width: "20px" }}>
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='text-center flex items-center justify-center gap-3 py-2'>
                                                <span className='cursor-pointer' onClick={()=>handleedit(e.id)}><lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#000000,secondary:#000000"
                                                    style={{width:"20px"}}>
                                                </lord-icon></span>
                                                <span className='cursor-pointer' onClick={()=>handledelete(e.id)}><lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#000000,secondary:#000000"
                                                    style={{width:"20px"}}>
                                                </lord-icon></span>
                                            </td>
                                        </tr>)}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default manager
