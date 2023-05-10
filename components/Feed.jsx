'use client'
import PromptCard from "./PromptCard"
import {useEffect, useState} from "react";

const PromptCartList = ({data, handleTagClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            { data.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
            )) }
        </div>
    )
}


const Feed = () => {
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState()

    console.log(posts)
    const handleSearchChange = () => {

    }

    const handleTagClick = (tagName) => {

    }

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json()
        setPosts(data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                 type='text'
                 placeholder='search for a tag or username'
                 value={searchText}
                 required
                 onChange={handleSearchChange}
                 className='search_input peer'
                />
            </form>
            <PromptCartList
                data={posts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;