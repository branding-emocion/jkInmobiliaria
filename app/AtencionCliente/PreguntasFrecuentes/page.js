import ListProyectos from "@/app/ListProyectos";
import Title from "@/app/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const PreguntasFrecuentes = () => {
  return (
    <div className="  bg-[#eaeaea]  ">
      <Title title={"Preguntas Frecuentes"} />

      <div className="p-2 lg:container">
        <div className="  grid grid-cols-1 lg:grid-cols-9  p-1 lg:p-10 gap-x-10">
          <div className=" lg:col-span-6 bg-white p-10">
            <div className="   space-y-7 ">
              <Accordion type="single" className="text-start" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    ¿Cuáles son los cuidados que se deben tener con las
                    instalaciones y acabados de los departamentos?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    El comprar en preventa es conveniente ya que se obtiene un
                    ahorro en el precio de venta ya que a medida que se vaya
                    construyendo el precio va en aumento, así mismo permite
                    fraccionar el pago de la inicial hasta el inicio de la
                    construcción, por otro lado, se obtiene la posibilidad de
                    tener mayores opciones para personalizar el modelo del
                    departamento sin alterar el diseño estructural del edificio.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    ¿Puedo sacar mi crédito hipotecario con un banco diferente
                    al que financia el proyecto?
                  </AccordionTrigger>
                  <AccordionContent>
                    Si, puedes tramitar tu crédito en otro banco, pero deberás
                    pagar el costo de una carta fianza que garantiza el
                    desembolso del crédito de tu banco. El costo de la carta
                    fianza varía de acuerdo con el monto del préstamo
                    hipotecario y depende de cada proyecto, el porcentaje de
                    costo lo establece el banco que financia el proyecto.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    ¿Qué es y cuánto debo pagar de cuota inicial?
                  </AccordionTrigger>
                  <AccordionContent>
                    La cuota inicial es una porción del valor del inmueble que
                    paga el comprador del precio de la propiedad que adquiere.
                    Dicho monto depende de la evaluación que hace el banco y
                    puede variar desde el 10% a más dependiendo de la capacidad
                    de pago que tenga el cliente, la diferencia del valor del
                    inmueble es el préstamo que le dará el banco mediante
                    crédito hipotecario.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    ¿Los departamentos se venden en soles o dólares?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    La venta de los departamentos es en dólares o en soles,
                    previa coordinación con los asesores de ventas se acuerda el
                    tipo de cambio en los casos que el cliente los prefiera en
                    soles.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    ¿Desde cuándo comienzo a pagar los gastos de mi propiedad?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc">
                      <li>
                        Los gastos de mantenimiento, servicios públicos como
                        luz, agua, teléfono, internet, arbitrios municipales y
                        cualquier otro servicio que genere el departamento será
                        asumido por los propietarios desde el día siguiente de
                        la recepción del departamento o de la comunicación donde
                        se pone a disposición.
                      </li>
                      <li>
                        El impuesto predial será asumido por el propietario a
                        partir del año siguiente de recepcionado el
                        departamento.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    ¿En caso de tener algún inconveniente o desperfecto en mi
                    departamento con quién me comunico?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    Toda atención de posventa se realiza enviando un correo
                    electrónico a{" "}
                    <a href="mailto:posventa@jkinversiones.com">
                      posventa@jkinversiones.com
                    </a>
                    , para casos de emergencia que no pueden esperar deberán
                    comunicarse de inmediato a nuestro teléfono 01 7433661 Anexo
                    102.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7 ">
                  <AccordionTrigger>
                    ¿Qué se considera una emergencia, qué hacer en caso se
                    registre alguna?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Se considera Emergencia un problema que se tiene que
                      solucionar a la brevedad como por ejemplo ausencia total
                      de electricidad, fuga de gas, falla de ascensor con
                      personas adentro, fugas de agua que puedan dañar los
                      acabados del departamento o cualquier circunstancia que
                      ponga en peligro la integridad de las personas.
                    </p>
                    <p>
                      En estos casos deberá comunicarse al teléfono 01 7433661
                      anexo 102
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8 ">
                  <AccordionTrigger>
                    ¿Qué desperfectos cubre la garantía de JK INMOBILIARIA y por
                    cuánto tiempo?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Las garantías y plazos de estas están establecidas en el
                      manual del propietario las cuales son otorgadas por cada
                      uno de nuestros proveedores y trasladadas a los
                      propietarios a la fecha de recepción del inmueble o de la
                      recepción de la comunicación poniéndolos a su disposición.
                    </p>
                    <p>
                      Las Garantías cubren defectos de fabrica o de instalación
                      de los acabados del departamento, se debe tener presente
                      que no cubre desperfectos ocasionados por el mal uso de
                      estos.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9 ">
                  <AccordionTrigger>
                    ¿Qué debo tener en cuenta antes de comunicarme con el área
                    de Postventa?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Antes de solicitar atención a postventa deberá verificar
                      que el desperfecto no sea por mal uso del producto en cuyo
                      caso deberá solucionarlo particularmente, si solicita
                      atención y se determina que el desperfecto fue por mal uso
                      se cobrara el costo de la visita y de la reparación de ser
                      el caso.
                    </p>
                    <p>
                      Se debe tener en cuenta que si solicitan atención
                      coordinando la hora y el día y el personal no es atendido,
                      la siguiente visita será facturada al propietario.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                  <AccordionTrigger>
                    ¿Cuáles son los cuidados que se deben tener con las
                    instalaciones y acabados de los departamentos?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Debido a que es un bien inmueble de estreno, es necesario
                      que se familiaricen con el uso y cuidados que se
                      requieren. Deben leer cuidadosamente el manual del
                      propietario y seguir las recomendaciones de uso y
                      mantenimiento contenidas en el y en los manuales de los
                      fabricantes.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-11">
                  <AccordionTrigger>
                    ¿Las paredes y techos de mi departamento podrían fisurarse?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Pequeñas fisuras y grietas suelen aparecer en las nuevas
                      edificaciones, estas se califican como normales, en toda
                      edificación nueva, las fisuras pequeñas suelen aparecer en
                      las paredes, las cuales aparecen debido al reacomodo de
                      las cargas de mobiliario al ocuparse el edificio, además
                      en los primeros años de toda edificación, el concreto y
                      los morteros se asientan definitivamente, los materiales
                      terminan de fraguar y eliminar el agua, también la
                      exposición de una nueva construcción a las condiciones
                      ambientales (cambios de temperatura).
                    </p>
                    <p>
                      Así se comportan las construcciones nuevas sin excepción.
                      Estas se estabilizan luego de un tiempo generalmente al
                      año.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-12">
                  <AccordionTrigger>
                    ¿Si verifico algún inconveniente en las áreas comunes a
                    quién presento el reclamo?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      Los propietarios deben nombrar a un representante de la
                      Junta de Propietarios quien los representara ante la
                      constructora en la recepción de las áreas comunes y
                      canalizara todas las coordinaciones para la atención de
                      sus observaciones enviando al correo de
                      <span>
                        <a href="mailto:posventa@jkinversiones.com">
                          posventa@jkinversiones.com
                        </a>{" "}
                        su requerimiento.
                      </span>
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-13">
                  <AccordionTrigger>
                    ¿Puedo realizar una modificación al interior de mi
                    propiedad?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify">
                      No se deben realizar modificaciones al interior del
                      departamento que puedan alterar el diseño entregado por
                      dos motivos, para mantener las garantías sobre los
                      acabados entregados y así mismo luego de la entrega física
                      del inmueble la inmobiliaria continua con la obtención de
                      la documentación por lo cual es necesario mantener la
                      edificación conforme ha sido prevista en la licencia de
                      obra por parte de la municipalidad distrital competente.
                    </p>
                    <p className="text-justify">
                      Toda modificación que se haga debe contar con la
                      respectiva licencia municipal.
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

export default PreguntasFrecuentes;
