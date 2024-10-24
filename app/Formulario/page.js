"use client";
import { useState } from "react"; // Importa useState
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Hompage = () => {
  const [inputValues, setInputValues] = useState({
    ruc: "20522572714",
    direccionFiscal: "Av. Circunvalación Golf Los Incas N° 206 Int. 803",
    tipoDocumento: "dni",
    // mailEmpresa: "ventas@jkinmobiliaria.com",
    esMenor: false, // Nuevo estado para detectar si es menor de edad
  });
  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      esMenor: checked,
    }));
  };

  const handleFileChange = (e) => {
    // Handle file attachment logic here
  };

  return (
    <div className="bg-gray-50 ">
      <Title title={`Libro de reclamaciones`} image="/bannerjk1.jpg" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
            const SendMailData = await fetch("/api/SendMailForm", {
              method: "POST",
              body: JSON.stringify(inputValues),
            }).then((res) => res.json());

            alert(SendMailData?.message);

            console.log(SendMailData);
          } catch (error) {
            alert(
              "intente nuevamente si el problema persiste contacta con nosotros"
            );
          } finally {
            setLoading(false);
          }
        }}
        className="w-full max-w-4xl mx-auto space-y-6 "
      >
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">
                  Libro de reclamaciones
                </CardTitle>
                <CardDescription>www.jkinmobiliaria.com</CardDescription>
              </div>
              {/* <div className=" bg-gray-200 flex items-center justify-center">
                <img
                  src="/logo1.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div> */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ruc">RUC</Label>
                <Input
                  id="ruc"
                  name="ruc"
                  value={inputValues.ruc}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccionFiscal">Dirección Fiscal</Label>
                <Input
                  id="direccionFiscal"
                  name="direccionFiscal"
                  value={inputValues.direccionFiscal}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Fecha">{}</Label>
                <Input
                  id="Fecha"
                  name="Fecha"
                  value={new Date().toLocaleDateString()}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="text-sm text-orange-600 border border-orange-300 rounded p-2">
              * Los Reclamos y quejas recibidas en este libro se atenderán en
              relación a las ventas realizadas en la tienda virtual y física de
              www.jkinmobiliaria.com. Si realizó la compra en otro distribuidor,
              deberá ingresar su reclamo a través del mismo punto de venta o
              acceder a través de su página web.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Datos de la persona que presenta el reclamo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                  <Select
                    id="tipoDocumento"
                    name="tipoDocumento"
                    value={inputValues.tipoDocumento}
                    onChange={(e) =>
                      handleChange({
                        tipoDocumento: e,
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="Ti">Tarjeta de Identidad</SelectItem>
                      <SelectItem value="ce">Carné de Extranjería</SelectItem>
                      <SelectItem value="pasaporte">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numeroDocumento">Nro. de Documento</Label>
                  <Input
                    id="numeroDocumento"
                    name="numeroDocumento"
                    value={inputValues.numeroDocumento}
                    onChange={handleChange}
                    placeholder="Ingrese su número de documento"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres</Label>
                  <Input
                    id="nombres"
                    name="nombres"
                    value={inputValues.nombres}
                    onChange={handleChange}
                    placeholder="Ingrese sus nombres"
                    required
                  />

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="Menor"
                      name="Menor"
                      checked={inputValues.esMenor}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="Menor" className="text-sm">
                      Eres menor de edad ?
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos </Label>
                  <Input
                    id="apellidos"
                    name="apellidos"
                    value={inputValues.apellidos}
                    onChange={handleChange}
                    placeholder="Ingrese sus apellidos "
                    required
                  />
                </div>

                {inputValues.esMenor && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="nombreTutor">Nombre del Tutor</Label>
                      <Input
                        id="nombreTutor"
                        name="nombreTutor"
                        value={inputValues.nombreTutor}
                        onChange={handleChange}
                        placeholder="Ingrese el nombre del tutor"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipoDocumentoTutor">
                        Tipo de Documento del Tutor
                      </Label>
                      <Select
                        id="tipoDocumentoTutor"
                        name="tipoDocumentoTutor"
                        value={inputValues.tipoDocumentoTutor}
                        onValueChange={(value) =>
                          setInputValues((prevValues) => ({
                            ...prevValues,
                            tipoDocumentoTutor: value,
                          }))
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dni">DNI</SelectItem>
                          <SelectItem value="ce">
                            Carné de Extranjería
                          </SelectItem>
                          <SelectItem value="pasaporte">Pasaporte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numeroDocumentoTutor">
                        Número de Documento del Tutor
                      </Label>
                      <Input
                        id="numeroDocumentoTutor"
                        name="numeroDocumentoTutor"
                        value={inputValues.numeroDocumentoTutor}
                        onChange={handleChange}
                        placeholder="Ingrese el número de documento del tutor"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={inputValues.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={inputValues.telefono}
                    onChange={handleChange}
                    placeholder="Ingrese su número de teléfono"
                    required
                  />
                </div>
                <div className="space-y-2 ">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    value={inputValues.direccion}
                    onChange={handleChange}
                    placeholder="Ingrese su dirección"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Identificación del bien contratado
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {/* <div className="space-y-2">
                  <Label htmlFor="tiendaCompra">Tienda de compra</Label>
                  <Select
                    id="tiendaCompra"
                    name="tiendaCompra"
                    value={inputValues.tiendaCompra}
                    onChange={(e) =>
                      handleChange({
                        target: { name: "tiendaCompra", value: e.target.value },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la tienda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Tienda Online</SelectItem>
                      <SelectItem value="fisica">Tienda Física</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="tipoBien">Tipo del bien contratado</Label>
                  <Select
                    id="tipoBien"
                    name="tipoBien"
                    value={inputValues.tipoBien}
                    onChange={(e) =>
                      handleChange({
                        target: { name: "tipoBien", value: e.target.value },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de bien" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="producto">Producto</SelectItem>
                      <SelectItem value="servicio">Servicio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Detalle de la Reclamación y Pedido del Consumidor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              name="tipoSolicitud"
              value={inputValues.tipoSolicitud}
              onValueChange={(value) =>
                handleChange({ target: { name: "tipoSolicitud", value } })
              }
              className="flex space-x-4"
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reclamo" id="reclamo" />
                <Label htmlFor="reclamo">Reclamo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="queja" id="queja" />
                <Label htmlFor="queja">Queja</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="Detalle">Detalle *</Label>
              <Textarea
                id="Detalle"
                name="Detalle"
                value={inputValues.Detalle}
                onChange={handleChange}
                placeholder="Ingrese el detalle de su reclamo o queja"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Pedido">Pedido *</Label>
              <Textarea
                id="Pedido"
                name="Pedido"
                value={inputValues.Pedido}
                onChange={handleChange}
                placeholder="Ingrese su pedido"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Observaciones y acciones adoptadas por el proveedor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Fecha de comunicación de la respuesta:{" "}
              <strong>
                {/* un mes apartir de la fecha actual  */}
                {new Date(
                  new Date().setMonth(new Date().getMonth() + 1)
                ).toLocaleDateString()}
              </strong>
            </p>
            <p>
              Descripción: Al ser un «reclamo virtual», su caso será derivado al
              área de atención al cliente, a fin de dar respuesta dentro del
              plazo legalmente establecido.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Autorizo notificación del resultado del reclamo al correo
              consignado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              name="authorizeEmail"
              value={inputValues.authorizeEmail}
              onValueChange={(value) =>
                handleChange({ target: { name: "authorizeEmail", value } })
              }
              required
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="authorize-yes" />
                <Label htmlFor="authorize-yes">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="authorize-no" />
                <Label htmlFor="authorize-no">No</Label>
              </div>
            </RadioGroup>
            <div className="space-y-4 mt-6">
              <p className="text-sm text-gray-500">(*) Campos obligatorios</p>
              <p className="text-sm">
                * La formulación del reclamo no impide acudir a otras vías de
                solución de controversias ni es requisito previo para interponer
                una denuncia ante el INDECOPI.
              </p>
              <p className="text-sm">
                * El proveedor deberá dar respuesta al reclamo en un plazo no
                mayor a treinta (30) días calendario, pudiendo ampliar el plazo
                hasta por treinta (30) días más, previa comunicación al
                consumidor.
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptPrivacyPolicy"
                  name="acceptPrivacyPolicy"
                  checked={inputValues.acceptPrivacyPolicy}
                  onCheckedChange={(checked) =>
                    handleChange({
                      target: { name: "acceptPrivacyPolicy", checked },
                    })
                  }
                  required
                />
                <Label htmlFor="acceptPrivacyPolicy">
                  Acepto las{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Políticas de Privacidad
                  </a>{" "}
                  de jkinmobiliaria.com
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {Loading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : (
          <Button type="submit" className="w-full">
            Enviar Reclamo
          </Button>
        )}
      </form>
    </div>
  );
};

export default Hompage;
