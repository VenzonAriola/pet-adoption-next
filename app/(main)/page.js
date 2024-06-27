import { Navigation } from '@/components/navigation';
import { Video } from '@/components/video';

export default function Home() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <section className='min-h-screen lg:grid lg:grid-cols-2'>
          <Video videoUrl='/videos/dog-video.mp4' type='Dogs' />

          <div className='hidden lg:block'>
            <Video videoUrl='/videos/cat-video.mp4' type='Cats' />
          </div>
        </section>
      </main>
    </>
  );
}
