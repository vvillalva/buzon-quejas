import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import InputError from "../input-error";
import { FormEventHandler } from "react";

interface TipoViolencia{
  id: number;
  nombre: string;
}
interface FormularioProps{
  tipoViolencia: TipoViolencia[]
}

export default function FormularioBuzon({ tipoViolencia }:FormularioProps) {
  const { data, setData, errors, post, processing, reset } = useForm({
    nombre: "",
    correo: "",
    tel: "",
    tipo_violencia: "",
    mensaje: "",
    estatus: "pendiente"
  })

  const createQueja: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('buzon.store'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="w-full ">
      <form onSubmit={createQueja} className="flex flex-col gap-4 ">
        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <Label>Nombre o seudónimo (Opcional)</Label>
          <Input
            name="nombre"
            value={data.nombre}
            onChange={e => setData('nombre', e.target.value)}
            placeholder="Escribe tu nombre"
          />
          <small className="text-neutral-400 italic">*Si tu queja es anonima, por favor deja el espacio en blanco.</small>
        </div>
        {/* Correo */}
        <div className="flex flex-col gap-1">
          <Label>Correo electrónico*</Label>
          <Input
            name="correo"
            type="email"
            placeholder="ej. correo@gmail.com"
            value={data.correo}
            onChange={e => setData('correo', e.target.value)}
            required
          />
          <InputError message={errors.correo} />
        </div>
        {/* Numero telefonico */}
        <div className="flex flex-col gap-1">
          <Label>Número telefónico*</Label>
          <Input
            name="tel"
            type="tel"
            maxLength={10}
            required
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Ej. 5512345678"
            value={data.tel}
            onChange={e => setData('tel', e.target.value.replace(/[^0-9]/g, ""))}
          />
          <InputError message={errors.tel} />
        </div>
        {/* Tipo de violencia */}
        <div className="flex flex-col gap-1">
          <Label>Tipo de Violencia*</Label>
          <Select
            value={data.tipo_violencia}
            onValueChange={value => setData('tipo_violencia', value)}
            required
            name="tipoViolencia"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tipoViolencia.map(opcion => (
                  <SelectItem key={opcion.id} value={opcion.nombre}>
                    {opcion.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <InputError message={errors.tipo_violencia} />
        </div>
        {/* Relato de los hechos */}
        <div className="flex flex-col gap-1">
          <Label>Descripción detallada*</Label>
          <Textarea
            name="mensaje"
            placeholder="Relata tu caso detalladamente."
            className="min-h-48"
            value={data.mensaje}
            onChange={e => setData('mensaje', e.target.value)}
            required
          />
          <InputError message={errors.mensaje} />
        </div>
        <Button disabled={processing} type="submit" className=" bg-[#96559B] hover:bg-[#c16fc6] dark:text-white">Enviar</Button>
      </form>
    </div>
  )
}
