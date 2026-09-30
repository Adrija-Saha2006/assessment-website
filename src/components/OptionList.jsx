import { OPTION_KEYS } from '../data/questions.js'

// Four answer options rendered as a native radio group, styled as full-width rows.
export default function OptionList({ questionId, options, selected, onSelect }) {
  const name = `question-${questionId}`
  return (
    <fieldset className="border-t border-line">
      <legend className="sr-only">Choose one answer</legend>
      {OPTION_KEYS.map((key) => {
        const isSelected = selected === key
        return (
          <label
            key={key}
            className={`group relative flex cursor-pointer items-start gap-5 border-b py-5 pr-2 transition-colors duration-200 sm:gap-7 sm:py-6 ${
              isSelected ? 'border-line bg-white/[0.07]' : 'border-line hover:bg-white/[0.025]'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={key}
              checked={isSelected}
              onChange={() => onSelect(key)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={`absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-sky via-lilac to-rose ${isSelected ? 'block' : 'hidden'}`}
            />
            <span
              aria-hidden="true"
              className={`ml-3 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border text-[13px] font-medium sm:ml-4 ${
                isSelected
                  ? 'border-paper bg-paper text-ink'
                  : 'border-line-strong text-mist group-hover:border-paper group-hover:text-paper'
              }`}
            >
              {key}
            </span>
            <span className={`pt-1 text-[17px] leading-snug sm:text-[19px] ${isSelected ? 'text-paper' : 'text-paper/85'}`}>
              {options[key]}
            </span>
            {isSelected && (
              <span className="ml-auto hidden shrink-0 pt-1.5 text-[11px] uppercase tracking-[0.2em] text-mist sm:block">
                Selected
              </span>
            )}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden outline-1 outline-offset-[-1px] outline-paper peer-focus-visible:block"
            />
          </label>
        )
      })}
    </fieldset>
  )
}
