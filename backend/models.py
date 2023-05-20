from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    # Add additional fields as per your requirements

    def __str__(self):
        return self.name

class FoodItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    # Add additional fields as per your requirements

    def __str__(self):
        return self.name

class Donation(models.Model):
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    # Add additional fields as per your requirements

    def __str__(self):
        return f"Donation by {self.donor} - {self.food_item}"
