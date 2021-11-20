
import { getSession } from 'next-auth/client';

export default async (req: any, res: { send: (arg0: { content?: string; error?: string; }) => void; }) => {
  const session = await getSession({req});
  if(session) {
    res.send({
      content: 'welcome to the secret page'
    })
  } else {
    res.send({
      error: 'you need to be signed in'
    })
  }
}