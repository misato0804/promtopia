'use client'

import Profile from "@components/Profile";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const MyProfile = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const [ post, setPosts ] = useState([])

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json()
        setPosts(data)
    }

    useEffect(() => {
        if(session?.user.id)
            fetchPosts();
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post1) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post1._id}`, {
                    method: 'DELETE'
                })
                const filteredPosts = post.filter((p) => post1._id !== p._id)
                setPosts(filteredPosts)
            } catch (e) {

            }
        }

    }

    return (
        <Profile
            name='My'
            desc='welcome to your personalized profile page'
            data={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;