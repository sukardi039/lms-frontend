import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Stack, TextField } from "@mui/material";

const BookAdd = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Controller
            name="isbn"
            control={control}
            rules={{ required: "ISBN is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="ISBN"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="title"
            control={control}
            rules={{ required: "Book Title is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="author"
            control={control}
            rules={{ required: "Book Author is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Author"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Category"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="bookImage"
            control={control}
            // rules={{ required: "Please Upload a Book Cover Image" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Book Image"
                error={!!error}
                helperText={error?.message}
                fullWidth
                disabled
              />
            )}
          />
          <Controller
            name="publishedYear"
            control={control}
            rules={{ required: "Year of Publication is required", min: 1 }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Year of Publication"
                type="number"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="copyInStock"
            control={control}
            rules={{ required: "Copies in Collection is required", min: 1 }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Copies in Collection"
                type="number"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default BookAdd;
