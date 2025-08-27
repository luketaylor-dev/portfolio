'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
})

type FormData = z.infer<typeof Schema>

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>({
    resolver: zodResolver(Schema) as any
  })

  const onSubmit = async (data: FormData) => {
    // Replace with your email/API integration
    alert('Thanks! In a real app this would send an email.\n' + JSON.stringify(data, null, 2))
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-3 py-2" {...register('name')} />
          {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-3 py-2" {...register('email')} />
          {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea rows={6} className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-3 py-2" {...register('message')} />
          {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>}
        </div>
        <button disabled={isSubmitting} className="rounded-xl bg-white text-black px-4 py-2">
          {isSubmitting ? 'Sending…' : 'Send'}
        </button>
        {isSubmitSuccessful && <p className="text-sm text-emerald-400">Thanks — I’ll be in touch.</p>}
      </form>
    </div>
  )
}
