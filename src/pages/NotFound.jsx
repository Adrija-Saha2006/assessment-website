import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <section className="container-page flex flex-1 flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 font-serif text-[56px] leading-none sm:text-[80px]">
        Nothing <em>here.</em>
      </h1>
      <p className="mt-6 max-w-[40ch] text-mist">The page you were looking for doesn&rsquo;t exist.</p>
      <div className="mt-10">
        <Button to="/" arrow>
          Back to home
        </Button>
      </div>
    </section>
  )
}
