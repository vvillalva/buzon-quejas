import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


export default function FormularioBuzon() {
  const form = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      tel: "",
      tipoViolencia: "",
      relato: "",
    }
  })

  const onSubmit = (data: any) => {
    // Aquí harás el POST a tu endpoint de Laravel (puedes usar Inertia.post, fetch, axios, etc)
    console.log(data);
  };
  return (
    <div className="w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
          {/* Nombre */}
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre o seudónimo (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Escribe tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Correo */}
          <FormField
            control={form.control}
            name="correo"
            rules={{
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Correo inválido, por favor intenta de nuevo.",
              },
              required: "El correo es obligatorio, por favor ingresa tu correo."
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electronico*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ej. correo@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Numero telefonico */}
          <FormField
            control={form.control}
            name="tel"
            rules={{
              required: "El número telefónico es obligatorio, por favor ingresa uno.",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Debe ser un número de 10 dígitos (sólo números)",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número telefónico*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. 5512345678"
                    type="tel"
                    maxLength={10}
                    inputMode="numeric"
                    {...field}
                    value={field.value ?? ""} // <- ¡Aquí nunca debe ser undefined!
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const input = e.currentTarget;
                      input.value = input.value.replace(/[^0-9]/g, "");
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Tipo de violencia */}
          <FormField
            control={form.control}
            name="tipoViolencia"
            rules={{
              required: "El tipo de violencia es obligatorio para la queja, por favor selecciona una opción.",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Violencia*</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}                   // <- importante para mantener el valor
                    onValueChange={field.onChange}              // <- así se actualiza en React Hook Form
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Opciones</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Relato de los hechos */}
          <FormField
            control={form.control}
            name="relato"
            rules={{
              required: "La descripción de la queja es obligatoria para generar el reporte.",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción detallada*</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Relata tu caso detalladamente."
                    className="min-h-48"
                  />
                </FormControl>
                <FormDescription>
                  Recuerda redactar de una manera clara y concisa para evitar confuciones.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" bg-[#96559B] hover:bg-[#c16fc6]">Enviar</Button>
        </form>
      </Form>
    </div>
  )
}
