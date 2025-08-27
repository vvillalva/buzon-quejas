interface DatosQuejaProps{
    title: string;
    data: string;
    className?: string
}

export default function DatosQueja({ title, data, className }:DatosQuejaProps) {
  return (
    <div className={`flex flex-col w-3xs ${className}`}>
        <p className='font-semibold'>{title}</p>
        <small className="">{data.charAt(0).toUpperCase() + data.slice(1)}</small>
    </div>
  )
}
