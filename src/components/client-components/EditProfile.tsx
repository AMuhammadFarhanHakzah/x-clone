'use client'

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { DotIcon, XIcon } from 'lucide-react'
import { IoIosArrowForward } from "react-icons/io";
import { toast } from 'sonner'

const EditProfile = () => {

    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [website, setWebsite] = useState("")
    const [coverImage, setCoverImage] = useState<File | null>(null)
    const [profileImage, setProfileImage] = useState<File | null>(null)


    const updateProfileDetails = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/api/profiles", {
            method: "POST",
            body: JSON.stringify({name, bio, location, website})
        })

        const data = await response.json()

        if(data.success) {
            console.log(data.message)
            toast.success(data.message)
        } else {
            console.log(data.message, data.error)
            toast.error(data.message)
        }
    }


    return (

        <form id="form-editProfile" onSubmit={updateProfileDetails}>


            <Dialog >
                <DialogTrigger className='ml-auto mr-4 mt-3 w-30 h-9 items-center rounded-full border border-white/50 bg-black font-bold cursor-pointer'>
                    <div >Edit profile</div>
                </DialogTrigger>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogContent className='bg-black border border-transparent min-w-[600px] max-h-[650px] overflow-y-auto rounded-2xl pb-16'>
                    <DialogHeader>
                        <DialogTitle className='pl-3 py-2 font-semibold text-xl gap-x-4 flex items-center sticky top-0 bg-black/60'>
                            {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s' className='w-8 mx-auto' /> */}

                            <DialogClose className="">
                                <XIcon />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                            <div className='ml-4'>Edit profile</div>
                            <Button form='form-editProfile' type='submit' className='bg-white text-black font-bold rounded-full w-18 hover:bg-white/90 ml-auto mr-4'>Save</Button>
                        </DialogTitle>


                        <DialogDescription>

                            <label className='block w-full h-[27vh] bg-gray-600 cursor-pointer mt-[-8px]'>
                                <input form='form-editProfile' type='file' accept='image/*, video/*' className='hidden' />
                            </label>

                            <label className='block w-28 h-28 bg-gray-600 rounded-full mx-6 mb-6 mt-[-50px] border-3 border-black cursor-pointer'>
                                <input form='form-editProfile' type='file' accept='image/*, video/*' className='hidden' />
                            </label>
                            <div className='px-4 space-y-8 flex flex-col text-base text-white/80' >
                                <input form='form-editProfile' value={name} onChange={(e) => setName(e.target.value)} name='name' className='border border-white/20 rounded-[4px] py-4 px-2' placeholder='Name' required />
                                <textarea form='form-editProfile' value={bio} onChange={(e) => setBio(e.target.value)} className='border border-white/20 w-full p-2 rounded-[4px] py-6 px-2' placeholder='Bio'></textarea>
                                <input form='form-editProfile' value={location} onChange={(e) => setLocation(e.target.value)} className='border border-white/20 rounded-[4px] py-4 px-2' placeholder='Location' />
                                <input form='form-editProfile' value={website} onChange={(e) => setWebsite(e.target.value)} className='border border-white/20 rounded-[4px] py-4 px-2' placeholder='Website' />
                            </div>

                            <div className='px-4 mt-4'>
                                <div className='flex'>
                                    <div className=''>Birth date</div>
                                    <DotIcon />
                                    <div className='text-blue-400 cursor-pointer'>Edit</div>
                                </div>
                                <div className='text-white text-xl'>February 21, 2002</div>

                            </div>
                            <div className='mt-4 cursor-pointer'>
                                <div className='text-white text-xl hover:bg-white/10 px-4 py-2 flex items-center'>
                                    <div>
                                        Create expanded bio
                                    </div>
                                    <IoIosArrowForward className='ml-auto text-white/40' />
                                </div>
                                <div className='text-white text-xl hover:bg-white/10 px-4 py-2 flex items-center'>
                                    <div>
                                        Edit professional profile
                                    </div>
                                    <IoIosArrowForward className='ml-auto text-white/40' />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </form>

    )
}

export default EditProfile