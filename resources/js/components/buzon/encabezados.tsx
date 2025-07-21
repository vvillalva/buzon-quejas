interface EncabezadoProps{
    title: string;
    subtitle: string;
}

export default function Encabezados({title="Lorem ipsum dolor", subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."}: EncabezadoProps) {
    return (
        <div className='flex flex-col gap-1'>
            <h1 className='font-semibold text-3xl text-neutral-700'>{title}</h1>
            <small className='text-neutral-600'>{subtitle}</small>
        </div>
    )
}
