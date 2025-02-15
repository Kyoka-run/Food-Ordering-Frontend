import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  Box,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { updateMenuItem } from "../../redux/actions/menuActions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  image: Yup.string().url("Invalid URL format").required("Image URL is required"),
});

const UpdateMenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { foodId } = useParams();
  const { restaurant, ingredients, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // Find the current menu item
  const currentMenuItem = menu.menuItems.find(item => item.foodId === parseInt(foodId));

  const formik = useFormik({
    initialValues: {
      name: currentMenuItem?.name || "",
      description: currentMenuItem?.description || "",
      price: currentMenuItem?.price || "",
      category: currentMenuItem?.category || "",
      image: currentMenuItem?.image || "",
      vegetarian: currentMenuItem?.vegetarian || false,
      seasonal: currentMenuItem?.seasonal || false,
      ingredients: currentMenuItem?.ingredients || [],
    },
    validationSchema,
    onSubmit: (values) => {
      values.restaurantId = restaurant.usersRestaurant.restaurantId;
      dispatch(updateMenuItem({ menuItem: values, foodId, jwt }));
      navigate("/admin/restaurant/menu");
    },
  });

  return (
    <div className="lg:px-32 px-5 lg:flex justify-center min-h-screen items-center pb-5">
      <div>
        <h1 className="font-bold text-2xl text-center py-2">
          Update Menu Item
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="image"
                name="image"
                label="Image URL"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.image}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="categoryId">Food Category</InputLabel>
                <Select
                  id="category"
                  name="category"
                  label="Food Category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  {restaurant.categories.map((item) => (
                    <MenuItem key={item.categoryId} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="ingredient-multiple-chip-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="ingredient-multiple-chip-label"
                  id="ingredient-multiple-chip"
                  multiple
                  name="ingredients"
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {ingredients.ingredients?.map((item) => (
                    <MenuItem
                      key={item.ingredientId}
                      value={item}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="vegetarian">Is Vegetarian</InputLabel>
                <Select
                  id="vegetarian"
                  name="vegetarian"
                  label="Is Vegetarian"
                  onChange={formik.handleChange}
                  value={formik.values.vegetarian}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="seasonal">Is Seasonal</InputLabel>
                <Select
                  id="seasonal"
                  name="seasonal"
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                  value={formik.values.seasonal}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Update Menu Item
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuForm;