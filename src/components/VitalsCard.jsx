import arrowDownIcon from '../assets/icons/arrowdown.svg'
import arrowUpIcon from '../assets/icons/arrowup.svg'

function getStatusIcon(status) {
  if (String(status).toLowerCase().includes('lower')) {
    return arrowDownIcon
  }

  return arrowUpIcon
}

function VitalsCard({ title, value, unit, status, iconPath, tone }) {
  return (
    <article className={`rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${tone}`}>
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/85">
        <img src={iconPath} alt="" className="h-8 w-8 object-contain" />
      </div>

      <h3 className="text-sm text-[#072635]">{title}</h3>

      <p className="mt-1 text-[30px] leading-tight font-bold text-[#072635]">
        {value}
        <span className="ml-1 text-lg font-semibold">{unit}</span>
      </p>

      <div className="mt-2 flex items-center gap-1 text-xs text-[#707070]">
        <img src={getStatusIcon(status)} alt="status trend" className="h-2.5 w-2.5" />
        <span>{status}</span>
      </div>
    </article>
  )
}

export default VitalsCard
