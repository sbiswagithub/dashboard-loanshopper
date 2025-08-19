import propertiesData from "../../../data/properties.json";
import PropertyDetailClient from "./PropertyDetailClient";

export function generateStaticParams() {
  return propertiesData.map((property) => ({
    id: property.id.toString(),
  }));
}

const PropertyDetailPage = async ({ params }) => {
  const { id } = await params;

  const property = propertiesData.find((p) => p.id.toString() === id);

  if (!property) {
    return (
      <div
        className="container-fluid py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <p className="text-muted text-center">Property not found.</p>
      </div>
    );
  }

  return <PropertyDetailClient property={property} />;
};

export default PropertyDetailPage;
