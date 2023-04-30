import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useQuery } from "react-query";



export default function Feed() {
    const supabase = useSupabaseClient();

    const [postsList, setPostsList] = useState<Database>([]);


    const {isLoading} = useQuery(
      {
        queryFn: async()=>{
          const {data, error, status } = await supabase
            .from('posts')
            .select('id, profiles(username), content, created_at, edited')

          if(!error)
          {
            console.log(data)
            setPostsList(data);
          }
        }
      }
    )
  

    const feedList = postsList.map((post: Database) => {
      return <Post key={post.id} post={post} />;
    });
  
    return (
      <div className="feed flex max-w-7xl mt-4 w-full flex-column flex-wrap gap-4 ">
        {feedList}
      </div>
    );
  }