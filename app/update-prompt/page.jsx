"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams} from 'next/navigation';


import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({ 
        prompt: data.prompt,
        tag: data.tag
      })
    }
    if(promptId) getPromptDetails();
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })

      if(response.ok) {
        router.push('/'); //push back to homepage 
      }

    } catch(error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

  }

  if(status === "unauthenticated") {
    return <p>You are not authorized to view this page. Please Sign In.</p>
  }

  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt