const Car = require("../../infraestructure/car.model");

// Function to read the full data of an individual Car.
async function getCar(id) {
  try {
    return await Car.findById(id);
  } catch (err) {
    return { message: err.message };
  }
}

// Function to create a Car from a JSON with all the information needed
async function createCar(carData) {
  try {
    const car = new Car({
      brand: carData.brand,
      color: carData.color,
      horsePower: carData.horsePower,
      licensePlate: carData.licensePlate,
      registrationDate: carData.registrationDate
    });
    return await car.save();
  } catch (err) {
    return { message: err.message };
  }
}

// Function to delete a Car from the id
async function deleteCar(id) {
  try {
    const result = await Car.findByIdAndRemove(id);
    return result
      ? { message: "Deleted car" }
      : { message: "Cannot find car to delete" };
  } catch (err) {
    return { message: err.message };
  }
}

// Function to update single properties of a single Car (not a full replace operation!) from the id
async function updateCar(id, newData) {
  try {
    const carToUpdate = await Car.findById(id);
    if (!carToUpdate || carToUpdate == null)
      return { message: "Cannot find car to update" };
    // Update only each property it is needed
    if (newData.brand != null) carToUpdate.brand = newData.brand;
    if (newData.color != null) carToUpdate.color = newData.color;
    if (newData.horsePower != null) carToUpdate.horsePower = newData.horsePower;
    if (newData.licensePlate != null)
      carToUpdate.licensePlate = newData.licensePlate;
    if (newData.plateNumberDate != null)
      carToUpdate.plateNumberDate = newData.plateNumberDate;
    return await carToUpdate.save();
  } catch (err) {
    return { message: err.message };
  }
}

// Function to read only the meta-data of all cars.
async function getAllCarsMetadata() {
  try {
    const query = Car.find({}, "_id __v createdAt");
    query.setOptions({ lean: false });
    query.collection(Car.collection);
    return await query.exec();
  } catch (err) {
    return { message: err.message };
  }
}

module.exports = {
  getCar,
  createCar,
  deleteCar,
  updateCar,
  getAllCarsMetadata
};
