import { BRAND_NAME } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-espresso">
      <div className="container-fiord py-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="font-display font-light italic text-[20px] leading-tight text-chalk"
            aria-label={BRAND_NAME}
          >
            {BRAND_NAME}
          </p>
          <p className="mt-2 font-body font-light text-[13px] text-stone">
            Made by hand. Finished by time.
          </p>
        </div>
        <p className="font-body font-light text-[12px] text-stone">
          &copy; 2026 {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
