import { Request, Response } from 'express'
const { getCarsService, addCarService, editCarService, deleteCarService } = require('../services/cars')
import cloudinary from 'cloudinary';
cloudinary.v2.config({
  cloud_name: 'dgmaqimy2',
  api_key: "799524574536351",
  api_secret: 'QyvuReMP_uWMtbEDHcmi2GIyxBc'
});

const getAll = async (req: Request, res: Response) => {
  try {
    const cars = await getCarsService()

    console.log(cars[1])

    res.status(200).json({
      status: true,
      message: "success",
      data: cars
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "server error"
    })
  }
}

const addCar = async (req: Request, res: Response) => {
  const { plate, manufacture, model, rentPerDay, capacity, description, availableAt, transmission, available, type, year, created_by, updated_by } = req.body;

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileBase64 = req.file.buffer.toString('base64');
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  try {
    const result = await cloudinary.v2.uploader.upload(file);
    const image_url = result.url;

    const data = {
      plate, manufacture, model, image: image_url, rentPerDay, capacity, description, availableAt, transmission, available, type, year, created_by, updated_by
    };

    await addCarService(data);

    console.log(`Input data success, data: ${JSON.stringify(data)}`)
    res.status(200).json({
      status: true,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error"
    });
  }
};

// const editCar = async (req: Request, res: Response) => {
//   const { id } = req.params
//   const data = req.body
//   try {
//     const updated = await editCarService(id, data)

//     if (updated === true) {
//       res.status(200).json({
//         status: true,
//         message: "success",
//       })
//     } else {
//       res.status(400).json({
//         status: true,
//         message: "bad request",
//         error: updated
//       })
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       status: false,
//       message: "server error"
//     })
//   }
// }

// const editCar = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   let data = req.body;

//   try {
//     if (req.file) {
//       const fileBase64 = req.file.buffer.toString('base64');
//       const file = `data:${req.file.mimetype};base64,${fileBase64}`;

//       const result = await cloudinary.v2.uploader.upload(file);
//       const image_url = result.url;

//       data = {
//         ...data,
//         image: image_url
//       };
//     } else if (!req.file) {
//       data = {
//         ...data,
//         image: data.image
//       };
//     }

//     const updated = await editCarService(id, data);

//     if (updated === true) {
//       res.status(200).json({
//         status: true,
//         message: "success",
//       });
//     } else {
//       res.status(400).json({
//         status: false,
//         message: "bad request",
//         error: updated
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: false,
//       message: "server error"
//     });
//   }
// };

const editCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  let data = req.body;

  if (!req.file) {
    data = {
      ...data
    };

    const updated = await editCarService(id, data);

    if (updated === true) {
      return res.status(200).json({
        status: true,
        message: "success"
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "bad request",
        error: updated
      });
    }
  }

  const fileBase64 = req.file.buffer.toString('base64');
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  try {
    const result = await cloudinary.v2.uploader.upload(file);

    data = {
      ...data,
      image: result.secure_url
    };
    
    const updated = await editCarService(id, data);

    if (updated === true) {
      res.status(200).json({
        status: true,
        message: "success",
        data: {
          image: result.secure_url,
        },
      });
    } else {
      res.status(400).json({
        status: false,
        message: "bad request",
        error: updated
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error"
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await deleteCarService(id)

    if (result === 1) {
      return res.status(200).json({
        status: true,
        message: "success"
      })
    } else {
      return res.status(404).json({
        status: false,
        message: `can't find car with id ${id}!`
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: "server error"
    })
  }
}

export {
  getAll,
  addCar,
  editCar,
  deleteCar
}