import "reflect-metadata";
import { Employee } from "./entity/Employee";
import { AppDataSource } from "./data-source";

const employees = [
  { remote_id: "22", firstName: "John", lastName: "Doe" },
  { remote_id: "42", firstName: "Alice", lastName: "Bob" },
];

const run = async () => {
  await AppDataSource.initialize();

  const employeeRepository = AppDataSource.getRepository(Employee);

  for (const employeeData of employees) {
    const existingEmployee = await employeeRepository.findOneBy({
      remote_id: employeeData.remote_id,
    });
    if (!existingEmployee) {
      const newEmployee = employeeRepository.create(employeeData);
      await employeeRepository.save(newEmployee);
    } else {
      console.log(
        `Skipped: ${employeeData.firstName} ${employeeData.lastName}`
      );
    }
  }

  await AppDataSource.destroy();
};

run().catch((error) => console.log(error));
