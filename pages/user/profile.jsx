import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import axios from 'axios';

import Profile from '../../components/User/Profile';

export default function ProfilePage() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;
  console.log(session);
  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }
  return (
    <Profile session={session}/>
  );
}