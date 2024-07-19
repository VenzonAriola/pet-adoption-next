'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Image from 'next/image';
import { CldImage, CldUploadButton } from 'next-cloudinary';

import { Form } from '@/components/ui/form';

import { Button } from './ui/button';

import { ImagePlus } from 'lucide-react';

import FormFieldInput from './formfield-input';
import FormFieldSelect from './formfield-select';

const PET_TYPE = ['dog', 'cat'];

const formSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: 'Name must be at least 2 and max of 20 characters.',
    })
    .max(20, { message: 'Name must be at least 2 and max of 20 characters.' }),
  age: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({
        required_error: 'Age is required',
        invalid_type_error: 'Age must be a number',
      })
      .nonnegative()
  ),
  breed: z.string().trim().toLowerCase(),
  petType: z.enum(PET_TYPE, { message: 'Invalid input. Expected dog | cat' }),
  ptraits: z.string(),
  photo: z.string(),
  location: z.string(),
});

export function AddPetForm() {
  const [imgUrl, setImgUrl] = useState('');
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      breed: '',
      location: '',
      petType: '',
      ptraits: '',
      photo: '',
    },
  });

  function handleUpload(result) {
    if (
      result.event === 'success' &&
      'secure_url' in result.info &&
      'public_id' in result.info
    ) {
      setImgUrl(result.info.secure_url);
    }
  }

  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    values.photo = imgUrl;

    const res = await fetch('http://localhost:3000/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const { data } = await res.json();
    console.log(data);
  }

  return (
    <>
      <CldUploadButton
        options={{ multiple: true }}
        onUpload={handleUpload}
        uploadPreset='pet-adoption'
        className='dotter mb-8 grid h-[300px] w-full place-items-center overflow-hidden border-2 border-dotted bg-slate-100'
      >
        {!imgUrl ? (
          <ImagePlus />
        ) : (
          <CldImage
            src={imgUrl}
            height={300}
            width={300}
            alt='uploaded image'
            className='w-full'
          />
        )}
      </CldUploadButton>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='row grid grid-cols-1 items-center justify-center gap-4 gap-y-12 md:grid-cols-2'
        >
          <FormFieldInput
            type='name'
            label='Pet name'
            control={form.control}
            placeholder='name'
          />

          <FormFieldInput
            control={form.control}
            type='age'
            label='Age'
            placeholder='age'
          />

          <FormFieldSelect
            type='petType'
            control={form.control}
            label='Pet type'
          />

          <FormFieldInput
            control={form.control}
            type='ptraits'
            label='Pet Trait'
            placeholder='trait'
          />

          <FormFieldInput
            control={form.control}
            type='breed'
            label='Breed'
            placeholder='breed'
          />

          <FormFieldInput
            control={form.control}
            type='location'
            label='Location'
            placeholder='location'
          />

          <Button type='submit' className='col-span-2 w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
