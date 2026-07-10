import express from "express";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";
import foodInTakeModel from "../models/foodInTakeModel.js";

export const router = express.Router();

router.post(
  "/add-food-product",
  jwtMiddleware.jwtTokenIsValid,
  async (req, res) => {
    try {
      const userId = res.locals.jwt.userId;

      const {
        barcode,
        productName,
        productBrand,
        productImage,

        quantityGrams,

        calories,
        carbohydratesGrams,
        fatsGrams,
        proteinGrams,
      } = req.body;

      if (!barcode || !productName || !quantityGrams) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      const today = new Date().toISOString().split("T")[0];

      let foodIntake = await foodInTakeModel.findOne({
        userId,
      });

      // Create user's food document if it does not exist
      if (!foodIntake) {
        foodIntake = await foodInTakeModel.create({
          userId,

          days: [
            {
              date: today,

              products: [],
            },
          ],
        });
      }

      // Find today's entry

      let todayEntry = foodIntake.days.find((day) => day.date === today);

      // Create today if missing

      if (!todayEntry) {
        foodIntake.days.push({
          date: today,
          products: [],
        });

        todayEntry = foodIntake.days[foodIntake.days.length - 1];
      }

      todayEntry.products.push({
        barcode,

        productName,

        productBrand,

        productImage,

        quantityGrams,

        calories,

        carbohydratesGrams,

        fatsGrams,

        proteinGrams,
      });

      await foodIntake.save();

      res.status(201).json({
        message: "Product added",
        foodIntake,
      });
    } catch (error) {
      console.error("Add food product error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  },
);

export default router;
