import ListProyectos from "@/app/ListProyectos";
import Title from "@/app/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProcesoCompra = () => {
  return (
    <div className="  bg-[#eaeaea]  ">
      <Title title={"Proceso de Compra"} />

      <div className="p-2 lg:container">
        <div className="  grid grid-cols-1 lg:grid-cols-9  p-1 lg:p-10 gap-x-10">
          <div className=" lg:col-span-6 bg-white p-10">
            <div className="   space-y-7 ">
              <p>Los pasos para comprar un inmueble son los siguientes:</p>
              <Accordion type="single" className="text-start" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Cotización</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Visite nuestra oficina de ventas para informarle el
                      diseño, características, acabados, precios y toda la
                      información que requiera y le proporcionaremos la
                      cotización del inmueble que desea adquirir.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Reserva</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Cuando haya elegido el inmueble de su preferencia puede
                      realizar la reserva a través de un deposito o
                      transferencia a la cuenta de JK INMOBILIARIA cuyo número
                      se lo proporcionará cualquiera de los representantes de la
                      oficina de ventas, con la constancia de depósito, la
                      definición del precio de venta y la modalidad de compra al
                      crédito o contado se elabora el documento de reserva, que
                      será firmado por el comprador y el representante legal de
                      la empresa, el mismo que servirá como compromiso para no
                      ofrecer el inmueble elegido durante 15 días, periodo
                      durante el cual se deberá tramitar la aprobación del carta
                      de crédito por el banco que financia el proyecto.
                    </p>
                    <p className="text-justify">
                      Una vez aprobado el crédito hipotecario el monto de la
                      reserva pasa a ser parte de la inicial, en caso de no
                      aprobar el crédito se devuelve el dinero en un plazo
                      máximo de 30 días previa presentación de la carta de
                      negación de crédito del banco.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Financiamiento </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <p className="text-justify">
                        Si eligió la modalidad de compra del inmueble mediante
                        crédito hipotecario del banco que financia el proyecto,
                        deberá presentar al asesor a cargo del trámite
                        hipotecario los siguientes requisitos:
                      </p>
                      <ul>
                        <li>
                          Para dependiente, tres últimas boletas de ingresos,
                          recibo de agua o Luz y copia de DNI
                        </li>
                        <li>
                          Para independiente, PDT, recibo de agua o Luz y copia
                          de DNI
                        </li>
                      </ul>
                      <p className="text-justify">
                        Si el cliente opta por pagar al contado, deberá pagar un
                        porcentaje a la firma de la minuta y lo restante hasta
                        un mes antes de la fecha de entrega. El porcentaje será
                        determinado con el ejecutivo de ventas.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Firma de la Minuta </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Una vez aprobado el crédito hipotecario, el cliente deberá
                      depositar la cuota inicial a la cuenta de JK INMOBILIARIA,
                      el voucher debe ser escaneado y enviado al ejecutivo de
                      ventas para la firma de minuta.
                    </p>
                    <p className="text-justify">
                      Con la aprobación hipotecaria, se debe firmar la minuta de
                      Compra-Venta para ello el cliente deberá depositar el
                      monto establecido como cuota inicial a la cuenta de JK
                      INMOBILIARIA y presentar el voucher al momento de la firma
                      de la minuta.
                    </p>
                    <p className="text-justify">
                      En la minuta de Compra Venta ambas partes se comprometen a
                      comprar y a vender dejando establecido el precio,
                      condiciones de pago, fecha de entrega del inmueble y plazo
                      de firma de la escritura.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Firma de la escritura </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Firmada la minuta, esta será remitida al Banco que aprobó
                      el crédito, quien se comunicará con el cliente a fin de
                      informarle los pagos respectivos de tasación, gastos
                      notariales, registrales, firma de contrato de crédito y
                      escritura en la notaria correspondiente. El plazo máximo
                      para la firma de la escritura es de 30 días calendario.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Entrega del inmueble</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      La administración de JK INMOBILIARIA comunica mediante
                      correo y via telefónica la fecha de entrega del inmueble a
                      los propietarios en una fecha y horario a convenir de
                      Lunes a viernes de 9:00 a 17:00 hrs. o sabado de 10:00 a
                      14:00 pm, en el lugar de la entrega le esperará el
                      representante de la Administración, quien revisará el
                      estado del inmueble y firmará un Acta de Entrega.
                    </p>
                    <p className="text-justify">
                      En el mismo acto, se entregará copia del Acta de entrega,
                      Planos, Manual del Propietario, el cual contiene las
                      indicaciones sobre el uso, mantención y garantía del
                      inmueble. El conocimiento del manual y la aplicación de
                      cada uno de los consejos, garantizarán la conservación
                      óptima de su inmueble a lo largo de los años.
                    </p>
                    <p className="text-justify">
                      Los clientes que han comprado al contado deben cancelar
                      todas sus cuotas con anterioridad para poder gestionar la
                      entrega de su inmueble.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <>
            <ListProyectos />
          </>
        </div>
      </div>
    </div>
  );
};

export default ProcesoCompra;
