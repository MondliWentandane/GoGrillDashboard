// pages/AvailableMealsPage.tsx - COMPLETE FIXED VERSION
import React, { useEffect, useState } from 'react'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Chip, Switch, Button, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, TextField,
  Select, MenuItem, FormControl, InputLabel, FormControlLabel
} from '@mui/material'
import { Edit, Delete, Visibility, Category as CategoryIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMeals, deleteMeal, updateMeal } from '../store/slices/mealsSlice'
import { fetchCategories } from '../store/slices/categoriesSlice'

const AvailableMealsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { meals, isLoading } = useAppSelector((state) => state.meals);
  const { categories } = useAppSelector((state) => state.categories);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchMeals({}));
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDeleteClick = (mealId: string) => {
    setMealToDelete(mealId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (mealToDelete) {
      try {
        await dispatch(deleteMeal(mealToDelete)).unwrap();
      } catch (error) {
        console.error('Failed to delete meal:', error);
      }
    }
    setDeleteDialogOpen(false);
    setMealToDelete(null);
  };

  const handleEditClick = (meal: any) => {
    setEditingMeal({ ...meal });
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (editingMeal) {
      try {
        await dispatch(updateMeal({ 
          mealId: editingMeal.id, 
          mealData: editingMeal 
        })).unwrap();
      } catch (error) {
        console.error('Failed to update meal:', error);
      }
    }
    setEditDialogOpen(false);
    setEditingMeal(null);
  };

  const handleToggleAvailability = async (meal: any) => {
    try {
      await dispatch(updateMeal({ 
        mealId: meal.id, 
        mealData: { ...meal, isAvailable: !meal.isAvailable }
      })).unwrap();
    } catch (error) {
      console.error('Failed to update meal availability:', error);
    }
  };

  const filteredMeals = selectedCategory === 'all' 
    ? meals 
    : meals.filter(meal => meal.categoryId === selectedCategory);

  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading meals...</div>;
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', margin: 0 }}>Available Meals</h1>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Filter by Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              startAdornment={<CategoryIcon sx={{ mr: 1, color: 'action.active' }} />}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category: any) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => window.location.href = '/addMealsP'}
            sx={{ backgroundColor: '#ff9a03', '&:hover': { backgroundColor: '#e68900' } }}
          >
            Add New Meal
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="meals table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Popular</strong></TableCell>
              <TableCell><strong>Discount</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => (
                <TableRow key={meal.id} hover>
                  <TableCell>
                    <img 
                      src={meal.image || 'https://via.placeholder.com/50'} 
                      alt={meal.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <strong>{meal.name}</strong>
                      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                        {meal.description.substring(0, 50)}...
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={meal.categoryName} 
                      size="small"
                      sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <strong>R{meal.price.toFixed(2)}</strong>
                      {meal.isDiscounted && meal.discountPercentage && (
                        <p style={{ margin: 0, fontSize: '12px', color: '#4caf50' }}>
                          {meal.discountPercentage}% OFF
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Switch
                        checked={meal.isAvailable}
                        onChange={() => handleToggleAvailability(meal)}
                        color="success"
                      />
                      <Chip 
                        label={meal.isAvailable ? 'Available' : 'Unavailable'} 
                        size="small"
                        color={meal.isAvailable ? 'success' : 'error'}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={meal.isPopular ? 'Popular' : 'Regular'} 
                      size="small"
                      color={meal.isPopular ? 'warning' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    {meal.isDiscounted ? (
                      <Chip 
                        label={`${meal.discountPercentage}% OFF`} 
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <span style={{ color: '#999' }}>None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <IconButton 
                        size="small" 
                        color="info"
                        title="View Details"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleEditClick(meal)}
                        title="Edit"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteClick(meal.id)}
                        title="Delete"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" style={{ padding: '40px' }}>
                  <p>No meals found. Add your first meal!</p>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => window.location.href = '/addMealsP'}
                    sx={{ backgroundColor: '#ff9a03', '&:hover': { backgroundColor: '#e68900' } }}
                  >
                    Add New Meal
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this meal? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Meal Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Meal</DialogTitle>
        <DialogContent>
          {editingMeal && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
              <TextField
                label="Meal Name"
                fullWidth
                value={editingMeal.name}
                onChange={(e) => setEditingMeal({...editingMeal, name: e.target.value})}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={editingMeal.description}
                onChange={(e) => setEditingMeal({...editingMeal, description: e.target.value})}
              />
              <div style={{ display: 'flex', gap: '20px' }}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  value={editingMeal.price}
                  onChange={(e) => setEditingMeal({...editingMeal, price: parseFloat(e.target.value)})}
                />
                <TextField
                  label="Preparation Time (min)"
                  type="number"
                  fullWidth
                  value={editingMeal.preparationTime}
                  onChange={(e) => setEditingMeal({...editingMeal, preparationTime: parseInt(e.target.value)})}
                />
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editingMeal.isAvailable}
                      onChange={(e) => setEditingMeal({...editingMeal, isAvailable: e.target.checked})}
                    />
                  }
                  label="Available"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={editingMeal.isPopular}
                      onChange={(e) => setEditingMeal({...editingMeal, isPopular: e.target.checked})}
                    />
                  }
                  label="Popular"
                />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AvailableMealsPage;