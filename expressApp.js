
import express from 'express';

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to Vehicle Management System');
});

// Sample vehicle records
let vehicles = [
    {
        id: 1,
        vehicleName: "Hyundai Creta",
        vehicleNumber: "HR26AB1234",
        type: "SUV",
        price: 1500000
    },
    {
        id: 2,
        vehicleName: "Maruti Swift",
        vehicleNumber: "DL8CAF5030",
        type: "Hatchback",
        price: 750000
    },
    {
        id: 3,
        vehicleName: "Tata Nexon",
        vehicleNumber: "UP16AB1234",
        type: "SUV",
        price: 1200000
    }
];

// 1. GET - Display all vehicles
app.get('/vehicles', (req, res) => {
    res.status(200).json(vehicles);
});

// 2. GET - Display vehicle by ID
app.get('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);

    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    res.status(200).json(vehicle);
});

// 3. POST - Add new vehicle
app.post('/vehicles', (req, res) => {
    const { id, vehicleName, vehicleNumber, type, price } = req.body;

    if (!Number.isInteger(id) || id <= 0 ||
        !vehicleName || !vehicleNumber || !type ||
        typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            message: "Invalid vehicle details"
        });
    }

    const existing = vehicles.find(v => v.id === id);

    if (existing) {
        return res.status(400).json({
            message: "Vehicle ID already exists"
        });
    }

    const newVehicle = {
        id,
        vehicleName,
        vehicleNumber,
        type,
        price
    };

    vehicles.push(newVehicle);

    res.status(201).json({
        message: "Vehicle added successfully",
        vehicle: newVehicle
    });
});

// 4. PUT - Update vehicle
app.put('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);

    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    const { vehicleName, vehicleNumber, type, price } = req.body;

    if (!vehicleName || !vehicleNumber || !type ||
        typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            message: "Invalid vehicle details"
        });
    }

    vehicle.vehicleName = vehicleName;
    vehicle.vehicleNumber = vehicleNumber;
    vehicle.type = type;
    vehicle.price = price;

    res.status(200).json({
        message: "Vehicle updated successfully",
        vehicle: vehicle
    });
});

// 5. DELETE - Delete vehicle
app.delete('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = vehicles.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    vehicles.splice(index, 1);

    res.status(200).json({
        message: "Vehicle deleted successfully"
    });
});

// Start server
app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
