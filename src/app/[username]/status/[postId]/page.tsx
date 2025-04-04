import DayJs from '@/components/client-components/DayJs';
import DropdownButton from '@/components/client-components/DropdownButton';
import LikeButton from '@/components/client-components/like-button';
import Posts from '@/components/client-components/posts';
import Replies from '@/components/client-components/replies';
import ReplyButton from '@/components/client-components/reply-button';
import { getOnePost } from '@/components/server-components/fetch-data';
import { createClient } from '@/utils/supabase/server';
import React from 'react'
import { BsDot } from 'react-icons/bs';
import { FaRetweet } from 'react-icons/fa6';
import { FiShare } from 'react-icons/fi';
import { IoStatsChart } from 'react-icons/io5';
import { MdBookmarkBorder } from 'react-icons/md';

const PostStatus = async ({ params }: { params: Promise<{ username: string; postId: string }> }) => {


  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData.user?.id
  const { username, postId } = await params


  const post = await getOnePost(userId, postId)


  // const replies = await getReplies(userId, postId)

  const response = await fetch(`http://localhost:3000/api/reply?userId=${userId}&postId=${postId}`)
  const replies = await response.json();

  if (replies.success) {
    // console.log(replies.resOnePost[0])
  } else {
    console.log(replies.message)
  }



  return (

    <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
      {replies.resOnePost ? <Posts key={post.id} post={replies.resOnePost[0]} userId={userId} /> : <div>This post not exists</div>}

      {replies.res.map((reply) => (
        <Replies key={reply.id} reply={reply} userId={userId} post={post} username={username} />
      ))}

    </div>

  )
}

export default PostStatus