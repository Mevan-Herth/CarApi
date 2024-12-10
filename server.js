const express =require("express");
const fs =require("fs");
const bodyParser= require("body-parser");

const app= express();
const PORT = 3000;
const DATA ="cars.json";

let idCounter = 15;

app.use(bodyParser.json());

const readData = () =>{
    if (!fs.existsSync(DATA)){
        fs.writeFileSync(DATA, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DATA,"utf-8"));
};

const writeData = (Data) => {
    fs.writeFileSync(DATA, JSON.stringify(Data, null, 2));
};

//for all cars
app.get("/cars",(req,res)=>{
    const cars = readData();
    res.json(cars);
});

//for one by id
app.get("/cars/:id",(req,res)=>{
    const cars = readData();
    const car =cars.find((c)=>c.id === parseInt(req.params.id))
    if(!car){
        return res.status(404).JSON({error : "Car Not Found"})
    }
    res.json(car);

});

// post new car
app.post("/cars",(req,res)=>{
   
    const cars = readData();

    const newCar = {
        id: idCounter++, 
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
    };

    cars.push(newCar);
    writeData(cars);
    res.status(201).json(newCar);
    
});

app.put("/cars/:id", (req, res) => {
    const cars = readData();
    const index = cars.findIndex((c) => c.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: "Car not found" });
    }
    cars[index] = { ...cars[index], ...req.body };
    writeData(cars);
    res.json(cars[index]);
});

app.delete("/cars/:id", (req, res) => {
    const cars = readData();
    const updatedCars = cars.filter((c) => c.id !== parseInt(req.params.id));
    if (cars.length === updatedCars.length) {
      return res.status(404).json({ error: "Car not found" });
    }
    writeData(updatedCars);
    res.status(204).send();
  });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });