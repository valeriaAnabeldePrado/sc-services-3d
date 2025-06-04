
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ypf from "/YPF2.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Branding Estratégico y Naming",
    description:
      "Creamos la identidad completa de tu proyecto inmobiliario desde cero: nombre, logo, estética visual, tono de comunicación y estilo. No solo diseñamos, sino que pensamos estratégicamente cómo conectar con tu público objetivo y transmitir confianza desde el primer segundo.",
    image: ypf,
  },
  {
    title: "Desarrollo de Producto Digital para Preventa",
    description:
      "Diseñamos y desarrollamos la experiencia digital necesaria para que puedas vender incluso antes de construir. Sitios web, renders, recorridos virtuales y materiales de presentación que muestran la propiedad como si ya existiera. Ideal para ventas en pozo o propiedades premium.",
    image: ypf,
  },
  {
    title: "Recorridos Inmersivos y Contenido 3D Interactivo",
    description:
      "Ofrecemos experiencias inmersivas en 3D navegables desde cualquier dispositivo, donde tus clientes pueden recorrer la propiedad, cambiar acabados y visualizar espacios reales antes de existir. Esto aumenta la retención y mejora las decisiones de compra.",
    image: ypf,
  },
];



export const Features = () => {
  return (
    <section
      id="services"
      className="container py-24 sm:py-32 space-y-"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
      Del concepto a la experiencia: {""}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        branding, digital y 3D
        </span>
      </h2>

      

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

           
          </Card>
        ))}
      </div>
  
    </section>
  );
};
