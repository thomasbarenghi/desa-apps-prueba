import type { User } from "../types/user"

export const MOCK_USER: User = {
  id: 1,
  email: "juan.perez@unahur.edu.ar",
  role: "client",
  firstName: "Juan",
  lastName: "Pérez",
  phone: "+54 11 5555-1234",
  active: true,
  createdAt: new Date().toISOString(),
}
