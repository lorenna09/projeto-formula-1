import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const cars = [
  { id: 1, name: "Lamborghini Aventador", country: "Italy" },
  { id: 2, name: "Ferrari SF90", country: "Italy" },
  { id: 3, name: "Bugatti Chiron", country: "France" },
  { id: 4, name: "Porsche 911 Turbo", country: "Germany" },
  { id: 5, name: "McLaren P1", country: "United Kingdom" },
  { id: 6, name: "Nissan GT-R", country: "Japan" },
  { id: 7, name: "Chevrolet Camaro", country: "United States" },
  { id: 8, name: "Ford Mustang", country: "United States" },
  { id: 9, name: "BMW M4", country: "Germany" },
  { id: 10, name: "Audi R8", country: "Germany" },
  { id: 11, name: "Toyota Supra", country: "Japan" },
  { id: 12, name: "Koenigsegg Jesko", country: "Sweden" },
];

const drivers = [
  { id: 1, name: "Brian O'Conner", car: "Nissan GT-R" },
  { id: 2, name: "Dominic Toretto", car: "Dodge Charger" },
  { id: 3, name: "Letty Ortiz", car: "Ford Mustang" },
];

server.get("/cars", async (request, response) => {
  response.type("application/json").code(200);
  return { cars };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    }

    response.type("application/json").code(200);
    return { driver };
  }
);

server.listen({ port: 3333 }, () => {
  console.log("🚗 Server running on port 3333");
});
