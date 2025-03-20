import { createServiceRoleClient } from "@/utils/supabase/serverSecret";

export const getPosts = async () => {
  const supabase = await createServiceRoleClient();
  const { data: posts, error } = await supabase.from("post").select(`
      *, 
      profiles(*)  
    `);
  // console.log("DATA: ", posts);
  // console.log("ERROR: ", error);

  return posts;
};

// export const getLikes = async () => {
//   const supabase = await createServiceRoleClient();
//   const { data, error } = await supabase
//     .from("post")
//     .select(`id, profiles(id, username, full_name), likes`);

//   if (error) {
//     console.log("ERROR FETCHING LIKES: ", error);
//     return { error: error.message };
//   }

//   return data;
// };

export const getLikesCount = async (postId: string) => {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("postid", postId);

  if (error) {
    console.log("failed getting likes: ", error);
    return { error: error.message };
  }

//   console.log(data);
  return data ? data.length : 0;
};

export const isLiked = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("postid", postId)
    .eq("profilesid", userId);

  if(!userId) return

  if(error) {
    console.log("ERRORS on server-components/fetch-data -> isLiked(): ", error)
    return false
  }

  return data.length > 0
};
