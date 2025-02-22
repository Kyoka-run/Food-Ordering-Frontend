import { useState, React } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { updateRestaurant } from "../../../redux/actions/restaurantActions";

const UpdateRestaurantForm = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const { restaurant } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  const handleAddImage = () => {
    if (imageUrl && imageUrl.trim() !== "") {
      formik.setFieldValue("images", [...formik.values.images, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", newImages);
  };

  const formik = useFormik({
    initialValues: {
      name: restaurant.usersRestaurant?.name || "",
      description: restaurant.usersRestaurant?.description || "",
      cuisineType: restaurant.usersRestaurant?.cuisineType || "",
      address: restaurant.usersRestaurant?.address || "",
      email: restaurant.usersRestaurant?.contactInformation?.email || "",
      mobile: restaurant.usersRestaurant?.contactInformation?.mobile || "",
      twitter: restaurant.usersRestaurant?.contactInformation?.twitter || "",
      instagram: restaurant.usersRestaurant?.contactInformation?.instagram || "",
      openingHours: restaurant.usersRestaurant?.openingHours || "",
      images: restaurant?.images || [],
    },
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: values.address,
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: currentRestaurant?.images || [],
      };
      dispatch(updateRestaurant({ restaurantId, restaurantData: data, jwt }));
      navigate("/admin/restaurant");
    },
  });

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          Update Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="flex space-x-2">
                <TextField
                  fullWidth
                  label="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddImage}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Add Image
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((url, index) => (
                  <Chip
                    key={index}
                    label={url}
                    onDelete={() => handleRemoveImage(index)}
                  />
                ))}
              </div>
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
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>
            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            {/* Contact Information Fields */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Update Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRestaurantForm;